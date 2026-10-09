import { DashboardProvider } from "@/components/layout/DashboardContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ToastProvider } from "@/components/ui/Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DashboardProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <main className="flex-1 space-y-4 p-4 lg:p-6">{children}</main>
          </div>
        </div>
      </DashboardProvider>
    </ToastProvider>
  );
}
