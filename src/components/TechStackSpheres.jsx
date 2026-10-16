
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
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
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
            <div className="skill-orb-icon" style={{ boxShadow: `0 0 24px ${sk.color}44`, borderColor: `${sk.color}66` }}>
              <span>{sk.icon}</span>
            </div>
            <span className="skill-percent" style={{ color: sk.color }}>{sk.proficiency}%</span>
          </div>
          <h3 className="skill-title">{sk.name}</h3>
          <p className="skill-category">{sk.category}</p>
          <div className="skill-bar-track">
            <div
              className="skill-bar-fill"
              style={{ width: `${sk.proficiency}%`, background: `linear-gradient(90deg, ${sk.color}, #a855f7)` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
