'use client';

import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Leaf, Heart, Check, Edit2, X } from 'lucide-react';

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
      <div className="flex items-center justify-between mb-4 bg-emerald-50/20 backdrop-blur-3xl p-4 rounded-[2rem] border border-white/40 shadow-sm h-16 shrink-0 relative">
        <div className="flex-1 flex flex-col items-start justify-center">
          <div className="flex items-center gap-1.5 mb-1">
             <Heart className={`w-3 h-3 ${isRange ? 'text-emerald-500 fill-emerald-100/50' : 'text-orange-300 fill-orange-50/50'}`} />
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600/70 leading-none">
               NOTES
             </span>
          </div>
          <div className="text-[11px] font-black text-emerald-900 tracking-tight flex items-center gap-1.5 leading-none">
            {selectedStart ? (
              <span className="text-emerald-700 px-2 py-1 bg-white/40 rounded-full border border-white/20 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                {format(selectedStart, 'MMM d')} {isRange ? `~ ${format(selectedEnd!, 'MMM d')}` : ''}
              </span>
            ) : (
              <span className="uppercase tracking-[0.15em] text-[10px] text-emerald-600/60 font-black">Memory Log</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {(!isEditing && content && selectedStart) && (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 shadow-md transition-all active:scale-90"
              title="Edit Note"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
          {selectedStart && (
            <button 
              onClick={onClearSelection}
              className="p-2 bg-white/60 text-slate-400 hover:text-emerald-600 rounded-full border border-white/40 hover:bg-white shadow-sm transition-all active:scale-90"
              title="Clear Selection"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 relative min-h-0 overflow-hidden bg-white/30 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-sm flex flex-col">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ background: 'repeating-linear-gradient(transparent, transparent 31px, #10b981 31px, #10b981 32px)' }} 
        />
        
        {!selectedStart ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
            <Leaf className="w-8 h-8 text-emerald-500 mb-4 opacity-40 animate-float" />
            <h4 className="text-lg font-black text-emerald-800 tracking-tight mb-1 uppercase">Notes Section</h4>
            <p className="text-[10px] text-emerald-600/70 font-black uppercase tracking-widest max-w-[180px]">Select a date or range to jot down memos</p>
          </div>
        ) : isEditing ? (
          <div className="flex-1 flex flex-col p-4 relative z-10">
            <textarea
              autoFocus
              value={content}
              onChange={handleChange}
              placeholder="In all things of nature there is something of the marvelous..."
              className="w-full h-full resize-none border-none p-2 text-emerald-950 leading-[32px] placeholder:text-emerald-300 placeholder:italic focus:ring-0 text-base font-black bg-transparent scrollbar-hide"
            />
            <div className="absolute bottom-4 right-5 flex items-center gap-3">
              {isSaving && <span className="text-[9px] font-black text-emerald-500 animate-pulse tracking-widest uppercase">Saving...</span>}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 text-white font-black rounded-full shadow-lg hover:bg-emerald-600 active:scale-95 transition-all text-[10px] tracking-widest disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                SAVE & PLANT
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 animate-in fade-in zoom-in-95 duration-500 relative">
             <div className="absolute top-4 left-4 opacity-10">
                <Leaf className="w-12 h-12" />
             </div>
             <p className="text-lg font-black text-emerald-950 leading-[32px] italic px-4">
                &quot;{content || "A silent moment in nature..."}&quot;
             </p>
             <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] opacity-60">
                <div className="w-6 h-[1px] bg-emerald-200" />
                MEMORY SECURED
                <div className="w-6 h-[1px] bg-emerald-200" />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
