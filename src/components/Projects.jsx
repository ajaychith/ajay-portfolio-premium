
import React from 'react';
import TiltSurface from './TiltSurface';

export default function Projects({ items }) {
  const list = items?.length ? items : [
    { id: 1, title: 'Spatial 3D Commerce Engine', description: 'Real-time 3D configurator.', tech_stack: 'React, Three.js, Node.js', image_url: '/project1.jpg', live_url: '#', github_url: '#' }
  ];
  return (
    <section id="projects" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>Featured 3D & Full-Stack Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 26 }}>
        {list.map((p) => (
          <TiltSurface key={p.id}>
            <div style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={p.image_url || '/project1.jpg'} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 22 }}>
                <h3 style={{ margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{p.description}</p>
                <p style={{ color: '#818cf8', fontSize: 12, marginTop: 10 }}>{p.tech_stack}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <a href={p.live_url} style={{ color: '#fff', fontSize: 13 }}>Live Demo ↗</a>
                  <a href={p.github_url} style={{ color: '#94a3b8', fontSize: 13 }}>GitHub ↗</a>
                </div>
              </div>
            </div>
          </TiltSurface>
        ))}
      </div>
    </section>
  );
}
