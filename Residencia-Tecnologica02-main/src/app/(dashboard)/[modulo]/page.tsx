import { notFound } from "next/navigation";
import { allNav } from "@/lib/nav";
import { EmptyState } from "@/components/ui/States";

export function generateStaticParams() {
  return allNav.filter((n) => n.href !== "/").map((n) => ({ modulo: n.href.slice(1) }));
}
export const dynamicParams = false;

export default async function ModuloPage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params;
  const item = allNav.find((n) => n.href === `/${modulo}`);
  if (!item) notFound();
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <h1 className="border-b border-slate-200 px-5 py-4 text-base font-bold">{item.label}</h1>
      <EmptyState title="Módulo ainda não implementado" description="Esta tela não faz parte da referência visual fornecida (apenas a Visão Geral)." />
    </div>
  );
}
