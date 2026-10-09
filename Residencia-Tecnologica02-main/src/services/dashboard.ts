import { dashboardData } from "@/data/mockData";
import type { DashboardData, Periodo } from "@/types";

// Camada de serviço simulada (DEMO). Trocar o corpo por fetch() ao integrar uma API real.
export async function getDashboard(periodo: Periodo): Promise<DashboardData> {
  return dashboardData(periodo);
}
