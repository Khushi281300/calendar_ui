'use client';

import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';

interface NotesPanelProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  getNote: (dateKey: string) => string;
  saveNote: (dateKey: string, content: string) => void;
}

export function NotesPanel({
  selectedStart,
  selectedEnd,
  getNote,
  saveNote,
}: NotesPanelProps) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Get the key for the current selection (primary focus is selectedStart)
  const dateKey = selectedStart ? format(selectedStart, 'yyyy-MM-dd') : null;

  // Sync internal state when the selected date changes
  useEffect(() => {
    if (dateKey) {
      setContent(getNote(dateKey));
    } else {
      setContent('');
    }
  }, [dateKey, getNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setContent(newText);
    
    if (!dateKey) return;

    // Show "saving" status
    setIsSaving(true);

    // Debounce the save operation
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      saveNote(dateKey, newText);
      setIsSaving(false);
    }, 800);
  };

  if (!selectedStart) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-8 transition-colors">
        <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
           <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
           </svg>
        </div>
        <p className="text-sm font-medium">Select a date to add notes</p>
      </div>
    );
  }

  const dateLabel = selectedEnd && selectedStart.getTime() !== selectedEnd.getTime()
    ? `${format(selectedStart, 'MMM d')} - ${format(selectedEnd, 'MMM d, yyyy')}`
    : format(selectedStart, 'MMMM d, yyyy');

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-none">Notes</h3>
          <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-medium">
            {dateLabel}
          </p>
        </div>
        {isSaving && (
          <span className="text-[10px] text-blue-500 font-medium animate-pulse bg-blue-50 px-2 py-0.5 rounded-full">
            Saving...
          </span>
        )}
      </div>
      
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="What's happening this day? Type here to save..."
          className="w-full h-full p-6 text-gray-700 bg-transparent resize-none focus:outline-none placeholder:text-gray-300 leading-relaxed text-sm"
        />
        <div className="absolute bottom-4 right-6 pointer-events-none opacity-20">
           <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
             <path d="M14.06,9.02L14.98,9.94L5.92,19H5V18.08L14.06,9.02M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
           </svg>
        </div>
      </div>
    </div>
  );
}
