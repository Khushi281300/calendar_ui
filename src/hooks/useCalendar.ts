import { useState } from 'react';
import { addMonths, subMonths, isSameDay } from 'date-fns';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const goToToday = () => setCurrentMonth(new Date());
  
  const setMonth = (month: number) => {
    const next = new Date(currentMonth);
    next.setMonth(month);
    setCurrentMonth(next);
  };
  
  const setYear = (year: number) => {
    const next = new Date(currentMonth);
    next.setFullYear(year);
    setCurrentMonth(next);
  };

  const selectDate = (date: Date) => {
    // If the same date is clicked and no range is active, deselect it
    if (selectedStart && !selectedEnd && isSameDay(date, selectedStart)) {
      setSelectedStart(null);
      return;
    }

    // Toggle behavior: if both are selected and we click one, clear all
    if (selectedStart && selectedEnd && (isSameDay(date, selectedStart) || isSameDay(date, selectedEnd))) {
      setSelectedStart(null);
      setSelectedEnd(null);
      return;
    }

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
    goToToday,
    setMonth,
    setYear,
    selectDate,
    clearSelection,
  };
}
