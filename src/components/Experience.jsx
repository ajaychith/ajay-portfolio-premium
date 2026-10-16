
import React from 'react';

export default function Experience({ items }) {
  const list = items?.length ? items : [
    { id: 1, role: 'Senior Full-Stack & 3D Developer', company: 'Creative Tech Studio', duration: '2024 - Present', description: 'Built interactive 3D web apps.' }
  ];
  return (
    <section id="experience" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Experience</h2>
      <div style={{ display: 'grid', gap: 20 }}>
        {list.map((ex) => (
          <div key={ex.id} style={{ padding: 24, borderRadius: 16, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0 }}>{ex.role} — <span style={{ color: '#818cf8' }}>{ex.company}</span></h3>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{ex.duration}</span>
            </div>
            <p style={{ color: '#cbd5e1', marginTop: 12, lineHeight: 1.6 }}>{ex.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
