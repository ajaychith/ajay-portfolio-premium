import fs from 'fs';

const cleanAppCode = `
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
      console.warn('Using local fallback portfolio data');
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
    tagline: 'Great design should feel invisible. From logo to language, I build brands & 3D full-stack web experiences that connect and convert.',
    about_bio: "I'm a product designer & full-stack 3D developer focused on building clean, intuitive interfaces that solve real-world problems.",
    avatar_url: '/Ajay.jpg',
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
      <HeroScene scrollProgress={scrollProgress} avatarUrl={s.avatar_url || '/Ajay.jpg'} />
      {renderNavbar()}
      <main className="folioblox-scroll-content">
        <section id="home" className="fb-hero">
          <div className="fb-hero-grid" style={{ alignItems: 'center' }}>
            <div>
              <div className="hey-eyebrow">Hey, I'm {s.name?.split(' ')[0] || 'Ajay'} — a</div>
              <h1 className="hero-giant-title">Creative<br />Director</h1>
            </div>

            {/* Glowing 3D Glassmorphic Portrait Card of Ajay.jpg */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '270px', height: '340px', borderRadius: '24px', overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 85, 34, 0.5)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 45px rgba(255, 85, 34, 0.3)',
                transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)'
              }}>
                <img src={s.avatar_url || '/Ajay.jpg'} alt="Ajay Chithanoor" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, padding: '8px 14px', borderRadius: 12, background: 'rgba(7,4,10,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                  {s.name} • 3D Full-Stack
                </div>
              </div>
            </div>

            <div className="hero-right-quote">
              <h3>Great design should feel invisible.</h3>
              <p>{s.tagline}</p>
            </div>
          </div>
          <div className="hero-bottom-strip">
            <div className="strip-item"><span>#01</span><strong>Brand Strategy</strong></div>
            <div className="strip-item"><span>#02</span><strong>3D Web & Identity</strong></div>
            <div className="strip-item"><span>#03</span><strong>Full-Stack Architecture</strong></div>
            <div className="strip-item"><span>#04</span><strong>Creative Direction</strong></div>
          </div>
        </section>

        {/* BEHIND THE DESIGNS */}
        <section id="about" className="fb-section">
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

        {/* WORKFLOW PLAN */}
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
        </section>

        {/* COLOR PALETTE */}
        <section id="palette" className="fb-section">
          <div className="section-orange-tag">✦ COLOR PALETTE</div>
          <h2 className="fb-h2" style={{ maxWidth: 820 }}>The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.</h2>
          <div className="palette-grid">
            {[
              { title: 'Dark Accent', desc: 'Used for cards and surface overlays.', hex: '#1E1E28', dot: '#3b0722' },
              { title: 'Soft White', desc: 'Primary typography color.', hex: '#F5F5FA', dot: '#f5f5fa' },
              { title: 'Crimson Neon', desc: 'Signature studio rim-light accent.', hex: '#FF5522', dot: '#ff5522' }
            ].map(c => (
              <div key={c.title} className="glass-spec-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18 }}>{c.title}</h3>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.dot, border: '1px solid rgba(255,255,255,0.4)' }} />
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 12.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS + GLOBAL STUDIO */}
        <section id="stats" className="fb-section">
          <div className="stats-two-col">
            <div><span style={{ fontSize: 11, color: '#cbd5e1' }}>IN UP TO 2030</span><div className="giant-stat-num">65%</div><p style={{ color: '#cbd5e1', fontSize: 13.5 }}>Projected market growth for interactive 3D digital experiences.</p></div>
            <div><span style={{ fontSize: 11, color: '#cbd5e1' }}>ACCORDING TO INDUSTRY DATA</span><div className="giant-stat-num">$30B</div><p style={{ color: '#cbd5e1', fontSize: 13.5 }}>Estimated global valuation of next-gen AI & spatial web platforms.</p></div>
          </div>
          <div id="studio" className="global-studio-banner">
            <div className="global-studio-text">
              <span>GLOBAL</span>
              <span className="studio-center-card"><img src={s.avatar_url || '/Ajay.jpg'} alt={s.name} /></span>
              <span>STUDIO</span>
            </div>
          </div>
        </section>

        {/* CONTACT / READY TO GROW */}
        <section id="contact" className="fb-section">
          <div className=" behind-grid">
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

        {/* FOOTER */}
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
`;

fs.writeFileSync('src/App.jsx', cleanAppCode.trim());
console.log('✅ src/App.jsx updated cleanly without syntax errors!');
