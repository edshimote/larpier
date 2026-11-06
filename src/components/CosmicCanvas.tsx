'use client';
import { useEffect, useRef } from 'react';

/** Fundo 3D leve. O WebGL só é iniciado quando a seção está visível. */
export default function CosmicCanvas({ color = '#bd94ff' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let cleanup = () => {};
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting || disposed) { cleanup(); return; }
      observer.disconnect();
      void import('three').then(THREE => {
        if (disposed || !canvas.isConnected) return;
        let renderer: import('three').WebGLRenderer;
        try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' }); }
        catch { return; } // gradiente CSS permanece como fallback
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
        camera.position.z = 7;
        const n = window.innerWidth < 700 ? 240 : 620;
        const positions = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const a = i * 2.399963229728653; // distribuição angular determinística
          const r = 1.3 + Math.sqrt(i / n) * 13;
          positions[i * 3] = Math.cos(a) * r;
          positions[i * 3 + 1] = Math.sin(a) * r;
          positions[i * 3 + 2] = Math.sin(i * 6.137) * 5.5;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color, size: window.innerWidth < 700 ? 0.06 : 0.05, transparent: true, opacity: 0.85, sizeAttenuation: true });
        const stars = new THREE.Points(geometry, material);
        scene.add(stars);
        let frame = 0;
        let lastTime = 0;
        const resize = () => {
          if (!canvas.parentElement) return;
          const { width, height } = canvas.parentElement.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height; camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          renderer.setSize(width, height, false);
        };
        resize();
        const tick = (time: number) => {
          if (disposed) return;
          if (time - lastTime >= 30) {
            lastTime = time;
            if (!reduced) { stars.rotation.z += 0.00025; stars.rotation.y += 0.00015; }
            renderer.render(scene, camera);
          }
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        window.addEventListener('resize', resize);
        cleanup = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener('resize', resize);
          geometry.dispose(); material.dispose(); renderer.dispose();
        };
      });
    }, { rootMargin: '180px' });
    observer.observe(canvas);
    return () => { disposed = true; observer.disconnect(); cleanup(); };
  }, [color]);
  return <canvas ref={canvasRef} aria-hidden="true" className="cosmic-canvas" />;
}
