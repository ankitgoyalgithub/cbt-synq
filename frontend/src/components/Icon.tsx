/* Custom line-icon set — elegant, stroke-based, drawn on a 24×24 grid.
   Icons inherit `currentColor`, so the sidebar's active-state color just works.
   Keys are semantic roles (brief / why / signal / forecast / consensus / ask) so
   the same visual language reads consistently across every persona's menu. */

type Props = { name: string; size?: number; className?: string };

const P = {
  // Home — a clean gabled house with a doorway
  home: (
    <>
      <path d="M3.6 11.3 12 4l8.4 7.3" />
      <path d="M5.5 10v9.5h13V10" />
      <path d="M9.7 19.5v-5.2h4.6v5.2" />
    </>
  ),
  // Brief / Canvas — a board with a header bar and content lines (the morning canvas)
  brief: (
    <>
      <rect x="3.8" y="4.3" width="16.4" height="15.4" rx="2.6" />
      <path d="M3.8 8.7h16.4" />
      <circle cx="6.6" cy="6.5" r=".55" fill="currentColor" stroke="none" />
      <path d="M6.8 12.2h6.2" />
      <path d="M6.8 15.4h9.4" />
    </>
  ),
  // Why / Variance — decomposition bars stepping down to a baseline
  why: (
    <>
      <path d="M3.7 20.2h16.6" />
      <rect x="5" y="6.4" width="3.3" height="13.4" rx=".9" />
      <rect x="10.35" y="10.2" width="3.3" height="9.6" rx=".9" />
      <rect x="15.7" y="13.4" width="3.3" height="6.4" rx=".9" />
    </>
  ),
  // Signal — a source dot with two arcs of signal radiating outward
  signal: (
    <>
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <path d="M8.6 15.4a4.8 4.8 0 0 1 0-6.8" />
      <path d="M15.4 8.6a4.8 4.8 0 0 1 0 6.8" />
      <path d="M6.2 17.8a8.2 8.2 0 0 1 0-11.6" />
      <path d="M17.8 6.2a8.2 8.2 0 0 1 0 11.6" />
    </>
  ),
  // Forecast — an axis with a rising trend line and a projected endpoint
  forecast: (
    <>
      <path d="M4 4.2v15.6h15.8" />
      <path d="M6.8 15.6 10 11.4l3 2.3 5-6.1" />
      <circle cx="18" cy="7.6" r="1.35" fill="currentColor" stroke="none" />
    </>
  ),
  // Consensus / Align — a workbook of checked-off rows
  consensus: (
    <>
      <rect x="3.8" y="4.3" width="16.4" height="15.4" rx="2.6" />
      <path d="M6.9 9 8 10.1l2-2.1" />
      <path d="M12.4 8.7h4.4" />
      <path d="M6.9 14.4l1.1 1.1 2-2.1" />
      <path d="M12.4 14.1h4.4" />
    </>
  ),
  // Ask — a twin sparkle (the AI accent)
  ask: (
    <>
      <path
        d="M11.4 3.6c.42 3.7 1.28 4.56 4.98 4.98-3.7.42-4.56 1.28-4.98 4.98-.42-3.7-1.28-4.56-4.98-4.98 3.7-.42 4.56-1.28 4.98-4.98Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M17.6 13.4c.22 1.72.66 2.16 2.38 2.38-1.72.22-2.16.66-2.38 2.38-.22-1.72-.66-2.16-2.38-2.38 1.72-.22 2.16-.66 2.38-2.38Z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  // Dark theme — a crescent moon
  moon: (
    <path d="M20 13.4A8 8 0 1 1 10.6 4a6.4 6.4 0 0 0 9.4 9.4Z" />
  ),
  // Light theme — a sun with rays
  sun: (
    <>
      <circle cx="12" cy="12" r="3.9" />
      <path d="M12 2.6v2.3M12 19.1v2.3M21.4 12h-2.3M4.9 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4" />
    </>
  ),
  // User guide — a question mark in a circle
  help: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M9.7 9.4a2.3 2.3 0 0 1 4.4.9c0 1.6-2.1 1.9-2.1 3.5" />
      <circle cx="12" cy="16.6" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  // Log out — a door with an exit arrow
  logout: (
    <>
      <path d="M9.5 4.5H5.4A1.4 1.4 0 0 0 4 5.9v12.2a1.4 1.4 0 0 0 1.4 1.4h4.1" />
      <path d="M15.5 15.5 19 12l-3.5-3.5" />
      <path d="M19 12H9.4" />
    </>
  ),
  // Brand mark — a linked distribution network (three synced nodes)
  brand: (
    <>
      <path d="M12 7 6.6 16.4M12 7l5.4 9.4M7.6 17h8.8" strokeWidth="1.7" />
      <circle cx="12" cy="6" r="2.15" fill="currentColor" stroke="none" />
      <circle cx="6" cy="17.2" r="2.15" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17.2" r="2.15" fill="currentColor" stroke="none" />
    </>
  ),
} as const;

export default function Icon({ name, size = 17, className }: Props) {
  const glyph = (P as Record<string, JSX.Element>)[name] || P.brief;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
