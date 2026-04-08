'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Flower } from 'lucide-react';

interface Particle {
  id: number;
  delay: string;
  duration: string;
  left: string;
  top: string;
  scale: number;
  rotation: string;
  type: 'leaf' | 'flower';
  color: string;
}

export function NatureParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 15}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: 0.5 + Math.random() * 1,
      rotation: `${Math.random() * 360}deg`,
      type: Math.random() > 0.6 ? 'leaf' : 'flower',
      color: Math.random() > 0.5 ? 'text-emerald-200/30' : 'text-rose-200/30',
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-leaf-drift absolute"
          style={{
            '--drift-delay': p.delay,
            '--drift-duration': p.duration,
            left: p.left,
            top: p.top,
            transform: `rotate(${p.rotation}) scale(${p.scale})`,
          } as React.CSSProperties}
        >
          {p.type === 'leaf' ? (
            <Leaf className={`w-8 h-8 ${p.color} fill-current`} />
          ) : (
            <Flower className={`w-6 h-6 ${p.color} fill-current`} />
          )}
        </div>
      ))}
    </div>
  );
}
