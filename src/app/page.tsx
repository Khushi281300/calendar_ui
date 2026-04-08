'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes } from '@/hooks/useNotes';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { NotesPanel } from '@/components/calendar/NotesPanel';
import { HeroPanel } from '@/components/calendar/HeroPanel';
import { NatureParticles } from '@/components/calendar/NatureParticles';

export default function CalendarPage() {
  const calendarState = useCalendar();
  const notesState = useNotes();

  return (
    <main className="min-h-screen md:h-screen w-screen bg-emerald-50/20 relative flex items-center justify-center p-2 md:p-6 lg:p-10 antialiased selection:bg-emerald-100 overflow-y-auto md:overflow-hidden">
      {/* 1. Global Living Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-sage-100 to-lime-50 animate-mesh-flow z-0" />
      <NatureParticles />

      {/* 2. Main Wall Calendar Card (Top-Bottom Split) */}
      <div className="w-full h-auto md:h-full max-w-[1000px] md:max-h-[1200px] bg-white rounded-[1rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-200 flex flex-col relative z-10 md:animate-breathing group/calendar">
        
        {/* Wire Binder Effect */}
        <div className="absolute top-0 left-0 right-0 h-6 md:h-8 flex justify-center items-center gap-0.5 md:gap-1 z-50 pointer-events-none opacity-30 md:opacity-40">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="w-1 md:w-1.5 h-4 md:h-6 bg-slate-300 rounded-full border-x border-slate-400" />
           ))}
        </div>

        {/* Top Section: Hero Image (Anchor) */}
        <div className="h-[250px] md:h-[45%] w-full relative shrink-0 border-b border-slate-100">
          <HeroPanel currentMonth={calendarState.currentMonth} />
        </div>

        {/* Bottom Section: Split Content */}
        <section className="flex-1 flex flex-col md:flex-row min-h-0 overflow-visible md:overflow-hidden">
          {/* Top on Mobile, Right on Desktop */}
          <div className="order-1 md:order-2 flex-1 h-auto md:h-full p-4 md:p-6 overflow-visible md:overflow-y-auto scrollbar-hide border-b md:border-b-0 border-slate-100">
             <CalendarGrid 
               currentMonth={calendarState.currentMonth} 
               selectedStart={calendarState.selectedStart}
               selectedEnd={calendarState.selectedEnd}
               onSelectDate={calendarState.selectDate}
               onPrevMonth={calendarState.prevMonth}
               onNextMonth={calendarState.nextMonth}
               onGoToToday={calendarState.goToToday}
               onSetMonth={calendarState.setMonth}
               onSetYear={calendarState.setYear}
             />
          </div>

          {/* Bottom on Mobile, Left on Desktop */}
          <div className="order-2 md:order-1 w-full md:w-[35%] h-auto md:h-full md:border-r border-slate-100 p-4 md:p-6 shrink-0 md:shrink">
             <NotesPanel 
                selectedStart={calendarState.selectedStart}
                selectedEnd={calendarState.selectedEnd}
                getNote={notesState.getNote}
                saveNote={notesState.saveNote}
                onClearSelection={calendarState.clearSelection}
             />
          </div>
        </section>

      </div>
    </main>
  );
}
