"use client";

export default function SectionSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-6 w-48 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-3/4 bg-muted rounded" />
    </div>
  );
}
