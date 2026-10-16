import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function run(cmd) {
  console.log(`\n▶ Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  console.log('🚀 1. Installing Frontend & Backend Dependencies...');
  run('npm install three @react-three/fiber @react-three/drei framer-motion gsap lucide-react axios concurrently');

  fs.mkdirSync('server', { recursive: true });
  if (!fs.existsSync('server/package.json')) {
    run('npm --prefix server init -y');
  }
  run('npm --prefix server install express mysql2 cors dotenv jsonwebtoken bcryptjs');

  console.log('🔐 2. Writing Environment Configs...');
  fs.writeFileSync('server/.env', `PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=ajay_portfolio_cms
JWT_SECRET=super_premium_secret_key_2026
ADMIN_USER=admin
ADMIN_PASS=admin123
`);

  fs.writeFileSync('.env', `VITE_API_URL=http://localhost:5000/api\n`);

  console.log('🗄️ 3. Creating XAMPP MySQL Auto-Initializer (server/init_db.js)...');
  fs.writeFileSync('server/init_db.js', `
const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

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
    console.log('✅ Connected to XAMPP MySQL database:', db);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(100) DEFAULT 'Ajay Chithanoor',
        role VARCHAR(150) DEFAULT 'Full-Stack Creative Developer & 3D Web Architect',
        tagline TEXT,
        about_bio TEXT,
        avatar_url VARCHAR(255) DEFAULT '/ajay-neon.mp4',
        resume_url VARCHAR(255) DEFAULT '/Ajay Chithanoor.pdf',
        github_url VARCHAR(255) DEFAULT 'https://github.com',
        linkedin_url VARCHAR(255) DEFAULT 'https://linkedin.com',
        email VARCHAR(150) DEFAULT 'ajay@example.com',
        accent_color VARCHAR(20) DEFAULT '#6366f1'
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100) DEFAULT 'Frontend',
        proficiency INT DEFAULT 90
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        tech_stack VARCHAR(255),
        image_url VARCHAR(255) DEFAULT '/project1.jpg',
        live_url VARCHAR(255) DEFAULT '#',
        github_url VARCHAR(255) DEFAULT '#'
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        duration VARCHAR(100) NOT NULL,
        description TEXT
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        icon_name VARCHAR(50) DEFAULT 'Code'
      );
    \`);

    await conn.query(\`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_name VARCHAR(150) NOT NULL,
        sender_email VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    \`);

    const [s] = await conn.query('SELECT * FROM site_settings WHERE id = 1');
    if (s.length === 0) {
      await conn.query(\`
        INSERT INTO site_settings (id, name, role, tagline, about_bio, avatar_url, resume_url, email, accent_color)
        VALUES (1, 'Ajay Chithanoor', 'Interactive 3D Web & Full-Stack Engineer',
        'Crafting spatial 3D web experiences, scalable Node.js architectures, and handcrafted digital products.',
        'I blend high-performance 3D WebGL/Three.js interfaces with rock-solid Node.js & MySQL engineering. Every section of this portfolio is dynamically powered by a custom real-time Admin CMS.',
        '/ajay-neon.mp4', '/Ajay Chithanoor.pdf', 'ajay@example.com', '#6366f1')
      \`);
    }

    const [p] = await conn.query('SELECT COUNT(*) as c FROM projects');
    if (p[0].c === 0) {
      await conn.query(\`
        INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url) VALUES
        ('Spatial 3D Commerce Engine', 'Real-time 3D configurator with custom WebGL shaders and Node.js checkout.', 'React, Three.js, Vite, Node.js', '/project1.jpg', '#', '#'),
        ('Autonomous Cloud Telemetry', 'High-throughput telemetry visualizer with reactive 3D tilt physics cards.', 'TypeScript, React, MySQL, Express', '/project2.jpg', '#', '#'),
        ('Neural Design System', 'Interactive component architecture with custom spring physics and glassmorphism.', 'React, GSAP, Framer Motion', '/project3.jpg', '#', '#'),
        ('Quantum FinTech Portal', 'Next-gen banking interface with real-time analytics and 3D visualization.', 'Node.js, React, Three.js', '/project4.jpg', '#', '#')
      \`);
    }

    const [sk] = await conn.query('SELECT COUNT(*) as c FROM skills');
    if (sk[0].c === 0) {
      await conn.query(\`
        INSERT INTO skills (name, category, proficiency) VALUES
        ('React & Vite', 'Frontend', 96),
        ('Three.js & React Three Fiber', '3D & WebGL', 92),
        ('JavaScript & TypeScript', 'Core', 95),
        ('Node.js & Express', 'Backend', 91),
        ('MySQL & phpMyAdmin', 'Database', 89),
        ('Framer Motion & GSAP', 'Animation', 94)
      \`);
    }

    const [ex] = await conn.query('SELECT COUNT(*) as c FROM experiences');
    if (ex[0].c === 0) {
      await conn.query(\`
        INSERT INTO experiences (role, company, duration, description) VALUES
        ('Senior Full-Stack & 3D Developer', 'Creative Tech Studio', '2024 - Present', 'Architected interactive 3D web applications and custom headless CMS platforms using React, Three.js, Node.js, and MySQL.'),
        ('Full-Stack Web Engineer', 'Digital Innovations', '2022 - 2024', 'Built responsive enterprise dashboards, REST APIs, and relational database schemas.')
      \`);
    }

    const [sv] = await conn.query('SELECT COUNT(*) as c FROM services');
    if (sv[0].c === 0) {
      await conn.query(\`
        INSERT INTO services (title, description, icon_name) VALUES
        ('3D WebGL Experiences', 'Custom Three.js scenes, interactive shaders, and hardware-accelerated spatial UI.', 'Box'),
        ('Full-Stack CMS Architecture', 'End-to-end React, Node.js, and MySQL applications with real-time A-Z admin control.', 'Layers'),
        ('Interactive UI/UX Engineering', 'Micro-interactions, 60fps physics animations, and responsive glassmorphism.', 'Sparkles')
      \`);
    }

    console.log('🎉 Database tables & seed data ready in phpMyAdmin!');
    await conn.end();
  } catch (err) {
    console.error('❌ MySQL Connection Error! Please make sure XAMPP MySQL is started.', err.message);
    process.exit(1);
  }
}
initDB();
`);

  console.log('🌐 4. Creating Express + MySQL Backend Server (server/index.js)...');
  fs.writeFileSync('server/index.js', `
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

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
    const [skills] = await pool.query('SELECT * FROM skills ORDER BY proficiency DESC');
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    const [experiences] = await pool.query('SELECT * FROM experiences ORDER BY id DESC');
    const [services] = await pool.query('SELECT * FROM services ORDER BY id ASC');
    res.json({ settings, skills, projects, experiences, services });
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
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
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

  console.log('🎨 5. Writing Interactive 3D HeroScene & AdminCMS...');
  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, TorusKnot, Environment } from '@react-three/drei';

function InteractiveCore({ accentColor = '#6366f1' }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25 + state.pointer.y * 0.5;
    meshRef.current.rotation.y = t * 0.35 + state.pointer.x * 0.5;
  });

  return (
    <Float speed={2.4} rotationIntensity={1.5} floatIntensity={2.2}>
      <TorusKnot ref={meshRef} args={[1.1, 0.34, 256, 64]} scale={1.15}>
        <MeshDistortMaterial
          color={accentColor}
          envMapIntensity={1.6}
          clearcoat={1}
          metalness={0.85}
          roughness={0.15}
          distort={0.34}
          speed={2.5}
        />
      </TorusKnot>
    </Float>
  );
}

export default function HeroScene({ accentColor }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '440px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <pointLight position={[-5, -5, -3]} intensity={2.2} color={accentColor || '#6366f1'} />
        <Stars radius={60} depth={50} count={2500} factor={3} saturation={0} fade speed={1.5} />
        <InteractiveCore accentColor={accentColor} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
`);

  fs.writeFileSync('src/components/AdminCMS.jsx', `
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminCMS({ onUpdatePortfolio }) {
  const [token, setToken] = useState(localStorage.getItem('cms_token') || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [statusMsg, setStatusMsg] = useState('');

  const authHeaders = { headers: { Authorization: \`Bearer \${token}\` } };
  const notify = (m) => { setStatusMsg(m); setTimeout(() => setStatusMsg(''), 3000); };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(\`\${API}/admin/login\`, loginForm);
      localStorage.setItem('cms_token', res.data.token);
      setToken(res.data.token);
      notify('✅ Logged in!');
    } catch {
      alert('Invalid login! Default is admin / admin123');
    }
  };

  const fetchTab = async () => {
    if (!token) return;
    try {
      if (activeTab === 'settings') {
        const res = await axios.get(\`\${API}/portfolio\`);
        setSettings(res.data.settings);
      } else {
        const res = await axios.get(\`\${API}/admin/\${activeTab}\`, authHeaders);
        setItems(res.data);
        setNewItem({});
      }
    } catch (err) {
      if (err.response?.status === 403) { localStorage.removeItem('cms_token'); setToken(''); }
    }
  };

  useEffect(() => { fetchTab(); }, [token, activeTab]);

  const saveSettings = async (e) => {
    e.preventDefault();
    await axios.put(\`\${API}/admin/settings\`, settings, authHeaders);
    notify('✨ Global Settings Updated Live!');
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const createRow = async (e) => {
    e.preventDefault();
    await axios.post(\`\${API}/admin/\${activeTab}\`, newItem, authHeaders);
    notify('✨ Created new entry!');
    fetchTab();
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const updateRow = async (item) => {
    await axios.put(\`\${API}/admin/\${activeTab}/\${item.id}\`, item, authHeaders);
    notify(\`✅ Saved #\${item.id}\`);
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  const deleteRow = async (id) => {
    await axios.delete(\`\${API}/admin/\${activeTab}/\${id}\`, authHeaders);
    notify(\`🗑️ Deleted #\${id}\`);
    fetchTab();
    if (onUpdatePortfolio) onUpdatePortfolio();
  };

  if (!token) {
    return (
      <div style={styles.authWrap}>
        <form onSubmit={handleLogin} style={styles.card}>
          <h2>🔐 Portfolio Admin CMS</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Default: admin / admin123</p>
          <input style={styles.input} placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
          <input style={styles.input} type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
          <button type="submit" style={styles.btnPrimary}>Login to CMS</button>
          <a href="#" style={{ display: 'block', marginTop: 14, color: '#818cf8', textAlign: 'center' }}>← Back to Portfolio</a>
        </form>
      </div>
    );
  }

  const fields = {
    projects: ['title', 'description', 'tech_stack', 'image_url', 'live_url', 'github_url'],
    skills: ['name', 'category', 'proficiency'],
    experiences: ['role', 'company', 'duration', 'description'],
    services: ['title', 'description', 'icon_name'],
    messages: ['sender_name', 'sender_email', 'message']
  };

  return (
    <div style={styles.cmsContainer}>
      <header style={styles.header}>
        <div>
          <h1 style={{ fontSize: 22, margin: 0 }}>⚡ Live 3D Portfolio Admin CMS (XAMPP MySQL)</h1>
          {statusMsg && <span style={{ color: '#4ade80', fontWeight: 600 }}>{statusMsg}</span>}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#" style={styles.btnSecondary}>← Back to Live 3D Site</a>
          <button onClick={() => { localStorage.removeItem('cms_token'); setToken(''); }} style={{ ...styles.btnSecondary, color: '#f87171' }}>Logout</button>
        </div>
      </header>

      <div style={styles.tabs}>
        {['settings', 'projects', 'skills', 'experiences', 'services', 'messages'].map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ ...styles.tabBtn, background: activeTab === t ? '#6366f1' : 'rgba(255,255,255,0.06)' }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'settings' && settings && (
        <form onSubmit={saveSettings} style={styles.card}>
          <h3>Global Hero, 3D Accent Color & Profile Settings</h3>
          <div style={styles.grid}>
            {Object.keys(settings).filter(k => k !== 'id').map((k) => (
              <div key={k}>
                <label style={styles.label}>{k.toUpperCase()}</label>
                <input style={styles.input} value={settings[k] || ''} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <button type="submit" style={styles.btnPrimary}>Save Global Settings</button>
        </form>
      )}

      {activeTab !== 'settings' && (
        <div>
          {activeTab !== 'messages' && (
            <form onSubmit={createRow} style={{ ...styles.card, marginBottom: 24 }}>
              <h3>+ Add New {activeTab.slice(0, -1)}</h3>
              <div style={styles.grid}>
                {fields[activeTab].map((f) => (
                  <input key={f} required style={styles.input} placeholder={f.toUpperCase()} value={newItem[f] || ''} onChange={(e) => setNewItem({ ...newItem, [f]: e.target.value })} />
                ))}
              </div>
              <button type="submit" style={styles.btnPrimary}>Add Entry</button>
            </form>
          )}

          <div style={{ display: 'grid', gap: 16 }}>
            {items.map((item, idx) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.grid}>
                  {fields[activeTab].map((f) => (
                    <div key={f}>
                      <label style={styles.label}>{f}</label>
                      <input style={styles.input} value={item[f] || ''} onChange={(e) => {
                        const copy = [...items];
                        copy[idx][f] = e.target.value;
                        setItems(copy);
                      }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {activeTab !== 'messages' && <button onClick={() => updateRow(item)} style={styles.btnPrimary}>Save Changes</button>}
                  <button onClick={() => deleteRow(item.id)} style={{ ...styles.btnPrimary, background: '#dc2626' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  authWrap: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#070913', color: '#fff' },
  cmsContainer: { minHeight: '100vh', padding: '32px 6%', background: '#070913', color: '#f8fafc' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 },
  tabs: { display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' },
  tabBtn: { border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '10px 18px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 },
  card: { background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 14 },
  label: { display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 4 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: '#0f172a', color: '#fff', marginBottom: 10 },
  btnPrimary: { background: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 },
  btnSecondary: { padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', background: 'transparent', cursor: 'pointer' }
};
`);

  console.log('⚡ 6. Updating All Portfolio Sections to be 100% Dynamic from MySQL...');
  fs.writeFileSync('src/components/About.jsx', `
import React from 'react';
import TiltSurface from './TiltSurface';

export default function About({ data }) {
  const bio = data?.about_bio || 'I blend high-performance 3D WebGL interfaces with scalable full-stack engineering.';
  const avatar = data?.avatar_url || '/ajay-neon.mp4';
  return (
    <section id="about" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>About Me</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 36, alignItems: 'center' }}>
        <TiltSurface>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', maxWidth: 360 }}>
            <img src={avatar} alt="Profile" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </TiltSurface>
        <div>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#cbd5e1' }}>{bio}</p>
        </div>
      </div>
    </section>
  );
}
`);

  fs.writeFileSync('src/components/Skills.jsx', `
import React from 'react';
import TiltSurface from './TiltSurface';

export default function Skills({ items }) {
  const list = items?.length ? items : [
    { id: 1, name: 'React & Vite', category: 'Frontend', proficiency: 95 },
    { id: 2, name: 'Three.js / WebGL', category: '3D', proficiency: 92 },
    { id: 3, name: 'Node.js & MySQL', category: 'Backend', proficiency: 90 }
  ];
  return (
    <section id="skills" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Technical Arsenal</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
        {list.map((sk) => (
          <TiltSurface key={sk.id}>
            <div style={{ padding: 22, borderRadius: 16, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong>{sk.name}</strong>
                <span style={{ color: '#818cf8' }}>{sk.proficiency}%</span>
              </div>
              <small style={{ color: '#94a3b8', display: 'block', marginBottom: 10 }}>{sk.category}</small>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}>
                <div style={{ width: \`\${sk.proficiency}%\`, height: '100%', background: 'var(--accent, #6366f1)', borderRadius: 99 }} />
              </div>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
`);

  fs.writeFileSync('src/components/Projects.jsx', `
import React from 'react';
import TiltSurface from './TiltSurface';

export default function Projects({ items }) {
  const list = items?.length ? items : [
    { id: 1, title: 'Spatial 3D Commerce Engine', description: 'Real-time 3D configurator.', tech_stack: 'React, Three.js, Node.js', image_url: '/project1.jpg', live_url: '#', github_url: '#' }
  ];
  return (
    <section id="projects" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Featured 3D & Full-Stack Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 26 }}>
        {list.map((p) => (
          <TiltSurface key={p.id}>
            <div style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={p.image_url || '/project1.jpg'} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 22 }}>
                <h3 style={{ margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{p.description}</p>
                <p style={{ color: '#818cf8', fontSize: 12, marginTop: 10 }}>{p.tech_stack}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <a href={p.live_url} style={{ color: '#fff', fontSize: 13 }}>Live Demo ↗</a>
                  <a href={p.github_url} style={{ color: '#94a3b8', fontSize: 13 }}>GitHub ↗</a>
                </div>
              </div>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
`);

  fs.writeFileSync('src/components/Experience.jsx', `
import React from 'react';

export default function Experience({ items }) {
  const list = items?.length ? items : [
    { id: 1, role: 'Senior Full-Stack & 3D Developer', company: 'Creative Tech Studio', duration: '2024 - Present', description: 'Built interactive 3D web apps.' }
  ];
  return (
    <section id="experience" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Experience</h2>
      <div style={{ display: 'grid', gap: 20 }}>
        {list.map((ex) => (
          <div key={ex.id} style={{ padding: 24, borderRadius: 16, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0 }}>{ex.role} — <span style={{ color: '#818cf8' }}>{ex.company}</span></h3>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{ex.duration}</span>
            </div>
            <p style={{ color: '#cbd5e1', marginTop: 12, lineHeight: 1.6 }}>{ex.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`);

  fs.writeFileSync('src/components/Services.jsx', `
import React from 'react';
import TiltSurface from './TiltSurface';

export default function Services({ items }) {
  const list = items?.length ? items : [
    { id: 1, title: '3D WebGL Experiences', description: 'Interactive Three.js & shader craftsmanship.' }
  ];
  return (
    <section id="services" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
        {list.map((s) => (
          <TiltSurface key={s.id}>
            <div style={{ padding: 26, borderRadius: 16, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0 }}>{s.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{s.description}</p>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
`);

  fs.writeFileSync('src/components/Contact.jsx', `
import React, { useState } from 'react';
import axios from 'axios';

export default function Contact({ apiEndpoint }) {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(apiEndpoint || 'http://localhost:5000/api/contact', form);
    setSent(true);
    setForm({ sender_name: '', sender_email: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 24 }}>Get In Touch</h2>
      <form onSubmit={submit} style={{ maxWidth: 560, display: 'grid', gap: 14 }}>
        <input required placeholder="Your Name" value={form.sender_name} onChange={(e) => setForm({ ...form, sender_name: e.target.value })} style={{ padding: 14, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
        <input required type="email" placeholder="Your Email" value={form.sender_email} onChange={(e) => setForm({ ...form, sender_email: e.target.value })} style={{ padding: 14, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
        <textarea required rows={4} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ padding: 14, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
        <button type="submit" style={{ padding: '14px 24px', borderRadius: 10, background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          Send Message to CMS
        </button>
        {sent && <p style={{ color: '#4ade80' }}>✅ Message saved directly to MySQL Admin CMS!</p>}
      </form>
    </section>
  );
}
`);

  fs.writeFileSync('src/App.jsx', `
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminCMS from './components/AdminCMS';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [data, setData] = useState(null);
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      setData(res.data);
      if (res.data?.settings?.accent_color) {
        document.documentElement.style.setProperty('--accent', res.data.settings.accent_color);
      }
    } catch (err) {
      console.warn('Backend API offline, showing default state.');
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const onHash = () => setIsAdminRoute(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [fetchPortfolio]);

  if (isAdminRoute) {
    return <AdminCMS onUpdatePortfolio={fetchPortfolio} />;
  }

  const s = data?.settings || {
    name: 'Ajay Chithanoor',
    role: 'Interactive 3D & Full-Stack Developer',
    tagline: 'Handcrafted spatial web interfaces powered by React, Three.js, Node.js & MySQL.',
    avatar_url: '/ajay-neon.mp4',
    resume_url: '/Ajay Chithanoor.pdf',
    accent_color: '#6366f1'
  };

  return (
    <div className="app-shell">
      <Navbar settings={s} />
      <section id="home" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', minHeight: '92vh', padding: '0 7%', gap: '2rem' }}>
        <div>
          <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontSize: 13, marginBottom: 16 }}>
            ✦ Full-Stack 3D Architecture • Live CMS Ready
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08, margin: '0 0 16px' }}>{s.name}</h1>
          <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)', color: s.accent_color || '#818cf8', fontWeight: 600, marginBottom: 16 }}>{s.role}</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.08rem', maxWidth: 560, lineHeight: 1.65, marginBottom: 28 }}>{s.tagline}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#projects" style={{ padding: '13px 26px', borderRadius: 12, background: s.accent_color || '#6366f1', color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Explore 3D Work</a>
            <a href={s.resume_url} target="_blank" rel="noreferrer" style={{ padding: '13px 26px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none' }}>Download Resume</a>
            <a href="#admin" style={{ padding: '13px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', textDecoration: 'none', fontSize: 14 }}>⚙️ Open Admin CMS</a>
          </div>
        </div>
        <div style={{ height: '500px', width: '100%' }}>
          <HeroScene accentColor={s.accent_color} />
        </div>
      </section>
      <About data={data?.settings} />
      <Skills items={data?.skills} />
      <Projects items={data?.projects} />
      <Experience items={data?.experiences} />
      <Services items={data?.services} />
      <Contact apiEndpoint={\`\${API}/contact\`} />
      <Footer settings={s} />
    </div>
  );
}
`);

  console.log('📦 7. Adding "start:all" script to package.json...');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.scripts = {
    ...pkg.scripts,
    "server": "node server/index.js",
    "start:all": "concurrently \"node server/index.js\" \"npm run dev\""
  };
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

  console.log('🗄️ 8. Initializing MySQL Database in XAMPP...');
  run('node server/init_db.js');

  console.log('\n✅ ALL DONE! Everything is installed, wired, and seeded in MySQL!');
} catch (error) {
  console.error('\n❌ Setup stopped due to error:', error.message);
  process.exit(1);
}
