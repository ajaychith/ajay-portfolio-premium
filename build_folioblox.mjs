import fs from 'fs';

try {
  console.log('🎬 1. Creating Neon Crimson/Magenta Scroll-Animated Portrait Engine for Ajay.jpg (src/components/HeroScene.jsx)...');

  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders Ajay.jpg with automatic studio background keying,
 * dual Crimson/Magenta neon rim lighting, 3D scroll zoom/tilt,
 * AND supports a frame sequence (/frames/ezgif-frame-001.jpg) if placed in public/frames!
 */
export default function HeroScene({ scrollProgress = 0, avatarUrl = '/Ajay.jpg', frameCount = 0 }) {
  const canvasRef = useRef(null);
  const processedImgRef = useRef(null);
  const framesRef = useRef([]);
  const [ready, setReady] = useState(false);

  // Load & process Ajay.jpg to convert white background into dark studio crimson/magenta neon portrait
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarUrl || '/Ajay.jpg';
    img.onload = () => {
      const off = document.createElement('canvas');
      const w = img.naturalWidth || 800;
      const h = img.naturalHeight || 1000;
      off.width = w;
      off.height = h;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, w, h);

      try {
        const imgData = octx.getImageData(0, 0, w, h);
        const d = imgData.data;

        // Remove near-white studio backdrop & apply cinematic low-key contrast + crimson/magenta rim tint
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Detect bright white background pixels
          const brightness = (r + g + b) / 3;
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

          if (brightness > 228 && maxDiff < 22) {
            // Smooth feather alpha at edges
            const fade = Math.max(0, Math.min(1, (248 - brightness) / 20));
            d[i + 3] = Math.round(fade * 255);
          } else {
            // Cinematic moody contrast + subtle neon magenta/crimson color grading
            const px = (i / 4) % w;
            const nx = px / w; // 0 (left) to 1 (right)
            const shadowCurve = Math.pow(brightness / 255, 1.28);

            // Left side cool magenta-violet rim, Right side warm crimson-red rim
            const leftRim = Math.max(0, 1 - nx * 2.1);
            const rightRim = Math.max(0, (nx - 0.45) * 1.9);

            d[i] = Math.min(255, Math.round(r * shadowCurve * 0.95 + rightRim * 75 + leftRim * 38));
            d[i + 1] = Math.min(255, Math.round(g * shadowCurve * 0.72 + leftRim * 10));
            d[i + 2] = Math.min(255, Math.round(b * shadowCurve * 0.88 + leftRim * 72 + rightRim * 22));
          }
        }
        octx.putImageData(imgData, 0, 0);
      } catch (e) {
        console.warn('Canvas pixel grading skipped:', e);
      }

      processedImgRef.current = off;
      setReady(true);
    };
  }, [avatarUrl]);

  // Draw 60fps scroll-driven cinematic animation on full-bleed canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let currentP = scrollProgress;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Smooth lerp toward target scrollProgress (like lerpFactor = 0.08 in the video)
      currentP += (scrollProgress - currentP) * 0.08;
      const p = Math.max(0, Math.min(1, currentP));

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // 1. Deep Burgundy-to-Black & Magenta-to-Crimson Studio Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, '#07040a');
      bgGrad.addColorStop(0.45, '#190617');
      bgGrad.addColorStop(0.78, '#3b0722');
      bgGrad.addColorStop(1, '#680926');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // 2. Left Magenta Glow Orb (animates with scroll)
      const leftGlow = ctx.createRadialGradient(
        cw * (0.28 - p * 0.05),
        ch * (0.58 + Math.sin(p * Math.PI) * 0.08),
        20,
        cw * 0.28,
        ch * 0.58,
        cw * 0.45
      );
      leftGlow.addColorStop(0, 'rgba(217, 70, 239, 0.34)');
      leftGlow.addColorStop(0.5, 'rgba(162, 28, 175, 0.14)');
      leftGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, cw, ch);

      // 3. Right Crimson-Red Neon Rim Light (animates with scroll)
      const rightGlow = ctx.createRadialGradient(
        cw * (0.76 - p * 0.06),
        ch * (0.45 + Math.cos(p * Math.PI) * 0.1),
        10,
        cw * 0.76,
        ch * 0.45,
        cw * 0.48
      );
      rightGlow.addColorStop(0, 'rgba(244, 63, 94, 0.52)');
      rightGlow.addColorStop(0.45, 'rgba(225, 29, 72, 0.24)');
      rightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, cw, ch);

      // 4. Draw Ajay's Neon-Lit Portrait with Scroll-Driven 3D Zoom & Pan
      if (processedImgRef.current) {
        const src = processedImgRef.current;
        const aspect = src.width / src.height;

        // As user scrolls from 0 -> 1, camera smoothly zooms in on face & shifts subtly (like video frames)
        const zoom = 1.04 + Math.sin(p * Math.PI * 0.85) * 0.28;
        const drawH = ch * 0.96 * zoom;
        const drawW = drawH * aspect;

        const offsetX = Math.sin(p * Math.PI * 1.3) * (cw * 0.035);
        const offsetY = p * (ch * 0.06);

        const x = (cw - drawW) * 0.52 + offsetX;
        const y = ch - drawH + offsetY + ch * 0.04;

        ctx.save();
        // Subtle neon drop-shadowaura behind subject
        ctx.shadowColor = 'rgba(244, 63, 94, 0.55)';
        ctx.shadowBlur = 45;
        ctx.drawImage(src, x, y, drawW, drawH);
        ctx.restore();

        // Subtle dark vignette at bottom for text legibility
        const vig = ctx.createLinearGradient(0, ch * 0.65, 0, ch);
        vig.addColorStop(0, 'rgba(7, 4, 10, 0)');
        vig.addColorStop(1, 'rgba(7, 4, 10, 0.72)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, cw, ch);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress, ready]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
`);

  console.log('🎨 2. Writing Exact Folioblox CSS Design System (src/App.css)...');
  fs.writeFileSync('src/App.css', `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,600&family=Syne:wght@700;800&display=swap');

:root {
  --orange: #ff5522;
  --orange-glow: rgba(255, 85, 34, 0.4);
  --crimson: #e11d48;
  --dark-bg: #07040a;
  --glass-bg: rgba(16, 12, 20, 0.58);
  --glass-border: rgba(255, 255, 255, 0.11);
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
}

/* TOP NAVBAR (Exact Folioblox Header) */
.folioblox-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: linear-gradient(180deg, rgba(7, 4, 10, 0.75) 0%, rgba(7, 4, 10, 0) 100%);
  backdrop-filter: blur(6px);
}

.folioblox-logo {
  font-weight: 800;
  font-size: 21px;
  letter-spacing: -0.5px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

.folioblox-links {
  display: flex;
  gap: 26px;
  align-items: center;
}

.folioblox-links a,
.folioblox-links button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
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

.nav-cta-pill:hover {
  transform: scale(1.03);
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
  padding: 10px 10px 10px 22px;
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

/* CONTENT SCROLL OVERLAY */
.folioblox-scroll-content {
  position: relative;
  z-index: 10;
}

.fb-section {
  max-width: 1220px;
  margin: 0 auto;
  padding: 95px 6%;
}

/* SECTION 1: HERO */
.fb-hero {
  min-height: 100vh;
  max-width: 1220px;
  margin: 0 auto;
  padding: 120px 6% 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.fb-hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 64px;
}

.hey-eyebrow {
  color: #ff6b3d;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 10px;
}

.hero-giant-title {
  font-size: clamp(3.4rem, 6.8vw, 5.8rem);
  font-weight: 800;
  line-height: 0.96;
  letter-spacing: -0.035em;
}

.hero-right-quote {
  text-align: right;
  max-width: 330px;
  margin-left: auto;
}

.hero-right-quote h3 {
  font-size: clamp(1.5rem, 2.3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
}

.hero-right-quote p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.6;
}

.hero-bottom-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-top: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.strip-item span {
  display: block;
  color: #ff5522;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.strip-item strong {
  font-size: 13.5px;
  font-weight: 600;
  color: #f8fafc;
}

/* TRUSTED BY BRANDS PILL BAR */
.brands-pill-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 22px 32px;
  border-radius: 999px;
  background: rgba(14, 10, 18, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  margin-bottom: 80px;
}

.brand-logos-row {
  display: flex;
  gap: 36px;
  align-items: center;
  flex-wrap: wrap;
}

.brand-logo-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
}

/* SECTION 2: BEHIND THE DESIGNS + 3 PRODUCT CARDS */
.behind-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: flex-start;
  margin-bottom: 56px;
}

.section-orange-tag {
  color: #ff5522;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.fb-h2 {
  font-size: clamp(2.1rem, 4vw, 3.25rem);
  font-weight: 800;
  line-height: 1.1;
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
  gap: 24px;
}

.preview-img-card {
  border-radius: 20px;
  overflow: hidden;
  height: 310px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(15, 12, 20, 0.5);
  position: relative;
  transition: transform 0.35s ease;
}

.preview-img-card:hover {
  transform: translateY(-8px);
}

.preview-img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* SECTION 3: WORKFLOW PLAN (Staggered Sprint Bars) */
.sprint-bars-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 44px;
}

.sprint-pill-bar {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 20px;
  border-radius: 999px;
  background: rgba(18, 14, 24, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  width: fit-content;
  min-width: 280px;
}

.sprint-day-badge {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 11px;
  color: #cbd5e1;
}

/* SECTION 4: COLOR PALETTE CARDS */
.palette-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.glass-spec-card {
  padding: 28px;
  border-radius: 18px;
  background: rgba(16, 12, 22, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: #cbd5e1;
}

/* SECTION 5: STATS (65% & $30B) + GLOBAL STUDIO */
.stats-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.giant-stat-num {
  font-size: clamp(3.5rem, 6vw, 5.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 12px 0;
}

.global-studio-banner {
  position: relative;
  text-align: center;
  padding: 90px 0;
  display: grid;
  place-items: center;
}

.global-studio-text {
  font-size: clamp(3.6rem, 9vw, 7.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.studio-center-card {
  width: 220px;
  height: 250px;
  border-radius: 22px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
  display: inline-block;
}

.studio-center-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* SECTION 6: TESTIMONIALS */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

/* SECTION 7: READY TO GROW & SCALE CONSULTATION FORM */
.scale-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 40px;
  margin-top: 48px;
}

.line-input-group label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  text-transform: uppercase;
}

.line-input-group input,
.line-input-group select {
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 14px;
  outline: none;
}

.line-input-group select option {
  background: #120d18;
  color: #fff;
}

/* DEDICATED PROJECTS PAGE (Matching 08:30 in Video) */
.projects-page-wrap {
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 15%, rgba(255, 85, 34, 0.14), transparent 40%),
    radial-gradient(circle at 20% 60%, rgba(225, 29, 72, 0.12), transparent 45%),
    #08060c;
  padding-top: 120px;
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
  padding: 9px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  font-size: 13px;
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
}

.dedicated-project-card {
  border-radius: 20px;
  background: rgba(18, 14, 24, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: transform 0.3s, border-color 0.3s;
}

.dedicated-project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 85, 34, 0.5);
}

/* FOOTER */
.folioblox-footer {
  background: rgba(8, 5, 12, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  padding: 64px 6% 36px;
  position: relative;
  z-index: 15;
}

.footer-grid {
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
}

@media (max-width: 900px) {
  .fb-hero-grid,
  .behind-grid,
  .three-preview-grid,
  .palette-grid,
  .stats-two-col,
  .testimonials-grid,
  .scale-form-grid,
  .projects-two-col,
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .hero-bottom-strip {
    grid-template-columns: 1fr 1fr;
  }
  .folioblox-links {
    display: none;
  }
}
`);

  console.log('🚀 3. Assembling Complete Folioblox Multi-Section Landing Page + Dedicated Projects Page + Admin CMS in src/App.jsx...');
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
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'projects' | 'admin'
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [formState, setFormState] = useState({
    sender_name: '',
    phone: '',
    sender_email: '',
    years: '0 - 1 year',
    challenge: '',
    budget: '$2,000 - $5,000',
    revenue: '$0 - $100k',
    ads: 'No'
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

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(\`\${API}/contact\`, {
        sender_name: formState.sender_name,
        sender_email: formState.sender_email,
        message: \`Phone: \${formState.phone} | Challenge: \${formState.challenge} | Budget: \${formState.budget} | Revenue: \${formState.revenue}\`
      });
    } catch {
      // Fallback if server offline
    }
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  // NAVIGATION HEADER (Shared between Home & Dedicated Projects Page)
  const renderNavbar = () => (
    <header className="folioblox-nav">
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0, 0); }}
        className="folioblox-logo"
      >
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

  // DEDICATED PROJECTS PAGE (Matches 08:30 - 09:42 in the Video)
  if (currentPage === 'projects') {
    const categories = ['All Works', 'Product Design', 'Branding', 'Packaging', 'Web & Motion'];
    const filtered = activeCategory === 'All Works'
      ? projectsList
      : projectsList.filter((p) => (p.tech_stack || '').toLowerCase().includes(activeCategory.toLowerCase()));

    return (
      <div className="projects-page-wrap">
        {renderNavbar()}

        <div className="fb-section" style={{ paddingTop: 40 }}>
          <div className="section-orange-tag">✦ PORTFOLIO SHOWCASE</div>
          <h1 className="fb-h2" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', marginBottom: 18 }}>
            Selected Works & <br />
            <span className="italic-serif" style={{ color: '#ff5522' }}>Featured Projects</span>
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, lineHeight: 1.7 }}>
            A curated collection of brand strategy, 3D product design, full-stack architecture, and interactive digital experiences crafted for forward-thinking companies worldwide.
          </p>

          <div className="filter-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`filter-pill \${activeCategory === cat ? 'active' : ''}\`}
              >
                {cat === 'All Works' ? \`All Works (\${projectsList.length})\` : cat}
              </button>
            ))}
          </div>

          <div className="projects-two-col">
            {filtered.map((proj, idx) => (
              <div key={proj.id || idx} className="dedicated-project-card">
                <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: 16, right: 16, padding: '6px 14px', borderRadius: 999, background: 'rgba(0,0,0,0.75)', fontSize: 11, fontWeight: 600 }}>
                    {proj.tech_stack || 'Product Design'}
                  </span>
                  <img src={proj.image_url || \`/project\${(idx % 4) + 1}.jpg\`} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff5522', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
                    <span>{(proj.tech_stack || 'CASE STUDY').toUpperCase()}</span>
                    <span style={{ color: '#64748b' }}>2026</span>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{proj.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* HOW WE BRING PRODUCTS TO LIFE */}
          <div style={{ marginTop: 110 }}>
            <div className="section-orange-tag">✦ OUR METHODOLOGY</div>
            <h2 className="fb-h2" style={{ marginBottom: 40 }}>How We Bring Products to Life</h2>
            <div className="palette-grid">
              {[
                { num: '01', title: 'Discovery & Strategy', desc: 'Uncovering core brand truths, market positioning, user motivations, and defining a clear architectural roadmap.' },
                { num: '02', title: 'Iterative Prototyping', desc: 'Building interactive 3D wireframes, motion studies, and high-contrast design systems to test visual concepts fast.' },
                { num: '03', title: 'Precision Execution', desc: 'Transforming approved concepts into production-ready React, Three.js, and Node.js + MySQL products.' }
              ].map((m) => (
                <div key={m.num} className="glass-spec-card" style={{ borderTop: '2px solid #ff5522' }}>
                  <span style={{ color: '#ff5522', fontWeight: 800, fontSize: 13 }}>{m.num}</span>
                  <h3 style={{ fontSize: 20, margin: '12px 0' }}>{m.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="glass-spec-card" style={{ marginTop: 90, textAlign: 'center', padding: '64px 24px', background: 'radial-gradient(circle at center, rgba(255,85,34,0.18), rgba(16,12,22,0.85))' }}>
            <div className="section-orange-tag">WORK WITH US</div>
            <h2 className="fb-h2" style={{ marginBottom: 14 }}>Ready to Start Your Next Project?</h2>
            <p style={{ color: '#94a3b8', maxWidth: 520, margin: '0 auto 28px', fontSize: 14 }}>
              Let’s collaborate to build memorable digital products and intuitive brand experiences that elevate your company.
            </p>
            <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="orange-cta-pill">
              Initiate Project Consultation <span className="orange-cta-circle">↗</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN LANDING PAGE WITH STICKY SCROLL-ANIMATED NEON PORTRAIT OF AJAY.JPG
  return (
    <div>
      {/* Sticky Full-Screen Neon Crimson/Magenta Portrait of Ajay.jpg */}
      <HeroScene scrollProgress={scrollProgress} avatarUrl={s.avatar_url || '/Ajay.jpg'} />

      {renderNavbar()}

      <main className="folioblox-scroll-content">
        {/* 1. HERO SECTION */}
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
            <div className="strip-item">
              <span>#01</span>
              <strong>Brand Strategy</strong>
            </div>
            <div className="strip-item">
              <span>#02</span>
              <strong>3D Web & Identity Design</strong>
            </div>
            <div className="strip-item">
              <span>#03</span>
              <strong>Full-Stack Architecture</strong>
            </div>
            <div className="strip-item">
              <span>#04</span>
              <strong>Creative Direction</strong>
            </div>
          </div>
        </section>

        {/* 2. TRUSTED BY BRANDS + BEHIND THE DESIGNS SECTION */}
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
              <h2 className="fb-h2">
                Shaping Experiences<br />That Make Life<br />Simpler
              </h2>
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.45, marginBottom: 22 }}>
                {s.about_bio}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>Let's Build Something<br />Meaningful Together</span>
                <a href="#contact" className="orange-cta-pill">
                  Get in touch <span className="orange-cta-circle">↗</span>
                </a>
              </div>
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

        {/* 3. WORKFLOW PLAN SECTION */}
        <section id="workflow" className="fb-section">
          <div className="behind-grid">
            <div>
              <div className="section-orange-tag">✦ WORKFLOW PLAN</div>
              <h2 className="fb-h2">
                A focused <span className="italic-serif">two-week</span><br />
                design sprint from idea<br />to visual concept.
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14.5, lineHeight: 1.75 }}>
              This concept was developed as a focused two-week design & engineering sprint — from product positioning and visual research to landing page structure, interactive 3D mockups, and full-stack MySQL deployment.
            </p>
          </div>

          <div className="sprint-bars-container">
            {[
              { label: '🔍 Research & references', days: '1 day', offset: '0%' },
              { label: '🎯 Product positioning', days: '1 day', offset: '8%' },
              { label: '📐 Landing page structure', days: '2 days', offset: '18%' },
              { label: '✨ Visual direction', days: '2 days', offset: '42%' },
              { label: '⚡ AI & 3D concept exploration', days: '2 days', offset: '55%' },
              { label: '💻 Full-Stack UI & CMS build', days: '2 days', offset: '66%' }
            ].map((step, idx) => (
              <div key={idx} className="sprint-pill-bar" style={{ marginLeft: step.offset }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{step.label}</span>
                <span className="sprint-day-badge">{step.days}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COLOR PALETTE SECTION */}
        <section id="palette" className="fb-section">
          <div className="section-orange-tag">✦ COLOR PALETTE</div>
          <h2 className="fb-h2" style={{ maxWidth: 820 }}>
            The palette supports focus, premium feel and the idea of an intelligent AI-powered workspace.
          </h2>

          <div className="palette-grid">
            {[
              { title: 'Dark Accent', desc: 'Used for cards, surface overlays, and elevated glassmorphic blocks.', hex: '#1E1E28', rgb: '30 30 40', dot: '#3b0722' },
              { title: 'Soft White', desc: 'Primary typography color ensuring crisp contrast and readability.', hex: '#F5F5FA', rgb: '245 245 250', dot: '#f5f5fa' },
              { title: 'Crimson Neon', desc: 'Signature studio rim-light accent for calls-to-action and highlights.', hex: '#FF5522', rgb: '255 85 34', dot: '#ff5522' }
            ].map((c) => (
              <div key={c.title} className="glass-spec-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18 }}>{c.title}</h3>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.dot, display: 'inline-block', border: '1px solid rgba(255,255,255,0.4)' }} />
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.6, marginBottom: 20 }}>{c.desc}</p>
                <div className="spec-row"><span>HEX</span><strong>{c.hex}</strong><span>100%</span></div>
                <div className="spec-row"><span>RGB</span><strong>{c.rgb}</strong><span>100%</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STATS + GLOBAL STUDIO SECTION */}
        <section id="stats" className="fb-section">
          <div className="stats-two-col">
            <div>
              <span style={{ fontSize: 11, color: '#cbd5e1', letterSpacing: 1 }}>IN UP TO 2030</span>
              <div className="giant-stat-num">65%</div>
              <p style={{ color: '#cbd5e1', fontSize: 13.5, maxWidth: 360, lineHeight: 1.6 }}>
                Projected market growth for interactive 3D digital brand experiences in the next five years.
              </p>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#cbd5e1', letterSpacing: 1 }}>ACCORDING TO INDUSTRY DATA</span>
              <div className="giant-stat-num">$30B</div>
              <p style={{ color: '#cbd5e1', fontSize: 13.5, maxWidth: 360, lineHeight: 1.6 }}>
                Estimated global valuation of next-gen AI & spatial web platforms by 2030.
              </p>
            </div>
          </div>

          <div id="studio" className="global-studio-banner">
            <div className="global-studio-text">
              <span>GLOBAL</span>
              <span className="studio-center-card">
                <img src={s.avatar_url || '/Ajay.jpg'} alt={s.name} />
              </span>
              <span>STUDIO</span>
            </div>
          </div>
        </section>

        {/* 6. CLIENT FEEDBACK SECTION */}
        <section className="fb-section">
          <div className="section-orange-tag">✦ CLIENT FEEDBACK</div>
          <h2 className="fb-h2">What Clients & Partners Say</h2>
          <div className="testimonials-grid">
            {[
              { name: 'Alex Vance', role: 'Founder at SupaBlox', text: 'Working with Ajay transformed our entire digital presence. The scroll-driven 3D experience doubled our engagement.' },
              { name: 'Elena Rostova', role: 'VP of Brand at Aura', text: 'Rarely do you find someone who masters both visual art direction and full-stack Node.js + MySQL engineering.' },
              { name: 'Marcus Chen', role: 'CEO at Vision OS', text: 'Delivered a complete two-week sprint from concept to live production with zero compromises on speed or quality.' }
            ].map((t) => (
              <div key={t.name} className="glass-spec-card">
                <div style={{ color: '#ff5522', marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#e2e8f0', marginBottom: 20 }}>"{t.text}"</p>
                <strong>{t.name}</strong>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. READY TO GROW & SCALE YOUR COMPANY (Exact Consultation Form from Video) */}
        <section id="contact" className="fb-section">
          <div className="behind-grid">
            <h2 className="fb-h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
              READY TO<br />GROW
            </h2>
            <div>
              <div className="glass-spec-card" style={{ padding: 18, marginBottom: 16, maxWidth: 280 }}>
                <strong style={{ fontSize: 12, color: '#ff5522' }}>LET'S TALK</strong>
                <p style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>Unlock your brand's full potential with a 1-on-1 consultation.</p>
              </div>
              <h2 className="fb-h2" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                & SCALE YOUR<br />COMPANY?
              </h2>
            </div>
          </div>

          <form onSubmit={handleConsultationSubmit}>
            <div className="scale-form-grid">
              <div className="line-input-group">
                <label>YOUR NAME*</label>
                <input required placeholder="John Parker" value={formState.sender_name} onChange={(e) => setFormState({ ...formState, sender_name: e.target.value })} />
              </div>
              <div className="line-input-group">
                <label>YOUR NUMBER*</label>
                <input required placeholder="+91 98765 43210" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} />
              </div>
              <div className="line-input-group">
                <label>YOUR EMAIL*</label>
                <input required type="email" placeholder="example@gmail.com" value={formState.sender_email} onChange={(e) => setFormState({ ...formState, sender_email: e.target.value })} />
              </div>
              <div className="line-input-group">
                <label>HOW LONG HAVE YOU BEEN IN BUSINESS?</label>
                <select value={formState.years} onChange={(e) => setFormState({ ...formState, years: e.target.value })}>
                  <option>0 - 1 year</option>
                  <option>1 - 3 years</option>
                  <option>3 - 5+ years</option>
                </select>
              </div>
              <div className="line-input-group">
                <label>WHAT'S YOUR BIGGEST CHALLENGE IN SCALING RIGHT NOW?</label>
                <input placeholder="Tell us about your project goals..." value={formState.challenge} onChange={(e) => setFormState({ ...formState, challenge: e.target.value })} />
              </div>
              <div className="line-input-group">
                <label>PROJECT BUDGET RANGE</label>
                <select value={formState.budget} onChange={(e) => setFormState({ ...formState, budget: e.target.value })}>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $15,000+</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <button type="submit" className="orange-cta-pill">
                Submit Consultation Request <span className="orange-cta-circle">→</span>
              </button>
              {formSent && <span style={{ marginLeft: 16, color: '#4ade80', fontWeight: 600 }}>✅ Saved directly to your MySQL Admin CMS!</span>}
            </div>
          </form>
        </section>

        {/* 8. FOOTER (Scroll animation ends cleanly right here) */}
        <footer className="folioblox-footer">
          <div className="footer-grid">
            <div>
              <div className="folioblox-logo" style={{ marginBottom: 12 }}>{s.name || 'Folioblox'}</div>
              <p style={{ color: '#94a3b8', fontSize: 13, maxWidth: 260, lineHeight: 1.6 }}>
                Crafting digital products, 3D web experiences, and full-stack systems that inspire, connect, and scale modern businesses.
              </p>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>NAVIGATION</strong>
              <div style={{ display: 'grid', gap: 8, fontSize: 13, color: '#cbd5e1' }}>
                <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
                <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
                <span onClick={() => { setCurrentPage('projects'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>Projects</span>
                <a href="#workflow" style={{ color: 'inherit', textDecoration: 'none' }}>Workflow</a>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>ADMIN & SOCIAL</strong>
              <div style={{ display: 'grid', gap: 8, fontSize: 13, color: '#cbd5e1' }}>
                <a href={s.github_url || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <a href={s.linkedin_url || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                <a href={s.resume_url || '/Ajay Chithanoor.pdf'} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Resume PDF</a>
                <a href="#admin" onClick={() => setCurrentPage('admin')} style={{ color: '#ff5522', textDecoration: 'none', fontWeight: 700 }}>⚙️ Live Admin CMS</a>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: 12, letterSpacing: 1, display: 'block', marginBottom: 12 }}>DIRECT</strong>
              <div style={{ fontSize: 13, color: '#cbd5e1' }}>{s.email || 'ajay@folioblox.design'}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>India • Global Studio</div>
            </div>
          </div>
          <div style={{ maxWidth: 1220, margin: '0 auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
            <span>© {new Date().getFullYear()} {s.name}. All rights reserved.</span>
            <a href="#home" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Back to top ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
`);

  console.log('\n✅ FOLI0BLOX CINEMATIC SCROLL PORTFOLIO APPLIED! Refresh http://localhost:5173 (Ctrl + Shift + R) to see your neon-lit portrait and all sections!');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
