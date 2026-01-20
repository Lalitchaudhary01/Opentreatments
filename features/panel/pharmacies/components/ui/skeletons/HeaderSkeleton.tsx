export function HeaderSkeleton() {
  return (
    <div className="h-14 w-full px-6 flex items-center justify-between border-b">
      <div className="h-4 w-40 bg-muted rounded animate-pulse" />
      <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
    </div>
  );
}
