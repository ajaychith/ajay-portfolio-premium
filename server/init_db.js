
const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

const defaultSections = {
  "hero": {
    "eyebrow": "Hey, I'm Ajay — a",
    "title_line1": "Creative",
    "title_line2": "Director",
    "right_heading": "Great design should feel invisible.",
    "right_subtext": "From logo to language, I build brands, 3D WebGL experiences, and full-stack architectures that connect and convert.",
    "strip": [
      {
        "num": "#01",
        "title": "Brand Strategy"
      },
      {
        "num": "#02",
        "title": "3D Web & Identity Design"
      },
      {
        "num": "#03",
        "title": "Full-Stack Architecture"
      },
      {
        "num": "#04",
        "title": "Creative Direction"
      }
    ]
  },
  "brands": {
    "label_line1": "Trusted by Brands I've",
    "label_line2": "Helped Shape",
    "list": [
      "◎ Supa Blox",
      "✦ Hype Blox",
      "◐ Frame Blox",
      "✪ Ultra Blox"
    ]
  },
  "about": {
    "tag": "Behind the Designs",
    "heading": "Shaping Experiences That Make Life Simpler",
    "bio": "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
    "cta_label": "Let's Build Something Meaningful Together",
    "cta_button": "Get in touch"
  },
  "workflow": {
    "tag": "✦ WORKFLOW PLAN",
    "heading": "A focused two-week design sprint from idea to visual concept.",
    "description": "This concept was developed as a focused two-week design & engineering sprint — from product positioning and visual research to landing page structure, interactive 3D mockups, and full-stack MySQL deployment.",
    "steps": [
      {
        "label": "🔍 Research & references",
        "days": "1 day",
        "offset": "0%"
      },
      {
        "label": "🎯 Product positioning",
        "days": "1 day",
        "offset": "10%"
      },
      {
        "label": "📐 Landing page structure",
        "days": "2 days",
        "offset": "22%"
      },
      {
        "label": "✨ Visual direction",
        "days": "2 days",
        "offset": "38%"
      },
      {
        "label": "⚡ AI & 3D concept exploration",
        "days": "2 days",
        "offset": "52%"
      },
      {
        "label": "💻 Full-Stack UI & CMS build",
        "days": "2 days",
        "offset": "64%"
      }
    ]
  },
  "palette": {
    "tag": "✦ COLOR PALETTE",
    "heading": "The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.",
    "cards": [
      {
        "title": "Dark Accent",
        "desc": "Used for elevated glassmorphic cards, surface overlays, and subtle depth.",
        "hex": "#1E1E28",
        "rgb": "30 30 40",
        "dot": "#3b0722"
      },
      {
        "title": "Soft White",
        "desc": "Primary editorial typography color ensuring crisp contrast and legibility.",
        "hex": "#F5F5FA",
        "rgb": "245 245 250",
        "dot": "#f5f5fa"
      },
      {
        "title": "Crimson Neon",
        "desc": "Signature studio rim-light accent for calls-to-action and interactive highlights.",
        "hex": "#FF5522",
        "rgb": "255 85 34",
        "dot": "#ff5522"
      }
    ]
  },
  "stats": {
    "stat1_label": "IN UP TO 2030",
    "stat1_value": "65%",
    "stat1_desc": "Projected market growth for interactive 3D digital brand experiences in the next five years.",
    "stat2_label": "ACCORDING TO INDUSTRY DATA",
    "stat2_value": "$30B",
    "stat2_desc": "Estimated global valuation of next-gen AI & spatial web platforms by 2030.",
    "studio_left": "GLOBAL",
    "studio_right": "STUDIO"
  },
  "testimonials": {
    "tag": "✦ CLIENT FEEDBACK",
    "heading": "What Clients & Partners Say",
    "list": [
      {
        "name": "Alex Vance",
        "role": "Founder at SupaBlox",
        "text": "Working with Ajay transformed our entire digital presence. The scroll-driven 3D experience doubled our engagement."
      },
      {
        "name": "Elena Rostova",
        "role": "VP of Brand at Aura",
        "text": "Rarely do you find someone who masters both visual art direction and full-stack Node.js + MySQL engineering."
      },
      {
        "name": "Marcus Chen",
        "role": "CEO at Vision OS",
        "text": "Delivered a complete two-week sprint from concept to live production with zero compromises on speed or quality."
      }
    ]
  },
  "contact": {
    "heading_left": "READY TO GROW",
    "heading_right": "& SCALE YOUR COMPANY?",
    "badge_title": "LET'S TALK",
    "badge_desc": "Unlock your brand's full potential with a 1-on-1 consultation.",
    "submit_text": "Submit Consultation Request",
    "location_text": "Hyderabad, India • Global Studio"
  }
};

async function initDB() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || ''
    });

    const db = process.env.DB_NAME || 'ajay_portfolio_cms';
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${db}\`;`);
    await conn.query(`USE \`${db}\`;`);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(100) DEFAULT 'Ajay Chithanoor',
        role VARCHAR(150) DEFAULT 'Creative Director & 3D Full-Stack Architect',
        tagline TEXT,
        about_bio TEXT,
        avatar_url VARCHAR(255) DEFAULT '/ajay-neon.mp4',
        resume_url VARCHAR(255) DEFAULT '/Ajay Chithanoor.pdf',
        github_url VARCHAR(255) DEFAULT 'https://github.com',
        linkedin_url VARCHAR(255) DEFAULT 'https://linkedin.com',
        email VARCHAR(150) DEFAULT 'ajay@folioblox.design',
        accent_color VARCHAR(20) DEFAULT '#ff5522'
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS cms_sections (
        id INT PRIMARY KEY DEFAULT 1,
        content_json LONGTEXT NOT NULL
      );
    `);

    const [secRows] = await conn.query('SELECT * FROM cms_sections WHERE id = 1');
    if (secRows.length === 0) {
      await conn.query('INSERT INTO cms_sections (id, content_json) VALUES (1, ?)', [JSON.stringify(defaultSections)]);
    }

    await conn.query("UPDATE site_settings SET avatar_url = '/ajay-neon.mp4' WHERE id = 1");

    console.log('✅ MySQL Database & A-to-Z CMS Sections initialized!');
    await conn.end();
  } catch (err) {
    console.warn('⚠️ MySQL not reachable right now, frontend will use built-in live defaults:', err.message);
  }
}
initDB();
