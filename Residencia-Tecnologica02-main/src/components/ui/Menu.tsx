"use client";
import { useEffect, useRef, useState } from "react";

export function Menu({ trigger, children, align = "right", label }: { trigger: React.ReactNode; children: (close: () => void) => React.ReactNode; align?: "left" | "right"; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", key); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex items-center rounded-md">{trigger}</button>
      {open && (
        <div role="menu" className={`absolute z-40 mt-2 min-w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg ${align === "right" ? "right-0" : "left-0"}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function MenuItem({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button role="menuitem" onClick={onClick} className={`block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${active ? "font-semibold text-brand" : "text-slate-700"}`}>{children}</button>
  );
}
