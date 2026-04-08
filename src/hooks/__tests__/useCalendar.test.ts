import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCalendar } from '../useCalendar';
import { isSameMonth, addMonths, subMonths, isSameDay } from 'date-fns';

describe('useCalendar', () => {
  it('should initialize with current month', () => {
    const { result } = renderHook(() => useCalendar());
    expect(isSameMonth(result.current.currentMonth, new Date())).toBe(true);
  });

  it('should navigate to next month', () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.currentMonth;
    
    act(() => {
      result.current.nextMonth();
    });
    
    expect(isSameMonth(result.current.currentMonth, addMonths(initialMonth, 1))).toBe(true);
  });

  it('should navigate to previous month', () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.currentMonth;
    
    act(() => {
      result.current.prevMonth();
    });
    
    expect(isSameMonth(result.current.currentMonth, subMonths(initialMonth, 1))).toBe(true);
  });

  it('should handle date selection and range logic', () => {
    const { result } = renderHook(() => useCalendar());
    const date1 = new Date(2026, 0, 10);
    const date2 = new Date(2026, 0, 15);

    // Initial state
    expect(result.current.selectedStart).toBe(null);
    expect(result.current.selectedEnd).toBe(null);

    // Select first date
    act(() => {
      result.current.selectDate(date1);
    });
    expect(isSameDay(result.current.selectedStart!, date1)).toBe(true);
    expect(result.current.selectedEnd).toBe(null);

    // Select second date (range)
    act(() => {
      result.current.selectDate(date2);
    });
    expect(isSameDay(result.current.selectedStart!, date1)).toBe(true);
    expect(isSameDay(result.current.selectedEnd!, date2)).toBe(true);

    // Select third date (reset)
    const date3 = new Date(2026, 0, 20);
    act(() => {
      result.current.selectDate(date3);
    });
    expect(isSameDay(result.current.selectedStart!, date3)).toBe(true);
    expect(result.current.selectedEnd).toBe(null);
  });

  it('should reset start date if clicking a date before current selection', () => {
    const { result } = renderHook(() => useCalendar());
    const dateStart = new Date(2026, 0, 15);
    const dateEnd = new Date(2026, 0, 10);

    act(() => {
      result.current.selectDate(dateStart);
    });
    act(() => {
      result.current.selectDate(dateEnd);
    });

    // The logic resets start to the new date and clears end
    expect(isSameDay(result.current.selectedStart!, dateEnd)).toBe(true);
    expect(result.current.selectedEnd).toBe(null);
  });
});
