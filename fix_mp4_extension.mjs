import fs from 'fs';
import path from 'path';

try {
  console.log('🔍 1. Checking public/ folder for double .mp4.mp4 extension...');
  const pubFiles = fs.readdirSync('public');
  let detectedVideo = '/ajay-neon.mp4';

  for (const file of pubFiles) {
    if (file.toLowerCase().endsWith('.mp4')) {
      if (file.toLowerCase() === 'ajay-neon.mp4.mp4') {
        fs.renameSync(path.join('public', file), path.join('public', 'ajay-neon.mp4'));
        console.log('✅ Fixed double extension: renamed ajay-neon.mp4.mp4 -> ajay-neon.mp4');
        detectedVideo = '/ajay-neon.mp4';
      } else {
        detectedVideo = '/' + file;
        console.log('✅ Found video file in public/:', detectedVideo);
      }
    }
  }

  console.log('🎬 2. Building Full-Screen Cinematic Neon Video Engine (src/components/HeroScene.jsx)...');
  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useEffect, useRef, useState } from 'react';

export default function HeroScene({ scrollProgress = 0, avatarUrl = '${detectedVideo}' }) {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('auto'); // 'auto' (loops smoothly) | 'scroll' (scrubs with scroll)

  // Always resolve to the real video file even if DB still says /Ajay.jpg
  const videoSrc = (avatarUrl && avatarUrl.toLowerCase().includes('.mp4'))
    ? avatarUrl
    : '${detectedVideo}';

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    if (mode === 'auto') {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [mode, videoSrc]);

  // If user switches to Scroll-Scrub mode, scrub video frames based on scroll position
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || mode !== 'scroll' || !vid.duration) return;
    const targetTime = Math.max(0, Math.min(0.99, scrollProgress)) * vid.duration;
    if (Number.isFinite(targetTime)) {
      vid.currentTime = targetTime;
    }
  }, [scrollProgress, mode]);

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
          backgroundColor: '#07040a',
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            // Automatic fallback if filename had double .mp4.mp4
            if (!e.target.src.endsWith('.mp4.mp4')) {
              e.target.src = '/ajay-neon.mp4.mp4';
            }
          }}
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: \`scale(\${1 + scrollProgress * 0.08})\`,
            transition: 'transform 0.25s ease-out',
            filter: 'contrast(1.06) saturate(1.12)'
          }}
        />

        {/* Subtle Studio Vignette so white typography pops cleanly over the neon video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(7,4,10,0.72) 0%, rgba(7,4,10,0.12) 35%, rgba(7,4,10,0.12) 65%, rgba(7,4,10,0.72) 100%), linear-gradient(180deg, rgba(7,4,10,0.45) 0%, rgba(7,4,10,0.05) 50%, rgba(7,4,10,0.88) 100%)'
          }}
        />
      </div>

      {/* Bottom-Right Mode Switcher: Auto-Play Loop vs Scroll-Scrub */}
      <div style={{ position: 'fixed', bottom: 22, right: 24, zIndex: 95, display: 'flex', gap: 8 }}>
        <button
          onClick={() => setMode(mode === 'auto' ? 'scroll' : 'auto')}
          style={{
            padding: '8px 14px',
            borderRadius: 999,
            background: 'rgba(12, 8, 18, 0.82)',
            border: '1px solid rgba(255, 85, 34, 0.5)',
            color: '#fff',
            fontSize: 11.5,
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(12px)'
          }}
        >
          {mode === 'auto' ? '🎬 Video: Auto-Playing (Click for Scroll-Scrub)' : '🖱️ Video: Scroll-Scrubbing (Click for Auto-Play)'}
        </button>
      </div>
    </>
  );
}
`);

  console.log('✨ 3. Updating src/App.jsx to Pure Folioblox Layout (Full-Screen Video Center, Clean Left/Right Typography)...');
  fs.writeFileSync('src/App.jsx', `
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import HeroScene from './components/HeroScene';
import AdminCMS from './components/AdminCMS';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [data, setData] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [formState, setFormState] = useState({
    sender_name: '', phone: '', sender_email: '', years: '0 - 1 year', challenge: '', budget: '$2,000 - $5,000'
  });
  const [formSent, setFormSent] = useState(false);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      setData(res.data);
    } catch {
      console.warn('Using fallback portfolio data');
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

  if (currentPage === 'admin') {
    return <AdminCMS onUpdatePortfolio={fetchPortfolio} />;
  }

  const s = data?.settings || {
    name: 'Ajay Chithanoor',
    role: 'Creative Director',
    tagline: 'From logo to language, I build brands & 3D full-stack web experiences that connect and convert.',
    about_bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
    avatar_url: '${detectedVideo}',
    resume_url: '/Ajay Chithanoor.pdf',
    email: 'ajay@folioblox.design'
  };

  const projectsList = data?.projects?.length ? data.projects : [
    { id: 1, title: 'Aura Audio — Wireless Headphones', description: 'Acoustic product design, 3D WebGL showcase, and high-conversion launch experience.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#' },
    { id: 2, title: 'Noir Outerwear — Puffer Series', description: 'Minimalist fashion e-commerce architecture with interactive 3D garment inspection.', tech_stack: 'Branding', image_url: '/project2.jpg', live_url: '#' },
    { id: 3, title: 'Botanica Skincare — Dark Dropper', description: 'Luxury packaging system and sensory web storytelling.', tech_stack: 'Packaging', image_url: '/project3.jpg', live_url: '#' },
    { id: 4, title: 'Vision OS — AI Workspace', description: 'Next-gen spatial telemetry dashboard and real-time analytics engine.', tech_stack: 'Web & Motion', image_url: '/project4.jpg', live_url: '#' },
    { id: 5, title: 'SupaBlox System — Modular Blocks', description: '3D geometric design system and component library.', tech_stack: 'Product Design', image_url: '/project1.jpg', live_url: '#' },
    { id: 6, title: 'eVTOL Mobility — Cockpit Telemetry', description: 'Autonomous flight HUD interface and mission control system.', tech_stack: 'Web & Motion', image_url: '/project2.jpg', live_url: '#' }
  ];

  const renderNavbar = () => (
    <header className="folioblox-nav">
      <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0, 0); }} className="folioblox-logo">
        {s.name?.split(' ')[0] || 'Folioblox'}<span style={{ color: '#ff5522' }}>.</span>
      </a>
      <nav className="folioblox-links">
        <button className={currentPage === 'home' ? 'active-link' : ''} onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}>Home</button>
        <a href="#about" onClick={() => setCurrentPage('home')}>About</a>
        <button className={currentPage === 'projects' ? 'active-link' : ''} onClick={() => { setCurrentPage('projects'); window.scrollTo(0, 0); }}>Projects</button>
        <a href="#workflow" onClick={() => setCurrentPage('home')}>Workflow</a>
        <a href="#palette" onClick={() => setCurrentPage('home')}>Palette</a>
        <a href="#stats" onClick={() => setCurrentPage('home')}>Stats</a>
        <a href="#studio" onClick={() => setCurrentPage('home')}>Studio</a>
        <a href="#contact" onClick={() => setCurrentPage('home')}>Contact</a>
        <a href="#admin" onClick={() => setCurrentPage('admin')} style={{ color: '#ff6b3d', fontWeight: 700 }}>⚙️ Admin CMS</a>
      </nav>
      <a href="#contact" onClick={() => setCurrentPage('home')} className="nav-cta-pill">
        Get in touch <span className="nav-cta-circle">↗</span>
      </a>
    </header>
  );

  if (currentPage === 'projects') {
    const categories = ['All Works', 'Product Design', 'Branding', 'Packaging', 'Web & Motion'];
    const filtered = activeCategory === 'All Works' ? projectsList : projectsList.filter(p => (p.tech_stack || '').toLowerCase().includes(activeCategory.toLowerCase()));
    return (
      <div className="projects-page-wrap">
        {renderNavbar()}
        <div className="fb-section" style={{ paddingTop: 40 }}>
          <div className="section-orange-tag">✦ PORTFOLIO SHOWCASE</div>
          <h1 className="fb-h2" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', marginBottom: 18 }}>
            Selected Works & <br /><span className="italic-serif" style={{ color: '#ff5522' }}>Featured Projects</span>
          </h1>
          <div className="filter-pills-row">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={\`filter-pill \${activeCategory === cat ? 'active' : ''}\`}>
                {cat === 'All Works' ? \`All Works (\${projectsList.length})\` : cat}
              </button>
            ))}
          </div>
          <div className="projects-two-col">
            {filtered.map((proj, idx) => (
              <div key={proj.id || idx} className="dedicated-project-card">
                <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                  <img src={proj.image_url || \`/project\${(idx % 4) + 1}.jpg\`} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 28 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{proj.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14 }}>{proj.description}</p>
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
      {/* Full-Screen Sticky Neon Video of Ajay */}
      <HeroScene scrollProgress={scrollProgress} avatarUrl={s.avatar_url} />

      {renderNavbar()}

      <main className="folioblox-scroll-content">
        {/* 1. HERO SECTION (Clean Left & Right Typography with Your Neon Video Centered Behind!) */}
        <section id="home" className="fb-hero">
          <div className="fb-hero-grid">
            <div>
              <div className="hey-eyebrow">Hey, I'm {s.name?.split(' ')[0] || 'Ajay'} — a</div>
              <h1 className="hero-giant-title">
                Creative<br />Director
              </h1>
            </div>

            <div className="hero-right-quote">
              <h3>Great design should feel invisible.</h3>
              <p>{s.tagline}</p>
            </div>
          </div>

          <div className="hero-bottom-strip">
            <div className="strip-item"><span>#01</span><strong>Brand Strategy</strong></div>
            <div className="strip-item"><span>#02</span><strong>3D Web & Identity Design</strong></div>
            <div className="strip-item"><span>#03</span><strong>Full-Stack Architecture</strong></div>
            <div className="strip-item"><span>#04</span><strong>Creative Direction</strong></div>
          </div>
        </section>

        {/* 2. TRUSTED BY BRANDS + BEHIND THE DESIGNS */}
        <section id="about" className="fb-section">
          <div className="brands-pill-bar">
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Trusted by Brands I've<br /><strong style={{ color: '#fff' }}>Helped Shape</strong></span>
            <div className="brand-logos-row">
              <div className="brand-logo-item">◎ Supa Blox</div>
              <div className="brand-logo-item">✦ Hype Blox</div>
              <div className="brand-logo-item">◐ Frame Blox</div>
              <div className="brand-logo-item">✪ Ultra Blox</div>
            </div>
          </div>

          <div className="behind-grid">
            <div>
              <div className="section-orange-tag">Behind the Designs</div>
              <h2 className="fb-h2">Shaping Experiences<br />That Make Life<br />Simpler</h2>
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.45, marginBottom: 22 }}>{s.about_bio}</h3>
              <a href="#contact" className="orange-cta-pill">Get in touch <span className="orange-cta-circle">↗</span></a>
            </div>
          </div>

          <div className="three-preview-grid">
            {projectsList.slice(0, 3).map((p, i) => (
              <div key={p.id || i} className="preview-img-card" onClick={() => { setCurrentPage('projects'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
                <img src={p.image_url || \`/project\${i + 1}.jpg\`} alt={p.title} />
              </div>
            ))}
          </div>
        </section>

        {/* 3. WORKFLOW PLAN */}
        <section id="workflow" className="fb-section">
          <div className="behind-grid">
            <div>
              <div className="section-orange-tag">✦ WORKFLOW PLAN</div>
              <h2 className="fb-h2">A focused <span className="italic-serif">two-week</span><br />design sprint from idea<br />to visual concept.</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14.5, lineHeight: 1.75 }}>
              This concept was developed as a focused two-week design & engineering sprint — from product positioning and visual research to landing page structure, interactive 3D mockups, and full-stack MySQL deployment.
            </p>
          </div>

          <div className="sprint-bars-container">
            {[
              { label: '🔍 Research & references', days: '1 day', offset: '0%' },
              { label: '🎯 Product positioning', days: '1 day', offset: '10%' },
              { label: '📐 Landing page structure', days: '2 days', offset: '22%' },
              { label: '✨ Visual direction', days: '2 days', offset: '40%' },
              { label: '⚡ AI & 3D concept exploration', days: '2 days', offset: '54%' },
              { label: '💻 Full-Stack UI & CMS build', days: '2 days', offset: '66%' }
            ].map((step, idx) => (
              <div key={idx} className="sprint-pill-bar" style={{ marginLeft: step.offset }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{step.label}</span>
                <span className="sprint-day-badge">{step.days}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COLOR PALETTE */}
        <section id="palette" className="fb-section">
          <div className="section-orange-tag">✦ COLOR PALETTE</div>
          <h2 className="fb-h2" style={{ maxWidth: 820 }}>The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.</h2>
          <div className="palette-grid">
            {[
              { title: 'Dark Accent', desc: 'Used for cards and surface overlays.', hex: '#1E1E28', rgb: '30 30 40', dot: '#3b0722' },
              { title: 'Soft White', desc: 'Primary typography color.', hex: '#F5F5FA', rgb: '245 245 250', dot: '#f5f5fa' },
              { title: 'Crimson Neon', desc: 'Signature studio rim-light accent.', hex: '#FF5522', rgb: '255 85 34', dot: '#ff5522' }
            ].map(c => (
              <div key={c.title} className="glass-spec-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18 }}>{c.title}</h3>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.dot, border: '1px solid rgba(255,255,255,0.4)' }} />
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 12.5, marginBottom: 16 }}>{c.desc}</p>
                <div className="spec-row"><span>HEX</span><strong>{c.hex}</strong><span>100%</span></div>
                <div className="spec-row"><span>RGB</span><strong>{c.rgb}</strong><span>100%</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STATS + GLOBAL STUDIO */}
        <section id="stats" className="fb-section">
          <div className="stats-two-col">
            <div><span style={{ fontSize: 11, color: '#cbd5e1' }}>IN UP TO 2030</span><div className="giant-stat-num">65%</div><p style={{ color: '#cbd5e1', fontSize: 13.5 }}>Projected market growth for interactive 3D digital experiences.</p></div>
            <div><span style={{ fontSize: 11, color: '#cbd5e1' }}>ACCORDING TO INDUSTRY DATA</span><div className="giant-stat-num">$30B</div><p style={{ color: '#cbd5e1', fontSize: 13.5 }}>Estimated global valuation of next-gen AI & spatial web platforms.</p></div>
          </div>
          <div id="studio" className="global-studio-banner">
            <div className="global-studio-text">
              <span>GLOBAL</span>
              <span className="studio-center-card">
                <video src="${detectedVideo}" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              <span>STUDIO</span>
            </div>
          </div>
        </section>

        {/* 6. CONTACT / READY TO GROW */}
        <section id="contact" className="fb-section">
          <div className="behind-grid">
            <h2 className="fb-h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>READY TO<br />GROW</h2>
            <h2 className="fb-h2" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>& SCALE YOUR<br />COMPANY?</h2>
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            await axios.post(\`\${API}/contact\`, { sender_name: formState.sender_name, sender_email: formState.sender_email, message: \`Phone: \${formState.phone} | Challenge: \${formState.challenge} | Budget: \${formState.budget}\` });
            setFormSent(true);
          }}>
            <div className="scale-form-grid">
              <div className="line-input-group"><label>YOUR NAME*</label><input required placeholder="John Parker" value={formState.sender_name} onChange={e => setFormState({...formState, sender_name: e.target.value})} /></div>
              <div className="line-input-group"><label>YOUR NUMBER*</label><input required placeholder="+91 98765 43210" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} /></div>
              <div className="line-input-group"><label>YOUR EMAIL*</label><input required type="email" placeholder="example@gmail.com" value={formState.sender_email} onChange={e => setFormState({...formState, sender_email: e.target.value})} /></div>
              <div className="line-input-group"><label>PROJECT BUDGET</label><select value={formState.budget} onChange={e => setFormState({...formState, budget: e.target.value})}><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option><option>$5,000 - $15,000+</option></select></div>
            </div>
            <div style={{ marginTop: 32 }}>
              <button type="submit" className="orange-cta-pill">Submit Consultation Request <span className="orange-cta-circle">→</span></button>
              {formSent && <span style={{ marginLeft: 16, color: '#4ade80', fontWeight: 600 }}>✅ Saved to MySQL Admin CMS!</span>}
            </div>
          </form>
        </section>

        {/* 7. FOOTER */}
        <footer className="folioblox-footer">
          <div style={{ maxWidth: 1220, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span>© {new Date().getFullYear()} {s.name}. Handcrafted with React, Vite, Node.js & MySQL.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#admin" onClick={() => setCurrentPage('admin')} style={{ color: '#ff5522', textDecoration: 'none', fontWeight: 700 }}>⚙️ Admin CMS</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
`);

  console.log('\n🎉 SUCCESS! Double .mp4.mp4 extension fixed and full-screen neon video wired!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
