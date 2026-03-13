import Link from "next/link";
import { ClipboardList, Store } from "lucide-react";

type Props = {
  moduleTitle: string;
  moduleDescription: string;
};

export default function PharmacyFirstTimeModuleState({
  moduleTitle,
  moduleDescription,
}: Props) {
  return (
    <div className="min-h-full bg-[#0B1120] px-7 py-[22px]">
      <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-[62px] w-[62px] items-center justify-center rounded-[14px] bg-[#3b82f6]/15 text-[#3b82f6]">
          <Store className="h-7 w-7" />
        </div>
        <div className="mb-2 text-[26px] font-bold tracking-[-.02em] text-slate-100">{moduleTitle}</div>
        <p className="mx-auto mb-5 max-w-[720px] text-[13px] leading-relaxed text-[#94A3B8]">
          {moduleDescription}
        </p>
        <p className="mx-auto max-w-[760px] text-[12px] leading-relaxed text-[#64748B]">
          Your pharmacy profile is submitted for admin review. You can access the dashboard now, and this section will auto-populate after your first operational data.
        </p>

        <div className="mx-auto mt-7 grid max-w-[980px] gap-3 md:grid-cols-3">
          <div className="rounded-[12px] border border-white/[0.08] bg-[#111b2d] p-4 text-left">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#3b82f6]/15 text-[#3b82f6]">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div className="text-[12px] font-semibold text-slate-100">No Live Data Yet</div>
            <div className="mt-1 text-[11px] text-[#64748B]">Records appear automatically after first activity.</div>
          </div>
          <div className="rounded-[12px] border border-white/[0.08] bg-[#111b2d] p-4 text-left">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#14b8a6]/15 text-[#14b8a6]">
              <Store className="h-4 w-4" />
            </div>
            <div className="text-[12px] font-semibold text-slate-100">Setup Guided</div>
            <div className="mt-1 text-[11px] text-[#64748B]">Module will stay in guided empty mode till go-live.</div>
          </div>
          <div className="rounded-[12px] border border-white/[0.08] bg-[#111b2d] p-4 text-left">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f59e0b]/15 text-[#f59e0b]">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div className="text-[12px] font-semibold text-slate-100">Admin Review Active</div>
            <div className="mt-1 text-[11px] text-[#64748B]">Approval status will update in your profile workflow.</div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/pharmacy/overview"
            className="rounded-[8px] bg-[#3b82f6] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#2563eb]"
          >
            Go to Overview
          </Link>
          <button className="rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]">
            Load Demo Data
          </button>
          <Link
            href="/pharmacy/store"
            className="rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]"
          >
            Open Store Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
