export default function MiniStat({
  value,
  label,
  bordered,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div className={`px-[14px] py-[11px] text-center ${bordered ? "border-r border-slate-200 dark:border-white/[0.07]" : ""}`}>
      <div className="text-[14px] font-bold text-slate-900 dark:text-slate-100">{value}</div>
      <div className="mt-[2px] text-[9.5px] text-slate-500 dark:text-[#94A3B8]">{label}</div>
    </div>
  );
}
