const paths: Record<string, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  network: <><circle cx="12" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L15.5 10"/></>,
  bot: <><rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V5M9 13h.01M15 13h.01M3 13v2M21 13v2"/><circle cx="12" cy="4" r="1"/></>,
  warehouse: <><path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-7h10v7M7 17h10"/></>,
  wallet: <><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/><path d="M6 10v5M18 10v5"/></>,
  building: <><rect x="4" y="3" width="10" height="18" rx="1"/><path d="M14 9h6v12h-6M8 7h2M8 11h2M8 15h2M17 13h.01M17 17h.01"/></>,
  audit: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><circle cx="12" cy="11" r="2.5"/><path d="M8.5 16.5c.8-1.5 2-2 3.5-2s2.7.5 3.5 2"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
  bell: <><path d="M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 004 0"/></>,
  chevronsUpDown: <path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>,
  chevronDown: <path d="M6 9l6 6 6-6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  x: <path d="M6 6l12 12M18 6L6 18"/>,
  warehouseSmall: <><path d="M3 21V9l9-5 9 5v12"/><path d="M9 21v-6h6v6"/></>,
  gauge: <><circle cx="12" cy="12" r="9"/><path d="M12 12l4-3M8 12h.01"/></>,
  truck: <><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6.5" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></>,
  archive: <><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/></>,
  receipt: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></>,
  alertCircle: <><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></>,
  alertTriangle: <><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/></>,
  checkCircle: <><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  zap: <path d="M13 2L4 14h7l-1 8 9-12h-7z"/>,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6"/>,
  fileText: <><path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
  barChart: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></>,
  logout: <><path d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9"/></>,
  download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6"/>,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6"/>,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-4 w-4", strokeWidth = 1.8 }: { name: IconName | string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] ?? null}
    </svg>
  );
}
