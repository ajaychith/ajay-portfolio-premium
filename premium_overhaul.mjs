import fs from 'fs';

try {
  console.log('🎨 1. Rebuilding HeroScene.jsx (3D Spatial Hologram of Ajay.jpg + WebGL Orbital Gyroscope + Custom .GLB Support)...');

  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Sparkles, Torus, MeshDistortMaterial, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function CustomGLBAvatar({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.6, 0.08);
    }
  });
  return <primitive ref={ref} object={scene} scale={1.8} position={[0, -1.6, 0]} />;
}

function SpatialAjayRig({ avatarUrl = '/Ajay.jpg', accentColor = '#8b5cf6' }) {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreOrbRef = useRef();
  const cardTiltRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.25;
      outerRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.3 + state.pointer.y * 0.3;
      outerRingRef.current.rotation.y = Math.cos(t * 0.3) * 0.3 + state.pointer.x * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.4;
      innerRingRef.current.rotation.y = t * 0.35;
    }
    if (coreOrbRef.current) {
      coreOrbRef.current.position.x = Math.sin(t * 1.2) * 1.85;
      coreOrbRef.current.position.y = Math.cos(t * 1.2) * 1.35;
    }
    if (cardTiltRef.current) {
      cardTiltRef.current.rotation.y = THREE.MathUtils.lerp(cardTiltRef.current.rotation.y, state.pointer.x * 0.35, 0.08);
      cardTiltRef.current.rotation.x = THREE.MathUtils.lerp(cardTiltRef.current.rotation.x, -state.pointer.y * 0.25, 0.08);
    }
  });

  const isGLB = avatarUrl && avatarUrl.toLowerCase().endsWith('.glb');

  return (
    <group>
      {/* Ambient 3D Particles */}
      <Sparkles count={90} scale={6} size={2.2} speed={0.5} color={accentColor} />

      {/* Outer Cybernetic Gyroscope Ring */}
      <Torus ref={outerRingRef} args={[2.15, 0.018, 32, 120]}>
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.6} roughness={0.1} metalness={0.9} />
      </Torus>

      {/* Inner Tilted Energy Ring */}
      <Torus ref={innerRingRef} args={[1.82, 0.012, 32, 100]} rotation={[0.5, 0.4, 0]}>
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.4} />
      </Torus>

      {/* Orbiting Liquid Metal Shader Satellite */}
      <mesh ref={coreOrbRef} scale={0.28}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} distort={0.45} speed={3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center Interactive 3D Character / Spatial Portrait */}
      <Float speed={2.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <group ref={cardTiltRef}>
          {isGLB ? (
            <Suspense fallback={null}>
              <CustomGLBAvatar url={avatarUrl} />
            </Suspense>
          ) : (
            <Html transform distanceFactor={3.4} position={[0, 0, 0]} style={{ pointerEvents: 'none' }}>
              <div className="spatial-avatar-card">
                <div className="spatial-avatar-glow" />
                <img src={avatarUrl || '/Ajay.jpg'} alt="Ajay Chithanoor" className="spatial-avatar-img" />
                <div className="spatial-badge spatial-badge-top">⚡ 3D WebGL & Full-Stack</div>
                <div className="spatial-badge spatial-badge-bottom">
                  <span className="status-dot" /> Available for Projects
                </div>
              </div>
            </Html>
          )}
        </group>
      </Float>
    </group>
  );
}

export default function HeroScene({ accentColor = '#8b5cf6', avatarUrl = '/Ajay.jpg' }) {
  return (
    <div style={{ width: '100%', height: '540px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 5]} intensity={1.8} />
        <pointLight position={[-4, -3, 3]} intensity={2.5} color={accentColor} />
        <SpatialAjayRig avatarUrl={avatarUrl} accentColor={accentColor} />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.45} scale={9} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
`);

  console.log('⚡ 2. Creating Interactive 3D Tilt Tech Stack Matrix (src/components/TechStackSpheres.jsx)...');
  fs.writeFileSync('src/components/TechStackSpheres.jsx', `
import React from 'react';

export default function TechStackSpheres({ skills = [] }) {
  const defaultSkills = [
    { id: 1, name: 'React & Vite', category: 'Frontend Architecture', proficiency: 96, icon: '⚛️', color: '#38bdf8' },
    { id: 2, name: 'Three.js & WebGL', category: '3D Spatial UI', proficiency: 92, icon: '🧊', color: '#a855f7' },
    { id: 3, name: 'Node.js & Express', category: 'Backend Runtime', proficiency: 91, icon: '🟢', color: '#22c55e' },
    { id: 4, name: 'JavaScript / TypeScript', category: 'Core Languages', proficiency: 95, icon: '⚡', color: '#eab308' },
    { id: 5, name: 'MySQL & phpMyAdmin', category: 'Relational Database', proficiency: 89, icon: '🗄️', color: '#3b82f6' },
    { id: 6, name: 'GSAP & Framer Motion', category: 'Physics & Animation', proficiency: 94, icon: '✨', color: '#ec4899' },
    { id: 7, name: 'REST APIs & JWT Auth', category: 'Security & Cloud', proficiency: 90, icon: '🔐', color: '#14b8a6' },
    { id: 8, name: 'Tailwind & Modern CSS', category: 'Design Systems', proficiency: 95, icon: '🎨', color: '#6366f1' }
  ];

  const list = skills?.length
    ? skills.map((s, i) => ({
        ...s,
        icon: defaultSkills[i % defaultSkills.length].icon,
        color: defaultSkills[i % defaultSkills.length].color
      }))
    : defaultSkills;

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((y / rect.height) - 0.5) * -18;
    card.style.transform = \`perspective(800px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-4px)\`;
    card.style.setProperty('--mouse-x', \`\${x}px\`);
    card.style.setProperty('--mouse-y', \`\${y}px\`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div className="skills-bento-grid">
      {list.map((sk, i) => (
        <div
          key={sk.id || i}
          className="skill-3d-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="skill-card-header">
            <div className="skill-orb-icon" style={{ boxShadow: \`0 0 24px \${sk.color}44\`, borderColor: \`\${sk.color}66\` }}>
              <span>{sk.icon}</span>
            </div>
            <span className="skill-percent" style={{ color: sk.color }}>{sk.proficiency}%</span>
          </div>
          <h3 className="skill-title">{sk.name}</h3>
          <p className="skill-category">{sk.category}</p>
          <div className="skill-bar-track">
            <div
              className="skill-bar-fill"
              style={{ width: \`\${sk.proficiency}%\`, background: \`linear-gradient(90deg, \${sk.color}, #a855f7)\` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
`);

  console.log('💎 3. Upgrading Contact.jsx into a Split-Screen Executive Glass Panel...');
  fs.writeFileSync('src/components/Contact.jsx', `
import React, { useState } from 'react';
import axios from 'axios';

export default function Contact({ apiEndpoint, settings }) {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(apiEndpoint || 'http://localhost:5000/api/contact', form);
      setSent(true);
      setForm({ sender_name: '', sender_email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="contact-glass-wrapper">
        <div className="contact-info-side">
          <span className="eyebrow-badge">✦ INITIALIZE CONNECTION</span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Let’s Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32, fontSize: 15 }}>
            Whether you need an interactive 3D WebGL experience, a scalable Node.js & MySQL platform, or a custom full-stack product, drop a message below—it goes straight to my live Admin CMS.
          </p>

          <div className="contact-meta-list">
            <div className="contact-meta-item">
              <span className="meta-icon">📧</span>
              <div>
                <small>Direct Email</small>
                <strong>{settings?.email || 'ajay@example.com'}</strong>
              </div>
            </div>
            <div className="contact-meta-item">
              <span className="meta-icon">⚡</span>
              <div>
                <small>Tech Stack</small>
                <strong>React • Vite • Three.js • Node.js • MySQL</strong>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="contact-form-side">
          <div className="input-group">
            <label>YOUR NAME</label>
            <input
              required
              placeholder="e.g. Elon Musk"
              value={form.sender_name}
              onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>YOUR EMAIL</label>
            <input
              required
              type="email"
              placeholder="name@company.com"
              value={form.sender_email}
              onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>PROJECT DETAILS</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your timeline, goals, and requirements..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-glow-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Transmitting...' : 'Send Message to Admin CMS →'}
          </button>
          {sent && (
            <div className="success-toast">
              ✅ Message stored in MySQL! Check the MESSAGES tab inside ⚙️ Admin CMS.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
`);

  console.log('✨ 4. Writing Complete Awwwards-Grade CSS Design System (src/App.css)...');
  fs.writeFileSync('src/App.css', `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');

:root {
  --accent: #8b5cf6;
  --accent-secondary: #38bdf8;
  --bg-dark: #05050a;
  --card-bg: rgba(15, 17, 30, 0.72);
  --border-subtle: rgba(255, 255, 255, 0.09);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-dark);
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
  background-color: var(--bg-dark);
  background-image:
    radial-gradient(circle at 15% 10%, rgba(139, 92, 246, 0.16), transparent 35%),
    radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.12), transparent 35%),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
  overflow-x: hidden;
}

/* Custom Glowing Cursor */
.cursor-spotlight {
  position: fixed;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.13) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
}

/* Floating Glass Navbar */
.premium-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1220px, 92%);
  padding: 14px 28px;
  border-radius: 999px;
  background: rgba(10, 12, 22, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  font-size: 18px;
}

.brand-avatar-mini {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.6px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #fff;
}

.cms-pill-btn {
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(56, 189, 248, 0.25));
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: #fff !important;
}

/* Containers & Typography */
.section-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 100px 5%;
  position: relative;
  z-index: 2;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.14);
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #c4b5fd;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.section-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #c084fc 0%, #8b5cf6 45%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* HERO SECTION */
.hero-grid {
  max-width: 1260px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 120px 5% 60px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.7rem, 5.2vw, 4.6rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.hero-lead {
  color: #94a3b8;
  font-size: clamp(1rem, 1.25vw, 1.15rem);
  line-height: 1.75;
  max-width: 580px;
  margin-bottom: 32px;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 42px;
}

.btn-glow-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-glow-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 38px rgba(139, 92, 246, 0.55);
}

.btn-glass-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #f8fafc;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.btn-glass-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-stats-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-top: 28px;
  border-top: 1px solid var(--border-subtle);
  max-width: 520px;
}

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* 3D Spatial Portrait Card inside Three.js Canvas */
.spatial-avatar-card {
  width: 265px;
  height: 335px;
  border-radius: 26px;
  padding: 10px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(15, 23, 42, 0.85));
  border: 1px solid rgba(139, 92, 246, 0.55);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.75), 0 0 40px rgba(139, 92, 246, 0.35);
  position: relative;
  backdrop-filter: blur(16px);
}

.spatial-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 18px;
  display: block;
}

.spatial-badge {
  position: absolute;
  padding: 7px 13px;
  border-radius: 999px;
  background: rgba(10, 12, 24, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
}

.spatial-badge-top {
  top: -14px;
  right: -18px;
}

.spatial-badge-bottom {
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
}

/* WHAT I DO / SERVICES BENTO */
.bento-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.bento-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  padding: 32px;
  backdrop-filter: blur(16px);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  transform: translateY(-6px);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.15);
}

.bento-number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #a855f7;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(168, 85, 247, 0.12);
  display: inline-block;
  margin-bottom: 20px;
}

.pill-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.pill-tag {
  font-size: 11.5px;
  padding: 5px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #cbd5e1;
}

/* EXPERIENCE TIMELINE CARDS */
.experience-stack {
  display: grid;
  gap: 24px;
  margin-top: 48px;
  position: relative;
}

.experience-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  padding: 32px;
  border-radius: 22px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  align-items: start;
  transition: border-color 0.3s, transform 0.3s;
}

.experience-card:hover {
  border-color: rgba(56, 189, 248, 0.45);
  transform: translateX(6px);
}

.exp-duration-pill {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38bdf8;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

/* PROJECTS / MY WORK SHOWCASE */
.projects-showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
  margin-top: 48px;
}

.project-showcase-card {
  border-radius: 22px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s;
  display: flex;
  flex-direction: column;
}

.project-showcase-card:hover {
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.55);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
}

.project-img-box {
  position: relative;
  height: 230px;
  overflow: hidden;
}

.project-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-showcase-card:hover .project-img-box img {
  transform: scale(1.07);
}

.project-index-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(5, 5, 10, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  font-size: 14px;
  color: #c084fc;
}

.project-body {
  padding: 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 3D INTERACTIVE SKILLS BENTO */
.skills-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 22px;
  margin-top: 48px;
}

.skill-3d-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 26px;
  transition: transform 0.15s ease-out, border-color 0.3s;
  will-change: transform;
}

.skill-3d-card:hover {
  border-color: rgba(139, 92, 246, 0.5);
}

.skill-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.skill-orb-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  font-size: 22px;
}

.skill-percent {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  font-size: 18px;
}

.skill-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 4px;
}

.skill-category {
  font-size: 12.5px;
  color: #64748b;
  margin-bottom: 16px;
}

.skill-bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 999px;
}

/* CONTACT SPLIT GLASS PANEL */
.contact-glass-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  padding: 48px;
  border-radius: 28px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(20px);
}

.contact-meta-list {
  display: grid;
  gap: 18px;
}

.contact-meta-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
}

.meta-icon {
  font-size: 22px;
}

.contact-meta-item small {
  display: block;
  color: #64748b;
  font-size: 11px;
  text-transform: uppercase;
}

.contact-form-side {
  display: grid;
  gap: 18px;
}

.input-group label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(5, 5, 12, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: var(--accent);
}

.success-toast {
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #4ade80;
  font-size: 13px;
}

@media (max-width: 960px) {
  .hero-grid,
  .contact-glass-wrapper,
  .experience-card {
    grid-template-columns: 1fr;
  }
  .nav-links a:not(.cms-pill-btn) {
    display: none;
  }
}
`);

  console.log('🚀 5. Wiring Complete Executive Portfolio Layout in src/App.jsx...');
  fs.writeFileSync('src/App.jsx', `
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import HeroScene from './components/HeroScene';
import TechStackSpheres from './components/TechStackSpheres';
import Contact from './components/Contact';
import AdminCMS from './components/AdminCMS';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [data, setData] = useState(null);
  const [cursor, setCursor] = useState({ x: 500, y: 300 });
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      setData(res.data);
      if (res.data?.settings?.accent_color) {
        document.documentElement.style.setProperty('--accent', res.data.settings.accent_color);
      }
    } catch {
      console.warn('Using fallback portfolio data');
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const onHash = () => setIsAdminRoute(window.location.hash === '#admin');
    const onMouse = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('hashchange', onHash);
    window.addEventListener('mousemove', onMouse);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [fetchPortfolio]);

  if (isAdminRoute) {
    return <AdminCMS onUpdatePortfolio={fetchPortfolio} />;
  }

  const s = data?.settings || {
    name: 'Ajay Chithanoor',
    role: 'Interactive 3D Web & Full-Stack Engineer',
    tagline: 'Crafting spatial 3D WebGL experiences, high-velocity React & Vite frontends, and scalable Node.js + MySQL architectures.',
    about_bio: 'I blend high-performance 3D WebGL/Three.js interfaces with rock-solid Node.js & MySQL engineering. Every section of this portfolio is dynamically powered by a real-time Admin CMS.',
    avatar_url: '/Ajay.jpg',
    resume_url: '/Ajay Chithanoor.pdf',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    email: 'ajay@example.com',
    accent_color: '#8b5cf6'
  };

  const services = data?.services?.length ? data.services : [
    { id: 1, title: '3D WebGL & Spatial Interfaces', description: 'Custom Three.js scenes, interactive GLSL shaders, and 60fps hardware-accelerated React Three Fiber experiences.' },
    { id: 2, title: 'Full-Stack & Custom CMS Engineering', description: 'End-to-end Node.js, Express, and MySQL architectures with real-time A-to-Z administrative control.' },
    { id: 3, title: 'Design Systems & Motion Architecture', description: 'Handcrafted glassmorphic UI, responsive layouts, and tactile micro-interactions powered by GSAP & Framer Motion.' }
  ];

  const experiences = data?.experiences?.length ? data.experiences : [
    { id: 1, role: 'Senior Full-Stack & 3D Developer', company: 'Creative Tech Studio', duration: '2024 — PRESENT', description: 'Architected interactive 3D web applications and custom headless CMS platforms using React, Three.js, Node.js, and MySQL.' },
    { id: 2, role: 'Full-Stack Software Engineer', company: 'Digital Innovations', duration: '2022 — 2024', description: 'Built responsive enterprise dashboards, REST APIs, authentication pipelines, and relational database schemas.' }
  ];

  const projects = data?.projects?.length ? data.projects : [
    { id: 1, title: 'Spatial 3D Commerce Engine', description: 'Real-time 3D product configurator with custom WebGL lighting and full-stack Node.js checkout.', tech_stack: 'React • Three.js • Vite • Node.js', image_url: '/project1.jpg', live_url: '#', github_url: '#' },
    { id: 2, title: 'Autonomous Cloud Telemetry', description: 'High-throughput telemetry dashboard with reactive 3D tilt cards and live MySQL data streams.', tech_stack: 'TypeScript • React • MySQL • Express', image_url: '/project2.jpg', live_url: '#', github_url: '#' },
    { id: 3, title: 'Neural Design System', description: 'Interactive component library featuring spring physics, spatial glassmorphism, and token automation.', tech_stack: 'React • GSAP • Framer Motion', image_url: '/project3.jpg', live_url: '#', github_url: '#' },
    { id: 4, title: 'Quantum FinTech Portal', description: 'Next-generation financial analytics platform with real-time security visualization.', tech_stack: 'Node.js • React • Three.js', image_url: '/project4.jpg', live_url: '#' }
  ];

  return (
    <div>
      {/* Ambient Cursor Spotlight */}
      <div className="cursor-spotlight" style={{ left: cursor.x, top: cursor.y }} />

      {/* Floating Glassmorphic Navbar */}
      <header className="premium-navbar">
        <a href="#home" className="brand-logo">
          <img src={s.avatar_url || '/Ajay.jpg'} alt={s.name} className="brand-avatar-mini" />
          <span>{s.name?.toUpperCase()}</span>
        </a>
        <nav className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#services">WHAT I DO</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#work">WORK</a>
          <a href="#skills">TECH STACK</a>
          <a href="#contact">CONTACT</a>
          <a href="#admin" className="cms-pill-btn">⚙️ ADMIN CMS</a>
        </nav>
      </header>

      {/* HERO SECTION WITH 3D SPATIAL HOLOGRAM OF AJAY.JPG */}
      <section id="home" className="hero-grid">
        <div>
          <div className="eyebrow-badge">
            <span className="status-dot" /> HANDCRAFTED 3D PORTFOLIO + LIVE MYSQL CMS
          </div>
          <h1 className="hero-title">
            Hi, I’m <span className="gradient-text">{s.name}</span>
          </h1>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)', fontWeight: 700, color: '#e2e8f0', marginBottom: 18 }}>
            {s.role}
          </h2>
          <p className="hero-lead">{s.about_bio || s.tagline}</p>

          <div className="hero-cta-row">
            <a href="#work" className="btn-glow-primary">Explore Featured Work ↓</a>
            <a href={s.resume_url || '/Ajay Chithanoor.pdf'} target="_blank" rel="noreferrer" className="btn-glass-secondary">
              Download Resume 📄
            </a>
            <a href="#admin" className="btn-glass-secondary">Edit Live in CMS ⚙️</a>
          </div>

          <div className="hero-stats-bar">
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Dynamic MySQL CMS</div>
            </div>
            <div>
              <div className="stat-value">60 FPS</div>
              <div className="stat-label">Interactive 3D WebGL</div>
            </div>
            <div>
              <div className="stat-value">A — Z</div>
              <div className="stat-label">Full-Stack Control</div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive 3D Gyroscope + Spatial Portrait of Ajay.jpg */}
        <div>
          <HeroScene accentColor={s.accent_color || '#8b5cf6'} avatarUrl={s.avatar_url || '/Ajay.jpg'} />
        </div>
      </section>

      {/* WHAT I DO / SERVICES BENTO GRID */}
      <section id="services" className="section-container">
        <span className="eyebrow-badge">✦ CAPABILITIES & ARCHITECTURE</span>
        <h2 className="section-heading">
          What <span className="gradient-text">I Do</span>
        </h2>

        <div className="bento-services-grid">
          {services.map((srv, idx) => (
            <div key={srv.id || idx} className="bento-card">
              <span className="bento-number">0{idx + 1} // CAPABILITY</span>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{srv.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14.5 }}>{srv.description}</p>
              <div className="pill-cloud">
                {(idx === 0
                  ? ['Three.js', 'React Three Fiber', 'WebGL Shaders', 'Spatial UI']
                  : idx === 1
                  ? ['Node.js', 'Express', 'MySQL', 'phpMyAdmin', 'REST APIs']
                  : ['React 19', 'Vite', 'TypeScript', 'GSAP', 'Framer Motion']
                ).map((t) => (
                  <span key={t} className="pill-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER & EXPERIENCE SECTION */}
      <section id="experience" className="section-container">
        <span className="eyebrow-badge">✦ CAREER TRAJECTORY</span>
        <h2 className="section-heading">
          My Career & <span className="gradient-text">Experience</span>
        </h2>

        <div className="experience-stack">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="experience-card">
              <div>
                <span className="exp-duration-pill">{exp.duration}</span>
                <p style={{ color: '#c084fc', fontWeight: 700, fontSize: 14, marginTop: 12 }}>{exp.company}</p>
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{exp.role}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: 15 }}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK / PROJECTS SECTION */}
      <section id="work" className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="eyebrow-badge">✦ SELECTED PRODUCTION BUILDS</span>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Work</span>
            </h2>
          </div>
          <a href="#admin" className="btn-glass-secondary">+ Add / Edit Projects in CMS</a>
        </div>

        <div className="projects-showcase-grid">
          {projects.map((p, index) => (
            <div key={p.id || index} className="project-showcase-card">
              <div className="project-img-box">
                <span className="project-index-badge">{String(index + 1).padStart(2, '0')}</span>
                <img src={p.image_url || \`/project\${(index % 4) + 1}.jpg\`} alt={p.title} />
              </div>
              <div className="project-body">
                <div>
                  <div style={{ color: '#a855f7', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                    {p.tech_stack}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
                    {p.description}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <a href={p.live_url || '#'} className="btn-glow-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
                    Live Preview ↗
                  </a>
                  <a href={p.github_url || '#'} className="btn-glass-secondary" style={{ padding: '10px 18px', fontSize: 13 }}>
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE 3D TECH STACK SECTION */}
      <section id="skills" className="section-container">
        <span className="eyebrow-badge">✦ INTERACTIVE 3D TILT ARSENAL</span>
        <h2 className="section-heading">
          My <span className="gradient-text">Tech Stack</span>
        </h2>
        <p style={{ color: '#94a3b8', marginTop: 10, maxWidth: 600 }}>
          Hover over any card to experience real-time 3D perspective tilt. All proficiencies and tools are editable inside your MySQL Admin CMS.
        </p>
        <TechStackSpheres skills={data?.skills} />
      </section>

      {/* CONTACT SECTION */}
      <Contact apiEndpoint={\`\${API}/contact\`} settings={s} />

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '36px 5%', textAlign: 'center', color: '#64748b', fontSize: 13 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span>© {new Date().getFullYear()} {s.name}. Handcrafted with React, Vite, Three.js, Node.js & MySQL.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href={s.github_url} style={{ color: '#94a3b8', textDecoration: 'none' }}>GitHub</a>
            <a href={s.linkedin_url} style={{ color: '#94a3b8', textDecoration: 'none' }}>LinkedIn</a>
            <a href="#admin" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 700 }}>⚙️ Admin CMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
`);

  console.log('\n✅ COMPLETE PREMIUM UI/UX OVERHAUL APPLIED! Your browser will hot-reload automatically.');
} catch (err) {
  console.error('❌ Error applying overhaul:', err.message);
  process.exit(1);
}
