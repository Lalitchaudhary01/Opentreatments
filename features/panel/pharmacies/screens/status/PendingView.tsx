export function PendingView() {
  return (
    <div className="h-full flex items-center justify-center text-center">
      <div>
        <h2 className="text-xl font-semibold">Under Review</h2>
        <p className="text-muted-foreground mt-2">
          Your pharmacy is being verified by admin.
        </p>
      </div>
    </div>
  );
}
