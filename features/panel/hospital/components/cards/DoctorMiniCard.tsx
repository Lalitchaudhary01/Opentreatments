export default function DoctorMiniCard({
  name,
  specialization,
}: {
  name: string;
  specialization: string;
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{specialization}</p>
    </div>
  );
}
