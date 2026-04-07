import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

export interface DayCellProps {
  day: Date;
  currentMonth: Date;
}

export function DayCell({ day, currentMonth }: DayCellProps) {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isCurrentDay = isToday(day);

  return (
    <div className={cn(
      "h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors cursor-pointer",
      !isCurrentMonth && "text-gray-300",
      isCurrentMonth && "text-gray-700",
      isCurrentDay && "bg-neutral-200 text-black",
      isCurrentMonth && !isCurrentDay && "hover:bg-gray-100"
    )}>
      {format(day, 'd')}
    </div>
  );
}
