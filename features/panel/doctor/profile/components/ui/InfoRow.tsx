export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[10px] text-slate-500 dark:text-[#475569]">{label}</div>
      <div className="mt-[2px] text-[12.5px] font-medium text-slate-900 dark:text-[#F1F5F9]">{value}</div>
    </div>
  );
}
