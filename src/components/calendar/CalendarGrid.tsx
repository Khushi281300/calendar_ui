import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { DayCell } from './DayCell';
import { getHoliday } from '@/lib/holidays';
import { ChevronLeft, ChevronRight, Flower } from 'lucide-react';
import React from 'react';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface CalendarGridProps {
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
}

export function CalendarGrid({ 
  currentMonth, 
  selectedStart, 
  selectedEnd, 
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onGoToToday
}: CalendarGridProps) {
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  
  const startDate = startOfWeek(firstDay);
  const endDate = endOfWeek(lastDay);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div 
      key={currentMonth.toISOString()} 
      className="w-full animate-month-change h-full flex flex-col"
    >
      {/* Integrated Compact Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
           <button onClick={onGoToToday} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors">
              <Flower className="w-4 h-4" />
           </button>
           <h2 className="text-2xl font-black text-emerald-900 tracking-tighter uppercase">
             {format(currentMonth, 'MMMM yyyy')}
           </h2>
        </div>
        
        <div className="flex gap-1.5">
          <button 
            onClick={onPrevMonth}
            className="p-2 rounded-full border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-2 rounded-full border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {WEEKDAYS.map((day) => (
          <div 
            key={day} 
            className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300"
          >
            {day.substring(0, 3)}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-1 place-items-center">
        {days.map((day) => (
          <DayCell 
            key={day.toString()} 
            day={day} 
            currentMonth={currentMonth} 
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            holidayName={getHoliday(day)}
            onClick={() => onSelectDate(day)}
          />
        ))}
      </div>
    </div>
  );
}
