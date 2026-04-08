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
    <div 
      key={currentMonth.toISOString()} 
      className="w-full animate-month-change"
    >
      <div className="relative z-50 mb-12 px-2">
        <div className="bg-emerald-50/20 backdrop-blur-3xl border border-white/40 p-8 rounded-[4rem] shadow-[0_20px_50px_-12px_rgba(16,185,129,0.1)] flex flex-col sm:flex-row justify-between items-center gap-8 animate-breathing">
          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
                className="flex items-center gap-2 text-4xl font-black text-emerald-800 tracking-tight hover:text-emerald-700 transition-all group"
              >
                {MONTHS[currentMonth.getMonth()]}
                <ChevronDown className={`w-6 h-6 text-emerald-200 group-hover:text-emerald-300 transition-transform ${showMonthPicker ? 'rotate-180' : ''}`} />
              </button>
              
              {showMonthPicker && (
                <div className="absolute top-full left-0 mt-4 w-64 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200 z-[100]">
                  {MONTHS.map((month, idx) => (
                    <button
                      key={month}
                      onClick={() => { onSetMonth(idx); setShowMonthPicker(false); }}
                      className={`px-4 py-3 rounded-2xl text-[13px] font-black transition-all ${currentMonth.getMonth() === idx ? 'bg-emerald-400 text-white shadow-lg shadow-emerald-200' : 'hover:bg-emerald-50/50 text-emerald-600'}`}
                    >
                      {month.substring(0, 3)}
                    </button>
                   ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
                className="flex items-center gap-2 text-4xl font-black text-emerald-200 tracking-tight hover:text-emerald-300 transition-all group"
              >
                {currentMonth.getFullYear()}
                <ChevronDown className={`w-6 h-6 text-emerald-100 group-hover:text-emerald-200 transition-transform ${showYearPicker ? 'rotate-180' : ''}`} />
              </button>

              {showYearPicker && (
                <div className="absolute top-full left-0 mt-4 w-48 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] shadow-2xl p-4 max-h-80 overflow-y-auto scrollbar-hide animate-in fade-in zoom-in-95 duration-200 z-[100]">
                  {YEARS.map((year) => (
                    <button
                      key={year}
                      onClick={() => { onSetYear(year); setShowYearPicker(false); }}
                      className={`w-full px-4 py-3 rounded-2xl text-[13px] font-black transition-all mb-1 ${currentMonth.getFullYear() === year ? 'bg-emerald-300 text-white shadow-lg' : 'hover:bg-emerald-50/50 text-emerald-300'}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-inner">
             <button 
               onClick={onGoToToday}
               className="flex items-center gap-2 px-8 py-3.5 rounded-full text-[12px] font-black tracking-widest text-white bg-emerald-500 shadow-[0_12px_24px_-8px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all group"
             >
               <Flower className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
               TODAY
             </button>
             
             <div className="flex gap-2">
               <button 
                 onClick={onPrevMonth}
                 className="p-3.5 rounded-full bg-white/40 hover:bg-emerald-50/50 text-emerald-300 hover:text-emerald-600 transition-all shadow-sm active:scale-90"
                 aria-label="Previous Month"
               >
                 <ChevronLeft className="w-6 h-6" />
               </button>
               <button 
                 onClick={onNextMonth}
                 className="p-3.5 rounded-full bg-white/40 hover:bg-emerald-50/50 text-emerald-300 hover:text-emerald-600 transition-all shadow-sm active:scale-90"
                 aria-label="Next Month"
               >
                 <ChevronRight className="w-6 h-6" />
               </button>
             </div>
          </div>
        </div>
      </div>

      <div 
        role="row" 
        className="grid grid-cols-7 mb-8 px-2"
      >
        {WEEKDAYS.map((day) => (
          <div 
            key={day} 
            role="columnheader" 
            aria-label={day}
            className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400/60"
          >
            {day.substring(0, 3)}
          </div>
        ))}
      </div>

      <div 
        role="row" 
        className="grid grid-cols-7 gap-y-3 gap-x-1 place-items-center"
      >
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
