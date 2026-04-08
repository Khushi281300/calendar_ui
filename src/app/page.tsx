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
    <main className="min-h-screen bg-emerald-50/20 relative flex items-center justify-center p-4 md:p-8 antialiased selection:bg-emerald-100 overflow-hidden">
      {/* 1. Global Living Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-sage-100 to-lime-50 animate-mesh-flow z-0" />
      <NatureParticles />

      {/* 2. Main Breathing Glass Card */}
      <div className="w-full max-w-7xl bg-white/40 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(16,185,129,0.1)] overflow-hidden min-h-[850px] border border-white/60 grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] lg:grid-cols-[1.8fr_3.2fr] relative z-10 animate-breathing">
        
        {/* Left Panel: Seasonal Hero Section */}
        <HeroPanel currentMonth={calendarState.currentMonth} />

      {/* Right Panel: Calendar & Notes */}
        <section className="p-6 md:p-10 flex flex-col flex-1 h-full">
          <div className="flex-1">
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
          
          <div className="mt-8 h-[350px]">
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
