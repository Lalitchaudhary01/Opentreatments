export default function ProcedureCard({ name }: { name: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="font-medium">{name}</p>
    </div>
  );
}
