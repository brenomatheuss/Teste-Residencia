export type Periodo = "hoje" | "7d" | "30d";
export type Severidade = "critico" | "atencao" | "ok";

export interface Unidade {
  id: string;
  nome: string;
  tag?: string;
  cnpj: string;
  status: Severidade;
  statusLabel: string;
  riscoLabel: string;
  riscoNivel: "alto" | "medio" | "baixo";
  bloqueios: number;
  bloqueiosLabel: string;
  responsavel: string;
  iniciais: string;
  acao: { label: string; tipo: "perigo" | "aviso" | "neutro" };
}

export interface Kpi {
  id: string;
  titulo: string;
  valor: string;
  sufixo?: string;
  rotulo: string;
  barra: { ok: number; aviso?: number; critico?: number };
  rodape: [string, string];
  link?: { label: string; href: string };
}

export interface Gatilho {
  id: string;
  tipo: "critico" | "aviso" | "info";
  titulo: string;
  hora: string;
  corpo: string;
  hash: string;
  status: string;
}

export interface Radar {
  score: number;
  nivel: string;
  resumo: string;
  detalhe: string;
}

export interface DashboardData {
  radar: Radar;
  kpis: Kpi[];
  unidades: Unidade[];
  gatilhos: Gatilho[];
}
