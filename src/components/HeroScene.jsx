import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from './SvgIcon';

export default function HeroScene({ scrollProgress = 0, backgroundConfig = {} }) {
  const videoRef = useRef(null);
  const {
    type = 'video',
    video_url = '/ajay-neon.mp4',
    video_mode = 'auto',
    image_url = '/Ajay.jpg',
    solid_color = '#07040a',
    gradient_start = '#09040e',
    gradient_mid = '#2a071e',
    gradient_end = '#690826',
    overlay_opacity = 0.65,
    brightness = 1.0,
    contrast = 1.06
  } = backgroundConfig;

  const [playMode, setPlayMode] = useState(video_mode || 'auto');

  useEffect(() => {
    setPlayMode(video_mode || 'auto');
  }, [video_mode]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || type !== 'video') return;
    vid.muted = true;
    if (playMode === 'auto') {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [playMode, type, video_url]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || type !== 'video' || playMode !== 'scroll' || !vid.duration) return;
    const t = Math.max(0, Math.min(0.99, scrollProgress)) * vid.duration;
    if (Number.isFinite(t)) vid.currentTime = t;
  }, [scrollProgress, playMode, type]);

  const filterCss = `brightness(${brightness}) contrast(${contrast}) saturate(1.12)`;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background:
            type === 'solid'
              ? solid_color
              : `linear-gradient(135deg, ${gradient_start} 0%, ${gradient_mid} 52%, ${gradient_end} 100%)`
        }}
      >
        {type === 'video' && (
          <video
            ref={videoRef}
            src={video_url || '/ajay-neon.mp4'}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              if (!e.target.src.endsWith('.mp4.mp4')) e.target.src = '/ajay-neon.mp4.mp4';
            }}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: `scale(${1 + scrollProgress * 0.07})`,
              transition: 'transform 0.25s ease-out',
              filter: filterCss
            }}
          />
        )}

        {type === 'image' && (
          <img
            src={image_url || '/Ajay.jpg'}
            alt="Background"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center top',
              transform: `scale(${1 + scrollProgress * 0.08})`,
              transition: 'transform 0.25s ease-out',
              filter: filterCss
            }}
          />
        )}

        {type === 'gradient' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 75% 40%, ${gradient_end}88 0%, transparent 60%), radial-gradient(circle at 25% 65%, ${gradient_mid}99 0%, transparent 60%)`
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: overlay_opacity,
            background:
              'linear-gradient(90deg, rgba(7,4,10,0.82) 0%, rgba(7,4,10,0.18) 35%, rgba(7,4,10,0.18) 65%, rgba(7,4,10,0.82) 100%), linear-gradient(180deg, rgba(7,4,10,0.55) 0%, rgba(7,4,10,0.1) 50%, rgba(7,4,10,0.92) 100%)'
          }}
        />
      </div>

      {type === 'video' && (
        <div style={{ position: 'fixed', bottom: 22, right: 24, zIndex: 95 }}>
          <button
            onClick={() => setPlayMode(playMode === 'auto' ? 'scroll' : 'auto')}
            className="video-mode-pill"
          >
            <SvgIcon name={playMode === 'auto' ? 'Video' : 'Sliders'} size={14} />
            <span>{playMode === 'auto' ? 'Video: Auto-Play' : 'Video: Scroll-Scrub'}</span>
          </button>
        </div>
      )}
    </>
  );
}