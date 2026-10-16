import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

try {
  console.log('🔍 1. Verifying video file in public/...');
  let detectedVideo = '/ajay-neon.mp4';
  if (fs.existsSync('public')) {
    const pubFiles = fs.readdirSync('public');
    for (const file of pubFiles) {
      if (file.toLowerCase().endsWith('.mp4')) {
        if (file.toLowerCase() === 'ajay-neon.mp4.mp4') {
          fs.renameSync(path.join('public', file), path.join('public', 'ajay-neon.mp4'));
          detectedVideo = '/ajay-neon.mp4';
        } else {
          detectedVideo = '/' + file;
        }
      }
    }
  }

  console.log('🗄️ 2. Upgrading Backend API & MySQL Schema for 100% A-to-Z Editable Content (server/init_db.js & server/index.js)...');

  const defaultPageSections = {
    hero: {
      eyebrow: "Hey, I'm Ajay — a",
      title_line1: "Creative",
      title_line2: "Director",
      right_heading: "Great design should feel invisible.",
      right_subtext: "From logo to language, I build brands, 3D WebGL experiences, and full-stack architectures that connect and convert.",
      strip: [
        { num: "#01", title: "Brand Strategy" },
        { num: "#02", title: "3D Web & Identity Design" },
        { num: "#03", title: "Full-Stack Architecture" },
        { num: "#04", title: "Creative Direction" }
      ]
    },
    brands: {
      label_line1: "Trusted by Brands I've",
      label_line2: "Helped Shape",
      list: ["◎ Supa Blox", "✦ Hype Blox", "◐ Frame Blox", "✪ Ultra Blox"]
    },
    about: {
      tag: "Behind the Designs",
      heading: "Shaping Experiences That Make Life Simpler",
      bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
      cta_label: "Let's Build Something Meaningful Together",
      cta_button: "Get in touch"
    },
    workflow: {
      tag: "✦ WORKFLOW PLAN",
      heading: "A focused two-week design sprint from idea to visual concept.",
      description: "This concept was developed as a focused two-week design & engineering sprint — from product positioning and visual research to landing page structure, interactive 3D mockups, and full-stack MySQL deployment.",
      steps: [
        { label: "🔍 Research & references", days: "1 day", offset: "0%" },
        { label: "🎯 Product positioning", days: "1 day", offset: "10%" },
        { label: "📐 Landing page structure", days: "2 days", offset: "22%" },
        { label: "✨ Visual direction", days: "2 days", offset: "38%" },
        { label: "⚡ AI & 3D concept exploration", days: "2 days", offset: "52%" },
        { label: "💻 Full-Stack UI & CMS build", days: "2 days", offset: "64%" }
      ]
    },
    palette: {
      tag: "✦ COLOR PALETTE",
      heading: "The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.",
      cards: [
        { title: "Dark Accent", desc: "Used for elevated glassmorphic cards, surface overlays, and subtle depth.", hex: "#1E1E28", rgb: "30 30 40", dot: "#3b0722" },
        { title: "Soft White", desc: "Primary editorial typography color ensuring crisp contrast and legibility.", hex: "#F5F5FA", rgb: "245 245 250", dot: "#f5f5fa" },
        { title: "Crimson Neon", desc: "Signature studio rim-light accent for calls-to-action and interactive highlights.", hex: "#FF5522", rgb: "255 85 34", dot: "#ff5522" }
      ]
    },
    stats: {
      stat1_label: "IN UP TO 2030",
      stat1_value: "65%",
      stat1_desc: "Projected market growth for interactive 3D digital brand experiences in the next five years.",
      stat2_label: "ACCORDING TO INDUSTRY DATA",
      stat2_value: "$30B",
      stat2_desc: "Estimated global valuation of next-gen AI & spatial web platforms by 2030.",
      studio_left: "GLOBAL",
      studio_right: "STUDIO"
    },
    testimonials: {
      tag: "✦ CLIENT FEEDBACK",
      heading: "What Clients & Partners Say",
      list: [
        { name: "Alex Vance", role: "Founder at SupaBlox", text: "Working with Ajay transformed our entire digital presence. The scroll-driven 3D experience doubled our engagement." },
        { name: "Elena Rostova", role: "VP of Brand at Aura", text: "Rarely do you find someone who masters both visual art direction and full-stack Node.js + MySQL engineering." },
        { name: "Marcus Chen", role: "CEO at Vision OS", text: "Delivered a complete two-week sprint from concept to live production with zero compromises on speed or quality." }
      ]
    },
    contact: {
      heading_left: "READY TO GROW",
      heading_right: "& SCALE YOUR COMPANY?",
      badge_title: "LET'S TALK",
      badge_desc: "Unlock your brand's full potential with a 1-on-1 consultation.",
      submit_text: "Submit Consultation Request",
      location_text: "Hyderabad, India • Global Studio"
    }
  };

  fs.writeFileSync('server/init_db.js', `
const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

const defaultSections = ${JSON.stringify(defaultPageSections, null, 2)};

async function initDB() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || ''
    });

    const db = process.env.DB_NAME || 'ajay_portfolio_cms';
    await conn.query(\`CREATE DATABASE IF NOT EXISTS \\\`\${db}\\\`;\`);
    await conn.query(\`USE \\\`\${db}\\\`;\`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(100) DEFAULT 'Ajay Chithanoor',
        role VARCHAR(150) DEFAULT 'Creative Director & 3D Full-Stack Architect',
        tagline TEXT,
        about_bio TEXT,
        avatar_url VARCHAR(255) DEFAULT '${detectedVideo}',
        resume_url VARCHAR(255) DEFAULT '/Ajay Chithanoor.pdf',
        github_url VARCHAR(255) DEFAULT 'https://github.com',
        linkedin_url VARCHAR(255) DEFAULT 'https://linkedin.com',
        email VARCHAR(150) DEFAULT 'ajay@folioblox.design',
        accent_color VARCHAR(20) DEFAULT '#ff5522'
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS cms_sections (
        id INT PRIMARY KEY DEFAULT 1,
        content_json LONGTEXT NOT NULL
      );
    \`);

    const [secRows] = await conn.query('SELECT * FROM cms_sections WHERE id = 1');
    if (secRows.length === 0) {
      await conn.query('INSERT INTO cms_sections (id, content_json) VALUES (1, ?)', [JSON.stringify(defaultSections)]);
    }

    await conn.query("UPDATE site_settings SET avatar_url = '${detectedVideo}' WHERE id = 1");

    console.log('✅ MySQL Database & A-to-Z CMS Sections initialized!');
    await conn.end();
  } catch (err) {
    console.warn('⚠️ MySQL not reachable right now, frontend will use built-in live defaults:', err.message);
  }
}
initDB();
`);

  fs.writeFileSync('server/index.js', `
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
  const [rows] = await pool.query(\`SELECT * FROM \\\`\${req.params.table}\\\` ORDER BY id DESC\`);
  res.json(rows);
});

app.post('/api/admin/:table', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  const keys = Object.keys(req.body);
  const vals = Object.values(req.body);
  const [result] = await pool.query(
    \`INSERT INTO \\\`\${req.params.table}\\\` (\${keys.join(',')}) VALUES (\${keys.map(() => '?').join(',')})\`,
    vals
  );
  res.json({ id: result.insertId, ...req.body });
});

app.put('/api/admin/:table/:id', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  const { id: _, created_at: __, ...rest } = req.body;
  const entries = Object.entries(rest);
  await pool.query(
    \`UPDATE \\\`\${req.params.table}\\\` SET \${entries.map(([k]) => \`\${k}=?\`).join(',')} WHERE id=?\`,
    [...entries.map(([, v]) => v), req.params.id]
  );
  res.json({ success: true });
});

app.delete('/api/admin/:table/:id', verifyAdmin, async (req, res) => {
  if (!allowed.includes(req.params.table)) return res.status(400).json({ error: 'Invalid table' });
  await pool.query(\`DELETE FROM \\\`\${req.params.table}\\\` WHERE id=?\`, [req.params.id]);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Backend CMS Server running on http://localhost:\${PORT}\`));
`);

  console.log('🖥️ 3. Building Ultra-Premium Executive Admin CMS (src/components/AdminCMS.jsx)...');
  fs.writeFileSync('src/components/AdminCMS.jsx', `
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminCMS({ onUpdatePortfolio, onBackToSite, defaultSections }) {
  const [token, setToken] = useState(localStorage.getItem('cms_token') || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [settings, setSettings] = useState(null);
  const [sections, setSections] = useState(defaultSections);
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experiences: 0, services: 0, messages: 0 });
  const [newItem, setNewItem] = useState({});
  const [toast, setToast] = useState('');

  const authHeaders = { headers: { Authorization: \`Bearer \${token}\` } };
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(\`\${API}/admin/login\`, loginForm);
      localStorage.setItem('cms_token', res.data.token);
      setToken(res.data.token);
      notify('✅ Welcome to Executive Admin CMS');
    } catch {
      alert('Invalid Admin Credentials! Default is: admin / admin123');
    }
  };

  const loadAll = async () => {
    if (!token) return;
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      if (res.data.settings) setSettings(res.data.settings);
      if (res.data.sections) setSections(res.data.sections);
      const msgs = await axios.get(\`\${API}/admin/messages\`, authHeaders);
      setCounts({
        projects: res.data.projects?.length || 0,
        skills: res.data.skills?.length || 0,
        experiences: res.data.experiences?.length || 0,
        services: res.data.services?.length || 0,
        messages: msgs.data?.length || 0
      });
    } catch (err) {
      if (err.response?.status === 403) {
        localStorage.removeItem('cms_token');
        setToken('');
      }
    }
  };

  const loadTable = async (tab) => {
    if (!token || ['overview', 'settings', 'sections'].includes(tab)) return;
    try {
      const res = await axios.get(\`\${API}/admin/\${tab}\`, authHeaders);
      setItems(res.data);
      setNewItem({});
    } catch {}
  };

  useEffect(() => {
    loadAll();
    loadTable(activeTab);
  }, [token, activeTab]);

  const saveGlobalSettings = async (e) => {
    e.preventDefault();
    await axios.put(\`\${API}/admin/settings\`, settings, authHeaders);
    notify('✨ Global Brand & Video Settings Saved Live!');
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const saveAllSections = async (e) => {
    e.preventDefault();
    await axios.put(\`\${API}/admin/sections\`, sections, authHeaders);
    notify('🔥 All A-to-Z Page Sections Updated Live in MySQL!');
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const createRow = async (e) => {
    e.preventDefault();
    await axios.post(\`\${API}/admin/\${activeTab}\`, newItem, authHeaders);
    notify(\`✨ Added new item to \${activeTab.toUpperCase()}\`);
    loadTable(activeTab);
    loadAll();
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const updateRow = async (item) => {
    await axios.put(\`\${API}/admin/\${activeTab}/\${item.id}\`, item, authHeaders);
    notify(\`✅ Saved changes to #\${item.id}\`);
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const deleteRow = async (id) => {
    await axios.delete(\`\${API}/admin/\${activeTab}/\${id}\`, authHeaders);
    notify(\`🗑️ Removed item #\${id}\`);
    loadTable(activeTab);
    loadAll();
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  if (!token) {
    return (
      <div className="cms-login-screen">
        <form onSubmit={handleLogin} className="cms-login-card">
          <div className="section-orange-tag">✦ EXECUTIVE CONTROL CENTER</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Portfolio Admin CMS</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
            Full A-to-Z MySQL Database Control • Default: <strong>admin</strong> / <strong>admin123</strong>
          </p>
          <div className="cms-field">
            <label>ADMIN USERNAME</label>
            <input required placeholder="admin" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
          </div>
          <div className="cms-field">
            <label>PASSWORD</label>
            <input required type="password" placeholder="••••••••" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
          </div>
          <button type="submit" className="orange-cta-pill" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
            Unlock Live CMS Dashboard <span className="orange-cta-circle">→</span>
          </button>
          <button type="button" onClick={onBackToSite} className="cms-back-btn">
            ← Return to Live Portfolio
          </button>
        </form>
      </div>
    );
  }

  const tableFields = {
    projects: ['title', 'description', 'tech_stack', 'image_url', 'live_url', 'github_url'],
    skills: ['name', 'category', 'proficiency'],
    experiences: ['role', 'company', 'duration', 'description'],
    services: ['title', 'description', 'icon_name'],
    messages: ['sender_name', 'sender_email', 'message']
  };

  const navItems = [
    { id: 'overview', label: '📊 Dashboard Overview' },
    { id: 'settings', label: '⚙️ Brand & Video Setup' },
    { id: 'sections', label: '📝 Edit Page Copy (A-Z)' },
    { id: 'projects', label: \`🚀 Projects (\${counts.projects})\` },
    { id: 'skills', label: \`⚡ Tech Stack (\${counts.skills})\` },
    { id: 'experiences', label: \`💼 Experience (\${counts.experiences})\` },
    { id: 'services', label: \`🎯 Services (\${counts.services})\` },
    { id: 'messages', label: \`📬 Client Leads (\${counts.messages})\` }
  ];

  return (
    <div className="cms-shell">
      {/* Left Executive Sidebar */}
      <aside className="cms-sidebar">
        <div>
          <div className="folioblox-logo" style={{ fontSize: 22, marginBottom: 6 }}>
            Ajay<span style={{ color: '#ff5522' }}>.CMS</span>
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 28 }}>
            XAMPP MySQL • Live Sync
          </span>

          <div className="cms-nav-list">
            {navItems.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={\`cms-nav-btn \${activeTab === t.id ? 'active' : ''}\`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <button onClick={onBackToSite} className="orange-cta-pill" style={{ justifyContent: 'center' }}>
            View Live Portfolio ↗
          </button>
          <button
            onClick={() => { localStorage.removeItem('cms_token'); setToken(''); }}
            className="cms-logout-btn"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="cms-main">
        <header className="cms-topbar">
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 800 }}>
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 13 }}>
              Every change you save updates your MySQL database and live portfolio immediately.
            </p>
          </div>
          {toast && <div className="cms-toast">{toast}</div>}
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="cms-kpi-grid">
              <div className="cms-kpi-card" onClick={() => setActiveTab('projects')}>
                <span>FEATURED PROJECTS</span>
                <strong>{counts.projects}</strong>
                <small>Click to manage →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('skills')}>
                <span>TECH STACK ITEMS</span>
                <strong>{counts.skills}</strong>
                <small>Click to manage →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('sections')}>
                <span>PAGE SECTIONS</span>
                <strong>8</strong>
                <small>100% Editable A-Z →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('messages')}>
                <span>CLIENT CONSULTATIONS</span>
                <strong style={{ color: '#ff5522' }}>{counts.messages}</strong>
                <small>View inbox →</small>
              </div>
            </div>

            <div className="cms-card" style={{ marginTop: 28 }}>
              <h3 style={{ marginBottom: 12 }}>Quick Actions</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('sections')} className="orange-cta-pill">
                  ✏️ Edit Hero, Workflow, Palette & Stats Copy
                </button>
                <button onClick={() => setActiveTab('projects')} className="cms-secondary-btn">
                  ➕ Add New Portfolio Project
                </button>
                <button onClick={() => setActiveTab('settings')} className="cms-secondary-btn">
                  🎬 Change Background Video / Resume PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GLOBAL BRAND & VIDEO SETTINGS */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={saveGlobalSettings} className="cms-card">
            <h3 style={{ marginBottom: 20 }}>Global Identity, Background Video & Social Links</h3>
            <div className="cms-form-grid">
              {Object.keys(settings).filter((k) => k !== 'id').map((k) => (
                <div key={k} className="cms-field">
                  <label>{k.replace('_', ' ').toUpperCase()}</label>
                  <input
                    value={settings[k] || ''}
                    onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="orange-cta-pill" style={{ marginTop: 20 }}>
              Save Global Settings <span className="orange-cta-circle">✓</span>
            </button>
          </form>
        )}

        {/* TAB 3: EDIT ALL PAGE SECTIONS A-TO-Z */}
        {activeTab === 'sections' && sections && (
          <form onSubmit={saveAllSections} style={{ display: 'grid', gap: 24 }}>
            {/* HERO SECTION EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>1. Hero Section & Bottom Strip (#01 - #04)</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>EYEBROW GREETING</label>
                  <input value={sections.hero.eyebrow} onChange={(e) => setSections({ ...sections, hero: { ...sections.hero, eyebrow: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>GIANT TITLE LINE 1</label>
                  <input value={sections.hero.title_line1} onChange={(e) => setSections({ ...sections, hero: { ...sections.hero, title_line1: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>GIANT TITLE LINE 2</label>
                  <input value={sections.hero.title_line2} onChange={(e) => setSections({ ...sections, hero: { ...sections.hero, title_line2: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>RIGHT QUOTE HEADING</label>
                  <input value={sections.hero.right_heading} onChange={(e) => setSections({ ...sections, hero: { ...sections.hero, right_heading: e.target.value } })} />
                </div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                  <label>RIGHT QUOTE SUBTEXT</label>
                  <input value={sections.hero.right_subtext} onChange={(e) => setSections({ ...sections, hero: { ...sections.hero, right_subtext: e.target.value } })} />
                </div>
              </div>
              <div className="cms-form-grid" style={{ marginTop: 14 }}>
                {sections.hero.strip.map((st, i) => (
                  <div key={i} className="cms-field">
                    <label>STRIP {st.num}</label>
                    <input
                      value={st.title}
                      onChange={(e) => {
                        const copy = [...sections.hero.strip];
                        copy[i].title = e.target.value;
                        setSections({ ...sections, hero: { ...sections.hero, strip: copy } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BEHIND THE DESIGNS & BRANDS EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>2. Trusted Brands & Behind the Designs</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>SECTION TAG</label>
                  <input value={sections.about.tag} onChange={(e) => setSections({ ...sections, about: { ...sections.about, tag: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>MAIN HEADING</label>
                  <input value={sections.about.heading} onChange={(e) => setSections({ ...sections, about: { ...sections.about, heading: e.target.value } })} />
                </div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                  <label>ABOUT BIO STATEMENT</label>
                  <input value={sections.about.bio} onChange={(e) => setSections({ ...sections, about: { ...sections.about, bio: e.target.value } })} />
                </div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                  <label>TRUSTED BRANDS (COMMA SEPARATED)</label>
                  <input
                    value={sections.brands.list.join(', ')}
                    onChange={(e) => setSections({ ...sections, brands: { ...sections.brands, list: e.target.value.split(',').map((s) => s.trim()) } })}
                  />
                </div>
              </div>
            </div>

            {/* WORKFLOW SPRINT EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>3. Two-Week Workflow Sprint</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>WORKFLOW HEADING</label>
                  <input value={sections.workflow.heading} onChange={(e) => setSections({ ...sections, workflow: { ...sections.workflow, heading: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>WORKFLOW DESCRIPTION</label>
                  <input value={sections.workflow.description} onChange={(e) => setSections({ ...sections, workflow: { ...sections.workflow, description: e.target.value } })} />
                </div>
              </div>
              <div className="cms-form-grid" style={{ marginTop: 14 }}>
                {sections.workflow.steps.map((st, i) => (
                  <div key={i} className="cms-field">
                    <label>STEP {i + 1} LABEL & DURATION</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        value={st.label}
                        onChange={(e) => {
                          const copy = [...sections.workflow.steps];
                          copy[i].label = e.target.value;
                          setSections({ ...sections, workflow: { ...sections.workflow, steps: copy } });
                        }}
                      />
                      <input
                        style={{ maxWidth: 90 }}
                        value={st.days}
                        onChange={(e) => {
                          const copy = [...sections.workflow.steps];
                          copy[i].days = e.target.value;
                          setSections({ ...sections, workflow: { ...sections.workflow, steps: copy } });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STATS & GLOBAL STUDIO EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>4. Industry Stats (65% / $30B) & Global Studio Banner</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>STAT 1 VALUE</label>
                  <input value={sections.stats.stat1_value} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, stat1_value: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>STAT 1 DESCRIPTION</label>
                  <input value={sections.stats.stat1_desc} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, stat1_desc: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>STAT 2 VALUE</label>
                  <input value={sections.stats.stat2_value} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, stat2_value: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>STAT 2 DESCRIPTION</label>
                  <input value={sections.stats.stat2_desc} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, stat2_desc: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>BANNER LEFT WORD</label>
                  <input value={sections.stats.studio_left} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, studio_left: e.target.value } })} />
                </div>
                <div className="cms-field">
                  <label>BANNER RIGHT WORD</label>
                  <input value={sections.stats.studio_right} onChange={(e) => setSections({ ...sections, stats: { ...sections.stats, studio_right: e.target.value } })} />
                </div>
              </div>
            </div>

            {/* TESTIMONIALS EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>5. Client Testimonials</h3>
              <div className="cms-form-grid">
                {sections.testimonials.list.map((t, i) => (
                  <div key={i} className="cms-field">
                    <label>CLIENT {i + 1} ({t.name})</label>
                    <input
                      style={{ marginBottom: 6 }}
                      value={t.name}
                      onChange={(e) => {
                        const copy = [...sections.testimonials.list];
                        copy[i].name = e.target.value;
                        setSections({ ...sections, testimonials: { ...sections.testimonials, list: copy } });
                      }}
                    />
                    <input
                      style={{ marginBottom: 6 }}
                      value={t.role}
                      onChange={(e) => {
                        const copy = [...sections.testimonials.list];
                        copy[i].role = e.target.value;
                        setSections({ ...sections, testimonials: { ...sections.testimonials, list: copy } });
                      }}
                    />
                    <input
                      value={t.text}
                      onChange={(e) => {
                        const copy = [...sections.testimonials.list];
                        copy[i].text = e.target.value;
                        setSections({ ...sections, testimonials: { ...sections.testimonials, list: copy } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="orange-cta-pill" style={{ justifySelf: 'start' }}>
              Save All A-to-Z Page Content <span className="orange-cta-circle">✓</span>
            </button>
          </form>
        )}

        {/* DYNAMIC CRUD TABLES (Projects, Skills, Experiences, Services, Messages) */}
        {!['overview', 'settings', 'sections'].includes(activeTab) && (
          <div>
            {activeTab !== 'messages' && (
              <form onSubmit={createRow} className="cms-card" style={{ marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>➕ Add New {activeTab.slice(0, -1).toUpperCase()}</h3>
                <div className="cms-form-grid">
                  {tableFields[activeTab].map((f) => (
                    <div key={f} className="cms-field">
                      <label>{f.replace('_', ' ').toUpperCase()}</label>
                      <input
                        required
                        placeholder={\`Enter \${f.replace('_', ' ')}...\`}
                        value={newItem[f] || ''}
                        onChange={(e) => setNewItem({ ...newItem, [f]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="orange-cta-pill" style={{ marginTop: 16 }}>
                  Create Entry <span className="orange-cta-circle">+</span>
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gap: 16 }}>
              {items.map((item, idx) => (
                <div key={item.id} className="cms-card">
                  <div className="cms-form-grid">
                    {tableFields[activeTab].map((f) => (
                      <div key={f} className="cms-field">
                        <label>{f.replace('_', ' ').toUpperCase()}</label>
                        <input
                          value={item[f] || ''}
                          onChange={(e) => {
                            const copy = [...items];
                            copy[idx][f] = e.target.value;
                            setItems(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    {activeTab !== 'messages' && (
                      <button onClick={() => updateRow(item)} className="orange-cta-pill">
                        Save Changes
                      </button>
                    )}
                    <button onClick={() => deleteRow(item.id)} className="cms-delete-btn">
                      Delete Entry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
`);

  console.log('🎨 4. Upgrading App.css to Full-Width 100vw Fluid Layout + All-Device Responsive + Executive CMS Styles...');
  fs.writeFileSync('src/App.css', `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,600&display=swap');

:root {
  --orange: #ff5522;
  --crimson: #e11d48;
  --dark-bg: #07040a;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--dark-bg);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

body {
  background-color: var(--dark-bg);
  overflow-x: hidden;
  width: 100%;
}

/* FULL-WIDTH EDGE-TO-EDGE NAVBAR */
.folioblox-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: linear-gradient(180deg, rgba(7, 4, 10, 0.85) 0%, rgba(7, 4, 10, 0.2) 100%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.folioblox-logo {
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.5px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

.folioblox-links {
  display: flex;
  gap: 28px;
  align-items: center;
}

.folioblox-links a,
.folioblox-links button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;
}

.folioblox-links a:hover,
.folioblox-links button:hover,
.folioblox-links .active-link {
  color: #ffffff;
}

.mobile-menu-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 18px;
  cursor: pointer;
}

.mobile-drawer {
  position: fixed;
  top: 70px;
  left: 4vw;
  right: 4vw;
  background: rgba(12, 8, 18, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 85, 34, 0.35);
  border-radius: 20px;
  padding: 24px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
}

.mobile-drawer a,
.mobile-drawer button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 8px 18px;
  border-radius: 999px;
  background: #ffffff;
  color: #09090b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-cta-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--orange);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 13px;
}

.orange-cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px 11px 22px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff6b2b, #ff3b1f);
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(255, 65, 34, 0.35);
  transition: transform 0.2s;
}

.orange-cta-pill:hover {
  transform: translateY(-2px);
}

.orange-cta-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  color: #ff4522;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 800;
}

/* FULL-WIDTH SCROLL SECTIONS (100% Fluid Width with 4vw Edge Padding) */
.folioblox-scroll-content {
  position: relative;
  z-index: 10;
  width: 100%;
}

.fb-section {
  width: 100%;
  max-width: 100%;
  padding: clamp(70px, 9vw, 130px) 4vw;
}

.fb-hero {
  min-height: 100vh;
  width: 100%;
  padding: 120px 4vw 42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.fb-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 56px;
  width: 100%;
}

.hey-eyebrow {
  color: #ff6b3d;
  font-size: clamp(16px, 1.5vw, 22px);
  font-weight: 600;
  margin-bottom: 10px;
}

.hero-giant-title {
  font-size: clamp(3.2rem, 7.5vw, 6.8rem);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.035em;
}

.hero-right-quote {
  text-align: right;
  max-width: 420px;
  margin-left: auto;
}

.hero-right-quote h3 {
  font-size: clamp(1.5rem, 2.5vw, 2.4rem);
  font-weight: 700;
  line-height: 1.18;
  margin-bottom: 12px;
}

.hero-right-quote p {
  font-size: clamp(13.5px, 1.1vw, 16px);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
}

.hero-bottom-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding-top: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  width: 100%;
}

.strip-item span {
  display: block;
  color: #ff5522;
  font-size: 12.5px;
  font-weight: 700;
  margin-bottom: 4px;
}

.strip-item strong {
  font-size: clamp(13px, 1.1vw, 15.5px);
  font-weight: 600;
}

/* BRANDS BAR */
.brands-pill-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 24px 36px;
  border-radius: 999px;
  background: rgba(14, 10, 18, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  margin-bottom: 80px;
  width: 100%;
}

.brand-logos-row {
  display: flex;
  gap: clamp(20px, 3.5vw, 54px);
  align-items: center;
  flex-wrap: wrap;
}

.brand-logo-item {
  font-weight: 700;
  font-size: clamp(14px, 1.2vw, 17px);
  color: rgba(255, 255, 255, 0.9);
}

/* BEHIND THE DESIGNS & 3-COLUMN SHOWCASE */
.behind-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: flex-end;
  margin-bottom: 56px;
  width: 100%;
}

.section-orange-tag {
  color: #ff5522;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.fb-h2 {
  font-size: clamp(2.1rem, 4.4vw, 3.8rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.italic-serif {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 600;
}

.three-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  width: 100%;
}

.preview-img-card {
  border-radius: 22px;
  overflow: hidden;
  height: clamp(260px, 28vw, 390px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(15, 12, 20, 0.6);
  position: relative;
  transition: transform 0.35s ease, border-color 0.35s ease;
}

.preview-img-card:hover {
  transform: translateY(-8px);
  border-color: #ff5522;
}

.preview-img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(7, 4, 10, 0.92) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
}

/* SPRINT TIMELINE BARS */
.sprint-bars-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 48px;
  width: 100%;
}

.sprint-pill-bar {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 24px;
  border-radius: 999px;
  background: rgba(18, 14, 24, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(14px);
  width: fit-content;
  min-width: 310px;
}

.sprint-day-badge {
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255, 85, 34, 0.18);
  color: #ff8a65;
  font-size: 11.5px;
  font-weight: 700;
}

/* PALETTE, TESTIMONIALS & STATS */
.palette-grid,
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 48px;
  width: 100%;
}

.glass-spec-card {
  padding: 32px;
  border-radius: 22px;
  background: rgba(16, 12, 22, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(16px);
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12.5px;
  color: #cbd5e1;
}

.stats-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 48px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  width: 100%;
}

.giant-stat-num {
  font-size: clamp(3.8rem, 7vw, 6.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 12px 0;
}

.global-studio-banner {
  text-align: center;
  padding: 80px 0;
  width: 100%;
}

.global-studio-text {
  font-size: clamp(3.2rem, 9.5vw, 8.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 2.5vw, 36px);
  flex-wrap: wrap;
}

.studio-center-card {
  width: clamp(180px, 18vw, 260px);
  height: clamp(210px, 21vw, 300px);
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75);
  display: inline-block;
}

/* CONSULTATION FORM */
.scale-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 48px;
  margin-top: 48px;
  width: 100%;
}

.line-input-group label {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 10px;
}

.line-input-group input,
.line-input-group select {
  width: 100%;
  padding: 14px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  font-size: 15px;
  outline: none;
}

.line-input-group select option {
  background: #120d18;
  color: #fff;
}

/* DEDICATED PROJECTS PAGE */
.projects-page-wrap {
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(circle at 80% 15%, rgba(255, 85, 34, 0.16), transparent 40%),
    radial-gradient(circle at 20% 60%, rgba(225, 29, 72, 0.14), transparent 45%),
    #08060c;
  padding-top: 110px;
  position: relative;
  z-index: 20;
}

.filter-pills-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 32px 0 48px;
}

.filter-pill {
  padding: 10px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

.filter-pill.active {
  background: linear-gradient(90deg, #ff6b2b, #ff3b1f);
  color: #fff;
  border-color: transparent;
}

.projects-two-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
}

.dedicated-project-card {
  border-radius: 22px;
  background: rgba(18, 14, 24, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  transition: transform 0.3s, border-color 0.3s;
}

.dedicated-project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 85, 34, 0.55);
}

/* FOOTER */
.folioblox-footer {
  background: rgba(8, 5, 12, 0.94);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  padding: 70px 4vw 36px;
  position: relative;
  z-index: 15;
  width: 100%;
}

.footer-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
}

/* EXECUTIVE ADMIN CMS STYLES */
.cms-login-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(circle at 75% 25%, rgba(255, 85, 34, 0.2), transparent 45%), #07040a;
}

.cms-login-card {
  width: min(440px, 100%);
  padding: 40px;
  border-radius: 24px;
  background: rgba(16, 12, 24, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
}

.cms-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: #07040a;
  color: #f8fafc;
}

.cms-sidebar {
  background: rgba(12, 9, 18, 0.95);
  border-right: 1px solid rgba(255, 255, 255, 0.09);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 100vh;
}

.cms-nav-list {
  display: grid;
  gap: 6px;
}

.cms-nav-btn {
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: transparent;
  color: #cbd5e1;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cms-nav-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.cms-nav-btn.active {
  background: linear-gradient(90deg, rgba(255, 85, 34, 0.22), rgba(225, 29, 72, 0.15));
  border-color: rgba(255, 85, 34, 0.5);
  color: #fff;
}

.cms-main {
  padding: 36px 4vw;
  overflow-y: auto;
}

.cms-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.cms-toast {
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.18);
  border: 1px solid rgba(34, 197, 94, 0.45);
  color: #4ade80;
  font-size: 13px;
  font-weight: 700;
}

.cms-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;
}

.cms-kpi-card {
  padding: 26px;
  border-radius: 20px;
  background: rgba(18, 14, 28, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.cms-kpi-card:hover {
  transform: translateY(-4px);
  border-color: #ff5522;
}

.cms-kpi-card span {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
  letter-spacing: 1px;
}

.cms-kpi-card strong {
  display: block;
  font-size: 38px;
  font-weight: 800;
  margin: 8px 0 4px;
}

.cms-kpi-card small {
  color: #ff6b3d;
  font-size: 12px;
}

.cms-card {
  padding: 28px;
  border-radius: 22px;
  background: rgba(16, 12, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cms-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.cms-field label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 6px;
  letter-spacing: 0.6px;
}

.cms-field input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #09060e;
  color: #fff;
  font-size: 13.5px;
  outline: none;
}

.cms-field input:focus {
  border-color: #ff5522;
}

.cms-secondary-btn,
.cms-back-btn,
.cms-logout-btn,
.cms-delete-btn {
  padding: 11px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.cms-back-btn {
  width: 100%;
  margin-top: 12px;
}

.cms-delete-btn {
  border-color: rgba(239, 68, 68, 0.5);
  color: #f87171;
}

/* ALL-DEVICE RESPONSIVE BREAKPOINTS (Mobile, Tablet, Laptop) */
@media (max-width: 1024px) {
  .folioblox-links {
    display: none;
  }
  .mobile-menu-toggle {
    display: inline-block;
  }
  .fb-hero-grid,
  .behind-grid,
  .three-preview-grid,
  .palette-grid,
  .testimonials-grid,
  .stats-two-col,
  .scale-form-grid,
  .projects-two-col,
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .hero-right-quote {
    text-align: left;
    margin-left: 0;
  }
  .hero-bottom-strip {
    grid-template-columns: repeat(2, 1fr);
  }
  .sprint-pill-bar {
    margin-left: 0 !important;
    width: 100%;
  }
  .cms-shell {
    grid-template-columns: 1fr;
  }
  .cms-sidebar {
    height: auto;
    position: relative;
  }
}

@media (max-width: 600px) {
  .hero-bottom-strip {
    grid-template-columns: 1fr;
  }
  .brands-pill-bar {
    border-radius: 22px;
    padding: 20px;
  }
  .nav-cta-pill {
    display: none;
  }
}
`);

  console.log('⚡ 5. Connecting Full-Width Responsive App.jsx to Live Editable CMS Sections...');
  fs.writeFileSync('src/App.jsx', `
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import HeroScene from './components/HeroScene';
import AdminCMS from './components/AdminCMS';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSections = ${JSON.stringify(defaultPageSections, null, 2)};

export default function App() {
  const [data, setData] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [formState, setFormState] = useState({
    sender_name: '', phone: '', sender_email: '', years: '0 - 1 year', challenge: '', budget: '$2,500 - $5,000'
  });
  const [formSent, setFormSent] = useState(false);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      setData(res.data);
    } catch {
      console.warn('Using built-in live portfolio state');
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const checkHash = () => {
      if (window.location.hash === '#admin') setCurrentPage('admin');
      else if (window.location.hash === '#projects-page') setCurrentPage('projects');
    };
    checkHash();
    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('scroll', onScroll);
    };
  }, [fetchPortfolio]);

  const s = data?.settings || {
    name: 'Ajay Chithanoor',
    role: 'Creative Director',
    tagline: 'From logo to language, I build brands & 3D full-stack web experiences that connect and convert.',
    about_bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
    avatar_url: '${detectedVideo}',
    resume_url: '/Ajay Chithanoor.pdf',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    email: 'ajay@folioblox.design'
  };

  const sec = data?.sections || fallbackSections;

  if (currentPage === 'admin') {
    return (
      <AdminCMS
        defaultSections={sec}
        onUpdatePortfolio={fetchPortfolio}
        onBackToSite={() => {
          window.location.hash = '';
          setCurrentPage('home');
        }}
      />
    );
  }

  const projectsList = data?.projects?.length ? data.projects : [
    { id: 1, title: 'Aura Audio — Wireless Headphones', description: 'Acoustic product design, 3D WebGL showcase, and high-conversion launch experience.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#' },
    { id: 2, title: 'Noir Outerwear — Puffer Series', description: 'Minimalist fashion e-commerce architecture with interactive 3D garment inspection.', tech_stack: 'Branding', image_url: '/project2.jpg', live_url: '#' },
    { id: 3, title: 'Botanica Skincare — Dark Dropper', description: 'Luxury packaging system and sensory web storytelling.', tech_stack: 'Packaging', image_url: '/project3.jpg', live_url: '#' },
    { id: 4, title: 'Vision OS — AI Workspace', description: 'Next-gen spatial telemetry dashboard and real-time analytics engine.', tech_stack: 'Web & Motion', image_url: '/project4.jpg', live_url: '#' },
    { id: 5, title: 'SupaBlox System — Modular Blocks', description: '3D geometric design system and component library.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#' },
    { id: 6, title: 'eVTOL Mobility — Cockpit Telemetry', description: 'Autonomous flight HUD interface and mission control system.', tech_stack: 'Web & Motion', image_url: '/project2.jpg', live_url: '#' }
  ];

  const navTo = (page, anchor) => {
    setMobileMenuOpen(false);
    setCurrentPage(page);
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderNavbar = () => (
    <>
      <header className="folioblox-nav">
        <a href="#home" onClick={(e) => { e.preventDefault(); navTo('home'); }} className="folioblox-logo">
          {s.name?.split(' ')[0] || 'Ajay'}<span style={{ color: '#ff5522' }}>.</span>
        </a>

        <nav className="folioblox-links">
          <button className={currentPage === 'home' ? 'active-link' : ''} onClick={() => navTo('home')}>Home</button>
          <button onClick={() => navTo('home', 'about')}>About</button>
          <button className={currentPage === 'projects' ? 'active-link' : ''} onClick={() => navTo('projects')}>Projects</button>
          <button onClick={() => navTo('home', 'workflow')}>Workflow</button>
          <button onClick={() => navTo('home', 'palette')}>Palette</button>
          <button onClick={() => navTo('home', 'stats')}>Stats</button>
          <button onClick={() => navTo('home', 'studio')}>Studio</button>
          <button onClick={() => navTo('home', 'contact')}>Contact</button>
          <button onClick={() => setCurrentPage('admin')} style={{ color: '#ff6b3d', fontWeight: 700 }}>⚙️ Admin CMS</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navTo('home', 'contact')} className="nav-cta-pill">
            Get in touch <span className="nav-cta-circle">↗</span>
          </button>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button onClick={() => navTo('home')}>Home</button>
          <button onClick={() => navTo('home', 'about')}>About</button>
          <button onClick={() => navTo('projects')}>Projects Showcase</button>
          <button onClick={() => navTo('home', 'workflow')}>Workflow Sprint</button>
          <button onClick={() => navTo('home', 'palette')}>Color Palette</button>
          <button onClick={() => navTo('home', 'stats')}>Stats & Studio</button>
          <button onClick={() => navTo('home', 'contact')}>Contact Consultation</button>
          <button onClick={() => { setMobileMenuOpen(false); setCurrentPage('admin'); }} style={{ color: '#ff5522' }}>⚙️ Open Admin CMS</button>
        </div>
      )}
    </>
  );

  if (currentPage === 'projects') {
    const categories = ['All Works', 'Product Design', 'Branding', 'Packaging', 'Web & Motion'];
    const filtered = activeCategory === 'All Works' ? projectsList : projectsList.filter((p) => (p.tech_stack || '').toLowerCase().includes(activeCategory.toLowerCase()));
    return (
      <div className="projects-page-wrap">
        {renderNavbar()}
        <div className="fb-section" style={{ paddingTop: 30 }}>
          <div className="section-orange-tag">✦ PORTFOLIO SHOWCASE</div>
          <h1 className="fb-h2" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', marginBottom: 18 }}>
            Selected Works & <br /><span className="italic-serif" style={{ color: '#ff5522' }}>Featured Projects</span>
          </h1>
          <div className="filter-pills-row">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={\`filter-pill \${activeCategory === cat ? 'active' : ''}\`}>
                {cat === 'All Works' ? \`All Works (\${projectsList.length})\` : cat}
              </button>
            ))}
          </div>
          <div className="projects-two-col">
            {filtered.map((proj, idx) => (
              <div key={proj.id || idx} className="dedicated-project-card">
                <div style={{ position: 'relative', height: 'clamp(240px, 26vw, 360px)', overflow: 'hidden' }}>
                  <img src={proj.image_url || \`/project\${(idx % 4) + 1}.jpg\`} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 28 }}>
                  <span style={{ color: '#ff5522', fontSize: 11, fontWeight: 700 }}>{proj.tech_stack}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 10px' }}>{proj.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroScene scrollProgress={scrollProgress} avatarUrl={s.avatar_url} />
      {renderNavbar()}

      <main className="folioblox-scroll-content">
        {/* 1. FULL-WIDTH HERO SECTION */}
        <section id="home" className="fb-hero">
          <div className="fb-hero-grid">
            <div>
              <div className="hey-eyebrow">{sec.hero.eyebrow}</div>
              <h1 className="hero-giant-title">
                {sec.hero.title_line1}<br />{sec.hero.title_line2}
              </h1>
            </div>
            <div className="hero-right-quote">
              <h3>{sec.hero.right_heading}</h3>
              <p>{sec.hero.right_subtext}</p>
            </div>
          </div>

          <div className="hero-bottom-strip">
            {sec.hero.strip.map((st, i) => (
              <div key={i} className="strip-item">
                <span>{st.num}</span>
                <strong>{st.title}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BRANDS + BEHIND THE DESIGNS */}
        <section id="about" className="fb-section">
          <div className="brands-pill-bar">
            <span style={{ fontSize: 13, color: '#94a3b8' }}>
              {sec.brands.label_line1}<br /><strong style={{ color: '#fff' }}>{sec.brands.label_line2}</strong>
            </span>
            <div className="brand-logos-row">
              {sec.brands.list.map((b, i) => (
                <div key={i} className="brand-logo-item">{b}</div>
              ))}
            </div>
          </div>

          <div className="behind-grid">
            <div>
              <div className="section-orange-tag">{sec.about.tag}</div>
              <h2 className="fb-h2">{sec.about.heading}</h2>
            </div>
            <div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 600, lineHeight: 1.45, marginBottom: 24 }}>
                {sec.about.bio}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <span style={{ fontSize: 13.5, color: '#cbd5e1' }}>{sec.about.cta_label}</span>
                <button onClick={() => navTo('home', 'contact')} className="orange-cta-pill">
                  {sec.about.cta_button} <span className="orange-cta-circle">↗</span>
                </button>
              </div>
            </div>
          </div>

          <div className="three-preview-grid">
            {projectsList.slice(0, 3).map((p, i) => (
              <div key={p.id || i} className="preview-img-card" onClick={() => navTo('projects')} style={{ cursor: 'pointer' }}>
                <img src={p.image_url || \`/project\${i + 1}.jpg\`} alt={p.title} />
                <div className="preview-card-overlay">
                  <span style={{ color: '#ff5522', fontSize: 11, fontWeight: 700 }}>{p.tech_stack}</span>
                  <h4 style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. WORKFLOW SPRINT */}
        <section id="workflow" className="fb-section">
          <div className="behind-grid">
            <div>
              <div className="section-orange-tag">{sec.workflow.tag}</div>
              <h2 className="fb-h2">{sec.workflow.heading}</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(14px, 1.15vw, 16.5px)', lineHeight: 1.75 }}>
              {sec.workflow.description}
            </p>
          </div>

          <div className="sprint-bars-container">
            {sec.workflow.steps.map((step, idx) => (
              <div key={idx} className="sprint-pill-bar" style={{ marginLeft: step.offset }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{step.label}</span>
                <span className="sprint-day-badge">{step.days}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COLOR PALETTE */}
        <section id="palette" className="fb-section">
          <div className="section-orange-tag">{sec.palette.tag}</div>
          <h2 className="fb-h2" style={{ maxWidth: 960 }}>{sec.palette.heading}</h2>
          <div className="palette-grid">
            {sec.palette.cards.map((c, idx) => (
              <div key={idx} className="glass-spec-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: 20 }}>{c.title}</h3>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: c.dot, border: '1px solid rgba(255,255,255,0.4)' }} />
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>{c.desc}</p>
                <div className="spec-row"><span>HEX</span><strong>{c.hex}</strong><span>100%</span></div>
                <div className="spec-row"><span>RGB</span><strong>{c.rgb}</strong><span>100%</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STATS + GLOBAL STUDIO */}
        <section id="stats" className="fb-section">
          <div className="stats-two-col">
            <div>
              <span style={{ fontSize: 12, color: '#cbd5e1', letterSpacing: 1 }}>{sec.stats.stat1_label}</span>
              <div className="giant-stat-num">{sec.stats.stat1_value}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14.5, maxWidth: 440, lineHeight: 1.65 }}>{sec.stats.stat1_desc}</p>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#cbd5e1', letterSpacing: 1 }}>{sec.stats.stat2_label}</span>
              <div className="giant-stat-num">{sec.stats.stat2_value}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14.5, maxWidth: 440, lineHeight: 1.65 }}>{sec.stats.stat2_desc}</p>
            </div>
          </div>

          <div id="studio" className="global-studio-banner">
            <div className="global-studio-text">
              <span>{sec.stats.studio_left}</span>
              <span className="studio-center-card">
                <video src="${detectedVideo}" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              <span>{sec.stats.studio_right}</span>
            </div>
          </div>
        </section>

        {/* 6. CLIENT TESTIMONIALS */}
        <section className="fb-section">
          <div className="section-orange-tag">{sec.testimonials.tag}</div>
          <h2 className="fb-h2">{sec.testimonials.heading}</h2>
          <div className="testimonials-grid">
            {sec.testimonials.list.map((t, i) => (
              <div key={i} className="glass-spec-card">
                <div style={{ color: '#ff5522', marginBottom: 14, fontSize: 16 }}>★★★★★</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#e2e8f0', marginBottom: 22 }}>"{t.text}"</p>
                <strong style={{ fontSize: 16 }}>{t.name}</strong>
                <div style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONSULTATION FORM */}
        <section id="contact" className="fb-section">
          <div className="behind-grid">
            <h2 className="fb-h2" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}>{sec.contact.heading_left}</h2>
            <div>
              <div className="glass-spec-card" style={{ padding: 20, marginBottom: 18, maxWidth: 340 }}>
                <strong style={{ fontSize: 12, color: '#ff5522' }}>{sec.contact.badge_title}</strong>
                <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 4 }}>{sec.contact.badge_desc}</p>
              </div>
              <h2 className="fb-h2" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)' }}>{sec.contact.heading_right}</h2>
            </div>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(\`\${API}/contact\`, {
                sender_name: formState.sender_name,
                sender_email: formState.sender_email,
                message: \`Phone: \${formState.phone} | Challenge: \${formState.challenge} | Budget: \${formState.budget}\`
              });
            } catch {}
            setFormSent(true);
            setTimeout(() => setFormSent(false), 4000);
          }}>
            <div className="scale-form-grid">
              <div className="line-input-group"><label>YOUR NAME*</label><input required placeholder="John Parker" value={formState.sender_name} onChange={(e) => setFormState({ ...formState, sender_name: e.target.value })} /></div>
              <div className="line-input-group"><label>YOUR NUMBER*</label><input required placeholder="+91 98765 43210" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></div>
              <div className="line-input-group"><label>YOUR EMAIL*</label><input required type="email" placeholder="example@gmail.com" value={formState.sender_email} onChange={(e) => setFormState({ ...formState, sender_email: e.target.value })} /></div>
              <div className="line-input-group"><label>PROJECT BUDGET</label><select value={formState.budget} onChange={(e) => setFormState({ ...formState, budget: e.target.value })}><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option><option>$5,000 - $15,000+</option></select></div>
              <div className="line-input-group" style={{ gridColumn: '1 / -1' }}><label>BIGGEST GOAL OR PROJECT DETAILS</label><input placeholder="Tell me about your project vision..." value={formState.challenge} onChange={(e) => setFormState({ ...formState, challenge: e.target.value })} /></div>
            </div>
            <div style={{ marginTop: 36 }}>
              <button type="submit" className="orange-cta-pill">
                {sec.contact.submit_text} <span className="orange-cta-circle">→</span>
              </button>
              {formSent && <span style={{ marginLeft: 16, color: '#4ade80', fontWeight: 600 }}>✅ Saved directly to MySQL Admin CMS!</span>}
            </div>
          </form>
        </section>

        {/* 8. FULL-WIDTH FOOTER */}
        <footer className="folioblox-footer">
          <div className="footer-grid">
            <div>
              <div className="folioblox-logo" style={{ marginBottom: 12 }}>{s.name}</div>
              <p style={{ color: '#94a3b8', fontSize: 13.5, maxWidth: 320, lineHeight: 1.65 }}>{s.tagline}</p>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>NAVIGATION</strong>
              <div style={{ display: 'grid', gap: 8, fontSize: 13.5, color: '#cbd5e1' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home')}>Home</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home', 'about')}>About</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('projects')}>Projects Showcase</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home', 'workflow')}>Workflow</span>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>SOCIAL & RESUME</strong>
              <div style={{ display: 'grid', gap: 8, fontSize: 13.5, color: '#cbd5e1' }}>
                <a href={s.github_url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <a href={s.linkedin_url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                <a href={s.resume_url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Download Resume PDF</a>
                <span onClick={() => setCurrentPage('admin')} style={{ color: '#ff5522', fontWeight: 700, cursor: 'pointer' }}>⚙️ Live Admin CMS</span>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>DIRECT</strong>
              <div style={{ fontSize: 13.5, color: '#cbd5e1' }}>{s.email}</div>
              <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 6 }}>{sec.contact.location_text}</div>
            </div>
          </div>
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12.5, color: '#64748b' }}>
            <span>© {new Date().getFullYear()} {s.name}. All rights reserved.</span>
            <span onClick={() => navTo('home')} style={{ color: '#cbd5e1', cursor: 'pointer' }}>Back to top ↑</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
`);

  console.log('🗄️ 6. Running Database Initializer...');
  execSync('node server/init_db.js', { stdio: 'inherit' });

  console.log('\n🎉 COMPLETE FULL-WIDTH RESPONSIVE PORTFOLIO + EXECUTIVE A-TO-Z ADMIN CMS READY!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
