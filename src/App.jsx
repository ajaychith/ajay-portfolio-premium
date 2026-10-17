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
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSnapshotIdx, setActiveSnapshotIdx] = useState(0);
  const [activeStripIdx, setActiveStripIdx] = useState(0);
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

  // Sequential Hero Bottom Strip Animation (#01 -> #02 -> #03 -> #04)
  const stripItems = (cmsState.sections?.hero?.strip || defaultCMSState.sections.hero.strip).filter((st) => st.enabled !== false);
  useEffect(() => {
    if (!stripItems.length) return;
    const timer = setInterval(() => {
      setActiveStripIdx((prev) => (prev + 1) % stripItems.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [stripItems.length]);

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
    root.style.setProperty('--edge-pad', `${t.section_padding_vw || 4}vw`);
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
  const certList = (cmsState.certifications || defaultCMSState.certifications).filter((c) => c.enabled !== false);

  const openProjectDetail = (proj) => {
    setSelectedProject(proj);
    setActiveSnapshotIdx(0);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTo = (page, anchor) => {
    setMobileMenuOpen(false);
    setSelectedProject(null);
    setCurrentPage(page);
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderNavbar = () => (
    <>
      {/* Top Neon Scroll Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress * 100}%`, height: 3, background: 'linear-gradient(90deg, var(--orange), var(--crimson))', zIndex: 200, boxShadow: '0 0 12px var(--orange)' }} />

      <header className="folioblox-nav">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); navTo('home'); }}
          className="folioblox-logo"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}
        >
          {s.show_header_avatar !== false && (
            <span className="header-avatar-ring">
              <img src={s.header_avatar || '/Ajay.jpg'} alt={s.name} />
              <span className="header-online-dot" />
            </span>
          )}
          <span>{s.brand_logo || s.name?.split(' ')[0] || 'Ajay'}<span style={{ color: 'var(--orange)' }}>.</span></span>
        </a>

        <nav className="folioblox-links">
          <button className={currentPage === 'home' ? 'active-link' : ''} onClick={() => navTo('home')}>Home</button>
          {vis.about && <button onClick={() => navTo('home', 'about')}>About</button>}
          <button className={currentPage === 'projects' || currentPage === 'project-detail' ? 'active-link' : ''} onClick={() => navTo('projects')}>Projects</button>
          {vis.skills && <button onClick={() => navTo('home', 'skills')}>Skills</button>}
          {vis.workflow && <button onClick={() => navTo('home', 'workflow')}>Workflow</button>}
          {vis.contact && <button onClick={() => navTo('home', 'contact')}>Contact</button>}
          {s.resume_url && (
            <a href={s.resume_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <SvgIcon name="FileText" size={14} />
              <span>Resume</span>
            </a>
          )}
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
          <button onClick={() => navTo('home', 'skills')}>Technical Skills</button>
          <button onClick={() => navTo('home', 'workflow')}>Workflow Sprint</button>
          <button onClick={() => navTo('home', 'contact')}>Contact Consultation</button>
          {s.resume_url && (
            <a href={s.resume_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
              <SvgIcon name="FileText" size={16} />
              <span>View Resume PDF</span>
            </a>
          )}
          <button onClick={() => { setMobileMenuOpen(false); setCurrentPage('admin'); }} style={{ color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <SvgIcon name="Sliders" size={16} />
            <span>Open Admin CMS</span>
          </button>
        </div>
      )}
    </>
  );

  // DETAILED PROJECT CASE-STUDY VIEW WITH MULTIPLE SNAPSHOTS & PROJECT SKILLS
  if (currentPage === 'project-detail' && selectedProject) {
    const snaps = selectedProject.snapshots?.length ? selectedProject.snapshots : [selectedProject.image_url || '/project1.jpg'];
    const projSkills = selectedProject.project_skills?.length
      ? selectedProject.project_skills
      : (selectedProject.tech_stack || '').split('â€¢').map((s) => s.trim()).filter(Boolean);

    return (
      <div className="projects-page-wrap">
        {renderNavbar()}
        <div className="fb-section" style={{ paddingTop: 24 }}>
          <button
            onClick={() => navTo('projects')}
            className="cms-secondary-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
          >
            <span>â† Back to All Projects</span>
          </button>

          <div className="behind-grid" style={{ marginBottom: 36 }}>
            <div>
              <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <SvgIcon name="Layers" size={14} />
                <span>{selectedProject.client || 'CASE STUDY'} â€¢ {selectedProject.timeline || '2026'}</span>
              </div>
              <h1 className="fb-h2" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)' }}>{selectedProject.title}</h1>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {selectedProject.live_url && selectedProject.live_url !== '#' && (
                <a href={selectedProject.live_url} target="_blank" rel="noreferrer" className="orange-cta-pill">
                  <span>Launch Live Project</span>
                  <span className="orange-cta-circle"><SvgIcon name="ArrowUpRight" size={14} color="var(--orange)" /></span>
                </a>
              )}
              <button onClick={() => setCurrentPage('admin')} className="cms-secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <SvgIcon name="Sliders" size={14} color="var(--orange)" />
                <span>Edit Case Study in CMS</span>
              </button>
            </div>
          </div>

          {/* Interactive Main Snapshot Showcase */}
          <div className="case-study-main-img">
            <img src={snaps[activeSnapshotIdx] || snaps[0]} alt={selectedProject.title} />
          </div>

          {/* Multi-Snapshot Thumbnail Strip */}
          {snaps.length > 1 && (
            <div className="snapshot-thumbs-row">
              {snaps.map((snap, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSnapshotIdx(idx)}
                  className={`snapshot-thumb ${activeSnapshotIdx === idx ? 'active' : ''}`}
                >
                  <img src={snap} alt={`Snapshot ${idx + 1}`} />
                  <span>Snapshot #{idx + 1}</span>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Architecture Breakdown + Per-Project Skills */}
          <div className="palette-grid" style={{ marginTop: 48 }}>
            <div className="glass-spec-card">
              <div className="section-orange-tag">01 / EXECUTIVE OVERVIEW</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>Project Scope & Role</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14.5, lineHeight: 1.7 }}>{selectedProject.description}</p>
              {selectedProject.metrics && (
                <div style={{ marginTop: 18, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,85,34,0.12)', border: '1px solid rgba(255,85,34,0.35)', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  {selectedProject.metrics}
                </div>
              )}
            </div>

            <div className="glass-spec-card">
              <div className="section-orange-tag">02 / THE CHALLENGE</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>Problem Statement</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14.5, lineHeight: 1.7 }}>
                {selectedProject.challenge || 'Engineered to solve high-reliability infrastructure, security, and user experience requirements.'}
              </p>
            </div>

            <div className="glass-spec-card">
              <div className="section-orange-tag">03 / ARCHITECTURE & SOLUTION</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>Technical Execution</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14.5, lineHeight: 1.7 }}>
                {selectedProject.solution || 'Implemented modern full-stack workflows, hardened DNS/hosting configurations, and responsive UI components.'}
              </p>
            </div>
          </div>

          {/* Dedicated Per-Project Skills & Technologies Used */}
          <div className="glass-spec-card" style={{ marginTop: 28 }}>
            <div className="section-orange-tag">04 / TECHNOLOGIES & SKILLS DEPLOYED IN THIS PROJECT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
              {projSkills.map((skName, i) => (
                <span key={i} className="project-skill-chip">
                  <SvgIcon name="CheckCircle2" size={15} color="var(--orange)" />
                  <span>{skName}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEDICATED ALL-PROJECTS PAGE
  if (currentPage === 'projects') {
    const categories = ['All Works', 'Cybersecurity', 'WordPress', 'React', 'DNS'];
    const filtered = activeCategory === 'All Works'
      ? projectsList
      : projectsList.filter((p) => (p.tech_stack || '').toLowerCase().includes(activeCategory.toLowerCase()));

    return (
      <div className="projects-page-wrap">
        {renderNavbar()}
        <div className="fb-section" style={{ paddingTop: 30 }}>
          <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <SvgIcon name="Layers" size={14} />
            <span>PORTFOLIO CASE STUDIES</span>
          </div>
          <h1 className="fb-h2" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', marginBottom: 18 }}>
            Selected Works & <br /><span className="italic-serif" style={{ color: 'var(--orange)' }}>Case Studies</span>
          </h1>
          <div className="filter-pills-row">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}>
                {cat === 'All Works' ? `All Works (${projectsList.length})` : cat}
              </button>
            ))}
          </div>
          <div className="projects-two-col">
            {filtered.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="dedicated-project-card"
                onClick={() => openProjectDetail(proj)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: 'clamp(240px, 26vw, 360px)', overflow: 'hidden' }}>
                  <img src={proj.image_url || `/project${(idx % 4) + 1}.jpg`} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, padding: '8px 14px', borderRadius: 999, background: 'rgba(7,4,10,0.85)', border: '1px solid rgba(255,85,34,0.5)', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span>View Case Study & Snapshots</span>
                    <SvgIcon name="ArrowUpRight" size={14} color="var(--orange)" />
                  </div>
                </div>
                <div style={{ padding: 28 }}>
                  <span style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700 }}>{proj.tech_stack}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 10px' }}>{proj.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{proj.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {(proj.project_skills || []).slice(0, 4).map((sk, sIdx) => (
                      <span key={sIdx} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
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
        {/* 1. HERO SECTION WITH SEQUENTIAL GLOWING ARROW BOTTOM STRIP */}
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

            {vis.hero_strip && stripItems.length > 0 && (
              <div className="hero-bottom-strip">
                {stripItems.map((st, i) => {
                  const isCurrent = i === activeStripIdx;
                  return (
                    <div
                      key={st.id || i}
                      onClick={() => setActiveStripIdx(i)}
                      className={`strip-item-animated ${isCurrent ? 'active-strip' : ''}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--orange)', fontWeight: 800, fontSize: 12.5 }}>
                          <SvgIcon name={st.icon || 'Sparkles'} size={15} color="var(--orange)" />
                          <span>{st.num}</span>
                        </span>

                        {/* Animated Glowing Arrow Pointing to Next Skill */}
                        <span className={`strip-glow-arrow ${isCurrent ? 'arrow-pulse' : ''}`}>
                          <SvgIcon name="ArrowRight" size={16} color={isCurrent ? '#ff5522' : 'rgba(255,255,255,0.28)'} />
                        </span>
                      </div>

                      <strong>{st.title}</strong>
                      <div className="strip-progress-track">
                        <div className={`strip-progress-fill ${isCurrent ? 'filling' : ''}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 2. BRANDS + BEHIND THE DESIGNS + CLICKABLE CASE STUDY CARDS */}
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
                      <SvgIcon name={b.icon || 'ShieldCheck'} size={17} color="var(--orange)" />
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
                  <div
                    key={p.id || i}
                    className="preview-img-card"
                    onClick={() => openProjectDetail(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={p.image_url || `/project${i + 1}.jpg`} alt={p.title} />
                    <div className="preview-card-overlay">
                      <span style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700 }}>{p.tech_stack}</span>
                      <h4 style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 10px' }}>{p.title}</h4>
                      <span style={{ fontSize: 12, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                        <span>Explore Case Study & Snapshots</span>
                        <SvgIcon name="ArrowRight" size={14} color="var(--orange)" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. TECHNICAL ARSENAL & CYBERSECURITY SKILLS */}
        {vis.skills && skillsList.length > 0 && (
          <section id="skills" className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Cpu" size={14} />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="fb-h2">Cybersecurity, Web & Infrastructure Stack</h2>
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
                    <div style={{ width: `${sk.proficiency}%`, height: '100%', background: 'var(--orange)', borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. WORKFLOW SPRINT */}
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
                <div key={step.id || idx} className="sprint-pill-bar" style={{ marginLeft: `${String(step.offset).replace('%', '')}%` }}>
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

        {/* 5. EXPERIENCE & CERTIFICATIONS */}
        {vis.experiences && expList.length > 0 && (
          <section className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Briefcase" size={14} />
              <span>CAREER TIMELINE</span>
            </div>
            <h2 className="fb-h2">Professional Experience</h2>
            <div className="projects-two-col" style={{ marginTop: 40 }}>
              {expList.map((ex) => (
                <div key={ex.id} className="glass-spec-card">
                  <span style={{ color: 'var(--orange)', fontSize: 12, fontWeight: 700 }}>{ex.duration}</span>
                  <h3 style={{ fontSize: 22, margin: '8px 0 4px' }}>{ex.role}</h3>
                  <strong style={{ color: '#cbd5e1', fontSize: 14, display: 'block', marginBottom: 12 }}>{ex.company}</strong>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{ex.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {vis.certifications && certList.length > 0 && (
          <section className="fb-section">
            <div className="section-orange-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SvgIcon name="Award" size={14} />
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="fb-h2">Certifications & Education</h2>
            <div className="palette-grid">
              {certList.map((c) => (
                <div key={c.id} className="glass-spec-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ padding: 12, borderRadius: 14, background: 'rgba(255,85,34,0.14)', border: '1px solid rgba(255,85,34,0.35)' }}>
                    <SvgIcon name={c.icon || 'ShieldCheck'} size={22} color="var(--orange)" />
                  </div>
                  <div>
                    <span style={{ fontSize: 11.5, color: 'var(--orange)', fontWeight: 700 }}>{c.year}</span>
                    <h3 style={{ fontSize: 17, margin: '4px 0 6px' }}>{c.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: 13 }}>{c.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. STATS + STUDIO */}
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
                      <video src={bg.video_url || '/ajay-neon.mp4'} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

        {/* 7. TESTIMONIALS */}
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

        {/* 8. CONTACT */}
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
              const msgText = `Phone: ${formState.phone} | Challenge: ${formState.challenge} | Budget: ${formState.budget}`;
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
                <div className="line-input-group"><label>YOUR NUMBER*</label><input required placeholder="+91 90523 44399" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></div>
                <div className="line-input-group"><label>YOUR EMAIL*</label><input required type="email" placeholder="example@gmail.com" value={formState.sender_email} onChange={(e) => setFormState({ ...formState, sender_email: e.target.value })} /></div>
                <div className="line-input-group"><label>PROJECT BUDGET</label><select value={formState.budget} onChange={(e) => setFormState({ ...formState, budget: e.target.value })}><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option><option>$5,000 - $15,000+</option></select></div>
                <div className="line-input-group" style={{ gridColumn: '1 / -1' }}><label>BIGGEST GOAL OR PROJECT DETAILS</label><input placeholder="Tell me about your project or role..." value={formState.challenge} onChange={(e) => setFormState({ ...formState, challenge: e.target.value })} /></div>
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

        <footer className="folioblox-footer">
          <div className="footer-grid">
            <div>
              <div className="folioblox-logo" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={s.header_avatar || '/Ajay.jpg'} alt={s.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--orange)' }} />
                <span>{s.name}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13.5, maxWidth: 320, lineHeight: 1.65 }}>{s.tagline}</p>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>NAVIGATION</strong>
              <div style={{ display: 'grid', gap: 8, fontSize: 13.5, color: '#cbd5e1' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home')}>Home</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home', 'about')}>About</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('projects')}>Case Studies</span>
                <span style={{ cursor: 'pointer' }} onClick={() => navTo('home', 'skills')}>Skills</span>
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
              <div style={{ fontSize: 13.5, color: '#cbd5e1', marginTop: 4 }}>{s.phone}</div>
              <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 6 }}>{s.location}</div>
            </div>
          </div>
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12.5, color: '#64748b' }}>
            <span>Â© {new Date().getFullYear()} {s.name}. All rights reserved.</span>
            <span onClick={() => navTo('home')} style={{ color: '#cbd5e1', cursor: 'pointer' }}>Back to top â†‘</span>
          </div>
        </footer>
      </main>
    </div>
  );
}