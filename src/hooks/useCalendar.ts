import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));

  const selectDate = (date: Date) => {
    // If nothing is selected, or both are already selected, start a new range
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
      return;
    }

    // If we only have a start date, check if the clicked date is before it
    if (date < selectedStart) {
      setSelectedStart(date); // Reset start date if user clicks backwards
      setSelectedEnd(null);
    } else {
      setSelectedEnd(date); // Otherwise, complete the range
    }
  };

  const clearSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  return {
    currentMonth,
    selectedStart,
    selectedEnd,
    nextMonth,
    prevMonth,
    selectDate,
    clearSelection,
  };
}
