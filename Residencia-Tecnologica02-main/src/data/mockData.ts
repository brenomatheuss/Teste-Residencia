// DADOS DE DEMONSTRAÇÃO — não representam uma empresa real nem são persistidos.
import type { DashboardData, Periodo } from "@/types";

export const unidades: DashboardData["unidades"] = [
  { id: "jaboatao", nome: "CDD Jaboatão dos Guararapes", cnpj: "08.412.392/0003-88", status: "critico", statusLabel: "Crítico • AVCB Expirado", riscoLabel: "Alto (Vistoria 28/10)", riscoNivel: "alto", bloqueios: 1, bloqueiosLabel: "1 Veículo (Caminhão 04)", responsavel: "João Batista / Compliance", iniciais: "JB", acao: { label: "Regularizar AVCB", tipo: "perigo" } },
  { id: "olinda", nome: "CDD Olinda", cnpj: "08.412.392/0002-05", status: "atencao", statusLabel: "Atenção • Licença 6 dias", riscoLabel: "Médio (Alvará Sanitário)", riscoNivel: "medio", bloqueios: 0, bloqueiosLabel: "Nenhum bloqueio", responsavel: "Fernanda Silva", iniciais: "FS", acao: { label: "Renovar Licença", tipo: "aviso" } },
  { id: "matriz", nome: "Matriz Recife Centro", tag: "(Sede)", cnpj: "08.412.392/0001-14", status: "ok", statusLabel: "Conforme • 14 certidões ok", riscoLabel: "Baixo (CND Federal Válida)", riscoNivel: "baixo", bloqueios: 0, bloqueiosLabel: "0 bloqueios", responsavel: "Ricardo Silveira", iniciais: "RS", acao: { label: "Ver Dossiê", tipo: "neutro" } },
  { id: "cabo", nome: "Hub Cabo de Santo Agostinho", cnpj: "08.412.392/0004-69", status: "ok", statusLabel: "Conforme • 100% Auditado", riscoLabel: "Baixo (Sem passivos)", riscoNivel: "baixo", bloqueios: 0, bloqueiosLabel: "0 bloqueios", responsavel: "Carlos Eduardo", iniciais: "CE", acao: { label: "Ver Dossiê", tipo: "neutro" } },
];

const gatilhos: DashboardData["gatilhos"] = [
  { id: "g1", tipo: "critico", titulo: "Trava Logística Aplicada", hora: "14:18 • Há 12 min", corpo: "Bloqueou roteirização do **Caminhão 04 (Constellation)** no WMS Dispatch devido ao CRLV/ANTT vencido no CDD Jaboatão.", hash: "8b29...c401", status: "Carga Reatribuída" },
  { id: "g2", tipo: "aviso", titulo: "Notificação de Compliance", hora: "13:40 • Há 50 min", corpo: "Disparou SLA crítico para **Fernanda Silva** referente ao vencimento da Licença Sanitária de Olinda em 6 dias com minuta pré-preenchida.", hash: "e4a7...992f", status: "SLA Aberto (48h)" },
  { id: "g3", tipo: "info", titulo: "Trava Comercial Automática", hora: "11:15 • Há 3h", corpo: "Travou emissão de NF-e do Pedido #PED-9041 (Rest. Mirante Olinda) por duplicata pendente há mais de 30 dias (R$ 8.450).", hash: "110d...f39a", status: "Aguardando Diretoria" },
];

const porPeriodo: Record<Periodo, Pick<DashboardData, "radar" | "kpis">> = {
  "7d": {
    radar: { score: 84.2, nivel: "Atenção Controlada", resumo: "Estável com 2 pendências críticas", detalhe: "(AVCB Jaboatão & Bloqueio Frota)" },
    kpis: [
      { id: "fiscal", titulo: "Conformidade Fiscal & Sanitária", valor: "82%", rotulo: "Regular", barra: { ok: 82 }, rodape: ["121 de 148 docs válidos", "7 em renovação"] },
      { id: "frota", titulo: "Disponibilidade da Frota", valor: "18", sufixo: "/19", rotulo: "Veículos Ativos", barra: { ok: 94.7, critico: 5.3 }, rodape: ["94.7% em trânsito regular", "CRLV Constellation"] },
      { id: "estoque", titulo: "Estoque Seguro / FEFO", valor: "98.6%", rotulo: "Dentro da Validade", barra: { ok: 98.6, aviso: 1.4 }, rodape: ["R$ 48k em risco protegido", "Lote #BEV-8842"] },
      { id: "inadimplencia", titulo: "Inadimplência Comercial", valor: "2.1%", rotulo: "da Carteira Total", barra: { ok: 97, aviso: 2, critico: 1 }, rodape: ["R$ 28.3k retidos no ERP", "3 Travados"], link: { label: "Ver travas", href: "/financeiro" } },
    ],
  },
  hoje: {
    radar: { score: 83.1, nivel: "Atenção Controlada", resumo: "Estável com 2 pendências críticas", detalhe: "(AVCB Jaboatão & Bloqueio Frota)" },
    kpis: [
      { id: "fiscal", titulo: "Conformidade Fiscal & Sanitária", valor: "81%", rotulo: "Regular", barra: { ok: 81 }, rodape: ["120 de 148 docs válidos", "7 em renovação"] },
      { id: "frota", titulo: "Disponibilidade da Frota", valor: "18", sufixo: "/19", rotulo: "Veículos Ativos", barra: { ok: 94.7, critico: 5.3 }, rodape: ["94.7% em trânsito regular", "CRLV Constellation"] },
      { id: "estoque", titulo: "Estoque Seguro / FEFO", valor: "98.9%", rotulo: "Dentro da Validade", barra: { ok: 98.9, aviso: 1.1 }, rodape: ["R$ 41k em risco protegido", "Lote #BEV-8842"] },
      { id: "inadimplencia", titulo: "Inadimplência Comercial", valor: "2.2%", rotulo: "da Carteira Total", barra: { ok: 96.8, aviso: 2, critico: 1.2 }, rodape: ["R$ 29.1k retidos no ERP", "3 Travados"], link: { label: "Ver travas", href: "/financeiro" } },
    ],
  },
  "30d": {
    radar: { score: 86.7, nivel: "Saudável", resumo: "Tendência de melhora no mês", detalhe: "(2 pendências críticas em tratamento)" },
    kpis: [
      { id: "fiscal", titulo: "Conformidade Fiscal & Sanitária", valor: "85%", rotulo: "Regular", barra: { ok: 85 }, rodape: ["126 de 148 docs válidos", "5 em renovação"] },
      { id: "frota", titulo: "Disponibilidade da Frota", valor: "17.6", sufixo: "/19", rotulo: "Média Ativa", barra: { ok: 92.6, critico: 7.4 }, rodape: ["92.6% disponibilidade média", "CRLV Constellation"] },
      { id: "estoque", titulo: "Estoque Seguro / FEFO", valor: "97.8%", rotulo: "Dentro da Validade", barra: { ok: 97.8, aviso: 2.2 }, rodape: ["R$ 112k em risco protegido", "Lote #BEV-8842"] },
      { id: "inadimplencia", titulo: "Inadimplência Comercial", valor: "2.6%", rotulo: "da Carteira Total", barra: { ok: 96, aviso: 2.4, critico: 1.6 }, rodape: ["R$ 34.9k retidos no ERP", "5 Travados"], link: { label: "Ver travas", href: "/financeiro" } },
    ],
  },
};

export const dashboardData = (periodo: Periodo): DashboardData => ({
  ...porPeriodo[periodo],
  unidades,
  gatilhos,
});
