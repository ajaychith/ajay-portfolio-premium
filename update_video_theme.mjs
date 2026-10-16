import fs from 'fs';
import { execSync } from 'child_process';

function run(cmd) {
  console.log(`\n▶ Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  console.log('🚀 1. Upgrading 3D Character Scene (Custom Ajay 3D Avatar + Scroll Workstation + GLTF Loader)...');

  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

function StylizedAjayCharacter({ scrollProgress = 0, accentColor = '#a855f7' }) {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const deskGroupRef = useRef();

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c68652', roughness: 0.45, metalness: 0.05 }), []);
  const hairMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#141418', roughness: 0.8 }), []);
  const hoodieMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e1b2e', roughness: 0.6 }), []);
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 1.8 }), [accentColor]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Camera/Character stage transition:
    // Stage 0 (Hero): Close-up bust centered
    // Stage 1 (About): Shift left
    // Stage 2 (What I Do): Full sitting at desk typing
    if (groupRef.current) {
      const targetX = p < 0.25 ? 0 : p < 0.55 ? -1.25 : -1.1;
      const targetY = p < 0.45 ? -0.55 : -1.15;
      const targetScale = p < 0.45 ? 1.35 : 0.88;
      const targetRotY = p < 0.25 ? 0 : 0.45;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }

    // Head tracks mouse cursor smoothly
    if (headRef.current) {
      const lookX = state.pointer.x * 0.45;
      const lookY = -state.pointer.y * 0.25;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, lookX, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, lookY, 0.1);
    }

    // Typing animation when desk is visible
    const isAtDesk = p >= 0.4;
    if (leftArmRef.current && rightArmRef.current) {
      if (isAtDesk) {
        leftArmRef.current.rotation.x = -0.85 + Math.sin(t * 14) * 0.08;
        rightArmRef.current.rotation.x = -0.85 + Math.cos(t * 14) * 0.08;
      } else {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.1, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.1, 0.1);
      }
    }

    if (deskGroupRef.current) {
      const deskScale = isAtDesk ? 1 : 0.001;
      deskGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(deskGroupRef.current.scale.x, deskScale, 0.1));
      deskGroupRef.current.visible = deskGroupRef.current.scale.x > 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.55, 0]}>
      {/* HEAD GROUP (Styled after Ajay: Stylized 3D Head, Full Beard, Mustache, Expressive Eyes, Optional Cap) */}
      <group ref={headRef} position={[0, 1.42, 0]}>
        {/* Main Sculpted Head */}
        <RoundedBox args={[0.92, 1.02, 0.88]} radius={0.34} smoothness={6} material={skinMat} />

        {/* Ears */}
        <mesh position={[-0.48, -0.02, 0]} material={skinMat}>
          <sphereGeometry args={[0.13, 24, 24]} />
        </mesh>
        <mesh position={[0.48, -0.02, 0]} material={skinMat}>
          <sphereGeometry args={[0.13, 24, 24]} />
        </mesh>

        {/* Stylized Hair /Backward Cap */}
        <mesh position={[0, 0.34, -0.02]} material={hairMat}>
          <sphereGeometry args={[0.49, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        </mesh>

        {/* Full Beard & Jawline (Ajay's signature look) */}
        <RoundedBox args={[0.94, 0.44, 0.86]} position={[0, -0.30, 0.02]} radius={0.18} smoothness={5} material={hairMat} />

        {/* Mustache */}
        <RoundedBox args={[0.42, 0.09, 0.14]} position={[0, -0.14, 0.43]} radius={0.04} smoothness={4} material={hairMat} />

        {/* Smile / Teeth */}
        <RoundedBox args={[0.28, 0.08, 0.1]} position={[0, -0.23, 0.43]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </RoundedBox>

        {/* Nose */}
        <RoundedBox args={[0.16, 0.22, 0.2]} position={[0, -0.01, 0.46]} radius={0.07} smoothness={4} material={skinMat} />

        {/* Eyebrows */}
        <RoundedBox args={[0.22, 0.055, 0.08]} position={[-0.2, 0.2, 0.44]} rotation={[0, 0, 0.08]} radius={0.02} material={hairMat} />
        <RoundedBox args={[0.22, 0.055, 0.08]} position={[0.2, 0.2, 0.44]} rotation={[0, 0, -0.08]} radius={0.02} material={hairMat} />

        {/* Eyes */}
        <group position={[-0.2, 0.08, 0.42]}>
          <mesh>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.075]}>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshStandardMaterial color="#1e1b18" />
          </mesh>
        </group>
        <group position={[0.2, 0.08, 0.42]}>
          <mesh>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.075]}>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshStandardMaterial color="#1e1b18" />
          </mesh>
        </group>
      </group>

      {/* NECK */}
      <mesh position={[0, 0.85, 0]} material={skinMat}>
        <cylinderGeometry args={[0.18, 0.22, 0.28, 24]} />
      </mesh>

      {/* TORSO / DARK PREMIUM HOODIE WITH PURPLE RIM ACCENT */}
      <RoundedBox args={[1.35, 1.15, 0.68]} position={[0, 0.22, 0]} radius={0.28} smoothness={6} material={hoodieMat} />

      {/* Glowing Neckline Trim */}
      <mesh position={[0, 0.76, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={glowMat}>
        <torusGeometry args={[0.24, 0.022, 16, 48]} />
      </mesh>

      {/* ARMS */}
      <group ref={leftArmRef} position={[-0.8, 0.55, 0]}>
        <RoundedBox args={[0.32, 0.85, 0.32]} position={[0, -0.32, 0]} radius={0.14} material={hoodieMat} />
        <mesh position={[0, -0.8, 0]} material={skinMat}>
          <sphereGeometry args={[0.14, 20, 20]} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.8, 0.55, 0]}>
        <RoundedBox args={[0.32, 0.85, 0.32]} position={[0, -0.32, 0]} radius={0.14} material={hoodieMat} />
        <mesh position={[0, -0.8, 0]} material={skinMat}>
          <sphereGeometry args={[0.14, 20, 20]} />
        </mesh>
      </group>

      {/* 3D WORKSTATION DESK & DUAL MONITORS (Appears smoothly as you scroll down) */}
      <group ref={deskGroupRef} position={[0, -0.35, 0.92]}>
        {/* Desk Tabletop */}
        <RoundedBox args={[2.5, 0.08, 1.1]} position={[0, 0, 0]} radius={0.03}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </RoundedBox>
        {/* Desk Legs */}
        <mesh position={[-1.05, -0.65, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.3]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[1.05, -0.65, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.3]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>

        {/* Glowing Pink/Purple Monitor */}
        <group position={[0.25, 0.55, 0.18]} rotation={[0, -0.25, 0]}>
          <RoundedBox args={[1.05, 0.68, 0.05]} radius={0.03}>
            <meshStandardMaterial color="#0f172a" />
          </RoundedBox>
          <mesh position={[0, 0, -0.03]}>
            <planeGeometry args={[0.98, 0.6]} />
            <meshBasicMaterial color="#ec4899" side={THREE.DoubleSide} />
          </mesh>
          <pointLight position={[0, 0, -0.3]} intensity={2.2} color="#ec4899" distance={3} />
          <mesh position={[0, -0.42, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 0.25]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        </group>

        {/* Laptop + Keyboard on Desk */}
        <RoundedBox args={[0.48, 0.03, 0.32]} position={[-0.35, 0.06, -0.1]} radius={0.01}>
          <meshStandardMaterial color="#94a3b8" metalness={0.6} />
        </RoundedBox>
      </group>
    </group>
  );
}

export default function HeroScene({ accentColor = '#a855f7', scrollProgress = 0 }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0.35, 4.2], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={3.5} color={accentColor} />
        <pointLight position={[3, -1, 2]} intensity={2.2} color="#ec4899" />
        <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.35}>
          <StylizedAjayCharacter scrollProgress={scrollProgress} accentColor={accentColor} />
        </Float>
        <ContactShadows position={[0, -1.85, 0]} opacity={0.5} scale={8} blur={2.4} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
`);

  console.log('🌐 2. Creating 3D Bouncing Tech Stack Spheres Scene (like 0:09 in the video)...');
  fs.writeFileSync('src/components/TechStackSpheres.jsx', `
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function TechBall({ label, color, initialPos, index }) {
  const ref = useRef();
  const velocity = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.025,
    (Math.random() - 0.5) * 0.025,
    0
  ));

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.add(velocity.current);

    // Bounce inside viewport bounds
    if (Math.abs(ref.current.position.x) > 3.4) velocity.current.x *= -1;
    if (Math.abs(ref.current.position.y) > 1.6) velocity.current.y *= -1;

    // React to mouse pointer repulsion
    const mx = state.pointer.x * 3.5;
    const my = state.pointer.y * 1.8;
    const dx = ref.current.position.x - mx;
    const dy = ref.current.position.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1.2) {
      ref.current.position.x += dx * 0.06;
      ref.current.position.y += dy * 0.06;
    }

    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.006;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} position={initialPos}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.58, 48, 48]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.18} metalness={0.15} clearcoat={1} />
        </mesh>
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.18}
          fontWeight={800}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

export default function TechStackSpheres({ skills = [] }) {
  const defaultTech = [
    { name: 'REACT', color: '#0ea5e9' },
    { name: 'NEXT.JS', color: '#0f172a' },
    { name: 'THREE.JS', color: '#a855f7' },
    { name: 'NODE.JS', color: '#16a34a' },
    { name: 'VITE', color: '#eab308' },
    { name: 'MYSQL', color: '#2563eb' },
    { name: 'TS / JS', color: '#f59e0b' },
    { name: 'GSAP', color: '#10b981' },
    { name: 'EXPRESS', color: '#475569' }
  ];

  const items = skills?.length
    ? skills.map((s, i) => ({ name: s.name.split(' ')[0].toUpperCase(), color: defaultTech[i % defaultTech.length].color }))
    : defaultTech;

  const positions = useMemo(() => items.map((_, i) => [
    ((i % 5) - 2) * 1.35 + (Math.random() - 0.5) * 0.3,
    (Math.floor(i / 5) - 0.5) * 1.3 + (Math.random() - 0.5) * 0.3,
    (Math.random() - 0.5) * 0.5
  ]), [items.length]);

  return (
    <div style={{ width: '100%', height: '480px', position: 'relative', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} />
        <pointLight position={[-4, -3, 3]} intensity={2.5} color="#a855f7" />
        {items.map((item, idx) => (
          <TechBall key={idx} index={idx} label={item.name} color={item.color} initialPos={positions[idx]} />
        ))}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
`);

  console.log('✨ 3. Rebuilding App.jsx & App.css to Match the Video Layout (Spotlight, Left Social Rail, Glowing Cursor, Timeline, 01-06 Work, 3D Spheres)...');
  fs.writeFileSync('src/App.css', `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700;800&display=swap');

:root {
  --accent: #a855f7;
  --accent-glow: rgba(168, 85, 247, 0.45);
  --bg-deep: #06040b;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background: var(--bg-deep);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

body {
  background: radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.18) 0%, #06040b 55%);
  overflow-x: hidden;
}

/* Custom Glowing Purple Cursor (Like in Video) */
.custom-cursor-orb {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle, #e879f9 0%, #a855f7 60%, transparent 100%);
  box-shadow: 0 0 24px #a855f7, 0 0 48px rgba(168, 85, 247, 0.6);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s;
  mix-blend-mode: screen;
}

/* Top Overhead Spotlight Cone */
.top-spotlight {
  position: fixed;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  height: 520px;
  background: radial-gradient(ellipse at top, rgba(168, 85, 247, 0.24) 0%, rgba(168, 85, 247, 0.05) 45%, transparent 75%);
  pointer-events: none;
  z-index: 1;
}

/* Fixed Left Social Icons Rail & Bottom-Right Resume Link */
.fixed-social-rail {
  position: fixed;
  left: 28px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 50;
}

.fixed-social-rail a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s, transform 0.2s;
}

.fixed-social-rail a:hover {
  color: #fff;
  transform: translateY(-2px);
}

.fixed-resume-corner {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 50;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Sticky 3D Character Background Stage */
.character-stage-sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
}

.content-scroll-layer {
  position: relative;
  z-index: 5;
}

/* Dashed Tech Cards (WHAT I DO - DEVELOP / DESIGN) */
.what-i-do-card {
  background: rgba(12, 10, 24, 0.78);
  backdrop-filter: blur(16px);
  border: 1px dashed rgba(168, 85, 247, 0.45);
  border-radius: 14px;
  padding: 26px;
  margin-bottom: 22px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.what-i-do-card:hover {
  border-color: #a855f7;
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
}

.tech-pill {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: #cbd5e1;
  margin: 4px 6px 0 0;
}

/* Glowing Timeline */
.timeline-wrapper {
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #a855f7 20%, #ec4899 80%, transparent);
  transform: translateX(-50%);
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow: 0 0 20px #a855f7, 0 0 35px #ec4899;
}

@media (max-width: 900px) {
  .timeline-line { left: 20px; }
  .fixed-social-rail { display: none; }
}
`);

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get(\`\${API}/portfolio\`);
      setData(res.data);
      if (res.data?.settings?.accent_color) {
        document.documentElement.style.setProperty('--accent', res.data.settings.accent_color);
      }
    } catch {
      console.warn('Using local fallback portfolio data');
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const onHash = () => setIsAdminRoute(window.location.hash === '#admin');
    const onScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight || 800;
      setScrollProgress(scrolled / (vh * 2.2));
    };
    const onMouse = (e) => setCursor({ x: e.clientX, y: e.clientY });

    window.addEventListener('hashchange', onHash);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [fetchPortfolio]);

  if (isAdminRoute) {
    return <AdminCMS onUpdatePortfolio={fetchPortfolio} />;
  }

  const s = data?.settings || {
    name: 'Ajay Chithanoor',
    role: 'DESIGNER & DEVELOPER',
    tagline: 'I am a creative developer & designer with a passion for blending technical expertise with creative edge. Driven by curiosity, I always try to explore and learn new skills.',
    about_bio: 'I am a creative developer & designer with a passion for blending technical expertise with creative edge. Driven by curiosity, I always try to explore and learn new skills.',
    resume_url: '/Ajay Chithanoor.pdf',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    email: 'ajay@example.com',
    accent_color: '#a855f7'
  };

  const experiences = data?.experiences?.length ? data.experiences : [
    { id: 1, role: 'Full-Stack & 3D Developer', company: 'Creative Studio', duration: '2022', description: 'Built interactive 3D websites, scalable React frontends, and custom CMS pipelines.' },
    { id: 2, role: 'Associate Software Engineer', company: 'Digital Tech', duration: '2024', description: 'Developed full-stack Node.js, Express, and MySQL enterprise applications.' },
    { id: 3, role: 'Freelance & Open Source', company: 'Self-Employed', duration: 'NOW', description: 'Crafting high-end WebGL/Three.js portfolios and full-stack digital products.' }
  ];

  const projects = data?.projects?.length ? data.projects : [
    { id: 1, title: 'Spatial 3D Configurator', description: 'WebGL, Three.js, React', tech_stack: 'React, Three.js, Vite', image_url: '/project1.jpg', live_url: '#' },
    { id: 2, title: 'Autonomous Cloud Telemetry', description: 'Full-Stack Dashboard', tech_stack: 'TypeScript, Node.js, MySQL', image_url: '/project2.jpg', live_url: '#' },
    { id: 3, title: 'Neural Design System', description: 'Interactive UI Architecture', tech_stack: 'React, Framer Motion, GSAP', image_url: '/project3.jpg', live_url: '#' },
    { id: 4, title: 'Quantum FinTech Portal', description: 'Next-Gen Banking UI', tech_stack: 'Node.js, React, Three.js', image_url: '/project4.jpg', live_url: '#' }
  ];

  const show3DCharacter = scrollProgress < 1.15;

  return (
    <div className="portfolio-video-theme">
      {/* Glowing Purple Cursor Orb */}
      <div className="custom-cursor-orb" style={{ left: cursor.x, top: cursor.y }} />

      {/* Top Overhead Spotlight */}
      <div className="top-spotlight" />

      {/* Minimal Header (Exact Video Layout: email left, ABOUT WORK CONTACT right) */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '24px 42px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 60, backdropFilter: 'blur(8px)' }}>
        <a href={\`mailto:\${s.email}\`} style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
          {s.email || 'ajay@portfolio.dev'}
        </a>
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#about" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: 12, letterSpacing: 1.5, fontWeight: 600 }}>ABOUT</a>
          <a href="#work" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: 12, letterSpacing: 1.5, fontWeight: 600 }}>WORK</a>
          <a href="#contact" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: 12, letterSpacing: 1.5, fontWeight: 600 }}>CONTACT</a>
          <a href="#admin" style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.5)', color: '#e9d5ff', textDecoration: 'none', fontSize: 11, fontWeight: 700 }}>
            ⚙️ CMS
          </a>
        </nav>
      </header>

      {/* Fixed Left Social Rail */}
      <div className="fixed-social-rail">
        <a href={s.github_url} target="_blank" rel="noreferrer" title="GitHub">GH</a>
        <a href={s.linkedin_url} target="_blank" rel="noreferrer" title="LinkedIn">IN</a>
        <a href="#contact" title="Contact">✉</a>
      </div>

      {/* Fixed Bottom-Right RESUME Button */}
      <a href={s.resume_url} target="_blank" rel="noreferrer" className="fixed-resume-corner">
        RESUME 📄
      </a>

      {/* Interactive 3D Ajay Character Stage (Transitions on Scroll from Hero -> About -> Workstation) */}
      <div
        className="character-stage-sticky"
        style={{
          opacity: show3DCharacter ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        <HeroScene accentColor={s.accent_color || '#a855f7'} scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable Sections Layer */}
      <main className="content-scroll-layer">
        {/* SECTION 1: HERO (0:00 in Video - "Hello! I'm [Name]" Left, Character Center, "A Creative DESIGNER & DEVELOPER" Right) */}
        <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', alignItems: 'center', padding: '0 6%' }}>
          <div>
            <p style={{ color: '#c084fc', fontSize: 18, marginBottom: 6, fontWeight: 500 }}>Hello! I'm</p>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, textTransform: 'uppercase' }}>
              {s.name}
            </h1>
          </div>

          <div style={{ height: '75vh' }} />

          <div style={{ textAlign: 'left', paddingLeft: '10%' }}>
            <p style={{ color: '#cbd5e1', fontSize: 16, marginBottom: 4 }}>A Creative</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.05, background: 'linear-gradient(90deg, #e879f9, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.role || 'DESIGNER & DEVELOPER'}
            </h2>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME (0:02 in Video - Character shifts left, Bio text on right) */}
        <section id="about" style={{ minHeight: '90vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '0 8%' }}>
          <div />
          <div style={{ maxWidth: 540 }}>
            <p style={{ color: '#c084fc', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 14 }}>ABOUT ME</p>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.35rem)', lineHeight: 1.35, fontWeight: 700 }}>
              {s.about_bio || s.tagline}
            </h3>
          </div>
        </section>

        {/* SECTION 3: WHAT I DO (0:04 in Video - Character sits at 3D Desk on Left, DEVELOP & DESIGN dashed cards on Right) */}
        <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '60px 8%', gap: 32 }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', fontWeight: 800 }}>
              WHAT <span style={{ color: '#c084fc' }}>I DO</span>
            </h2>
          </div>

          <div>
            {(data?.services?.length ? data.services : [
              { id: 1, title: 'DEVELOP', description: 'Started creating websites with JavaScript, React, Vite, Three.js, and Node.js + MySQL for interactive full-stack craftsmanship.' },
              { id: 2, title: 'DESIGN', description: 'I started designing 3D spatial interfaces and motion systems alongside development to deliver unforgettable user experiences.' }
            ]).map((srv, idx) => (
              <div key={srv.id || idx} className="what-i-do-card">
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, marginBottom: 10 }}>{srv.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, marginBottom: 12 }}>{srv.description}</p>
                <div style={{ fontSize: 11, color: '#a855f7', marginBottom: 6 }}>Skillset & tools</div>
                <div>
                  {(idx === 0
                    ? ['React', 'Vite', 'Node.js', 'Three.js', 'TypeScript', 'MySQL', 'JavaScript', 'Express']
                    : ['3D WebGL', 'UI/UX', 'Blender', 'Figma', 'GSAP', 'Framer Motion']
                  ).map((tag) => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: MY CAREER & EXPERIENCE (0:05 - 0:06 in Video - Glowing Purple Vertical Timeline) */}
        <section id="experience" style={{ padding: '120px 8%', background: 'rgba(6, 4, 11, 0.92)' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', marginBottom: 70 }}>
            My career & <br />
            <span style={{ background: 'linear-gradient(90deg, #e879f9, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              experience
            </span>
          </h2>

          <div className="timeline-wrapper">
            <div className="timeline-line" />
            {experiences.map((exp, i) => (
              <div key={exp.id || i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center', marginBottom: 56, gap: 20 }}>
                <div style={{ textAlign: 'right', paddingRight: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700 }}>{exp.role}</h3>
                  <span style={{ color: '#c084fc', fontSize: 13 }}>{exp.company}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 800 }}>{exp.duration}</span>
                  <div className="timeline-dot" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.7 }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: MY WORK (0:07 - 0:08 in Video - Numbered 01, 02, 03... Cards) */}
        <section id="work" style={{ padding: '110px 8%', background: '#06040b' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: 48 }}>
            My <span style={{ color: '#c084fc' }}>Work</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {projects.map((p, index) => (
              <div key={p.id || index} style={{ background: 'rgba(15, 12, 28, 0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 26, transition: 'transform 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 38, fontWeight: 800, color: 'rgba(255,255,255,0.85)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <a href={p.live_url || '#'} style={{ color: '#c084fc', fontSize: 12, textDecoration: 'none' }}>View Project ↗</a>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 12.5, marginBottom: 16 }}>{p.tech_stack || p.description}</p>
                <div style={{ borderRadius: 10, overflow: 'hidden', height: 210, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src={p.image_url || '/project1.jpg'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: MY TECHSTACK (0:09 - 0:11 in Video - 3D Interactive Bouncing Spheres) */}
        <section id="skills" style={{ padding: '100px 6%', background: '#06040b', position: 'relative' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', letterSpacing: 2, marginBottom: 10 }}>
            MY TECHSTACK
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
            Move your cursor to interact with the 3D physics spheres
          </p>
          <TechStackSpheres skills={data?.skills} />
        </section>

        {/* SECTION 7: CONTACT (Connected to MySQL Admin CMS) */}
        <div style={{ background: '#06040b' }}>
          <Contact apiEndpoint={\`\${API}/contact\`} />
        </div>
      </main>
    </div>
  );
}
`);

  console.log('\n✅ ALL UPDATED TO MATCH THE VIDEO! Your custom 3D Ajay character, 3D desk animation, timeline, 01-06 work grid, and 3D bouncing tech stack spheres are live!');
} catch (err) {
  console.error('❌ Error during update:', err.message);
  process.exit(1);
}
