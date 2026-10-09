"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { navConfig, navOperacoes, type NavItem } from "@/lib/nav";
import { useDashboardCtx } from "./DashboardContext";

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? "bg-brand font-medium text-white" : "text-slate-200 hover:bg-white/10"}`}>
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      <span className="flex-1 leading-tight">{item.label}</span>
      {item.badge && (item.badge.tone === "amber"
        ? <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">{item.badge.text}</span>
        : <span className="font-mono text-[11px] text-slate-300">{item.badge.text}</span>)}
    </Link>
  );
}

function Content({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex h-full flex-col gap-4 bg-navy p-3 text-white">
      <div className="flex items-center gap-3 px-1 pt-1">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-xs font-black text-navy">BVX</div>
        <div className="flex-1 leading-tight">
          <p className="text-base font-bold tracking-wide">BEVOX</p>
          <p className="text-[11px] font-medium tracking-wider text-slate-300">BACKOFFICE ERP</p>
        </div>
        <span className="rounded bg-blue-600 px-1.5 py-0.5 font-mono text-[11px] font-bold">v4.2</span>
      </div>

      <Menu label="Trocar empresa" align="left" trigger={
        <span className="flex w-full items-center gap-3 rounded-md bg-navy-2 px-3 py-2.5 text-left ring-1 ring-white/10">
          <span className="grid h-8 w-8 place-items-center rounded bg-slate-700 text-[10px] font-bold">AD</span>
          <span className="flex-1 leading-tight">
            <span className="block text-sm font-medium">Adega Distribution</span>
            <span className="block text-[11px] font-semibold text-amber-400">Empresa Ativa • Matriz</span>
          </span>
          <Icon name="chevronsUpDown" className="h-4 w-4 text-slate-300" />
        </span>}>
        {(close) => <MenuItem active onClick={close}>Adega Distribution • Matriz</MenuItem>}
      </Menu>

      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto">
        <p className="px-3 pb-2 pt-2 text-[11px] font-bold tracking-widest text-slate-400">OPERAÇÕES & FISCAL</p>
        <div className="space-y-1">{navOperacoes.map((i) => <NavLink key={i.href} item={i} onNavigate={onNavigate} />)}</div>
        <p className="px-3 pb-2 pt-6 text-[11px] font-bold tracking-widest text-slate-400">CONFIGURAÇÕES</p>
        <div className="space-y-1">{navConfig.map((i) => <NavLink key={i.href} item={i} onNavigate={onNavigate} />)}</div>
      </nav>
    </div>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useDashboardCtx();
  const close = () => setSidebarOpen(false);
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block"><Content onNavigate={() => {}} /></aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={close} />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[85%]"><Content onNavigate={close} /></aside>
        </div>
      )}
    </>
  );
}
