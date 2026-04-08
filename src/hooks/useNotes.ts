import { useState, useEffect } from 'react';

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

  // Save a note for a specific date key
  const saveNote = (dateKey: string, content: string) => {
    const updatedNotes = {
      ...notes,
      [dateKey]: content,
    };

    // Remove key if content is empty to keep store clean
    if (!content.trim()) {
      delete updatedNotes[dateKey];
    }

    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  // Helper to get a note for a specific date key
  const getNote = (dateKey: string) => {
    return notes[dateKey] || '';
  };

  return {
    notes,
    saveNote,
    getNote,
  };
}
