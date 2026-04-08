# 📅 Professional Wall Calendar

A high-fidelity, production-ready wall calendar application built with Next.js 16 and Tailwind CSS. This project demonstrates senior-level frontend engineering practices, focusing on performance, accessibility (a11y), and premium "glassmorphism" design aesthetics.

## ✨ Features

- **🎨 Premium Glassmorphism UI**: High-end aesthetic using backdrop blurs, soft shadows, and a refined "squircle" design system (`rounded-2xl`).
- **📸 Dynamic Hero Imagery**: Seasonal photography that automatically updates based on the currently viewed month, powered by curated Unsplash imagery.
- **✨ Smooth Transitions**: Fluid, keyframe-based animations for month navigation and tactile interaction feedback.
- **🇮🇳 Indian Holiday Integration**: Built-in registry for major national holidays (Republic Day, Holi, Diwali, etc.) with pulsing visual indicators.
- **📝 Persistent Notes**: Local-first note system for any date or range, utilizing a custom `useNotes` hook with debounced `localStorage` persistence.
- **📱 Fully Responsive**: Seamless transition from a multi-column desktop dashboard to a single-column mobile-optimized stack.
- **♿ Accessibility (a11y)**: Semantic HTML grid roles and descriptive ARIA labels for every date cell, including holiday and selection status.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: Custom React Hooks (`useCalendar`, `useNotes`)
- **Utilities**: `date-fns` for robust date manipulation
- **Testing**: `Vitest` + `React Testing Library`

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calendar.

### Testing

Run the automated unit test suite:

```bash
npm test
```

## 🧪 Testing Strategy

The project employs a comprehensive testing strategy focusing on logic-heavy hooks and utility functions:
- **`useCalendar.test.ts`**: Verifies month navigation, date selection, and complex range boundary logic.
- **`holidays.test.ts`**: Ensures the accuracy of the holiday registry across the year.

## 📐 Design Decisions

- **Local Persistence**: Chose `localStorage` with a debounced hook to provide an "instant-save" feel without the overhead of a backend.
- **Component Extraction**: The `HeroPanel`, `CalendarGrid`, `DayCell`, and `NotesPanel` are highly modular, following the Single Responsibility Principle for easier maintenance and testing.
- **Performance**: Optimized imagery delivery using specific Unsplash photographic IDs for standardized aspect ratios and aggressive CDN caching.

---

*This project was developed with a disciplined, iterative commit history to showcase a professional engineering workflow.*
