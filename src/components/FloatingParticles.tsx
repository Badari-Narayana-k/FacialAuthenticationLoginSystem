'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingGlobe() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('vanta/dist/vanta.globe.min').then((module) => {
      const GLOBE = module.default;

      if (!vantaRef.current || vantaEffect.current) return;

      vantaEffect.current = GLOBE({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0077ff,          // blue globe lines
        backgroundColor: 0x000000, // deep dark bg
        size: 1.5,
      });
    });

    return () => {
      vantaEffect.current?.destroy?.();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0"
    />
  );
}
