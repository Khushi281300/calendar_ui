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
        "relative h-12 w-12 flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer select-none group",
        !isCurrentMonth && "text-slate-300 opacity-50",
        isCurrentMonth && "text-slate-600",
        
        // Base hover
        isCurrentMonth && !isStart && !isEnd && "hover:bg-slate-100 rounded-xl",
        
        // In-range background (square/rectangle to connect cells)
        inRange && !isStart && !isEnd && "bg-blue-50/80 text-blue-600",
        
        // Range start/end background connectors
        isRangeStart && "after:absolute after:right-0 after:h-full after:w-1/2 after:bg-blue-50/80 after:-z-10",
        isRangeEnd && "after:absolute after:left-0 after:h-full after:w-1/2 after:bg-blue-50/80 after:-z-10",
        
        // Selected circle
        (isStart || isEnd) && "bg-blue-600 text-white rounded-xl shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] z-10",
        
        // Today indicator
        isCurrentDay && !isStart && !isEnd && "before:absolute before:bottom-2 before:w-1 before:h-1 before:bg-blue-600 before:rounded-full"
      )}>
      <span className="relative z-10">{format(day, 'd')}</span>
    </div>
  );
}
