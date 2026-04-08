'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  type: 'petal' | 'flower';
  left: string;
  delay: string;
  duration: string;
  size: string;
  color: string;
  opacity: number;
  rotation: number;
}

export function NatureParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // 60 total particles for a "Spring Bloom" effect (Mix of petals and full pink flowers)
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      type: i % 4 === 0 ? 'flower' : 'petal',
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 20}s`,
      duration: `${20 + Math.random() * 30}s`,
      size: `${20 + Math.random() * 35}px`, // Increased size for visibility
      // Vibrant Sakura Pink Palette: Rose, Cherry-Pink, and Soft White
      color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#fb7185' : '#ffffff',
      opacity: 0.5 + Math.random() * 0.4, // Increased opacity for "Visible" request
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-leaf-drift absolute"
          style={{
            left: p.left,
            top: '-60px',
            '--drift-delay': p.delay,
            '--drift-duration': p.duration,
            opacity: p.opacity,
          } as React.CSSProperties}
        >
          {p.type === 'petal' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
               {/* Single Sakura Petal */}
               <path d="M12 21c-4-4.5-5-8.5-4-10.5 1-2 3.5-2 4 0 .5-2 3-2 4 0 1 2 0 6-4 10.5z" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.05))" />
            </svg>
          ) : (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
               {/* Full 5-Petal Sakura Flower */}
               <path d="M12 12c.5-5.5 3.5-7.5 5.5-5.5 2 2 0 5-5.5 5.5z" />
               <path d="M12 12c5.5-.5 7.5-3.5 5.5-5.5-2-2-5 0-5.5 5.5z" />
               <path d="M12 12c.5 5.5 3.5 7.5 5.5 5.5 2-2 0-5-5.5-5.5z" />
               <path d="M12 12c-5.5.5-7.5 3.5-5.5 5.5 2 2 5 0 5.5-5.5z" />
               <path d="M12 12c-5.5-.5-7.5-3.5-5.5-5.5-2-2-5 0-5.5 5.5z" />
               <circle cx="12" cy="12" r="2" fill="#fff" fillOpacity="0.4" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
