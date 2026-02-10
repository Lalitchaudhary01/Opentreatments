export default function SidebarSkeleton() {
  return (
    <div className="w-64 h-full border-r p-4 space-y-4 animate-pulse">
      <div className="h-6 w-32 rounded bg-muted" />

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
