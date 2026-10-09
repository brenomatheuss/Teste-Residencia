"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { useToast } from "@/components/ui/Toast";
import { unidades } from "@/data/mockData";
import { useDashboardCtx } from "./DashboardContext";

const alertas = [
  "AVCB expirado — CDD Jaboatão",
  "Licença Sanitária vence em 6 dias — CDD Olinda",
  "NF-e travada — Pedido #PED-9041",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="hidden items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 xl:inline-flex">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />{children}
    </span>
  );
}

export function Header() {
  const { unidadeId, setUnidadeId, busca, setBusca, setSidebarOpen } = useDashboardCtx();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const atual = unidades.find((u) => u.id === unidadeId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); inputRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
      <button onClick={() => setSidebarOpen(true)} aria-label="Abrir menu" className="rounded p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"><Icon name="menu" className="h-5 w-5" /></button>

      <Menu label="Filtrar por unidade" align="left" trigger={
        <span className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-left text-sm font-medium text-slate-800">
          <Icon name="warehouseSmall" className="h-4 w-4 text-brand" />
          <span className="hidden max-w-40 leading-tight sm:block">{atual ? atual.nome : "Todas as Unidades (4 CDDs)"}</span>
          <Icon name="chevronDown" className="h-4 w-4" />
        </span>}>
        {(close) => (<>
          <MenuItem active={unidadeId === "all"} onClick={() => { setUnidadeId("all"); close(); }}>Todas as Unidades (4 CDDs)</MenuItem>
          {unidades.map((u) => <MenuItem key={u.id} active={u.id === unidadeId} onClick={() => { setUnidadeId(u.id); close(); }}>{u.nome}</MenuItem>)}
        </>)}
      </Menu>

      <label className="relative hidden min-w-0 flex-1 md:block">
        <span className="sr-only">Buscar por CNPJ, certidão, carga ou SKU</span>
        <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input ref={inputRef} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por CNPJ, Certidão, Carga ou SKU..."
          className="w-full max-w-xl rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-12 text-sm outline-none focus:border-brand" />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">⌘K</kbd>
      </label>
      <div className="flex-1 md:hidden" />

      <Pill>SEFAZ Online</Pill>
      <Pill>WMS FEFO Synced</Pill>

      <Menu label="Notificações" trigger={
        <span className="relative rounded p-2 text-slate-600 hover:bg-slate-100">
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
        </span>}>
        {(close) => (<>
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Alertas (demonstração)</p>
          {alertas.map((a) => <MenuItem key={a} onClick={close}>{a}</MenuItem>)}
        </>)}
      </Menu>

      <Menu label="Menu do usuário" trigger={
        <span className="flex items-center gap-3 border-l border-slate-200 pl-3 text-left">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">RS</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-slate-900">Ricardo Silveira</span>
            <span className="block text-xs text-slate-500">CEO • Diretoria Executiva</span>
          </span>
        </span>}>
        {(close) => (<>
          <MenuItem onClick={() => { toast("Perfil indisponível na demonstração."); close(); }}>Meu perfil</MenuItem>
          <MenuItem onClick={() => { toast("Sessão simulada — sem autenticação real."); close(); }}>Sair</MenuItem>
        </>)}
      </Menu>
    </header>
  );
}
