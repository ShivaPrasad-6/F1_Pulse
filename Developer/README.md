# F1 Pulse

F1 Pulse is a React + Vite web application for exploring Formula 1 across current-season coverage, historical season data, driver and constructor information, strategy signals, technical references, and news.

## What the app includes

- Current season highlights landing page
- Dedicated current season stats page
- Explorer page for historical seasons, race weekends, circuits, standings, and strategy
- Racers page with current-grid drivers, career summaries, and live headshots
- Constructors page for current team standings
- Knowledge Base & Legends page for F1 history and champion context
- News & Articles page for live and fallback editorial content
- Information section with sidebar pages for:
  - Tyres
  - Circuits / Tracks
  - Controls
  - Flags

## Tech stack

- React
- Vite
- React Router
- Recharts
- Plain CSS

## Project structure

- `src/App.jsx`
  - App entry that renders the router provider
- `src/routes.ts`
  - Central route definitions
- `src/components/`
  - Shared layout and transition components
- `src/pages/`
  - Top-level route pages
- `src/pages/information/`
  - Nested pages inside the Information section
- `src/hooks/`
  - Reusable data-loading hooks
- `src/services/f1Api.js`
  - API integration layer
- `src/data/f1History.js`
  - Static editorial and knowledge-base content

## Routing overview

- `/`
  - Current season highlights
- `/current-season-<year>`
  - Current season statistics
- `/explorer`
  - Season explorer and strategy
- `/racers`
  - Driver directory and profiles
- `/constructors`
  - Constructor standings
- `/knowledge`
  - F1 history and legends
- `/news`
  - News and article feed
- `/information`
  - Information section, defaults to `/information/tyres`
- `/information/tyres`
- `/information/circuits`
- `/information/controls`
- `/information/flags`

## Data sources

The app uses public motorsport and content sources:

- Jolpica Ergast-compatible F1 API
  - Historical seasons
  - Race schedules
  - Results
  - Standings
  - Driver and constructor data
- OpenF1 API
  - Driver media
  - Recent telemetry-oriented data
  - Strategy-related current data
- Google News RSS via `rss2json`
  - News aggregation
- Wikipedia REST summaries
  - Circuit descriptions and images

## Features in more detail

### Current season

- Driver standings
- Constructor standings
- Race calendar
- Highlight metrics
- Points visualization

### Explorer

- Season selector
- Race selector
- Race classification
- Qualifying results
- Constructor table
- Circuit list
- Strategy section

### Racers

- Current grid cards
- Driver profile details
- Career summary
- Latest classified result
- Driver image grid using live headshots where available

### Information

- Tyre compound reference
- Circuits / Tracks accordion with nested detail panels
- Controls reference
- Flags and race-control reference

## Animations and visuals

- Route transition overlay with F1 car GIF
- Shared background image across pages
- Responsive layout for desktop and mobile

## Running locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes and limitations

- Some public APIs do not provide complete official track metadata for every circuit, so certain fields may be unavailable or approximated.
- Circuit images and descriptions depend on Wikipedia summary availability.
- Live news depends on the RSS-to-JSON bridge; fallback editorial content is used if the feed fails.
- Detailed strategy and media coverage are strongest for recent seasons.
- The transition GIF is bundled locally and increases asset size.

## Future improvements

- Add code-splitting to reduce bundle size
- Cache external API responses
- Add search and filters across pages
- Add richer track maps and official lap-distance data if a better source is available
- Add tests for route rendering and data hooks
