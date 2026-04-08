import { useState, useEffect, useCallback } from 'react';

export type NoteStore = Record<string, string>;

const STORAGE_KEY = 'calendar_notes_v1';

export function useNotes() {
  const [notes, setNotes] = useState<NoteStore>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Failed to parse calendar notes from localStorage:', error);
      }
    }
  }, []);

  // Save a note for a specific date key (Stable Atomic version)
  const saveNote = (dateKey: string, content: string) => {
    setNotes((prev) => {
      const updated = {
        ...prev,
        [dateKey]: content,
      };

      // Remove key if content is empty to keep store clean
      if (!content.trim()) {
        delete updated[dateKey];
      }

      return updated;
    });
  };

  // Sync with localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Helper to get a note for a specific date key (Memoized for stability)
  const getNote = useCallback((dateKey: string) => {
    return notes[dateKey] || '';
  }, [notes]);

  return {
    notes,
    saveNote,
    getNote,
  };
}
