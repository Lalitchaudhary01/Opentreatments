export default function EstimateCard({
  procedure,
  amount,
}: {
  procedure: string;
  amount: number;
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="font-medium">{procedure}</p>
      <p className="text-xs text-muted-foreground">₹{amount}</p>
    </div>
  );
}
