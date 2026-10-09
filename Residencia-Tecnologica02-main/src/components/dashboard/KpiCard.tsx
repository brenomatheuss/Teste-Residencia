import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Kpi } from "@/types";

const icons: Record<string, string> = { fiscal: "gauge", frota: "truck", estoque: "archive", inadimplencia: "receipt" };

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const { ok, aviso = 0, critico = 0 } = kpi.barra;
  const total = ok + aviso + critico;
  const pct = (v: number) => `${(v / total) * 100}%`;
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <header className="flex items-start justify-between gap-2">
        <h2 className="text-xs font-bold uppercase leading-tight tracking-wider text-slate-500">{kpi.titulo}</h2>
        <Icon name={icons[kpi.id] ?? "gauge"} className="h-4 w-4 shrink-0 text-slate-400" />
      </header>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{kpi.valor}</span>
        {kpi.sufixo && <span className="-ml-1 text-base text-slate-400">{kpi.sufixo}</span>}
        <span className="text-sm font-semibold text-emerald-700">{kpi.rotulo}</span>
      </div>
      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-slate-200" role="img" aria-label={`${kpi.titulo}: ${kpi.valor}`}>
        <div className="bg-emerald-500" style={{ width: pct(ok) }} />
        {aviso > 0 && <div className="bg-amber-400" style={{ width: pct(aviso) }} />}
        {critico > 0 && <div className="bg-red-500" style={{ width: pct(critico) }} />}
      </div>
      <footer className="mt-3 flex justify-between gap-3 text-xs text-slate-500">
        <span>{kpi.rodape[0]}</span>
        {kpi.link
          ? <Link href={kpi.link.href} className="whitespace-nowrap font-medium text-brand hover:underline">{kpi.link.label} →</Link>
          : <span className="text-right font-medium text-slate-600">{kpi.rodape[1]}</span>}
      </footer>
      {kpi.link && <p className="mt-1 text-xs text-slate-500">{kpi.rodape[1]}</p>}
    </article>
  );
}
