import Link from "next/link";

export default function StoreProfileEmptyState() {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-6">
      <p className="text-[11px] uppercase tracking-[0.1em] text-[#64748B]">Store Profile</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-100">Profile not submitted yet</h2>
      <p className="mt-2 text-sm text-[#94A3B8]">
        Complete pharmacy profile to appear in admin approval queue and enable full operations.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/pharmacy/profile/submit"
          className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Submit Profile
        </Link>
        <Link
          href="/pharmacy/overview"
          className="rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-[#CBD5E1] hover:bg-white/[0.05]"
        >
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
