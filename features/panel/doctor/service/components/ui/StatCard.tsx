import { ReactNode } from "react";

export default function StatCard({
  icon,
  iconTone,
  delta,
  value,
  label,
}: {
  icon: ReactNode;
  iconTone: "blue" | "teal" | "amber" | "green";
  delta: string;
  value: string;
  label: string;
}) {
  const toneClass =
    iconTone === "blue"
      ? "bg-blue-500/15 text-blue-400"
      : iconTone === "teal"
        ? "bg-teal-500/15 text-teal-400"
        : iconTone === "amber"
          ? "bg-amber-500/15 text-amber-400"
          : "bg-green-500/15 text-green-400";

  return (
    <div className="rounded-[13px] border border-slate-200 bg-white p-[18px] transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
      <div className="mb-3 flex items-start justify-between">
        <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] ${toneClass}`}>{icon}</div>
        <span className="inline-flex items-center rounded-full bg-green-500/15 px-[7px] py-[2px] text-[10px] font-medium text-green-400">{delta}</span>
      </div>
      <div className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{label}</div>
    </div>
  );
}
