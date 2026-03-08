"use client";

import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export default function PharmacyRoutePlaceholder({ title, description }: Props) {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl rounded-2xl border border-white/[0.08] bg-[#111827] p-7">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#64748B]">Pharmacy Module</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm text-[#94A3B8]">{description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/pharmacy/overview"
            className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/pharmacy/inventory"
            className="rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/[0.06]"
          >
            Open Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
