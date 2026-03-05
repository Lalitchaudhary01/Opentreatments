export default function ProfileField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[36px] w-full rounded-lg border border-slate-200 bg-slate-100 px-[11px] text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-[#1c2840] dark:text-[#F1F5F9]"
      />
    </label>
  );
}
