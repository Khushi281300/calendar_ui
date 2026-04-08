'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes } from '@/hooks/useNotes';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { NotesPanel } from '@/components/calendar/NotesPanel';
import { HeroPanel } from '@/components/calendar/HeroPanel';

export default function CalendarPage() {
  const calendarState = useCalendar();
  const notesState = useNotes();

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 antialiased selection:bg-blue-100">
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden min-h-[850px] border border-white/20 grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] lg:grid-cols-[1.8fr_3.2fr]">
        
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
             />
          </div>
          
          <div className="mt-8 h-[200px]">
             <NotesPanel 
                selectedStart={calendarState.selectedStart}
                selectedEnd={calendarState.selectedEnd}
                getNote={notesState.getNote}
                saveNote={notesState.saveNote}
             />
          </div>
        </section>

      </div>
    </main>
  );
}
