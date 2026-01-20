import { StatCard } from "./StatCard";

interface Props {
  totalMedicines: number;
  totalStock: number;
  expiringSoon: number;
  lowStock: number;
}

export function StatsSection({
  totalMedicines,
  totalStock,
  expiringSoon,
  lowStock,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      <StatCard label="Medicines" value={totalMedicines} />
      <StatCard label="Total Stock" value={totalStock} />
      <StatCard label="Expiring Soon" value={expiringSoon} />
      <StatCard label="Low Stock" value={lowStock} />
    </div>
  );
}
