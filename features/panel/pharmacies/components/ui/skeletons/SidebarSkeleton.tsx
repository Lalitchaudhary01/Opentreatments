export function SidebarSkeleton() {
  return (
    <div className="w-64 p-4 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded animate-pulse" />
      ))}
    </div>
  );
}
