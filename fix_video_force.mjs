import fs from 'fs';

fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useRef, useEffect } from 'react';

export default function HeroScene({ avatarUrl = '/ajay-neon.mp4' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9; // Smooth cinematic playback speed
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
  }, [avatarUrl]);

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
        background: '#190617',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src={avatarUrl || '/ajay-neon.mp4'}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      {/* Dark vignette gradient overlay for pristine text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 75% 45%, rgba(225, 29, 72, 0.18) 0%, transparent 65%), linear-gradient(180deg, rgba(7,4,10,0.55) 0%, rgba(7,4,10,0.15) 50%, rgba(7,4,10,0.95) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
`);

console.log('✅ HeroScene video playback force-fixed!');
