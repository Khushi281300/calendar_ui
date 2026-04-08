import { describe, it, expect } from 'vitest';
import { getHoliday } from '../holidays';

describe('holidays library', () => {
  it('should identify Republic Day', () => {
    const republicDay = new Date(2026, 0, 26);
    expect(getHoliday(republicDay)).toBe('Republic Day');
  });

  it('should identify Christmas', () => {
    const christmas = new Date(2026, 11, 25);
    expect(getHoliday(christmas)).toBe('Christmas');
  });

  it('should return undefined for a non-holiday', () => {
    const randomDay = new Date(2026, 0, 10);
    expect(getHoliday(randomDay)).toBeUndefined();
  });

  it('should be consistent with date formatting', () => {
    const independenceDay = new Date(2026, 7, 15); // Aug is index 7
    expect(getHoliday(independenceDay)).toBe('Independence Day');
  });
});
