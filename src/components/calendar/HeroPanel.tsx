'use client';

import React from 'react';
import { format, getMonth } from 'date-fns';

interface HeroPanelProps {
  currentMonth: Date;
}

const MONTH_METADATA: Record<number, { keyword: string; color: string }> = {
  0: { keyword: 'snowy mountain', color: 'bg-blue-900' }, // Jan
  1: { keyword: 'winter forest', color: 'bg-slate-800' }, // Feb
  2: { keyword: 'spring park', color: 'bg-emerald-900' }, // Mar
  3: { keyword: 'cherry blossoms', color: 'bg-rose-900' }, // Apr
  4: { keyword: 'flower garden', color: 'bg-pink-900' }, // May
  5: { keyword: 'summer beach', color: 'bg-cyan-900' }, // Jun
  6: { keyword: 'tropical resort', color: 'bg-teal-900' }, // Jul
  7: { keyword: 'sunset ocean', color: 'bg-amber-900' }, // Aug
  8: { keyword: 'autumn leaves', color: 'bg-orange-900' }, // Sep
  9: { keyword: 'fall forest', color: 'bg-red-900' }, // Oct
  10: { keyword: 'misty morning', color: 'bg-indigo-900' }, // Nov
  11: { keyword: 'cozy cabin snow', color: 'bg-blue-950' }, // Dec
};

export function HeroPanel({ currentMonth }: HeroPanelProps) {
  const monthIndex = getMonth(currentMonth);
  const { color } = MONTH_METADATA[monthIndex];
  
  const monthName = format(currentMonth, 'MMMM');
  const yearName = format(currentMonth, 'yyyy');
  
  // Mapping some specific beautiful Unsplash IDs for a curated feel
  const curatedImages: Record<number, string> = {
    0: '1519681393784-d120267933ba', // Jan - Snowy Mountain
    1: '1483921020237-2ff51e8e4b22', // Feb - Winter
    2: '1462270622445-5b17ccd7dae3', // Mar - Spring
    3: '1522748906645-95d8adfd52c7', // Apr - Cherry Blossoms
    4: '1470770841072-f978cf4d019e', // May - Meadow
    5: '1507525428034-b723cf961d3e', // Jun - Beach
    6: '1500382017468-9049fed747ef', // Jul - Sun
    7: '1470252649358-96f3c5783226', // Aug - Sunrise
    8: '1441974231531-c6227db76b6e', // Sep - Forest
    9: '1504198453319-5ce911bafcde', // Oct - Red Trees
    10: '1486406146926-c627a92ad1ab', // Nov - Foggy City (or better, nature)
    11: '1507151226894-49f394547ce4', // Dec - Winter night
  };
  
  const photoId = curatedImages[monthIndex] || curatedImages[0];
  const curatedUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=2000`;

  return (
    <section className={`flex flex-col justify-end p-10 md:p-14 border-r border-slate-100 relative overflow-hidden h-[300px] md:h-auto transition-colors duration-1000 ${color}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
      
      {/* Background Image with cross-fade transition */}
      <div 
        key={curatedUrl}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[15000ms] hover:scale-110 animate-in fade-in zoom-in-105 duration-1000"
        style={{ backgroundImage: `url('${curatedUrl}')` }}
      />

      <div className="relative z-20 text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
        <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter pb-3 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 drop-shadow-sm">
          {monthName}
        </h1>
        <p className="text-xl md:text-2xl opacity-60 font-light tracking-[0.3em] uppercase drop-shadow-sm">
          {yearName}
        </p>
      </div>
    </section>
  );
}
