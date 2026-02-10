export function RejectedView() {
  return (
    <div className="h-full flex items-center justify-center text-center">
      <div>
        <h2 className="text-xl font-semibold text-red-600">Rejected</h2>
        <p className="text-muted-foreground mt-2">
          Please fix the issues and resubmit.
        </p>
      </div>
    </div>
  );
}
