
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'ajay_portfolio_cms',
  waitForConnections: true,
  connectionLimit: 10
});

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.get('/api/portfolio', async (req, res) => {
  try {
    const [[settings]] = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    const [[secRow]] = await pool.query('SELECT * FROM cms_sections WHERE id = 1');
    const [skills] = await pool.query('SELECT * FROM skills ORDER BY proficiency DESC');
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    const [experiences] = await pool.query('SELECT * FROM experiences ORDER BY id DESC');
    const [services] = await pool.query('SELECT * FROM services ORDER BY id ASC');
    let sections = null;
    if (secRow && secRow.content_json) {
      try { sections = JSON.parse(secRow.content_json); } catch {}
    }
    res.json({ settings, sections, skills, projects, experiences, services });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/sections', verifyAdmin, async (req, res) => {
  try {
    const jsonStr = JSON.stringify(req.body);
    await pool.query('INSERT INTO cms_sections (id, content_json) VALUES (1, ?) ON DUPLICATE KEY UPDATE content_json = ?', [jsonStr, jsonStr]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { sender_name, sender_email, message } = req.body;
    await pool.query('INSERT INTO messages (sender_name, sender_email, message) VALUES (?, ?, ?)', [sender_name, sender_email, message]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === (process.env.ADMIN_USER || 'admin') && password === (process.env.ADMIN_PASS || 'admin123')) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.put('/api/admin/settings', verifyAdmin, async (req, res) => {
  try {
    const { name, role, tagline, about_bio, avatar_url, resume_url, github_url, linkedin_url, email, accent_color } = req.body;
    await pool.query(
      'UPDATE site_settings SET name=?, role=?, tagline=?, about_bio=?, avatar_url=?, resume_url=?, github_url=?, linkedin_url=?, email=?, accent_color=? WHERE id=1',
      [name, role, tagline, about_bio, avatar_url, resume_url, github_url, linkedin_url, email, accent_color]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const allowed = ['projects', 'skills', 'experiences', 'services', 'messages'];

app.get('/api/admin/:table', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  const [rows] = await pool.query(`SELECT * FROM \`${req.params.table}\` ORDER BY id DESC`);
  res.json(rows);
});

app.post('/api/admin/:table', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  const keys = Object.keys(req.body);
  const vals = Object.values(req.body);
  const [result] = await pool.query(
    `INSERT INTO \`${req.params.table}\` (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`,
    vals
  );
  res.json({ id: result.insertId, ...req.body });
});

app.put('/api/admin/:table/:id', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  const { id: _, created_at: __, ...rest } = req.body;
  const entries = Object.entries(rest);
  await pool.query(
    `UPDATE \`${req.params.table}\` SET ${entries.map(([k]) => `${k}=?`).join(',')} WHERE id=?`,
    [...entries.map(([, v]) => v), req.params.id]
  );
  res.json({ success: true });
});

app.delete('/api/admin/:table/:id', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  await pool.query(`DELETE FROM \`${req.params.table}\` WHERE id=?`, [req.params.id]);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend CMS Server running on http://localhost:${PORT}`));
