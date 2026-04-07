import React from 'react';

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 antialiased">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden min-h-[800px] border border-gray-100 grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[3fr_5fr]">
        
        {/* Left Panel: Hero Image & Month Display */}
        <section className="bg-gray-100 flex flex-col justify-end p-8 border-r border-gray-100 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="relative z-20 text-white">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight pb-2">April</h1>
            <p className="text-lg opacity-80 font-medium">2026</p>
          </div>
        </section>

        {/* Right Panel: Calendar & Notes */}
        <section className="p-6 md:p-10 flex flex-col flex-1 h-full">
          <div className="flex-1">
            {/* Calendar Grid Placholder */}
             <div className="h-[400px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
               Calendar Grid Component Will Go Here
             </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100">
             {/* Notes Panel Placeholder */}
             <div className="h-[150px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
               Notes Panel Component Will Go Here
             </div>
          </div>
        </section>

      </div>
    </main>
  );
}
