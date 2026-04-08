import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarGrid({ 
  currentMonth, 
  selectedStart, 
  selectedEnd, 
  onSelectDate,
  onPrevMonth,
  onNextMonth
}: CalendarGridProps) {
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  
  const startDate = startOfWeek(firstDay);
  const endDate = endOfWeek(lastDay);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full animate-in fade-in duration-1000 slide-in-from-bottom-2">
      {/* Grid Header with Navigation */}
      <div className="flex justify-between items-center mb-12 px-2">
        <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
          Select Dates
        </h2>
        <div className="flex gap-3">
           <button 
             onClick={onPrevMonth}
             className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-slate-100 hover:border-slate-200 hover:shadow-sm active:scale-90"
             aria-label="Previous Month"
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </button>
           <button 
             onClick={onNextMonth}
             className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-slate-100 hover:border-slate-200 hover:shadow-sm active:scale-90"
             aria-label="Next Month"
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-8 px-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-3 gap-x-1 place-items-center">
        {days.map((day) => (
          <DayCell 
            key={day.toString()} 
            day={day} 
            currentMonth={currentMonth} 
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onClick={() => onSelectDate(day)}
          />
        ))}
      </div>
    </div>
  );
}
