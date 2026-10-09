"use client";
import { createContext, useContext, useMemo, useState } from "react";

interface Ctx {
  unidadeId: string; setUnidadeId: (v: string) => void;
  busca: string; setBusca: (v: string) => void;
  sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void;
}
const C = createContext<Ctx | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [unidadeId, setUnidadeId] = useState("all");
  const [busca, setBusca] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const value = useMemo(() => ({ unidadeId, setUnidadeId, busca, setBusca, sidebarOpen, setSidebarOpen }), [unidadeId, busca, sidebarOpen]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useDashboardCtx() {
  const v = useContext(C);
  if (!v) throw new Error("useDashboardCtx fora do DashboardProvider");
  return v;
}
