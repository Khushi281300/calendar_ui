'use client';

import React from 'react';
import { format, getMonth } from 'date-fns';
import { Flower, Leaf } from 'lucide-react';

interface HeroPanelProps {
  currentMonth: Date;
}

export function HeroPanel({ currentMonth }: HeroPanelProps) {
  const monthIndex = getMonth(currentMonth);
  const monthName = format(currentMonth, 'MMMM');
  const yearName = format(currentMonth, 'yyyy');
  
  const curatedImages: Record<number, string> = {
    0: '1519681393784-d120267933ba', 1: '1483921020237-2ff51e8e4b22', 
    2: '1462270622445-5b17ccd7dae3', 3: '1522748906645-95d8adfd52c7',
    4: '1470770841072-f978cf4d019e', 5: '1507525428034-b723cf961d3e',
    6: '1500382017468-9049fed747ef', 7: '1470252649358-96f3c5783226',
    8: '1441974231531-c6227db76b6e', 9: '1504198453319-5ce911bafcde',
    10: '1486406146926-c627a92ad1ab', 11: '1507151226894-49f394547ce4'
  };
  
  const photoId = curatedImages[monthIndex] || curatedImages[0];

  return (
    <section className="relative h-[350px] md:h-auto overflow-hidden group border-r border-emerald-50">
      {/* 1. Animated Mesh Flow Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sage-100 to-teal-50 animate-mesh-flow opacity-60 z-0" />
      
      {/* 2. Panoramic Unsplash Backdrop */}
      <div 
        key={photoId}
        className="absolute inset-0 bg-cover bg-center transition-all duration-[20000ms] scale-110 group-hover:scale-100 opacity-80 mix-blend-multiply z-10"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1200)` }}
      />
      
      {/* 3. Deep Green Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent z-20" />

      {/* 4. Local Drifting Particles (Hero Depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
        <Leaf className="absolute top-10 right-20 animate-float text-emerald-400/20 fill-emerald-200/10 w-24 h-24 rotate-45" />
        <Flower className="absolute bottom-40 left-10 animate-float-delayed text-rose-300/20 fill-rose-100/10 w-16 h-16" />
        <Leaf className="absolute top-1/2 left-1/3 animate-pulse text-lime-400/10 w-12 h-12 -rotate-12" />
      </div>

      {/* 5. Breathing Hero Title */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-40">
        <div className="w-full bg-white/10 backdrop-blur-3xl border border-white/40 p-10 rounded-[4rem] shadow-[0_25px_50px_-12px_rgba(16,185,129,0.1)] animate-breathing transform transition-all duration-1000 group-hover:scale-[1.01] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
          
          <div className="space-y-0 text-center md:text-left relative z-10">
            <h1 className="text-emerald-800 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.85] truncate drop-shadow-sm transition-all group-hover:text-emerald-900">
              {monthName}
            </h1>
            <p className="text-emerald-600/60 text-xl md:text-2xl font-black tracking-[0.2em] uppercase drop-shadow-sm mt-3 md:mt-4 flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-[2px] bg-emerald-200" />
              {yearName}
              <span className="w-8 h-[2px] bg-emerald-200" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
