import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ToggleItem } from "../../constants/settingsConfig";

export function SettingsCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
        <div>
          <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">{title}</div>
          {subtitle ? <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">{subtitle}</div> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function NotifRow({
  item,
  onToggle,
  color = "#3b82f6",
}: {
  item: ToggleItem;
  onToggle: () => void;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-[10px] last:border-b-0 dark:border-white/[0.07]">
      <div>
        <div className="text-[12.5px] font-medium text-slate-900 dark:text-[#F1F5F9]">{item.label}</div>
        <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#475569]">{item.desc}</div>
      </div>
      <Switch checked={item.on} onToggle={onToggle} color={color} />
    </div>
  );
}

export function Switch({
  checked,
  onToggle,
  color = "#3b82f6",
}: {
  checked: boolean;
  onToggle: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative h-[23px] w-[42px] rounded-[12px] transition-colors"
      style={{ background: checked ? color : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-[3px] h-[17px] w-[17px] rounded-full bg-white shadow"
        style={{ left: checked ? "22px" : "3px", transition: "left .2s" }}
      />
    </button>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-[36px] w-full rounded-lg border border-slate-200 bg-slate-100 px-[11px] text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-[#1c2840] dark:text-[#F1F5F9]"
      />
    </label>
  );
}

export function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{label}</span>
      <select className="h-[36px] w-full rounded-lg border border-slate-200 bg-slate-100 px-[11px] text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-[#1c2840] dark:text-[#F1F5F9]">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[9px] border border-slate-200 bg-slate-100 px-[14px] py-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
      <div className="text-[11px] text-slate-500 dark:text-[#475569]">{label}</div>
      <div className="mt-[3px] text-[14px] font-semibold text-slate-900 dark:text-[#F1F5F9]">{value}</div>
    </div>
  );
}

export function PrefRow({
  title,
  sub,
  control,
}: {
  title: string;
  sub?: string;
  control: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-[18px] last:border-b-0 last:pb-0 dark:border-white/[0.07]">
      <div>
        <div className="text-[12.5px] font-medium text-slate-900 dark:text-[#F1F5F9]">{title}</div>
        {sub ? <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#475569]">{sub}</div> : null}
      </div>
      <div>{control}</div>
    </div>
  );
}

export function ToggleChip({
  label,
  active,
  onClick,
  compact,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-[14px] py-[6px] text-[12px] font-medium",
        compact && "px-3",
        active
          ? "border-blue-500/30 bg-blue-500/15 text-blue-400"
          : "border-slate-200 bg-transparent text-slate-500 dark:border-white/[0.07] dark:text-[#94A3B8]"
      )}
    >
      {label}
    </button>
  );
}
