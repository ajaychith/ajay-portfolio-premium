import fs from 'fs';

fs.writeFileSync('src/components/HeroScene.jsx', `
import React from 'react';

export default function HeroScene({ avatarUrl = '/ajay-neon.mp4' }) {
  const isVideo = avatarUrl && (avatarUrl.toLowerCase().endsWith('.mp4') || avatarUrl.toLowerCase().endsWith('.webm'));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#07040a',
        overflow: 'hidden'
      }}
    >
      {isVideo ? (
        <video
          src={avatarUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85
          }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 75% 40%, #e11d48, #07040a)' }} />
      )}
      {/* Dark vignette overlay for perfect text contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,4,10,0.6) 0%, rgba(7,4,10,0.2) 50%, rgba(7,4,10,0.92) 100%)' }} />
    </div>
  );
}
`);

console.log('✅ HeroScene updated to render background MP4 video correctly!');
