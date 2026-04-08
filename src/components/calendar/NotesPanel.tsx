'use client';

import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Leaf, Heart, Check, Edit2 } from 'lucide-react';

interface NotesPanelProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  getNote: (dateKey: string) => string;
  saveNote: (dateKey: string, content: string) => void;
  onClearSelection: () => void;
}

export function NotesPanel({ selectedStart, selectedEnd, getNote, saveNote, onClearSelection }: NotesPanelProps) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const lastKeyRef = useRef<string | null>(null);

  const isRange = selectedStart && selectedEnd && selectedStart.getTime() !== selectedEnd.getTime();
  
  const dateKey = selectedStart ? (
    isRange 
      ? `${format(selectedStart, 'yyyy-MM-dd')}_${format(selectedEnd!, 'yyyy-MM-dd')}`
      : format(selectedStart, 'yyyy-MM-dd')
  ) : null;

  useEffect(() => {
    if (dateKey !== lastKeyRef.current) {
      const saved = dateKey ? getNote(dateKey) : '';
      setContent(saved);
      setIsEditing(!saved); 
      lastKeyRef.current = dateKey;
    }
  }, [dateKey, getNote]);

  const handleSave = () => {
    if (dateKey) {
      setIsSaving(true);
      saveNote(dateKey, content);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="h-full flex flex-col group/notes overflow-hidden">
      <div className="flex items-center justify-between mb-4 bg-emerald-50/20 backdrop-blur-3xl p-4 rounded-[2rem] border border-white/40 shadow-sm relative overflow-hidden h-16 shrink-0">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-emerald-200/20 backdrop-blur-sm -rotate-1 border-x border-dashed border-emerald-300 opacity-40 z-30" />
        
        <div className="flex-1 flex flex-col items-start justify-center">
          <div className="flex items-center gap-1.5 mb-1">
             <Heart className={`w-3 h-3 ${isRange ? 'text-emerald-500 fill-emerald-100/50' : 'text-orange-300 fill-orange-50/50'} animate-pulse`} />
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600/70 leading-none">
               {isRange ? 'Forest Wish' : 'River Note'}
             </span>
          </div>
          <div className="text-[11px] font-black text-emerald-900 tracking-tight flex items-center gap-1.5 leading-none">
            {selectedStart ? (
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700 px-2 py-1 bg-white/40 backdrop-blur-md rounded-full border border-white/20">{format(selectedStart, 'MMM d')}</span>
                {isRange && (
                  <>
                    <span className="text-emerald-300">~</span>
                    <span className="text-emerald-700 px-2 py-1 bg-white/40 backdrop-blur-md rounded-full border border-white/20">{format(selectedEnd!, 'MMM d')}</span>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-600/60 font-black">
                <Leaf className="w-4 h-4" />
                <span className="uppercase tracking-[0.15em] text-[10px]">NATURE LOGS</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {(!isEditing && content && selectedStart) && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-md active:scale-95"
            >
              <Edit2 className="w-3 h-3" />
              EDIT
            </button>
          )}
          {selectedStart && (
            <button 
              onClick={onClearSelection}
              className="p-2 bg-white/40 backdrop-blur-md rounded-full text-emerald-400 hover:text-emerald-700 hover:bg-white/60 transition-all active:scale-90 shadow-sm border border-white/20"
              aria-label="Clear Selection"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 relative min-h-0 overflow-hidden">
        {!selectedStart ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-50/10 backdrop-blur-3xl rounded-[2.5rem] border border-dashed border-emerald-200/50 p-6 text-center shadow-[inset_0_0_30px_rgba(16,185,129,0.05)] overflow-hidden">
            <div className="w-12 h-12 bg-white/40 backdrop-blur-3xl rounded-full shadow-lg flex items-center justify-center mb-4 border border-white/60 animate-breathing">
               <Leaf className="w-6 h-6 text-emerald-500" />
            </div>
            <h4 className="text-lg font-black text-emerald-800 tracking-tight mb-1">THE RIVER FLOWS</h4>
            <p className="text-[10px] text-emerald-600/70 max-w-[200px] leading-relaxed font-black uppercase tracking-[0.15em] mb-3">
              Plant a memory below
            </p>
            <div className="text-[9px] italic text-emerald-500/50 font-medium max-w-[240px] leading-relaxed border-t border-emerald-100/30 pt-3">
              &quot;Nature does not hurry, yet everything is accomplished.&quot;
            </div>
          </div>
        ) : isEditing ? (
          <div className="h-full bg-white/30 backdrop-blur-3xl rounded-[2.5rem] shadow-sm border border-white/60 p-4 flex flex-col relative overflow-hidden">
            <textarea
              autoFocus
              value={content}
              onChange={handleChange}
              placeholder={isRange 
                ? "Look deep into nature, and then you will understand everything better. - Albert Einstein 🍃" 
                : "In all things of nature there is something of the marvelous. - Aristotle 🌼"}
              className="w-full h-full resize-none border-none p-3 text-emerald-900 leading-relaxed placeholder:text-emerald-300 placeholder:italic focus:ring-0 text-base font-black scrollbar-hide bg-transparent relative z-10"
            />
            <div className="absolute bottom-4 right-5 z-20 flex items-center gap-3">
              {isSaving && (
                <span className="text-[9px] font-black text-emerald-500 animate-pulse uppercase tracking-[0.1em]">Planting...</span>
              )}
              <button 
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white font-black rounded-full shadow-lg hover:bg-emerald-600 active:scale-95 transition-all text-[10px] tracking-widest"
              >
                <Check className="w-3.5 h-3.5" />
                SAVE & PLANT 🌿
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white/40 backdrop-blur-3xl rounded-[2.5rem] shadow-sm border-2 border-white p-6 flex flex-col items-center justify-center relative overflow-hidden text-center animate-in fade-in zoom-in-95 duration-500">
             <div className="absolute top-4 right-4 opacity-[0.03] pointer-events-none">
                <Leaf className="w-32 h-32 text-emerald-900 fill-current" />
             </div>
             <div className="relative z-10 max-w-lg">
                <div className="w-10 h-10 bg-emerald-100/50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                   <Leaf className="w-5 h-5 fill-emerald-200/50" />
                </div>
                <p className="text-base font-black text-emerald-950 leading-relaxed italic px-4">
                   &quot;{content || "A silent moment in nature..."}&quot;
                </p>
                <div className="pt-4 flex items-center justify-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                   <div className="w-4 h-[1px] bg-emerald-200" />
                   Memory Planted
                   <div className="w-4 h-[1px] bg-emerald-200" />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
