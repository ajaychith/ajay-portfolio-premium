import fs from 'fs';
import path from 'path';

try {
  console.log('1. Checking video file in public/...');
  let detectedVideo = '/ajay-neon.mp4';
  if (fs.existsSync('public')) {
    for (const file of fs.readdirSync('public')) {
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

  fs.mkdirSync('server', { recursive: true });

  console.log('2. Creating Master Initial CMS Database State (src/cmsDefaults.js)...');
  const masterCMSData = {
    settings: {
      name: 'Ajay Chithanoor',
      brand_logo: 'Ajay',
      role: 'Creative Director & 3D Full-Stack Architect',
      tagline: 'From logo to language, I build brands, 3D WebGL experiences, and full-stack architectures that connect and convert.',
      about_bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
      resume_url: '/Ajay Chithanoor.pdf',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com',
      twitter_url: 'https://x.com',
      email: 'ajay@folioblox.design',
      phone: '+91 98765 43210',
      location: 'Hyderabad, India • Global Studio'
    },
    background: {
      type: 'video', // 'video' | 'image' | 'solid' | 'gradient'
      video_url: detectedVideo,
      video_mode: 'auto', // 'auto' | 'scroll'
      image_url: '/Ajay.jpg',
      solid_color: '#07040a',
      gradient_start: '#09040e',
      gradient_mid: '#2a071e',
      gradient_end: '#690826',
      overlay_opacity: 0.65,
      brightness: 1.0,
      contrast: 1.06
    },
    theme: {
      accent_primary: '#ff5522',
      accent_secondary: '#e11d48',
      text_primary: '#ffffff',
      text_muted: '#94a3b8',
      heading_font: 'Inter', // 'Inter' | 'Space Grotesk' | 'Syne' | 'Playfair Display'
      body_font: 'Inter',
      button_radius: '999px', // '999px' | '12px' | '4px'
      card_radius: '22px',
      card_blur: '16px',
      section_padding_vw: '4'
    },
    visibility: {
      hero: true,
      hero_strip: true,
      brands: true,
      about: true,
      projects_preview: true,
      workflow: true,
      palette: true,
      stats: true,
      studio_banner: true,
      skills: true,
      experiences: true,
      services: true,
      testimonials: true,
      contact: true
    },
    sections: {
      hero: {
        eyebrow: "Hey, I'm Ajay — a",
        title_line1: 'Creative',
        title_line2: 'Director',
        right_heading: 'Great design should feel invisible.',
        right_subtext: 'From logo to language, I build brands, 3D WebGL experiences, and full-stack architectures that connect and convert.',
        strip: [
          { id: 1, num: '#01', title: 'Brand Strategy', enabled: true },
          { id: 2, num: '#02', title: '3D Web & Identity Design', enabled: true },
          { id: 3, num: '#03', title: 'Full-Stack Architecture', enabled: true },
          { id: 4, num: '#04', title: 'Creative Direction', enabled: true }
        ]
      },
      brands: {
        label_line1: "Trusted by Brands I've",
        label_line2: 'Helped Shape',
        items: [
          { id: 1, name: 'Supa Blox', icon: 'Layers', enabled: true },
          { id: 2, name: 'Hype Blox', icon: 'Sparkles', enabled: true },
          { id: 3, name: 'Frame Blox', icon: 'Box', enabled: true },
          { id: 4, name: 'Ultra Blox', icon: 'Cpu', enabled: true }
        ]
      },
      about: {
        tag: 'Behind the Designs',
        heading: 'Shaping Experiences That Make Life Simpler',
        bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
        cta_label: "Let's Build Something Meaningful Together",
        cta_button: 'Get in touch'
      },
      workflow: {
        tag: 'WORKFLOW PLAN',
        heading: 'A focused two-week design sprint from idea to visual concept.',
        description: 'This concept was developed as a focused two-week design & engineering sprint — from product positioning and visual research to landing page structure, interactive 3D mockups, and full-stack MySQL deployment.',
        steps: [
          { id: 1, label: 'Research & references', days: '1 day', offset: '0', icon: 'Search', enabled: true },
          { id: 2, label: 'Product positioning', days: '1 day', offset: '10', icon: 'Target', enabled: true },
          { id: 3, label: 'Landing page structure', days: '2 days', offset: '22', icon: 'Layout', enabled: true },
          { id: 4, label: 'Visual direction', days: '2 days', offset: '38', icon: 'Sparkles', enabled: true },
          { id: 5, label: 'AI & 3D concept exploration', days: '2 days', offset: '52', icon: 'Cpu', enabled: true },
          { id: 6, label: 'Full-Stack UI & CMS build', days: '2 days', offset: '64', icon: 'Code2', enabled: true }
        ]
      },
      palette: {
        tag: 'COLOR PALETTE',
        heading: 'The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.',
        cards: [
          { id: 1, title: 'Dark Accent', desc: 'Used for elevated glassmorphic cards, surface overlays, and subtle depth.', hex: '#1E1E28', rgb: '30 30 40', dot: '#3b0722', enabled: true },
          { id: 2, title: 'Soft White', desc: 'Primary editorial typography color ensuring crisp contrast and legibility.', hex: '#F5F5FA', rgb: '245 245 250', dot: '#f5f5fa', enabled: true },
          { id: 3, title: 'Crimson Neon', desc: 'Signature studio rim-light accent for calls-to-action and interactive highlights.', hex: '#FF5522', rgb: '255 85 34', dot: '#ff5522', enabled: true }
        ]
      },
      stats: {
        stat1_label: 'IN UP TO 2030',
        stat1_value: '65%',
        stat1_desc: 'Projected market growth for interactive 3D digital brand experiences in the next five years.',
        stat2_label: 'ACCORDING TO INDUSTRY DATA',
        stat2_value: '$30B',
        stat2_desc: 'Estimated global valuation of next-gen AI & spatial web platforms by 2030.',
        studio_left: 'GLOBAL',
        studio_right: 'STUDIO'
      },
      testimonials: {
        tag: 'CLIENT FEEDBACK',
        heading: 'What Clients & Partners Say',
        items: [
          { id: 1, name: 'Alex Vance', role: 'Founder at SupaBlox', rating: 5, text: 'Working with Ajay transformed our entire digital presence. The scroll-driven 3D experience doubled our engagement.', enabled: true },
          { id: 2, name: 'Elena Rostova', role: 'VP of Brand at Aura', rating: 5, text: 'Rarely do you find someone who masters both visual art direction and full-stack Node.js + MySQL engineering.', enabled: true },
          { id: 3, name: 'Marcus Chen', role: 'CEO at Vision OS', rating: 5, text: 'Delivered a complete two-week sprint from concept to live production with zero compromises on speed or quality.', enabled: true }
        ]
      },
      contact: {
        heading_left: 'READY TO GROW',
        heading_right: '& SCALE YOUR COMPANY?',
        badge_title: "LET'S TALK",
        badge_desc: "Unlock your brand's full potential with a 1-on-1 consultation.",
        submit_text: 'Submit Consultation Request'
      }
    },
    projects: [
      { id: 1, title: 'Aura Audio — Wireless Headphones', description: 'Acoustic product design, 3D WebGL showcase, and high-conversion launch experience.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#', github_url: '#', enabled: true },
      { id: 2, title: 'Noir Outerwear — Puffer Series', description: 'Minimalist fashion e-commerce architecture with interactive 3D garment inspection.', tech_stack: 'Branding', image_url: '/project2.jpg', live_url: '#', github_url: '#', enabled: true },
      { id: 3, title: 'Botanica Skincare — Dark Dropper', description: 'Luxury packaging system and sensory web storytelling.', tech_stack: 'Packaging', image_url: '/project3.jpg', live_url: '#', github_url: '#', enabled: true },
      { id: 4, title: 'Vision OS — AI Workspace', description: 'Next-gen spatial telemetry dashboard and real-time analytics engine.', tech_stack: 'Web & Motion', image_url: '/project4.jpg', live_url: '#', github_url: '#', enabled: true },
      { id: 5, title: 'SupaBlox System — Modular Blocks', description: '3D geometric design system and component library.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#', github_url: '#', enabled: true },
      { id: 6, title: 'eVTOL Mobility — Cockpit Telemetry', description: 'Autonomous flight HUD interface and mission control system.', tech_stack: 'Web & Motion', image_url: '/project2.jpg', live_url: '#', github_url: '#', enabled: true }
    ],
    skills: [
      { id: 1, name: 'React & Vite', category: 'Frontend Architecture', proficiency: 96, icon: 'Atom', enabled: true },
      { id: 2, name: 'Three.js & WebGL', category: '3D Spatial UI', proficiency: 92, icon: 'Box', enabled: true },
      { id: 3, name: 'Node.js & Express', category: 'Backend Runtime', proficiency: 91, icon: 'Server', enabled: true },
      { id: 4, name: 'JavaScript & TypeScript', category: 'Core Languages', proficiency: 95, icon: 'Code2', enabled: true },
      { id: 5, name: 'MySQL & phpMyAdmin', category: 'Database Architecture', proficiency: 89, icon: 'Database', enabled: true },
      { id: 6, name: 'GSAP & Framer Motion', category: 'Interactive Motion', proficiency: 94, icon: 'Sparkles', enabled: true }
    ],
    experiences: [
      { id: 1, role: 'Senior Full-Stack & 3D Developer', company: 'Creative Tech Studio', duration: '2024 — PRESENT', description: 'Architected interactive 3D web applications and custom headless CMS platforms using React, Three.js, Node.js, and MySQL.', enabled: true },
      { id: 2, role: 'Full-Stack Web Engineer', company: 'Digital Innovations', duration: '2022 — 2024', description: 'Built responsive enterprise dashboards, REST APIs, and relational database schemas.', enabled: true }
    ],
    services: [
      { id: 1, title: '3D WebGL & Spatial Interfaces', description: 'Custom Three.js scenes, interactive shaders, and hardware-accelerated spatial UI.', icon: 'Box', enabled: true },
      { id: 2, title: 'Full-Stack CMS Architecture', description: 'End-to-end React, Node.js, and MySQL applications with real-time A-Z admin control.', icon: 'Layers', enabled: true },
      { id: 3, title: 'Interactive UI/UX Engineering', description: 'Micro-interactions, 60fps physics animations, and responsive glassmorphism.', icon: 'Sparkles', enabled: true }
    ],
    messages: []
  };

  fs.writeFileSync('src/cmsDefaults.js', `export const defaultCMSState = ${JSON.stringify(masterCMSData, null, 2)};\n`);
  if (!fs.existsSync('server/cms_database.json')) {
    fs.writeFileSync('server/cms_database.json', JSON.stringify(masterCMSData, null, 2));
  }

  console.log('3. Embedding Unified Full-Stack API + XAMPP MySQL Sync Directly into vite.config.js (No separate port 5000 needed!)...');
  fs.writeFileSync('vite.config.js', `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function unifiedCMSBackendPlugin() {
  const dbFilePath = path.resolve(process.cwd(), 'server/cms_database.json');

  const readState = () => {
    try {
      if (fs.existsSync(dbFilePath)) {
        return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
      }
    } catch (e) {}
    return {};
  };

  const writeState = async (newState) => {
    fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify(newState, null, 2), 'utf8');

    // Also sync to XAMPP MySQL if running
    try {
      const mysqlPath = path.resolve(process.cwd(), 'server/node_modules/mysql2/promise');
      if (fs.existsSync(mysqlPath)) {
        const mysql = await import('file://' + mysqlPath.replace(/\\\\/g, '/') + '.js');
        const conn = await mysql.default.createConnection({
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'ajay_portfolio_cms'
        });
        await conn.query(
          'CREATE TABLE IF NOT EXISTS cms_master_state (id INT PRIMARY KEY DEFAULT 1, state_json LONGTEXT)'
        );
        const str = JSON.stringify(newState);
        await conn.query(
          'INSERT INTO cms_master_state (id, state_json) VALUES (1, ?) ON DUPLICATE KEY UPDATE state_json = ?',
          [str, str]
        );
        await conn.end();
      }
    } catch (err) {
      // Silently continue with JSON file persistence if XAMPP MySQL is stopped
    }
  };

  return {
    name: 'unified-cms-backend',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        const parseBody = () =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });

        if (req.url === '/api/portfolio' && req.method === 'GET') {
          const state = readState();
          return res.end(JSON.stringify(state));
        }

        if (req.url === '/api/admin/login' && req.method === 'POST') {
          const body = await parseBody();
          const u = (body.username || '').trim().toLowerCase();
          const p = (body.password || '').trim();
          if (u === 'admin' && p === 'admin123') {
            return res.end(JSON.stringify({ token: 'live_cms_master_token_2026' }));
          }
          res.statusCode = 401;
          return res.end(JSON.stringify({ error: 'Invalid credentials' }));
        }

        if (req.url === '/api/admin/state' && req.method === 'PUT') {
          const body = await parseBody();
          await writeState(body);
          return res.end(JSON.stringify({ success: true, state: body }));
        }

        if (req.url === '/api/contact' && req.method === 'POST') {
          const body = await parseBody();
          const state = readState();
          const messages = Array.isArray(state.messages) ? state.messages : [];
          messages.unshift({
            id: Date.now(),
            sender_name: body.sender_name || 'Anonymous',
            sender_email: body.sender_email || '',
            phone: body.phone || '',
            budget: body.budget || '',
            message: body.message || '',
            created_at: new Date().toLocaleString()
          });
          state.messages = messages;
          await writeState(state);
          return res.end(JSON.stringify({ success: true }));
        }

        return next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), unifiedCMSBackendPlugin()],
  server: {
    host: true,
    port: 5173
  }
});
`);

  console.log('4. Creating Real Vector SVG Icon Renderer (src/components/SvgIcon.jsx)...');
  fs.writeFileSync('src/components/SvgIcon.jsx', `
import React from 'react';
import * as Icons from 'lucide-react';

export const ICON_OPTIONS = [
  'Search', 'Target', 'Layout', 'Sparkles', 'Cpu', 'Code2', 'Layers', 'Box',
  'Database', 'Server', 'Globe', 'Zap', 'Shield', 'Terminal', 'Smartphone',
  'PenTool', 'Figma', 'Github', 'Linkedin', 'Mail', 'ArrowUpRight', 'CheckCircle2',
  'Briefcase', 'Award', 'Sliders', 'Eye', 'EyeOff', 'Plus', 'Trash2', 'Save', 'Video', 'Image', 'Palette'
];

export default function SvgIcon({ name = 'Sparkles', size = 18, color = 'currentColor', strokeWidth = 2, className = '' }) {
  const IconComponent = Icons[name] || Icons.Sparkles;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} className={className} />;
}
`);

  console.log('5. Upgrading HeroScene.jsx (Supports Video, Image, Solid Color, or Multi-Stop Gradient + Scroll/Auto Mode with SVG Toggle)...');
  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from './SvgIcon';

export default function HeroScene({ scrollProgress = 0, backgroundConfig = {} }) {
  const videoRef = useRef(null);
  const {
    type = 'video',
    video_url = '${detectedVideo}',
    video_mode = 'auto',
    image_url = '/Ajay.jpg',
    solid_color = '#07040a',
    gradient_start = '#09040e',
    gradient_mid = '#2a071e',
    gradient_end = '#690826',
    overlay_opacity = 0.65,
    brightness = 1.0,
    contrast = 1.06
  } = backgroundConfig;

  const [playMode, setPlayMode] = useState(video_mode || 'auto');

  useEffect(() => {
    setPlayMode(video_mode || 'auto');
  }, [video_mode]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || type !== 'video') return;
    vid.muted = true;
    if (playMode === 'auto') {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [playMode, type, video_url]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || type !== 'video' || playMode !== 'scroll' || !vid.duration) return;
    const t = Math.max(0, Math.min(0.99, scrollProgress)) * vid.duration;
    if (Number.isFinite(t)) vid.currentTime = t;
  }, [scrollProgress, playMode, type]);

  const filterCss = \`brightness(\${brightness}) contrast(\${contrast}) saturate(1.12)\`;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background:
            type === 'solid'
              ? solid_color
              : \`linear-gradient(135deg, \${gradient_start} 0%, \${gradient_mid} 52%, \${gradient_end} 100%)\`
        }}
      >
        {type === 'video' && (
          <video
            ref={videoRef}
            src={video_url || '${detectedVideo}'}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              if (!e.target.src.endsWith('.mp4.mp4')) e.target.src = '/ajay-neon.mp4.mp4';
            }}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: \`scale(\${1 + scrollProgress * 0.07})\`,
              transition: 'transform 0.25s ease-out',
              filter: filterCss
            }}
          />
        )}

        {type === 'image' && (
          <img
            src={image_url || '/Ajay.jpg'}
            alt="Background"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center top',
              transform: \`scale(\${1 + scrollProgress * 0.08})\`,
              transition: 'transform 0.25s ease-out',
              filter: filterCss
            }}
          />
        )}

        {type === 'gradient' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: \`radial-gradient(circle at 75% 40%, \${gradient_end}88 0%, transparent 60%), radial-gradient(circle at 25% 65%, \${gradient_mid}99 0%, transparent 60%)\`
            }}
          />
        )}

        {/* Adjustable Studio Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: overlay_opacity,
            background:
              'linear-gradient(90deg, rgba(7,4,10,0.82) 0%, rgba(7,4,10,0.18) 35%, rgba(7,4,10,0.18) 65%, rgba(7,4,10,0.82) 100%), linear-gradient(180deg, rgba(7,4,10,0.55) 0%, rgba(7,4,10,0.1) 50%, rgba(7,4,10,0.92) 100%)'
          }}
        />
      </div>

      {type === 'video' && (
        <div style={{ position: 'fixed', bottom: 22, right: 24, zIndex: 95 }}>
          <button
            onClick={() => setPlayMode(playMode === 'auto' ? 'scroll' : 'auto')}
            className="video-mode-pill"
          >
            <SvgIcon name={playMode === 'auto' ? 'Video' : 'Sliders'} size={14} />
            <span>{playMode === 'auto' ? 'Video: Auto-Play' : 'Video: Scroll-Scrub'}</span>
          </button>
        </div>
      )}
    </>
  );
}
`);

  console.log('6. Building Complete Advanced Admin CMS with SVG Icons, Universal Theme Engine, Section Toggles, and Full Add/Remove CRUD (src/components/AdminCMS.jsx)...');
  fs.writeFileSync('src/components/AdminCMS.jsx', `
import React, { useState } from 'react';
import axios from 'axios';
import SvgIcon, { ICON_OPTIONS } from './SvgIcon';

export default function AdminCMS({ cmsState, onSaveState, onBackToSite }) {
  const [token, setToken] = useState(localStorage.getItem('cms_token') || '');
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin123' });
  const [activeTab, setActiveTab] = useState('overview');
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(cmsState)));
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const u = (loginForm.username || '').trim().toLowerCase();
    const p = (loginForm.password || '').trim();
    if (u === 'admin' && p === 'admin123') {
      const tk = 'live_cms_master_token_2026';
      localStorage.setItem('cms_token', tk);
      setToken(tk);
      notify('Logged into Executive Admin CMS');
      return;
    }
    alert('Invalid credentials! Use: admin / admin123');
  };

  const commitChanges = async (updatedDraft, customMsg = 'All changes saved & synced live!') => {
    setSaving(true);
    setDraft(updatedDraft);
    localStorage.setItem('ajay_cms_backup', JSON.stringify(updatedDraft));
    try {
      await axios.put('/api/admin/state', updatedDraft);
    } catch (e) {
      console.warn('Saved to local storage fallback');
    }
    onSaveState(updatedDraft);
    setSaving(false);
    notify(customMsg);
  };

  if (!token) {
    return (
      <div className="cms-login-screen">
        <form onSubmit={handleLogin} className="cms-login-card">
          <div className="section-orange-tag" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SvgIcon name="Shield" size={14} color="#ff5522" />
            <span>EXECUTIVE CONTROL CENTER</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Portfolio Admin CMS</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
            Universal Theme, Background & A-to-Z Content Engine
          </p>
          <div className="cms-field" style={{ marginBottom: 14 }}>
            <label>ADMIN USERNAME</label>
            <input required value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
          </div>
          <div className="cms-field" style={{ marginBottom: 20 }}>
            <label>PASSWORD</label>
            <input required type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
          </div>
          <button type="submit" className="orange-cta-pill" style={{ width: '100%', justifyContent: 'center' }}>
            <span>Unlock Live CMS Dashboard</span>
            <span className="orange-cta-circle"><SvgIcon name="ArrowUpRight" size={14} color="#ff4522" /></span>
          </button>
          <button type="button" onClick={onBackToSite} className="cms-back-btn">
            Return to Live Portfolio
          </button>
        </form>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview', label: 'Dashboard & Visibility', icon: 'Layout' },
    { id: 'theme', label: 'Universal Theme & Fonts', icon: 'Palette' },
    { id: 'background', label: 'Brand & Background Setup', icon: 'Video' },
    { id: 'hero_about', label: 'Hero, Brands & About', icon: 'Sparkles' },
    { id: 'workflow', label: 'Workflow Sprint Builder', icon: 'Sliders' },
    { id: 'palette_stats', label: 'Palette, Stats & Studio', icon: 'Layers' },
    { id: 'testimonials', label: \`Testimonials (\${draft.sections.testimonials.items.length})\`, icon: 'Award' },
    { id: 'projects', label: \`Projects (\${draft.projects.length})\`, icon: 'Box' },
    { id: 'skills', label: \`Tech Stack (\${draft.skills.length})\`, icon: 'Cpu' },
    { id: 'experiences', label: \`Experience (\${draft.experiences.length})\`, icon: 'Briefcase' },
    { id: 'services', label: \`Services (\${draft.services.length})\`, icon: 'Target' },
    { id: 'messages', label: \`Client Leads (\${draft.messages?.length || 0})\`, icon: 'Mail' }
  ];

  // Helper for array CRUD (projects, skills, experiences, services)
  const addListItem = (listKey, template) => {
    const updated = {
      ...draft,
      [listKey]: [{ id: Date.now(), enabled: true, ...template }, ...draft[listKey]]
    };
    commitChanges(updated, \`Added new item to \${listKey}\`);
  };

  const deleteListItem = (listKey, id) => {
    const updated = {
      ...draft,
      [listKey]: draft[listKey].filter((item) => item.id !== id)
    };
    commitChanges(updated, \`Removed item from \${listKey}\`);
  };

  return (
    <div className="cms-shell">
      {/* Left Sidebar with Real SVG Icons */}
      <aside className="cms-sidebar">
        <div>
          <div className="folioblox-logo" style={{ fontSize: 22, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SvgIcon name="Layers" size={20} color="#ff5522" />
            <span>{draft.settings.brand_logo || 'Ajay'}<span style={{ color: '#ff5522' }}>.CMS</span></span>
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 22 }}>
            Unified Full-Stack Engine • Live Sync
          </span>

          <div className="cms-nav-list">
            {navTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={\`cms-nav-btn \${activeTab === t.id ? 'active' : ''}\`}
              >
                <SvgIcon name={t.icon} size={16} color={activeTab === t.id ? '#ff5522' : '#94a3b8'} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
          <button onClick={() => commitChanges(draft)} className="orange-cta-pill" style={{ justifyContent: 'center' }}>
            <SvgIcon name="Save" size={15} />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
          <button onClick={onBackToSite} className="cms-secondary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span>View Live Portfolio</span>
            <SvgIcon name="ArrowUpRight" size={15} />
          </button>
          <button
            onClick={() => { localStorage.removeItem('cms_token'); setToken(''); }}
            className="cms-logout-btn"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="cms-main">
        <header className="cms-topbar">
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 800 }}>
              {navTabs.find((n) => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 13 }}>
              Real-time state synchronization — changes apply immediately across all devices.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {toast && (
              <div className="cms-toast">
                <SvgIcon name="CheckCircle2" size={15} color="#4ade80" />
                <span>{toast}</span>
              </div>
            )}
            <button onClick={() => commitChanges(draft)} className="orange-cta-pill">
              <SvgIcon name="Save" size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </header>

        {/* TAB 1: DASHBOARD & SECTION ENABLE/DISABLE MANAGER */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gap: 28 }}>
            <div className="cms-kpi-grid">
              <div className="cms-kpi-card" onClick={() => setActiveTab('projects')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>PROJECTS</span>
                  <SvgIcon name="Box" size={18} color="#ff5522" />
                </div>
                <strong>{draft.projects.length}</strong>
                <small>Manage Portfolio Works →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('workflow')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>WORKFLOW STEPS</span>
                  <SvgIcon name="Sliders" size={18} color="#ff5522" />
                </div>
                <strong>{draft.sections.workflow.steps.length}</strong>
                <small>Add / Edit Sprint Steps →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('testimonials')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>TESTIMONIALS</span>
                  <SvgIcon name="Award" size={18} color="#ff5522" />
                </div>
                <strong>{draft.sections.testimonials.items.length}</strong>
                <small>Manage Client Reviews →</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('messages')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CLIENT LEADS</span>
                  <SvgIcon name="Mail" size={18} color="#ff5522" />
                </div>
                <strong style={{ color: '#ff5522' }}>{draft.messages?.length || 0}</strong>
                <small>View Consultation Inbox →</small>
              </div>
            </div>

            {/* ENABLE / DISABLE SECTIONS MASTER SWITCHBOARD */}
            <div className="cms-card">
              <h3 style={{ marginBottom: 6 }}>Section Visibility Switchboard (Enable / Disable Any Section)</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                Toggle any section on or off immediately without deleting its content.
              </p>
              <div className="cms-form-grid">
                {Object.keys(draft.visibility).map((secKey) => {
                  const isOn = draft.visibility[secKey];
                  return (
                    <div
                      key={secKey}
                      onClick={() => {
                        const updated = {
                          ...draft,
                          visibility: { ...draft.visibility, [secKey]: !isOn }
                        };
                        commitChanges(updated, \`\${secKey.toUpperCase()} section \${!isOn ? 'enabled' : 'disabled'}\`);
                      }}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 14,
                        background: isOn ? 'rgba(255, 85, 34, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: \`1px solid \${isOn ? 'rgba(255, 85, 34, 0.5)' : 'rgba(255, 255, 255, 0.08)'}\`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: 13.5, display: 'block', textTransform: 'uppercase' }}>
                          {secKey.replace('_', ' ')}
                        </strong>
                        <span style={{ fontSize: 11.5, color: isOn ? '#4ade80' : '#64748b' }}>
                          {isOn ? 'Visible on Live Site' : 'Hidden'}
                        </span>
                      </div>
                      <SvgIcon name={isOn ? 'Eye' : 'EyeOff'} size={18} color={isOn ? '#ff5522' : '#64748b'} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UNIVERSAL THEME & TYPOGRAPHY ENGINE */}
        {activeTab === 'theme' && (
          <div className="cms-card">
            <h3 style={{ marginBottom: 6 }}>Universal Theme, Colors, Buttons & Fonts</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
              Customize global accent colors, font families, button shapes, card glass blur, and full-width spacing.
            </p>
            <div className="cms-form-grid">
              <div className="cms-field">
                <label>PRIMARY ACCENT COLOR</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="color"
                    style={{ width: 52, height: 42, padding: 4, cursor: 'pointer' }}
                    value={draft.theme.accent_primary}
                    onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_primary: e.target.value } })}
                  />
                  <input
                    value={draft.theme.accent_primary}
                    onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_primary: e.target.value } })}
                  />
                </div>
              </div>

              <div className="cms-field">
                <label>SECONDARY GLOW COLOR</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="color"
                    style={{ width: 52, height: 42, padding: 4, cursor: 'pointer' }}
                    value={draft.theme.accent_secondary}
                    onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_secondary: e.target.value } })}
                  />
                  <input
                    value={draft.theme.accent_secondary}
                    onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_secondary: e.target.value } })}
                  />
                </div>
              </div>

              <div className="cms-field">
                <label>HEADING FONT FAMILY</label>
                <select
                  value={draft.theme.heading_font}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, heading_font: e.target.value } })}
                >
                  <option value="Inter">Inter (Clean Sans)</option>
                  <option value="Space Grotesk">Space Grotesk (Tech Geometric)</option>
                  <option value="Syne">Syne (Editorial Display)</option>
                  <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
                </select>
              </div>

              <div className="cms-field">
                <label>BODY FONT FAMILY</label>
                <select
                  value={draft.theme.body_font}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, body_font: e.target.value } })}
                >
                  <option value="Inter">Inter</option>
                  <option value="Space Grotesk">Space Grotesk</option>
                </select>
              </div>

              <div className="cms-field">
                <label>BUTTON SHAPE (BORDER RADIUS)</label>
                <select
                  value={draft.theme.button_radius}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, button_radius: e.target.value } })}
                >
                  <option value="999px">Pill Buttons (999px)</option>
                  <option value="12px">Rounded Modern (12px)</option>
                  <option value="4px">Sharp Executive (4px)</option>
                </select>
              </div>

              <div className="cms-field">
                <label>CARD CORNER RADIUS</label>
                <select
                  value={draft.theme.card_radius}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, card_radius: e.target.value } })}
                >
                  <option value="24px">Soft 24px</option>
                  <option value="14px">Medium 14px</option>
                  <option value="6px">Crisp 6px</option>
                </select>
              </div>

              <div className="cms-field">
                <label>GLASSMORPHISM BLUR (PX)</label>
                <input
                  value={draft.theme.card_blur}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, card_blur: e.target.value } })}
                />
              </div>

              <div className="cms-field">
                <label>HORIZONTAL EDGE PADDING (VW)</label>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={draft.theme.section_padding_vw}
                  onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, section_padding_vw: e.target.value } })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BRAND IDENTITY & MULTI-MODE BACKGROUND SETUP */}
        {activeTab === 'background' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <h3 style={{ marginBottom: 6 }}>Background Mode & Visual Engine</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                Choose between Full-Screen Video (.mp4), Portrait Image, Solid Color, or Custom 3-Stop Neon Gradient.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
                {[
                  { id: 'video', label: 'Cinematic Video (.mp4)', icon: 'Video' },
                  { id: 'image', label: 'Portrait / Hero Image', icon: 'Image' },
                  { id: 'gradient', label: '3-Color Neon Gradient', icon: 'Palette' },
                  { id: 'solid', label: 'Solid Studio Color', icon: 'Box' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDraft({ ...draft, background: { ...draft.background, type: m.id } })}
                    style={{
                      padding: '16px',
                      borderRadius: 14,
                      border: \`1px solid \${draft.background.type === m.id ? '#ff5522' : 'rgba(255,255,255,0.12)'}\`,
                      background: draft.background.type === m.id ? 'rgba(255,85,34,0.18)' : 'rgba(255,255,255,0.03)',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <SvgIcon name={m.icon} size={18} color={draft.background.type === m.id ? '#ff5522' : '#94a3b8'} />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="cms-form-grid">
                {draft.background.type === 'video' && (
                  <>
                    <div className="cms-field">
                      <label>VIDEO URL (IN PUBLIC FOLDER)</label>
                      <input
                        value={draft.background.video_url}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, video_url: e.target.value } })}
                        placeholder="/ajay-neon.mp4"
                      />
                    </div>
                    <div className="cms-field">
                      <label>DEFAULT VIDEO PLAYBACK</label>
                      <select
                        value={draft.background.video_mode}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, video_mode: e.target.value } })}
                      >
                        <option value="auto">Auto-Play Smooth Loop</option>
                        <option value="scroll">Interactive Scroll-Scrubbing</option>
                      </select>
                    </div>
                  </>
                )}

                {draft.background.type === 'image' && (
                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                    <label>BACKGROUND IMAGE URL</label>
                    <input
                      value={draft.background.image_url}
                      onChange={(e) => setDraft({ ...draft, background: { ...draft.background, image_url: e.target.value } })}
                      placeholder="/Ajay.jpg"
                    />
                  </div>
                )}

                {draft.background.type === 'solid' && (
                  <div className="cms-field">
                    <label>SOLID BACKGROUND HEX</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input
                        type="color"
                        style={{ width: 52, height: 42, padding: 4 }}
                        value={draft.background.solid_color}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, solid_color: e.target.value } })}
                      />
                      <input
                        value={draft.background.solid_color}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, solid_color: e.target.value } })}
                      />
                    </div>
                  </div>
                )}

                {draft.background.type === 'gradient' && (
                  <>
                    <div className="cms-field">
                      <label>GRADIENT START COLOR</label>
                      <input
                        type="color"
                        style={{ height: 42 }}
                        value={draft.background.gradient_start}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, gradient_start: e.target.value } })}
                      />
                    </div>
                    <div className="cms-field">
                      <label>GRADIENT MID COLOR</label>
                      <input
                        type="color"
                        style={{ height: 42 }}
                        value={draft.background.gradient_mid}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, gradient_mid: e.target.value } })}
                      />
                    </div>
                    <div className="cms-field">
                      <label>GRADIENT END COLOR</label>
                      <input
                        type="color"
                        style={{ height: 42 }}
                        value={draft.background.gradient_end}
                        onChange={(e) => setDraft({ ...draft, background: { ...draft.background, gradient_end: e.target.value } })}
                      />
                    </div>
                  </>
                )}

                <div className="cms-field">
                  <label>DARK VIGNETTE OVERLAY OPACITY (0.1 - 1.0)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={draft.background.overlay_opacity}
                    onChange={(e) => setDraft({ ...draft, background: { ...draft.background, overlay_opacity: parseFloat(e.target.value) || 0.6 } })}
                  />
                </div>
              </div>
            </div>

            {/* GLOBAL PROFILE & SOCIAL SETTINGS */}
            <div className="cms-card">
              <h3 style={{ marginBottom: 16 }}>Global Profile, Resume & Social Links</h3>
              <div className="cms-form-grid">
                {Object.keys(draft.settings).map((k) => (
                  <div key={k} className="cms-field">
                    <label>{k.replace('_', ' ').toUpperCase()}</label>
                    <input
                      value={draft.settings[k] || ''}
                      onChange={(e) => setDraft({ ...draft, settings: { ...draft.settings, [k]: e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HERO, BRANDS & ABOUT */}
        {activeTab === 'hero_about' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Hero Section Headlines</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>EYEBROW GREETING</label>
                  <input value={draft.sections.hero.eyebrow} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, eyebrow: e.target.value } } })} />
                </div>
                <div className="cms-field">
                  <label>GIANT TITLE LINE 1</label>
                  <input value={draft.sections.hero.title_line1} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, title_line1: e.target.value } } })} />
                </div>
                <div className="cms-field">
                  <label>GIANT TITLE LINE 2</label>
                  <input value={draft.sections.hero.title_line2} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, title_line2: e.target.value } } })} />
                </div>
                <div className="cms-field">
                  <label>RIGHT QUOTE HEADING</label>
                  <input value={draft.sections.hero.right_heading} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, right_heading: e.target.value } } })} />
                </div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                  <label>RIGHT QUOTE SUBTEXT</label>
                  <input value={draft.sections.hero.right_subtext} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, right_subtext: e.target.value } } })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 12px' }}>
                <h4>Hero Bottom Strip Items (#01, #02...)</h4>
                <button
                  type="button"
                  onClick={() => {
                    const nextNum = \`#0\${draft.sections.hero.strip.length + 1}\`;
                    const strip = [...draft.sections.hero.strip, { id: Date.now(), num: nextNum, title: 'New Capability', enabled: true }];
                    setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip } } });
                  }}
                  className="cms-secondary-btn"
                >
                  + Add Strip Item
                </button>
              </div>
              <div className="cms-form-grid">
                {draft.sections.hero.strip.map((st, i) => (
                  <div key={st.id || i} className="cms-field" style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 12 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input
                        style={{ maxWidth: 70 }}
                        value={st.num}
                        onChange={(e) => {
                          const copy = [...draft.sections.hero.strip];
                          copy[i].num = e.target.value;
                          setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                        }}
                      />
                      <input
                        value={st.title}
                        onChange={(e) => {
                          const copy = [...draft.sections.hero.strip];
                          copy[i].title = e.target.value;
                          setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...draft.sections.hero.strip];
                          copy[i].enabled = !copy[i].enabled;
                          setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                        }}
                        className="cms-secondary-btn"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                      >
                        {st.enabled !== false ? 'Enabled' : 'Hidden'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = draft.sections.hero.strip.filter((_, idx) => idx !== i);
                          setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                        }}
                        className="cms-delete-btn"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRUSTED BRANDS */}
            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#ff5522' }}>Trusted Brands Bar (SVG Icons + Names)</h3>
                <button
                  type="button"
                  onClick={() => {
                    const items = [...draft.sections.brands.items, { id: Date.now(), name: 'New Brand', icon: 'Sparkles', enabled: true }];
                    setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items } } });
                  }}
                  className="cms-secondary-btn"
                >
                  + Add Brand
                </button>
              </div>
              <div className="cms-form-grid">
                {draft.sections.brands.items.map((b, i) => (
                  <div key={b.id || i} className="cms-field" style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
                    <label>BRAND {i + 1}</label>
                    <input
                      style={{ marginBottom: 8 }}
                      value={b.name}
                      onChange={(e) => {
                        const copy = [...draft.sections.brands.items];
                        copy[i].name = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                      }}
                    />
                    <select
                      style={{ marginBottom: 8 }}
                      value={b.icon || 'Sparkles'}
                      onChange={(e) => {
                        const copy = [...draft.sections.brands.items];
                        copy[i].icon = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                      }}
                    >
                      {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...draft.sections.brands.items];
                          copy[i].enabled = !copy[i].enabled;
                          setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                        }}
                        className="cms-secondary-btn"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                      >
                        {b.enabled !== false ? 'Visible' : 'Hidden'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = draft.sections.brands.items.filter((_, idx) => idx !== i);
                          setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                        }}
                        className="cms-delete-btn"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BEHIND THE DESIGNS */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Behind the Designs Section</h3>
              <div className="cms-form-grid">
                <div className="cms-field">
                  <label>ORANGE EYEBROW TAG</label>
                  <input value={draft.sections.about.tag} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, about: { ...draft.sections.about, tag: e.target.value } } })} />
                </div>
                <div className="cms-field">
                  <label>MAIN HEADING</label>
                  <input value={draft.sections.about.heading} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, about: { ...draft.sections.about, heading: e.target.value } } })} />
                </div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                  <label>BIO STATEMENT</label>
                  <input value={draft.sections.about.bio} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, about: { ...draft.sections.about, bio: e.target.value } } })} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WORKFLOW SPRINT BUILDER (ADD, REMOVE, ENABLE/DISABLE, SVG ICON, OFFSET) */}
        {activeTab === 'workflow' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div>
                <h3 style={{ color: '#ff5522' }}>Workflow Sprint Builder (Add, Remove, Reorder & SVG Icons)</h3>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Add or remove sprint steps, choose real SVG icons, and adjust horizontal stagger offset.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const steps = [
                    ...draft.sections.workflow.steps,
                    { id: Date.now(), label: 'New Sprint Milestone', days: '2 days', offset: '30', icon: 'Zap', enabled: true }
                  ];
                  setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps } } });
                }}
                className="orange-cta-pill"
              >
                <SvgIcon name="Plus" size={15} />
                <span>Add Workflow Step</span>
              </button>
            </div>

            <div className="cms-form-grid" style={{ marginBottom: 24 }}>
              <div className="cms-field">
                <label>SECTION TAG</label>
                <input value={draft.sections.workflow.tag} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, tag: e.target.value } } })} />
              </div>
              <div className="cms-field">
                <label>HEADING</label>
                <input value={draft.sections.workflow.heading} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, heading: e.target.value } } })} />
              </div>
              <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                <label>DESCRIPTION</label>
                <input value={draft.sections.workflow.description} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, description: e.target.value } } })} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              {draft.sections.workflow.steps.map((st, i) => (
                <div key={st.id || i} style={{ padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, alignItems: 'end' }}>
                  <div className="cms-field">
                    <label>STEP {i + 1} TITLE</label>
                    <input
                      value={st.label}
                      onChange={(e) => {
                        const copy = [...draft.sections.workflow.steps];
                        copy[i].label = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                    />
                  </div>
                  <div className="cms-field">
                    <label>DURATION BADGE</label>
                    <input
                      value={st.days}
                      onChange={(e) => {
                        const copy = [...draft.sections.workflow.steps];
                        copy[i].days = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                    />
                  </div>
                  <div className="cms-field">
                    <label>SVG ICON</label>
                    <select
                      value={st.icon || 'Sparkles'}
                      onChange={(e) => {
                        const copy = [...draft.sections.workflow.steps];
                        copy[i].icon = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                    >
                      {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                  <div className="cms-field">
                    <label>INDENT OFFSET (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="70"
                      value={String(st.offset).replace('%', '')}
                      onChange={(e) => {
                        const copy = [...draft.sections.workflow.steps];
                        copy[i].offset = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = [...draft.sections.workflow.steps];
                        copy[i].enabled = !copy[i].enabled;
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                      className="cms-secondary-btn"
                    >
                      {st.enabled !== false ? 'Enabled' : 'Disabled'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = draft.sections.workflow.steps.filter((_, idx) => idx !== i);
                        setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: copy } } });
                      }}
                      className="cms-delete-btn"
                    >
                      <SvgIcon name="Trash2" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PALETTE, STATS & GLOBAL STUDIO */}
        {activeTab === 'palette_stats' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#ff5522' }}>Color Palette Swatch Cards</h3>
                <button
                  type="button"
                  onClick={() => {
                    const cards = [...draft.sections.palette.cards, { id: Date.now(), title: 'New Swatch', desc: 'Custom brand surface tone.', hex: '#8B5CF6', rgb: '139 92 246', dot: '#8b5cf6', enabled: true }];
                    setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards } } });
                  }}
                  className="cms-secondary-btn"
                >
                  + Add Color Card
                </button>
              </div>
              <div className="cms-form-grid">
                {draft.sections.palette.cards.map((c, i) => (
                  <div key={c.id || i} className="cms-field" style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 14 }}>
                    <label>SWATCH TITLE</label>
                    <input style={{ marginBottom: 8 }} value={c.title} onChange={(e) => {
                      const copy = [...draft.sections.palette.cards];
                      copy[i].title = e.target.value;
                      setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards: copy } } });
                    }} />
                    <label>DESCRIPTION</label>
                    <input style={{ marginBottom: 8 }} value={c.desc} onChange={(e) => {
                      const copy = [...draft.sections.palette.cards];
                      copy[i].desc = e.target.value;
                      setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards: copy } } });
                    }} />
                    <label>HEX & COLOR PICKER</label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <input type="color" style={{ width: 48, height: 38, padding: 2 }} value={c.dot} onChange={(e) => {
                        const copy = [...draft.sections.palette.cards];
                        copy[i].dot = e.target.value;
                        copy[i].hex = e.target.value.toUpperCase();
                        setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards: copy } } });
                      }} />
                      <input value={c.hex} onChange={(e) => {
                        const copy = [...draft.sections.palette.cards];
                        copy[i].hex = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards: copy } } });
                      }} />
                    </div>
                    <button type="button" onClick={() => {
                      const copy = draft.sections.palette.cards.filter((_, idx) => idx !== i);
                      setDraft({ ...draft, sections: { ...draft.sections, palette: { ...draft.sections.palette, cards: copy } } });
                    }} className="cms-delete-btn" style={{ width: '100%' }}>Remove Swatch</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Industry Stats & Global Studio Banner</h3>
              <div className="cms-form-grid">
                <div className="cms-field"><label>STAT 1 VALUE</label><input value={draft.sections.stats.stat1_value} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat1_value: e.target.value } } })} /></div>
                <div className="cms-field"><label>STAT 1 DESCRIPTION</label><input value={draft.sections.stats.stat1_desc} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat1_desc: e.target.value } } })} /></div>
                <div className="cms-field"><label>STAT 2 VALUE</label><input value={draft.sections.stats.stat2_value} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat2_value: e.target.value } } })} /></div>
                <div className="cms-field"><label>STAT 2 DESCRIPTION</label><input value={draft.sections.stats.stat2_desc} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat2_desc: e.target.value } } })} /></div>
                <div className="cms-field"><label>BANNER LEFT TEXT</label><input value={draft.sections.stats.studio_left} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, studio_left: e.target.value } } })} /></div>
                <div className="cms-field"><label>BANNER RIGHT TEXT</label><input value={draft.sections.stats.studio_right} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, studio_right: e.target.value } } })} /></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CLIENT TESTIMONIALS (ADD, REMOVE, ENABLE/DISABLE, STAR RATING) */}
        {activeTab === 'testimonials' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: '#ff5522' }}>Client Testimonials Manager</h3>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Add, edit, enable/disable, or delete client reviews.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const items = [
                    { id: Date.now(), name: 'New Client', role: 'CEO at Partner Co', rating: 5, text: 'Exceptional 3D & full-stack craftsmanship.', enabled: true },
                    ...draft.sections.testimonials.items
                  ];
                  setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items } } });
                }}
                className="orange-cta-pill"
              >
                <SvgIcon name="Plus" size={15} />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {draft.sections.testimonials.items.map((t, i) => (
                <div key={t.id || i} style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="cms-form-grid">
                    <div className="cms-field">
                      <label>CLIENT NAME</label>
                      <input value={t.name} onChange={(e) => {
                        const copy = [...draft.sections.testimonials.items];
                        copy[i].name = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                      }} />
                    </div>
                    <div className="cms-field">
                      <label>ROLE / COMPANY</label>
                      <input value={t.role} onChange={(e) => {
                        const copy = [...draft.sections.testimonials.items];
                        copy[i].role = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                      }} />
                    </div>
                    <div className="cms-field">
                      <label>STAR RATING (1 - 5)</label>
                      <input type="number" min="1" max="5" value={t.rating || 5} onChange={(e) => {
                        const copy = [...draft.sections.testimonials.items];
                        copy[i].rating = parseInt(e.target.value, 10) || 5;
                        setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                      }} />
                    </div>
                    <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                      <label>REVIEW QUOTE</label>
                      <input value={t.text} onChange={(e) => {
                        const copy = [...draft.sections.testimonials.items];
                        copy[i].text = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                      }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                    <button type="button" onClick={() => {
                      const copy = [...draft.sections.testimonials.items];
                      copy[i].enabled = !copy[i].enabled;
                      setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                    }} className="cms-secondary-btn">
                      {t.enabled !== false ? 'Visible on Site' : 'Hidden'}
                    </button>
                    <button type="button" onClick={() => {
                      const copy = draft.sections.testimonials.items.filter((_, idx) => idx !== i);
                      setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: copy } } });
                    }} className="cms-delete-btn">
                      Delete Testimonial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8, 9, 10, 11: PROJECTS, SKILLS, EXPERIENCES, SERVICES */}
        {['projects', 'skills', 'experiences', 'services'].includes(activeTab) && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ff5522', textTransform: 'uppercase' }}>Manage {activeTab}</h3>
              <button
                type="button"
                onClick={() => {
                  const templates = {
                    projects: { title: 'New Project', description: 'Project summary...', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#', github_url: '#' },
                    skills: { name: 'New Technology', category: 'Full-Stack', proficiency: 90, icon: 'Code2' },
                    experiences: { role: 'Lead Engineer', company: 'Tech Corp', duration: '2025 — PRESENT', description: 'Key achievements...' },
                    services: { title: 'New Service Offering', description: 'Service details...', icon: 'Sparkles' }
                  };
                  addListItem(activeTab, templates[activeTab]);
                }}
                className="orange-cta-pill"
              >
                <SvgIcon name="Plus" size={15} />
                <span>Add {activeTab.slice(0, -1)}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {draft[activeTab].map((item, idx) => (
                <div key={item.id || idx} style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="cms-form-grid">
                    {Object.keys(item).filter((k) => !['id', 'enabled'].includes(k)).map((field) => (
                      <div key={field} className="cms-field">
                        <label>{field.replace('_', ' ').toUpperCase()}</label>
                        {field === 'icon' ? (
                          <select
                            value={item[field] || 'Sparkles'}
                            onChange={(e) => {
                              const copy = [...draft[activeTab]];
                              copy[idx][field] = e.target.value;
                              setDraft({ ...draft, [activeTab]: copy });
                            }}
                          >
                            {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                          </select>
                        ) : (
                          <input
                            value={item[field] || ''}
                            onChange={(e) => {
                              const copy = [...draft[activeTab]];
                              copy[idx][field] = e.target.value;
                              setDraft({ ...draft, [activeTab]: copy });
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = [...draft[activeTab]];
                        copy[idx].enabled = !copy[idx].enabled;
                        commitChanges({ ...draft, [activeTab]: copy }, 'Updated visibility');
                      }}
                      className="cms-secondary-btn"
                    >
                      {item.enabled !== false ? 'Enabled' : 'Hidden'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteListItem(activeTab, item.id)}
                      className="cms-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 12: CLIENT CONSULTATION LEADS INBOX */}
        {activeTab === 'messages' && (
          <div className="cms-card">
            <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Client Consultation Requests ({draft.messages?.length || 0})</h3>
            {(!draft.messages || draft.messages.length === 0) ? (
              <p style={{ color: '#94a3b8' }}>No consultation requests submitted yet. Test the form on your live portfolio!</p>
            ) : (
              <div style={{ display: 'grid', gap: 14 }}>
                {draft.messages.map((m) => (
                  <div key={m.id} style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <strong style={{ fontSize: 16 }}>{m.sender_name}</strong>
                      <span style={{ color: '#ff5522', marginLeft: 12, fontSize: 13 }}>{m.sender_email}</span>
                      <p style={{ color: '#cbd5e1', fontSize: 13.5, marginTop: 6 }}>{m.message}</p>
                      <small style={{ color: '#64748b' }}>{m.created_at}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteListItem('messages', m.id)}
                      className="cms-delete-btn"
                    >
                      Delete Lead
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
`);

  console.log('7. Updating App.jsx to Render Real SVG Icons, Dynamic CSS Theme Variables, and Section Enable/Disable Toggles...');
  fs.writeFileSync('src/App.jsx', `
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import HeroScene from './components/HeroScene';
import AdminCMS from './components/AdminCMS';
import SvgIcon from './components/SvgIcon';
import { defaultCMSState } from './cmsDefaults';
import './App.css';

export default function App() {
  const [cmsState, setCmsState] = useState(() => {
    try {
      const saved = localStorage.getItem('ajay_cms_backup');
      return saved ? { ...defaultCMSState, ...JSON.parse(saved) } : defaultCMSState;
    } catch {
      return defaultCMSState;
    }
  });

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
      const res = await axios.get('/api/portfolio');
      if (res.data && res.data.settings) {
        setCmsState((prev) => ({ ...prev, ...res.data }));
      }
    } catch {}
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

  // Apply Universal Theme Variables to :root live
  useEffect(() => {
    const t = cmsState.theme || defaultCMSState.theme;
    const root = document.documentElement;
    root.style.setProperty('--orange', t.accent_primary || '#ff5522');
    root.style.setProperty('--crimson', t.accent_secondary || '#e11d48');
    root.style.setProperty('--heading-font', t.heading_font || 'Inter');
    root.style.setProperty('--body-font', t.body_font || 'Inter');
    root.style.setProperty('--btn-radius', t.button_radius || '999px');
    root.style.setProperty('--card-radius', t.card_radius || '22px');
    root.style.setProperty('--card-blur', t.card_blur || '16px');
    root.style.setProperty('--edge-pad', \`\${t.section_padding_vw || 4}vw\`);
  }, [cmsState.theme]);

  if (currentPage === 'admin') {
    return (
      <AdminCMS
        cmsState={cmsState}
        onSaveState={(updated) => setCmsState(updated)}
        onBackToSite={() => {
          window.location.hash = '';
          setCurrentPage('home');
        }}
      />
    );
  }

  const s = cmsState.settings || defaultCMSState.settings;
  const sec = cmsState.sections || defaultCMSState.sections;
  const vis = cmsState.visibility || defaultCMSState.visibility;
  const bg = cmsState.background || defaultCMSState.background;
  const projectsList = (cmsState.projects || []).filter((p) => p.enabled !== false);
  const skillsList = (cmsState.skills || []).filter((sk) => sk.enabled !== false);
  const expList = (cmsState.experiences || []).filter((ex) => ex.enabled !== false);
  const srvList = (cmsState.services || []).filter((sv) => sv.enabled !== false);

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
          {s.brand_logo || s.name?.split(' ')[0] || 'Ajay'}<span style={{ color: 'var(--orange)' }}>.</span>
        </a>

        <nav className="folioblox-links">
          <button className={currentPage === 'home' ? 'active-link' : ''} onClick={() => navTo('home')}>Home</button>
          {vis.about && <button onClick={() => navTo('home', 'about')}>About</button>}
          <button className={currentPage === 'projects' ? 'active-link' : ''} onClick={() => navTo('projects')}>Projects</button>
          {vis.workflow && <button onClick={() => navTo('home', 'workflow')}>Workflow</button>}
          {vis.palette && <button onClick={() => navTo('home', 'palette')}>Palette</button>}
          {vis.stats && <button onClick={() => navTo('home', 'stats')}>Stats</button>}
          {vis.contact && <button onClick={() => navTo('home', 'contact')}>Contact</button>}
          <button
            onClick={() => setCurrentPage('admin')}
            style={{ color: 'var(--orange)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <SvgIcon name="Sliders" size={14} color="var(--orange)" />
            <span>Admin CMS</span>
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navTo('home', 'contact')} className="nav-cta-pill">
            <span>Get in touch</span>
            <span className="nav-cta-circle">
              <SvgIcon name="ArrowUpRight" size={14} color="#fff" />
            </span>
          </button>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <SvgIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
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
          <button onClick={() => { setMobileMenuOpen(false); setCurrentPage('admin'); }} style={{ color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <SvgIcon name="Sliders" size={16} />
            <span>Open Admin CMS</span>
          </button>
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
          <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <SvgIcon name="Layers" size={14} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h1 className="fb-h2" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', marginBottom: 18 }}>
            Selected Works & <br /><span className="italic-serif" style={{ color: 'var(--orange)' }}>Featured Projects</span>
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
                  <span style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700 }}>{proj.tech_stack}</span>
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
      <HeroScene scrollProgress={scrollProgress} backgroundConfig={bg} />
      {renderNavbar()}

      <main className="folioblox-scroll-content">
        {/* 1. HERO SECTION */}
        {vis.hero && (
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

            {vis.hero_strip && (
              <div className="hero-bottom-strip">
                {sec.hero.strip.filter((st) => st.enabled !== false).map((st, i) => (
                  <div key={st.id || i} className="strip-item">
                    <span>{st.num}</span>
                    <strong>{st.title}</strong>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 2. BRANDS + BEHIND THE DESIGNS */}
        {(vis.brands || vis.about || vis.projects_preview) && (
          <section id="about" className="fb-section">
            {vis.brands && (
              <div className="brands-pill-bar">
                <span style={{ fontSize: 13, color: '#94a3b8' }}>
                  {sec.brands.label_line1}<br /><strong style={{ color: '#fff' }}>{sec.brands.label_line2}</strong>
                </span>
                <div className="brand-logos-row">
                  {sec.brands.items.filter((b) => b.enabled !== false).map((b, i) => (
                    <div key={b.id || i} className="brand-logo-item" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <SvgIcon name={b.icon || 'Sparkles'} size={16} color="var(--orange)" />
                      <span>{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vis.about && (
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
                      <span>{sec.about.cta_button}</span>
                      <span className="orange-cta-circle"><SvgIcon name="ArrowUpRight" size={14} color="var(--orange)" /></span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {vis.projects_preview && (
              <div className="three-preview-grid">
                {projectsList.slice(0, 3).map((p, i) => (
                  <div key={p.id || i} className="preview-img-card" onClick={() => navTo('projects')} style={{ cursor: 'pointer' }}>
                    <img src={p.image_url || \`/project\${i + 1}.jpg\`} alt={p.title} />
                    <div className="preview-card-overlay">
                      <span style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700 }}>{p.tech_stack}</span>
                      <h4 style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{p.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. WORKFLOW SPRINT (WITH REAL SVG ICONS) */}
        {vis.workflow && (
          <section id="workflow" className="fb-section">
            <div className="behind-grid">
              <div>
                <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <SvgIcon name="Sliders" size={14} />
                  <span>{sec.workflow.tag}</span>
                </div>
                <h2 className="fb-h2">{sec.workflow.heading}</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(14px, 1.15vw, 16.5px)', lineHeight: 1.75 }}>
                {sec.workflow.description}
              </p>
            </div>

            <div className="sprint-bars-container">
              {sec.workflow.steps.filter((st) => st.enabled !== false).map((step, idx) => (
                <div key={step.id || idx} className="sprint-pill-bar" style={{ marginLeft: \`\${String(step.offset).replace('%', '')}%\` }}>
                  <span style={{ fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <SvgIcon name={step.icon || 'Sparkles'} size={16} color="var(--orange)" />
                    <span>{step.label}</span>
                  </span>
                  <span className="sprint-day-badge">{step.days}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. COLOR PALETTE */}
        {vis.palette && (
          <section id="palette" className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Palette" size={14} />
              <span>{sec.palette.tag}</span>
            </div>
            <h2 className="fb-h2" style={{ maxWidth: 960 }}>{sec.palette.heading}</h2>
            <div className="palette-grid">
              {sec.palette.cards.filter((c) => c.enabled !== false).map((c, idx) => (
                <div key={c.id || idx} className="glass-spec-card">
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
        )}

        {/* 5. TECH STACK, EXPERIENCE & SERVICES (IF ENABLED IN CMS) */}
        {vis.skills && skillsList.length > 0 && (
          <section className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Cpu" size={14} />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="fb-h2">Core Engineering Stack</h2>
            <div className="palette-grid">
              {skillsList.map((sk) => (
                <div key={sk.id} className="glass-spec-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <SvgIcon name={sk.icon || 'Code2'} size={20} color="var(--orange)" />
                      <h3 style={{ fontSize: 18 }}>{sk.name}</h3>
                    </div>
                    <strong style={{ color: 'var(--orange)' }}>{sk.proficiency}%</strong>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 12.5, marginBottom: 12 }}>{sk.category}</p>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}>
                    <div style={{ width: \`\${sk.proficiency}%\`, height: '100%', background: 'var(--orange)', borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. STATS + GLOBAL STUDIO */}
        {(vis.stats || vis.studio_banner) && (
          <section id="stats" className="fb-section">
            {vis.stats && (
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
            )}

            {vis.studio_banner && (
              <div id="studio" className="global-studio-banner">
                <div className="global-studio-text">
                  <span>{sec.stats.studio_left}</span>
                  <span className="studio-center-card">
                    {bg.type === 'video' ? (
                      <video src={bg.video_url || '${detectedVideo}'} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={bg.image_url || '/Ajay.jpg'} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </span>
                  <span>{sec.stats.studio_right}</span>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 7. CLIENT TESTIMONIALS */}
        {vis.testimonials && (
          <section className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Award" size={14} />
              <span>{sec.testimonials.tag}</span>
            </div>
            <h2 className="fb-h2">{sec.testimonials.heading}</h2>
            <div className="testimonials-grid">
              {sec.testimonials.items.filter((t) => t.enabled !== false).map((t, i) => (
                <div key={t.id || i} className="glass-spec-card">
                  <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                    {Array.from({ length: t.rating || 5 }).map((_, sIdx) => (
                      <SvgIcon key={sIdx} name="Sparkles" size={15} color="var(--orange)" />
                    ))}
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#e2e8f0', marginBottom: 22 }}>"{t.text}"</p>
                  <strong style={{ fontSize: 16 }}>{t.name}</strong>
                  <div style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 2 }}>{t.role}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. CONSULTATION FORM */}
        {vis.contact && (
          <section id="contact" className="fb-section">
            <div className="behind-grid">
              <h2 className="fb-h2" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}>{sec.contact.heading_left}</h2>
              <div>
                <div className="glass-spec-card" style={{ padding: 20, marginBottom: 18, maxWidth: 340 }}>
                  <strong style={{ fontSize: 12, color: 'var(--orange)' }}>{sec.contact.badge_title}</strong>
                  <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 4 }}>{sec.contact.badge_desc}</p>
                </div>
                <h2 className="fb-h2" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)' }}>{sec.contact.heading_right}</h2>
              </div>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const msgText = \`Phone: \${formState.phone} | Challenge: \${formState.challenge} | Budget: \${formState.budget}\`;
              try {
                await axios.post('/api/contact', {
                  sender_name: formState.sender_name,
                  sender_email: formState.sender_email,
                  phone: formState.phone,
                  budget: formState.budget,
                  message: msgText
                });
                fetchPortfolio();
              } catch {}
              setFormSent(true);
              setFormState({ sender_name: '', phone: '', sender_email: '', years: '0 - 1 year', challenge: '', budget: '$2,500 - $5,000' });
              setTimeout(() => setFormSent(false), 4000);
            }}>
              <div className="scale-form-grid">
                <div className="line-input-group"><label>YOUR NAME*</label><input required placeholder="John Parker" value={formState.sender_name} onChange={(e) => setFormState({ ...formState, sender_name: e.target.value })} /></div>
                <div className="line-input-group"><label>YOUR NUMBER*</label><input required placeholder="+91 98765 43210" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></div>
                <div className="line-input-group"><label>YOUR EMAIL*</label><input required type="email" placeholder="example@gmail.com" value={formState.sender_email} onChange={(e) => setFormState({ ...formState, sender_email: e.target.value })} /></div>
                <div className="line-input-group"><label>PROJECT BUDGET</label><select value={formState.budget} onChange={(e) => setFormState({ ...formState, budget: e.target.value })}><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option><option>$5,000 - $15,000+</option></select></div>
                <div className="line-input-group" style={{ gridColumn: '1 / -1' }}><label>BIGGEST GOAL OR PROJECT DETAILS</label><input placeholder="Tell me about your project vision..." value={formState.challenge} onChange={(e) => setFormState({ ...formState, challenge: e.target.value })} /></div>
              </div>
              <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button type="submit" className="orange-cta-pill">
                  <span>{sec.contact.submit_text}</span>
                  <span className="orange-cta-circle"><SvgIcon name="ArrowUpRight" size={14} color="var(--orange)" /></span>
                </button>
                {formSent && (
                  <span style={{ color: '#4ade80', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <SvgIcon name="CheckCircle2" size={16} color="#4ade80" />
                    <span>Saved directly to Admin CMS Leads!</span>
                  </span>
                )}
              </div>
            </form>
          </section>
        )}

        {/* 9. FOOTER */}
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
                <span onClick={() => setCurrentPage('admin')} style={{ color: 'var(--orange)', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <SvgIcon name="Sliders" size={14} />
                  <span>Live Admin CMS</span>
                </span>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>DIRECT</strong>
              <div style={{ fontSize: 13.5, color: '#cbd5e1' }}>{s.email}</div>
              <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 6 }}>{s.location}</div>
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

  console.log('8. Updating CSS Variables & Select Input Styling in src/App.css...');
  let css = fs.readFileSync('src/App.css', 'utf8');
  css += \`
/* Dynamic Universal Theme Overrides */
body {
  font-family: var(--body-font, 'Inter'), sans-serif;
}
h1, h2, h3, .folioblox-logo, .giant-stat-num, .global-studio-text {
  font-family: var(--heading-font, 'Inter'), sans-serif;
}
.fb-section, .fb-hero, .folioblox-nav, .folioblox-footer {
  padding-left: var(--edge-pad, 4vw);
  padding-right: var(--edge-pad, 4vw);
}
.orange-cta-pill, .nav-cta-pill, .filter-pill {
  border-radius: var(--btn-radius, 999px);
}
.orange-cta-pill {
  background: linear-gradient(90deg, var(--orange, #ff6b2b), var(--crimson, #ff3b1f));
}
.glass-spec-card, .preview-img-card, .dedicated-project-card {
  border-radius: var(--card-radius, 22px);
  backdrop-filter: blur(var(--card-blur, 16px));
}
.cms-field select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #09060e;
  color: #fff;
  font-size: 13.5px;
  outline: none;
}
.cms-nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cms-toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.video-mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(12, 8, 18, 0.85);
  border: 1px solid var(--orange, #ff5522);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
}
\`;
  fs.writeFileSync('src/App.css', css);

  console.log('\\n✅ UNIFIED FULL-STACK CMS + SVG ICONS + UNIVERSAL THEME ENGINE READY!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
