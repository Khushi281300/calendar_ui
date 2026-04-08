'use client';

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { DayCell } from './DayCell';
import { getHoliday } from '@/lib/holidays';
import { ChevronLeft, ChevronRight, ChevronDown, Flower } from 'lucide-react';
import React, { useState } from 'react';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const YEARS = Array.from({ length: 16 }, (_, i) => 2020 + i);

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
  onGoToToday,
  onSetMonth,
  onSetYear
}: CalendarGridProps) {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const startDate = startOfWeek(firstDay);
  const endDate = endOfWeek(lastDay);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div key={currentMonth.toISOString()} className="w-full animate-month-change h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-8 px-2 relative z-[60]">
        <div className="flex items-center gap-2">
           <button onClick={onGoToToday} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors shrink-0">
              <Flower className="w-4 h-4" />
           </button>
           
           <div className="flex items-center gap-1.5 min-w-0">
              {/* Month Picker */}
              <div className="relative">
                <button 
                  onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
                  className="flex items-center gap-1 text-2xl font-black text-emerald-900 tracking-tighter uppercase whitespace-nowrap"
                >
                  {format(currentMonth, 'MMMM')}
                  <ChevronDown className="w-4 h-4 text-emerald-300" />
                </button>
                {showMonthPicker && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 grid grid-cols-2 gap-1 animate-in fade-in zoom-in-95 duration-200 z-[70]">
                    {MONTHS.map((m, idx) => (
                      <button
                        key={m}
                        onClick={() => { onSetMonth(idx); setShowMonthPicker(false); }}
                        className={`text-[11px] font-black p-2 rounded-xl transition-all ${currentMonth.getMonth() === idx ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-50 text-emerald-600'}`}
                      >
                        {m.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year Picker */}
              <div className="relative">
                <button 
                  onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
                  className="flex items-center gap-1 text-2xl font-black text-emerald-300 tracking-tighter uppercase whitespace-nowrap"
                >
                  {format(currentMonth, 'yyyy')}
                  <ChevronDown className="w-4 h-4 text-emerald-200" />
                </button>
                {showYearPicker && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 max-h-60 overflow-y-auto z-[70]">
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        onClick={() => { onSetYear(y); setShowYearPicker(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-black mb-1 transition-all ${currentMonth.getFullYear() === y ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-50 text-emerald-600'}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
           </div>
        </div>
        
        <div className="flex gap-1">
          <button onClick={onPrevMonth} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={onNextMonth} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 px-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            {day.substring(0, 3)}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-y-1 gap-x-1 place-items-center px-1">
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
