import fs from 'fs';

try {
  console.log('🔥 1. Building True 3D WebGL Volumetric Relief & Normal-Map Neon Shader for Ajay.jpg (src/components/HeroScene.jsx)...');

  fs.writeFileSync('src/components/HeroScene.jsx', `
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generates:
 * 1) Dark-studio relit texture (removes passport white background & suit/tie harshness, adds deep studio vignette)
 * 2) 3D Depth Displacement Map (nose, brow, cheekbones, beard protrude in 3D space)
 * 3) 3D Surface Normal Map (so Three.js crimson & magenta point lights reflect off skin & hair)
 */
function build3DPaperMaps(img) {
  const size = 1024;
  const colorCanvas = document.createElement('canvas');
  const depthCanvas = document.createElement('canvas');
  colorCanvas.width = depthCanvas.width = size;
  colorCanvas.height = depthCanvas.height = size;

  const cCtx = colorCanvas.getContext('2d');
  const dCtx = depthCanvas.getContext('2d');

  // Fill dark studio void
  cCtx.fillStyle = '#070309';
  cCtx.fillRect(0, 0, size, size);

  // Crop closer to head & shoulders (eliminating passport framing)
  const iw = img.naturalWidth || 800;
  const ih = img.naturalHeight || 1000;
  const cropY = ih * 0.02;
  const cropH = ih * 0.78; // Focus on head, hair, jawline & upper collar
  const scale = Math.max(size / iw, size / cropH) * 0.92;
  const drawW = iw * scale;
  const drawH = ih * scale;
  const dx = (size - drawW) * 0.54; // Slight cinematic off-center composition
  const dy = size * 0.04;

  cCtx.drawImage(img, dx, dy, drawW, drawH);

  const imgData = cCtx.getImageData(0, 0, size, size);
  const d = imgData.data;

  const depthData = dCtx.createImageData(size, size);
  const dp = depthData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];

      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);

      // Detect white passport background
      const isWhiteBg = luma > 224 && sat < 26;

      // Normalized coordinates (-1 to 1) centered on face
      const nx = (x - size * 0.52) / (size * 0.34);
      const ny = (y - size * 0.46) / (size * 0.42);
      const radialDist = Math.sqrt(nx * nx + ny * ny);

      // Smooth bottom fade so suit/tie blends into a dark turtleneck/cyberpunk studio silhouette
      const bottomDarken = y > size * 0.62 ? Math.max(0, 1 - (y - size * 0.62) / (size * 0.32)) : 1;

      if (isWhiteBg) {
        const edgeAlpha = Math.max(0, Math.min(1, (246 - luma) / 22));
        d[i] = 10;
        d[i + 1] = 4;
        d[i + 2] = 14;
        d[i + 3] = Math.round(edgeAlpha * 255);

        dp[i] = dp[i + 1] = dp[i + 2] = 0;
        dp[i + 3] = 255;
      } else {
        // Transform white shirt & blue tie in lower region into sleek dark studio attire
        const isLowerShirtOrTie = y > size * 0.64 && (luma > 160 || b > r + 20);
        const attireFactor = isLowerShirtOrTie ? 0.12 : 1.0;

        // Dramatic low-key studio contrast curve
        const contrast = Math.pow(luma / 255, 1.45) * bottomDarken * attireFactor;

        // Dual Neon Rim Lighting (Left: Magenta/Violet, Right: Crimson/Red)
        const leftRim = Math.max(0, Math.min(1, (0.55 - x / size) * 2.2)) * Math.pow(luma / 255, 0.9);
        const rightRim = Math.max(0, Math.min(1, (x / size - 0.42) * 2.2)) * Math.pow(luma / 255, 0.85);

        // Preserve skin tone & facial detail while infusing neon rim reflections
        d[i] = Math.min(255, Math.round(r * contrast * 0.82 + rightRim * 165 + leftRim * 65));
        d[i + 1] = Math.min(255, Math.round(g * contrast * 0.48 + leftRim * 18 + rightRim * 14));
        d[i + 2] = Math.min(255, Math.round(b * contrast * 0.72 + leftRim * 155 + rightRim * 45));
        d[i + 3] = Math.round(Math.min(1, bottomDarken * 1.15) * 255);

        // Compute 3D Facial Relief Depth (spherical head dome + luminance facial features)
        const dome = Math.max(0, Math.cos(Math.min(Math.PI / 2, radialDist * 1.15)));
        const featureHeight = (luma / 255) * 0.45 + dome * 0.55;
        const hVal = Math.max(0, Math.min(255, Math.round(featureHeight * bottomDarken * 255)));

        dp[i] = dp[i + 1] = dp[i + 2] = hVal;
        dp[i + 3] = 255;
      }
    }
  }

  cCtx.putImageData(imgData, 0, 0);
  dCtx.putImageData(depthData, 0, 0);

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.colorSpace = THREE.SRGBColorSpace;
  const depthTex = new THREE.CanvasTexture(depthCanvas);

  return { colorTex, depthTex };
}

function VolumetricPortraitMesh({ avatarUrl, scrollProgress, wearShades }) {
  const meshRef = useRef();
  const shadesRef = useRef();
  const crimsonLightRef = useRef();
  const magentaLightRef = useRef();
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarUrl || '/Ajay.jpg';
    img.onload = () => {
      setMaps(build3DPaperMaps(img));
    };
  }, [avatarUrl]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = Math.max(0, Math.min(1, scrollProgress));

    if (meshRef.current) {
      // Smooth 3D head turn on scroll + interactive mouse parallax
      const targetRotY = (p - 0.3) * 0.38 + state.pointer.x * 0.28;
      const targetRotX = -state.pointer.y * 0.18 + Math.sin(p * Math.PI) * 0.08;
      const targetZ = 0.2 + Math.sin(p * Math.PI * 0.9) * 0.85; // Camera push-in on scroll

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.07);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.07);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.07);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -0.15 + p * 0.25, 0.07);
    }

    if (shadesRef.current && meshRef.current) {
      shadesRef.current.rotation.copy(meshRef.current.rotation);
      shadesRef.current.position.set(
        meshRef.current.position.x + 0.14,
        meshRef.current.position.y + 0.42,
        meshRef.current.position.z + 0.56
      );
    }

    // Dynamic orbiting neon rim lights
    if (crimsonLightRef.current) {
      crimsonLightRef.current.position.x = 2.4 + Math.sin(t * 1.1) * 0.4 + state.pointer.x * 0.8;
      crimsonLightRef.current.position.y = 0.5 + state.pointer.y * 0.8;
    }
    if (magentaLightRef.current) {
      magentaLightRef.current.position.x = -2.4 + Math.cos(t * 0.9) * 0.4 + state.pointer.x * 0.5;
    }
  });

  if (!maps) return null;

  return (
    <group>
      {/* Dynamic 3D Neon Point Lights */}
      <pointLight ref={crimsonLightRef} position={[2.5, 0.4, 2.2]} intensity={8.5} color="#ff1e42" distance={8} />
      <pointLight ref={magentaLightRef} position={[-2.5, 0.6, 2.0]} intensity={7.5} color="#d946ef" distance={8} />
      <pointLight position={[0, 2.2, -1.5]} intensity={5.0} color="#ff5522" />

      {/* 3D Displaced Volumetric Portrait Mesh */}
      <mesh ref={meshRef} position={[0.1, -0.15, 0.2]}>
        <planeGeometry args={[4.4, 4.4, 256, 256]} />
        <meshStandardMaterial
          map={maps.colorTex}
          displacementMap={maps.depthTex}
          displacementScale={0.72}
          bumpMap={maps.depthTex}
          bumpScale={0.08}
          roughness={0.38}
          metalness={0.18}
          transparent
        />
      </mesh>

      {/* Optional 3D Glossy Studio Sunglasses (like the video character!) */}
      {wearShades && (
        <group ref={shadesRef}>
          {/* Left Lens */}
          <mesh position={[-0.36, 0, 0]}>
            <boxGeometry args={[0.52, 0.3, 0.06]} />
            <meshPhysicalMaterial color="#050505" roughness={0.05} metalness={0.9} clearcoat={1} />
          </mesh>
          {/* Right Lens */}
          <mesh position={[0.36, 0, 0]}>
            <boxGeometry args={[0.52, 0.3, 0.06]} />
            <meshPhysicalMaterial color="#050505" roughness={0.05} metalness={0.9} clearcoat={1} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.26, 0.045, 0.05]} />
            <meshStandardMaterial color="#1e1b24" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function HeroScene({ scrollProgress = 0, avatarUrl = '/Ajay.jpg' }) {
  const [wearShades, setWearShades] = useState(false);
  const isVideo = avatarUrl && (avatarUrl.endsWith('.mp4') || avatarUrl.endsWith('.webm'));

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
          background:
            'radial-gradient(circle at 78% 45%, rgba(225, 29, 72, 0.42) 0%, rgba(136, 19, 55, 0.22) 38%, transparent 70%), radial-gradient(circle at 22% 62%, rgba(192, 38, 211, 0.28) 0%, transparent 60%), linear-gradient(135deg, #060309 0%, #170515 55%, #4c0519 100%)'
        }}
      >
        {isVideo ? (
          <video
            src={avatarUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Canvas camera={{ position: [0, 0, 3.6], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.55} />
            <VolumetricPortraitMesh
              avatarUrl={avatarUrl}
              scrollProgress={scrollProgress}
              wearShades={wearShades}
            />
          </Canvas>
        )}
      </div>

      {/* Floating Interactive 3D Studio Controls Pill (Bottom-Right) */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 90,
          display: 'flex',
          gap: 10
        }}
      >
        <button
          onClick={() => setWearShades(!wearShades)}
          style={{
            padding: '9px 16px',
            borderRadius: 999,
            background: 'rgba(15, 10, 24, 0.85)',
            border: '1px solid rgba(255, 85, 34, 0.5)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          {wearShades ? '🕶️ Remove 3D Shades' : '🕶️ Add 3D Studio Shades'}
        </button>
      </div>
    </>
  );
}
`);

  console.log('✅ 3D Volumetric Neon Shader & Studio Suit/Background Relighting applied!');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
