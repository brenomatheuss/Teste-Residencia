export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
}
export function LoadingState({ label = "Carregando…" }: { label?: string }) {
  return <div role="status" className="p-6 text-sm text-slate-500">{label}</div>;
}
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <span>{message}</span>
      {onRetry && <button onClick={onRetry} className="rounded bg-red-600 px-3 py-1 text-white">Tentar novamente</button>}
    </div>
  );
}
