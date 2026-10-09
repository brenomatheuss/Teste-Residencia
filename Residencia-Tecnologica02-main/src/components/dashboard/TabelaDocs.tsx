"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/States";
import type { Unidade } from "@/types";

type SortKey = "nome" | "status" | "risco" | "bloqueios";
const ordem = { critico: 0, atencao: 1, ok: 2 } as const;
const ordemRisco = { alto: 0, medio: 1, baixo: 2 } as const;

const rowBg = { critico: "bg-red-50", atencao: "bg-amber-50", ok: "bg-white" };
const dot = { critico: "bg-red-500", atencao: "bg-amber-500", ok: "bg-emerald-500" };
const badge = {
  critico: "border-red-300 bg-red-100 text-red-800",
  atencao: "border-amber-300 bg-amber-100 text-amber-900",
  ok: "border-emerald-300 bg-emerald-50 text-emerald-800",
};
const riscoCor = { alto: "text-red-700", medio: "text-amber-700", baixo: "text-emerald-700" };
const btn = { perigo: "bg-red-600 text-white hover:bg-red-700", aviso: "bg-amber-500 text-white hover:bg-amber-600", neutro: "bg-slate-100 text-slate-800 hover:bg-slate-200" };
const avatar = { critico: "bg-red-200 text-red-800", atencao: "bg-amber-200 text-amber-900", ok: "bg-slate-200 text-slate-700" };

export function TabelaDocs({ unidades, onAcao }: { unidades: Unidade[]; onAcao: (u: Unidade) => void }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null);

  const linhas = useMemo(() => {
    if (!sort) return unidades;
    const val = (u: Unidade) => sort.key === "nome" ? u.nome : sort.key === "status" ? ordem[u.status] : sort.key === "risco" ? ordemRisco[u.riscoNivel] : u.bloqueios;
    return [...unidades].sort((a, b) => {
      const x = val(a), y = val(b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [unidades, sort]);

  const toggle = (key: SortKey) => setSort((s) => (s?.key === key ? (s.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 }));

  const th = (label: string, k?: SortKey, className = "") => (
    <th key={label} scope="col" aria-sort={k && sort?.key === k ? (sort.dir === 1 ? "ascending" : "descending") : undefined} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 ${className}`}>
      {k ? (
        <button onClick={() => toggle(k)} className="inline-flex items-center gap-1 uppercase hover:text-slate-800">
          {label}
          {sort?.key === k && <Icon name={sort.dir === 1 ? "arrowUp" : "arrowDown"} className="h-3 w-3" />}
        </button>
      ) : label}
    </th>
  );

  if (linhas.length === 0) return <EmptyState title="Nenhuma unidade encontrada" description="Ajuste a busca ou o filtro de unidade no cabeçalho." />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[56rem] border-collapse text-sm">
        <thead className="border-y border-slate-200"><tr>
          {th("Unidade", "nome")}{th("Status Regulatório", "status")}{th("Risco Fiscal", "risco")}{th("Bloqueios Ativos", "bloqueios")}{th("Responsável Direto")}{th("Ação Rápida", undefined, "text-right")}
        </tr></thead>
        <tbody>
          {linhas.map((u) => (
            <tr key={u.id} className={`${rowBg[u.status]} border-b border-slate-200`}>
              <td className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[u.status]}`} />
                  <div>
                    <p className="font-semibold text-slate-900">{u.nome} {u.tag && <span className="font-mono text-[11px] font-normal text-slate-500">{u.tag}</span>}</p>
                    <p className={`font-mono text-[11px] ${u.status === "critico" ? "text-red-700" : u.status === "atencao" ? "text-amber-700" : "text-slate-500"}`}>CNPJ: {u.cnpj}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3"><span className={`inline-flex items-center gap-2 rounded border px-2 py-1.5 text-xs font-medium ${badge[u.status]}`}>
                <Icon name={u.status === "critico" ? "alertCircle" : u.status === "atencao" ? "clock" : "checkCircle"} className="h-3.5 w-3.5 shrink-0" />{u.statusLabel}</span></td>
              <td className={`px-4 py-3 font-medium ${riscoCor[u.riscoNivel]}`}>
                <span className="inline-flex items-center gap-2">{u.riscoNivel !== "baixo" && <Icon name="alertTriangle" className="h-3.5 w-3.5" />}{u.riscoLabel}</span></td>
              <td className={`px-4 py-3 font-medium ${u.bloqueios > 0 ? "text-red-800" : u.status === "atencao" ? "text-amber-800" : "text-slate-600"}`}>{u.bloqueiosLabel}</td>
              <td className="px-4 py-3"><span className="inline-flex items-center gap-2">
                <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${avatar[u.status]}`}>{u.iniciais}</span>{u.responsavel}</span></td>
              <td className="px-4 py-3 text-right"><button onClick={() => onAcao(u)} className={`rounded px-4 py-2 text-sm font-medium ${btn[u.acao.tipo]}`}>{u.acao.label}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
