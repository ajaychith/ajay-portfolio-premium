
import React from 'react';
import TiltSurface from './TiltSurface';

export default function About({ data }) {
  const bio = data?.about_bio || 'I blend high-performance 3D WebGL interfaces with scalable full-stack engineering.';
  const avatar = data?.avatar_url || '/Ajay.jpg';
  return (
    <section id="about" style={{ padding: '90px 7%' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 32 }}>About Me</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 36, alignItems: 'center' }}>
        <TiltSurface>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', maxWidth: 360 }}>
            <img src={avatar} alt="Profile" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </TiltSurface>
        <div>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#cbd5e1' }}>{bio}</p>
        </div>
      </div>
    </section>
  );
}
