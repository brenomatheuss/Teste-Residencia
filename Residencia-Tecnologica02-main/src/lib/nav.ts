export interface NavItem { href: string; label: string; icon: string; badge?: { text: string; tone: "mono" | "amber" } }
export const navOperacoes: NavItem[] = [
  { href: "/", label: "Visão Geral", icon: "grid" },
  { href: "/unidades", label: "Gestão de Unidades", icon: "network", badge: { text: "4 CDDs", tone: "mono" } },
  { href: "/conformidade", label: "Conformidade", icon: "shield", badge: { text: "7 vencendo", tone: "amber" } },
  { href: "/tarefas", label: "Tarefas Automatizadas", icon: "bot" },
  { href: "/operacao", label: "Operação & WMS", icon: "warehouse" },
  { href: "/financeiro", label: "Financeiro & Crédito", icon: "wallet" },
];
export const navConfig: NavItem[] = [
  { href: "/empresa", label: "Minha Empresa", icon: "building" },
  { href: "/auditoria", label: "Auditoria Fiscal", icon: "audit" },
];
export const allNav = [...navOperacoes, ...navConfig];
