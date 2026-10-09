"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDashboardCtx } from "@/components/layout/DashboardContext";
import { Modal } from "@/components/ui/Modal";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { getDashboard } from "@/services/dashboard";
import type { DashboardData, Periodo, Unidade } from "@/types";
import { GatilhosPanel } from "./GatilhosPanel";
import { KpiCard } from "./KpiCard";
import { RadarBanner } from "./RadarBanner";
import { TabelaDocs } from "./TabelaDocs";
import { UnidadeModal } from "./UnidadeModal";

type Result = { periodo: Periodo; data?: DashboardData; error?: boolean };

export function DashboardView() {
  const { unidadeId, busca } = useDashboardCtx();
  const [periodo, setPeriodo] = useState<Periodo>("7d");
  const [res, setRes] = useState<Result | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [acao, setAcao] = useState<Unidade | null>(null);
  const [dossieOpen, setDossieOpen] = useState(false);

  useEffect(() => {
    let vivo = true;
    getDashboard(periodo).then((data) => vivo && setRes({ periodo, data })).catch(() => vivo && setRes({ periodo, error: true }));
    return () => { vivo = false; };
  }, [periodo, tentativa]);

  const unidades = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return (res?.data?.unidades ?? []).filter((u) =>
      (unidadeId === "all" || u.id === unidadeId) &&
      (!q || [u.nome, u.cnpj, u.responsavel, u.statusLabel, u.riscoLabel].some((t) => t.toLowerCase().includes(q))));
  }, [res, unidadeId, busca]);

  const baixar = useCallback(() => {
    const d = res?.data; if (!d) return;
    const txt = [`DOSSIÊ DA DIRETORIA — BEVOX (DEMONSTRAÇÃO)`, `Período: ${periodo}`, `Saúde: ${d.radar.score}/100 — ${d.radar.nivel}`, "",
      ...d.kpis.map((k) => `${k.titulo}: ${k.valor}${k.sufixo ?? ""} ${k.rotulo}`), "",
      ...d.unidades.map((u) => `${u.nome} | ${u.statusLabel} | ${u.riscoLabel} | ${u.bloqueiosLabel}`)].join("\n");
    const url = URL.createObjectURL(new Blob([txt], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "dossie-diretoria-demo.txt"; a.click(); URL.revokeObjectURL(url);
  }, [res, periodo]);

  if (res?.error) return <ErrorState message="Não foi possível carregar o painel." onRetry={() => { setRes(null); setTentativa((t) => t + 1); }} />;
  if (!res?.data) return <LoadingState label="Carregando painel…" />;
  const d = res.data;

  return (
    <>
      <RadarBanner radar={d.radar} periodo={periodo} onPeriodo={setPeriodo} onDossie={() => setDossieOpen(true)} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{d.kpis.map((k) => <KpiCard key={k.id} kpi={k} />)}</div>

      <section aria-labelledby="polos" className="rounded-lg border border-slate-200 bg-white">
        <header className="flex flex-wrap items-center gap-3 px-4 py-3">
          <span className="text-slate-500">▦</span>
          <h2 id="polos" className="font-semibold">Pólos Operacionais & CDDs • Diagnóstico em Tempo Real</h2>
          <span className="text-xs text-slate-500">({unidades.length} {unidades.length === 1 ? "Unidade ativa" : "Unidades ativas"})</span>
          <span className="ml-auto rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">● Sincronizado há 2 min</span>
        </header>
        <TabelaDocs unidades={unidades} onAcao={setAcao} />
      </section>

      <GatilhosPanel gatilhos={d.gatilhos} />
      <UnidadeModal unidade={acao} onClose={() => setAcao(null)} />
      <Modal open={dossieOpen} onClose={() => setDossieOpen(false)} title="Dossiê da Diretoria"
        footer={<>
          <button onClick={() => setDossieOpen(false)} className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">Fechar</button>
          <button onClick={baixar} className="rounded bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Baixar (.txt)</button>
        </>}>
        <p>Saúde geral: <strong>{d.radar.score}/100</strong> — {d.radar.nivel}.</p>
        <ul className="mt-2 list-disc pl-5">{d.kpis.map((k) => <li key={k.id}>{k.titulo}: {k.valor}{k.sufixo}</li>)}</ul>
        <p className="mt-3 text-xs text-slate-500">Resumo gerado a partir de dados fictícios de demonstração.</p>
      </Modal>
    </>
  );
}
