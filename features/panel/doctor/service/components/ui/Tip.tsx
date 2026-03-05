export default function Tip({
  icon,
  tone,
  text,
}: {
  icon: string;
  tone: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-[10px]">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-[13px] ${tone}`}>{icon}</div>
      <div className="text-[11.5px] leading-[1.5] text-slate-500 dark:text-[#94A3B8]">{text}</div>
    </div>
  );
}
