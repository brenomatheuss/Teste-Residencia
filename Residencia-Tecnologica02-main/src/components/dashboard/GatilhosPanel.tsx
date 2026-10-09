import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Gatilho } from "@/types";

const cor = {
  critico: { box: "border-red-200 bg-red-50/40", title: "text-red-700", icon: "archive", status: "text-red-700" },
  aviso: { box: "border-amber-200 bg-amber-50/40", title: "text-amber-700", icon: "bell", status: "text-amber-700" },
  info: { box: "border-blue-200 bg-blue-50/40", title: "text-blue-700", icon: "receipt", status: "text-blue-700" },
} as const;

function Rich({ text }: { text: string }) {
  return <>{text.split("**").map((p, i) => (i % 2 ? <strong key={i} className="text-slate-900">{p}</strong> : <span key={i}>{p}</span>))}</>;
}

export function GatilhosPanel({ gatilhos }: { gatilhos: Gatilho[] }) {
  return (
    <section aria-labelledby="gat" className="rounded-lg border border-slate-200 bg-white">
      <header className="flex flex-wrap items-center gap-3 px-4 py-3">
        <span className="grid h-7 w-7 place-items-center rounded bg-blue-50 text-brand"><Icon name="zap" /></span>
        <h2 id="gat" className="font-semibold">Gatilhos Automáticos do Sistema • Ações Autônomas BEVOX</h2>
        <span className="text-xs text-slate-500">Execuções de governança nas últimas 6 horas</span>
        <Link href="/auditoria" className="ml-auto text-xs font-semibold text-brand hover:underline">Ver log completo de auditoria →</Link>
      </header>
      <div className="grid gap-3 p-4 pt-0 md:grid-cols-2 xl:grid-cols-3">
        {gatilhos.map((g) => (
          <article key={g.id} className={`rounded border p-3 ${cor[g.tipo].box}`}>
            <header className="flex items-center justify-between gap-2">
              <h3 className={`flex items-center gap-1.5 text-sm font-semibold ${cor[g.tipo].title}`}><Icon name={cor[g.tipo].icon} className="h-4 w-4" />{g.titulo}</h3>
              <time className="font-mono text-[11px] text-slate-500">{g.hora}</time>
            </header>
            <p className="mt-1 text-sm leading-snug text-slate-700"><Rich text={g.corpo} /></p>
            <footer className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-xs">
              <span className="font-mono text-slate-500">Hash: {g.hash}</span>
              <span className={`font-semibold ${cor[g.tipo].status}`}>{g.status}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
