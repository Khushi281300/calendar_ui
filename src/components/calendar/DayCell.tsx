import React from 'react';
import { format, isSameMonth, isToday, isSameDay, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

export interface DayCellProps {
  day: Date;
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onClick: () => void;
}

export function DayCell({ day, currentMonth, selectedStart, selectedEnd, onClick }: DayCellProps) {
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
      className={cn(
        "relative h-12 w-12 flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer select-none group active:scale-95",
        !isCurrentMonth && "text-slate-300 opacity-40",
        isCurrentMonth && "text-slate-600",
        
        // Base hover
        isCurrentMonth && !isStart && !isEnd && "hover:bg-slate-100 rounded-2xl",
        
        // In-range background (square/rectangle to connect cells)
        inRange && "bg-blue-50/70 text-blue-600",
        
        // Range start/end background connectors (ensuring they fill precisely)
        isRangeStart && "after:absolute after:right-0 after:h-full after:w-1/2 after:bg-blue-50/70 after:-z-10",
        isRangeEnd && "after:absolute after:left-0 after:h-full after:w-1/2 after:bg-blue-50/70 after:-z-10",
        
        // Selected pill
        (isStart || isEnd) && "bg-blue-600 text-white rounded-2xl shadow-[0_4px_12px_rgba(37,99,235,0.3),0_8px_24px_rgba(37,99,235,0.2)] z-10 scale-105",
        
        // Today indicator
        isCurrentDay && !isStart && !isEnd && "before:absolute before:bottom-2 before:w-1.5 before:h-1.5 before:bg-blue-600/80 before:rounded-full"
      )}>
      <span className="relative z-10">{format(day, 'd')}</span>
    </div>
  );
}
