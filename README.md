# Living Nature Calendar

![Project Screenshot](public/screenshot.png)

A performance-optimized React/Next.js implementation of a dynamic wall calendar, architecturalized as a decoupled, state-driven dashboard. This project focuses on high-frequency UI updates, atomic state persistence, and hardware-accelerated rendering.

## Architectural Overview

### 1. State Management & Data Flow
The system utilizes a custom hook architecture to separate business logic from the presentation layer:
- **`useCalendar.ts`**: Handles complex date math and range validation using `date-fns`. It manages the cursor-based selection logic for both single-day and interval spans.
- **`useNotes.ts`**: Implements an atomic persistence layer. Data is indexed by ISO-8601 keys, ensuring $O(1)$ lookup for note retrieval. It features a debounced persistence mechanism to `localStorage` to minimize I/O overhead.

### 2. High-Performance Animation Pipeline
To achieve a sustained 60fps while managing dozens of simultaneous background elements:
- **Physics-Based Particles**: The `NatureParticles` system generates 60+ SVG fragments. Every fragment is rendered with `will-change: transform` to promote it to its own GPU layer, avoiding layout thrashing.
- **JIT Keyframe Injection**: Utilizes Tailwind CSS 4's Just-In-Time engine for hardware-accelerated animations, specifically `translateY` and `rotate` transforms, which bypass the CPU's main thread.
- **Bionic UI Scaling**: The "Breathing" effect is implemented via advanced CSS `scale` transforms, which are computationally inexpensive compared to width/height mutations.

### 3. Layout & Responsiveness Engineering
- **Viewport-Locking Strategy**: The application employs a `h-screen overflow-hidden` strategy to mimic a native binary application. This required a strict flexbox/grid hierarchy where the `CalendarGrid` and `NotesPanel` handle their own internal overflow.
- **Dynamic Geometric Masking**: The hero section utilizes `clip-path: polygon()` masks to create professional design-grade overlays without the weight of additional image assets.

## Core Technical Requirements Coverage

- **Day Range Selector**: Implements a robust start/end interval selection system with distinct component states for `active`, `interval`, and `boundary` nodes.
- **Wall Calendar Aesthetic**: Emulates physical verticality through a top-down anchor layout and a digital wire-binder implementation using repeating CSS fragments.
- **Functional Note Integration**: Fully isolated note entries mapped to unique date or range identifiers.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Styling Layer**: Tailwind CSS 4 (PostCSS 8+)
- **Logic Utilities**: `date-fns` for robust ISO-8601 date manipulation
- **Component Primitives**: Lucide React for consistent SVG rendering

## Installation & Build

```bash
# Install dependencies
npm install

# Build for production (optimized output)
npm run build

# Direct local development
npm run dev
```

---
*Technical Assessment Submission: Focus on UI Engineering, State Management, and Performance Latency.*
