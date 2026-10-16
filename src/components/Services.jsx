
import React from 'react';
import TiltSurface from './TiltSurface';

export default function Services({ items }) {
  const list = items?.length ? items : [
    { id: 1, title: '3D WebGL Experiences', description: 'Interactive Three.js & shader craftsmanship.' }
  ];
  return (
    <section id="services" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
        {list.map((s) => (
          <TiltSurface key={s.id}>
            <div style={{ padding: 26, borderRadius: 16, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0 }}>{s.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{s.description}</p>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
