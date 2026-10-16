
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
                <div style={{ width: `${sk.proficiency}%`, height: '100%', background: 'var(--accent, #6366f1)', borderRadius: 99 }} />
              </div>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
