export default function HospitalHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
      </div>

      <div className="h-8 w-24 rounded bg-muted" />
    </div>
  );
}
