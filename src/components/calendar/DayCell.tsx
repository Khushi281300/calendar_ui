import React from 'react';
import { format, isSameMonth, isToday, isSameDay, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import { Sparkle, Heart } from 'lucide-react';

export interface DayCellProps {
  day: Date;
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  holidayName?: string;
  onClick: () => void;
}

export function DayCell({ day, currentMonth, selectedStart, selectedEnd, holidayName, onClick }: DayCellProps) {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isCurrentDay = isToday(day);
  
  const isStart = selectedStart ? isSameDay(day, selectedStart) : false;
  const isEnd = selectedEnd ? isSameDay(day, selectedEnd) : false;
  
  const inRange = selectedStart && selectedEnd 
    ? isWithinInterval(day, { 
        start: selectedStart as Date, 
        end: selectedEnd as Date 
      })
    : false;

  const isRangeStart = isStart && selectedEnd && !isSameDay(selectedStart as Date, selectedEnd as Date);
  const isRangeEnd = isEnd && selectedStart && !isSameDay(selectedStart as Date, selectedEnd as Date);

  return (
    <div 
      onClick={onClick}
      title={holidayName}
      role="gridcell"
      aria-selected={isStart || isEnd || inRange}
      aria-current={isCurrentDay ? "date" : undefined}
      aria-label={`${format(day, 'MMMM d, yyyy')}${holidayName ? `. ${holidayName}` : ''}${isStart ? '. Trip start' : ''}${isEnd ? '. Trip end' : ''}`}
      className={cn(
        "relative h-12 w-12 flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer select-none group active:scale-95",
        !isCurrentMonth && "text-slate-300 opacity-40",
        isCurrentMonth && "text-slate-600",
        
        // Holiday styling
        isCurrentMonth && holidayName && !isStart && !isEnd && "text-rose-600 font-black",
        
        // Base hover
        isCurrentMonth && !isStart && !isEnd && "hover:bg-rose-50 hover:scale-125 active:scale-95 rounded-full",
        
        // In-range background
        inRange && "bg-rose-50/80 text-rose-500 font-black",
        
        // Range start/end background connectors
        isRangeStart && "after:absolute after:right-0 after:h-[60%] after:w-1/2 after:bg-rose-50/80 after:-z-10",
        isRangeEnd && "after:absolute after:left-0 after:h-[60%] after:w-1/2 after:bg-rose-50/80 after:-z-10",
        
        // Selected pill (Translucent Kawaii)
        (isStart || isEnd) && "bg-rose-400/80 text-white rounded-full shadow-[0_15px_30px_-5px_rgba(244,114,182,0.3)] z-10 scale-110 ring-4 ring-white/40 backdrop-blur-md animate-pulse-slow",
      )}>
      
      {/* Today Indicator (Sparkle SVG) */}
      {isCurrentDay && !isStart && !isEnd && (
        <div className="absolute -top-1 -right-1 z-20 animate-bounce-slow">
          <Sparkle className="w-4 h-4 text-rose-300 fill-rose-100/50" />
        </div>
      )}

      {/* Holiday Indicator (Heart SVG) */}
      {holidayName && !isStart && !isEnd && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 animate-pulse">
          <Heart className="w-3 h-3 text-orange-300 fill-orange-50/50" />
        </div>
      )}
      
      <span className={cn(
        "relative z-10 transition-transform duration-300",
        isStart || isEnd ? "text-xl font-black" : "text-lg font-black text-slate-700"
      )}>{format(day, 'd')}</span>
    </div>
  );
}
