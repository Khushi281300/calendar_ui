'use client';

import React from 'react';
import { format, getMonth } from 'date-fns';

interface HeroPanelProps {
  currentMonth: Date;
}

export function HeroPanel({ currentMonth }: HeroPanelProps) {
  const monthIndex = getMonth(currentMonth);
  const monthName = format(currentMonth, 'MMMM');
  const yearName = format(currentMonth, 'yyyy');
  
  const images: Record<number, string> = {
    0: '1519681393784-d120267933ba', 1: '1483921020237-2ff51e8e4b22', 
    2: '1462270622445-5b17ccd7dae3', 3: '1522748906645-95d8adfd52c7',
    4: '1470770841072-f978cf4d019e', 5: '1507525428034-b723cf961d3e',
    6: '147192263818d-350baf6874eb', 7: '1501970226730-dba51f4e5651',
    8: '1470252646235-9c030ac3f3e0', 9: '1453227588019-35804ef84638',
    10: '1486406146926-c627a92ad1ab', 11: '1507151226894-49f394547ce4'
  };
  
  const photoId = images[monthIndex] || images[0];

  return (
    <section className="relative h-full overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sage-100 to-teal-50 animate-mesh-flow opacity-60 z-0" />
      
      <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
        <img 
          src={`https://images.unsplash.com/photo-${photoId}?q=80&w=1600&auto=format&fit=crop`}
          alt={monthName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className="absolute -bottom-1 -left-1 -right-1 h-32 bg-white/20 backdrop-blur-md" style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0% 100%)' }} />
      <div className="absolute -bottom-1 -left-1 -right-1 h-44 bg-emerald-500/30 backdrop-blur-sm" style={{ clipPath: 'polygon(0 100%, 100% 20%, 100% 100%, 0% 100%)' }} />

      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-right z-20">
        <div className="text-emerald-100/80 font-black text-sm md:text-2xl tracking-[0.3em] mb-1 md:mb-2 drop-shadow-lg uppercase">
          {yearName}
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl uppercase">
          {monthName}
        </h1>
      </div>

      <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none z-30" />
    </section>
  );
}
