"use client";

export default function SidebarSkeleton() {
  return (
    <div className="w-64 h-full p-4 space-y-4">
      <div className="h-10 w-32 bg-muted rounded" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 w-full bg-muted rounded" />
      ))}
    </div>
  );
}
