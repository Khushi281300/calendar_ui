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
    ? isWithinInterval(day, { start: selectedStart, end: selectedEnd }) && !isStart && !isEnd
    : false;

  return (
    <div 
      onClick={onClick}
      className={cn(
      "h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors cursor-pointer",
      !isCurrentMonth && "text-gray-300",
      isCurrentMonth && !isStart && !isEnd && !inRange && "text-gray-700 hover:bg-gray-100",
      isCurrentDay && !isStart && !isEnd && !inRange && "bg-neutral-200 text-black",
      
      isStart && "bg-black text-white shadow-md",
      isEnd && "bg-black text-white shadow-md",
      inRange && "bg-black/5 text-black"
    )}>
      {format(day, 'd')}
    </div>
  );
}
