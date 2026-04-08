# Living Nature Calendar: Frontend Engineering Challenge

This repository contains my submission for the Frontend Engineering Challenge. The project is a high-fidelity, interactive React/Next.js calendar component that translates the traditional "wall calendar" aesthetic into a modern, performance-oriented digital experience.

## Design Philosophy

The challenge was to emulate a physical wall calendar while maintaining the functional requirements of a digital application. My approach centered on three pillars: **Visual Anchor**, **Living UI**, and **Tactile Feedback**.

1.  **Visual Anchor**: Following the inspiration image, the layout uses a prominent hero section that serves as a seasonal anchor.
2.  **Living UI**: To surpass static requirements, I implemented a global particle system and a CSS mesh-flow background to create an "organic" feel.
3.  **Tactile Feedback**: Every interaction—from day selection to saving notes—is accompanied by subtle micro-animations (breathing effects, bloom hovers) to mimic the tactile quality of a physical product.

## Key Features & Requirements Coverage

### 1. Wall Calendar Aesthetic
- **Dynamic Hero Section**: Integrated with curated high-resolution photography that automatically updates color themes and textures based on the month.
- **Glassmorphism**: Leveraged advanced backdrop filters and translucent layering to maintain depth without sacrificing clarity.

### 2. Intelligent Day Range Selector
- **Multi-State Selection**: Includes distinct visual indicators for `Selection Start`, `Selection End`, and `In-Range Span`.
- **Atomic Range Logic**: Implemented a custom selection algorithm that handles range crossing and multi-day spans with immediate visual synchronization.

### 3. Integrated Notes & Memory JournalING
- **Context-Aware Persistence**: Notes are automatically isolated by date or range. Saving a note for a specific range does not overwrite single-day entries.
- **Explicit Save Workflow**: Introduced an explicit "Save & Plant" mechanism to give users a clear sense of completion, transitioning from a focus-editor to a "Saved Memory" view.

### 4. Fully Responsive Architecture
- **Desktop Dashboard**: A multi-column, fit-to-screen grid designed for high-resolution monitors.
- **Mobile Stack**: A fluid, vertically-stacked layout that prioritizes touch-friendly date selection and keyboard-optimized note editing.

## Creative Liberty: The "Living" Experience

To exceed the baseline requirements, I implemented several advanced frontend features:
- **Global Particle System**: Client-side drifting botanical elements that create a sense of environmental depth.
- **Bionic Breathing UI**: CSS keyframe animations that pulse the primary containers, making the interface feel "alive."
- **Indian Holiday Registry**: A built-in registry for national holidays with specialized visual markers.

## Technical Implementation

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 (Utilizing JIT-compiled keyframes)
- **Icons**: Lucide React
- **Date Management**: `date-fns` for robust ISO-8601 handling
- **State Management**: Custom React Hooks (`useCalendar`, `useNotes`) for modular logic separation.
- **Testing**: Integrated Vitest suite for core hook validation.

### Performance & Optimization
- **Hardware Acceleration**: Used `will-change: transform` on all global particles to ensure 60fps performance.
- **Viewport Locking**: The application uses a non-scrolling, fit-to-screen layout to mimic a native application experience.

## Getting Started

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---
*Developed with a focus on component modularity, technical clean-line CSS, and a premium user experience.*
