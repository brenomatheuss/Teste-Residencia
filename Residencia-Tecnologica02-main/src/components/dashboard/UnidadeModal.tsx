"use client";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import type { Unidade } from "@/types";

export function UnidadeModal({ unidade, onClose }: { unidade: Unidade | null; onClose: () => void }) {
  const toast = useToast();
  const dossie = unidade?.acao.tipo === "neutro";
  const confirmar = () => { toast(`${unidade?.acao.label}: solicitação registrada localmente (demonstração, sem backend).`); onClose(); };
  return (
    <Modal open={!!unidade} onClose={onClose} title={unidade ? `${dossie ? "Dossiê" : unidade.acao.label} — ${unidade.nome}` : ""}
      footer={<>
        <button onClick={onClose} className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">Fechar</button>
        {!dossie && <button onClick={confirmar} className="rounded bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Confirmar</button>}
      </>}>
      {unidade && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="text-slate-500">CNPJ</dt><dd className="font-mono">{unidade.cnpj}</dd>
          <dt className="text-slate-500">Status</dt><dd>{unidade.statusLabel}</dd>
          <dt className="text-slate-500">Risco fiscal</dt><dd>{unidade.riscoLabel}</dd>
          <dt className="text-slate-500">Bloqueios</dt><dd>{unidade.bloqueiosLabel}</dd>
          <dt className="text-slate-500">Responsável</dt><dd>{unidade.responsavel}</dd>
        </dl>
      )}
      <p className="mt-4 text-xs text-slate-500">Dados fictícios de demonstração.</p>
    </Modal>
  );
}
