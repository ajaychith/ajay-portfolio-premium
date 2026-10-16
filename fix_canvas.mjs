import fs from 'fs';

fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useEffect, useRef } from 'react';

export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      t += 0.012;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      // Rich Cinematic Dark Burgundy Base Gradient
      const bg = ctx.createLinearGradient(0, 0, cw, ch);
      bg.addColorStop(0, '#0a040e');
      bg.addColorStop(0.5, '#1b061d');
      bg.addColorStop(1, '#4c051f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      // Animated Glowing Crimson & Magenta Neon Orbs (like the tutorial video)
      const x1 = cw * 0.72 + Math.sin(t * 0.8) * 80;
      const y1 = ch * 0.38 + Math.cos(t * 0.6) * 60;
      const grad1 = ctx.createRadialGradient(x1, y1, 20, x1, y1, cw * 0.55);
      grad1.addColorStop(0, 'rgba(225, 29, 72, 0.45)');
      grad1.addColorStop(0.5, 'rgba(190, 24, 93, 0.2)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, cw, ch);

      const x2 = cw * 0.28 + Math.cos(t * 0.7) * 90;
      const y2 = ch * 0.62 + Math.sin(t * 0.9) * 70;
      const grad2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, cw * 0.48);
      grad2.addColorStop(0, 'rgba(217, 70, 239, 0.32)');
      grad2.addColorStop(0.6, 'rgba(147, 51, 234, 0.1)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, cw, ch);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
`);

console.log('✅ Replaced with high-performance animated neon studio background canvas!');
