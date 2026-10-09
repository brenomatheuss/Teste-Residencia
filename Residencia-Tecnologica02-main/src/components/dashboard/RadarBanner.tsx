import type { Periodo, Radar } from "@/types";

const periodos: { id: Periodo; label: string }[] = [{ id: "hoje", label: "Hoje" }, { id: "7d", label: "7D" }, { id: "30d", label: "30D" }];

export function RadarBanner({ radar, periodo, onPeriodo, onDossie }: { radar: Radar; periodo: Periodo; onPeriodo: (p: Periodo) => void; onDossie: () => void }) {
  return (
    <section aria-label="Radar de saúde da distribuidora" className="flex flex-wrap items-center gap-4 rounded-lg bg-navy p-4 text-white">
      <div className="rounded-md border border-blue-400/60 bg-navy-2 px-3 py-2 text-center">
        <p className="text-2xl font-bold leading-none">{radar.score.toFixed(1)}</p>
        <p className="mt-1 font-mono text-[11px] text-slate-300">/100</p>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xs font-bold tracking-widest text-slate-300">RADAR DE SAÚDE DA DISTRIBUIDORA</h1>
          <span className="rounded border border-amber-400 bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">● {radar.nivel}</span>
        </div>
        <p className="mt-1 text-sm"><strong className="text-base font-semibold">{radar.resumo}</strong> <span className="text-slate-300">{radar.detalhe}</span></p>
      </div>
      <div role="group" aria-label="Período" className="flex rounded-md border border-white/20 bg-navy-2 p-0.5 text-xs font-medium">
        {periodos.map((p) => (
          <button key={p.id} aria-pressed={periodo === p.id} onClick={() => onPeriodo(p.id)}
            className={`rounded px-3 py-1.5 ${periodo === p.id ? "bg-brand font-bold text-white" : "text-slate-300 hover:text-white"}`}>{p.label}</button>
        ))}
      </div>
      <button onClick={onDossie} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>
        Gerar Dossiê da Diretoria
      </button>
    </section>
  );
}
