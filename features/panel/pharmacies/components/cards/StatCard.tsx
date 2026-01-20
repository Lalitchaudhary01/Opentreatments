interface Props {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
