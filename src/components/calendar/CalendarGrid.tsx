import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function CalendarGrid({ currentMonth, selectedStart, selectedEnd, onSelectDate }: CalendarGridProps) {
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  
  const startDate = startOfWeek(firstDay);
  const endDate = endOfWeek(lastDay);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-4">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 place-items-center">
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
