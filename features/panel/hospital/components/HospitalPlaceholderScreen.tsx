import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export default function HospitalPlaceholderScreen({ title, subtitle, children }: Props) {
  return (
    <div className="px-6 py-5">
      <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-[#f1f5f9]">{title}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-[#94a3b8]">{subtitle}</p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  );
}
