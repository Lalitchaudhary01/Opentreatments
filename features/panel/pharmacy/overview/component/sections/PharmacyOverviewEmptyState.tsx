import Link from "next/link";
import { Store } from "lucide-react";
import { pharmacyRoutes } from "@/features/panel/pharmacy/constants";

function ChecklistRow({
  href,
  label,
  sub,
  cta,
  done = false,
}: {
  href: string;
  label: string;
  sub: string;
  cta: string;
  done?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02]">
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          done ? "bg-[#14b8a6] border-[#14b8a6] text-white" : "border-white/20 text-transparent"
        }`}
      >
        ✓
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-slate-100">{label}</p>
        <p className="text-[10.5px] text-[#94A3B8]">{sub}</p>
      </div>
      <span className="text-[11px] font-medium text-[#3B82F6]">{cta}</span>
    </Link>
  );
}

export default function PharmacyOverviewEmptyState({
  pharmacyFirstName,
}: {
  pharmacyFirstName: string;
}) {
  return (
    <div className="min-h-full bg-[#0B1120] px-7 py-[22px]">
      <div className="w-full space-y-4">
        <div className="rounded-[16px] border border-[#3B82F6]/25 bg-gradient-to-r from-[#3B82F6]/15 to-[#1D4ED8]/5 p-6">
          <div className="flex items-center gap-5">
            <div className="h-[52px] w-[52px] rounded-[14px] bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white">
              <Store className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="mb-1 text-[16px] font-bold text-slate-100">
                Welcome to OpenTreatment, {pharmacyFirstName} Pharmacy
              </div>
              <p className="text-[12px] leading-relaxed text-[#94A3B8]">
                Complete these setup steps to start receiving and processing customer orders.
              </p>
            </div>
            <div className="text-center">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="4" />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="150.8"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
                <text x="30" y="35" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">
                  1/5
                </text>
              </svg>
              <div className="mt-1 text-[10px] text-[#64748B]">setup steps</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[14px]">
          {[
            { label: "Prescriptions Queue", value: "0" },
            { label: "Low Stock Alerts", value: "0" },
            { label: "Orders Today", value: "0" },
            { label: "Daily Sales", value: "Rs 0" },
          ].map((item) => (
            <div key={item.label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-[18px]">
              <p className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-400">{item.value}</p>
              <p className="text-[11px] text-[#94A3B8]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_310px]">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] overflow-hidden">
            <div className="px-5 py-[15px] border-b border-white/[0.07] flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">Getting Started</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Complete these steps to go live</div>
              </div>
              <span className="text-[11px] text-[#64748B]">1 of 5 complete</span>
            </div>
            <div className="divide-y divide-white/[0.07]">
              <ChecklistRow href={pharmacyRoutes.store} done label="Complete store profile" sub="Business and compliance details" cta="Done" />
              <ChecklistRow href={pharmacyRoutes.addMedicine} label="Add medicine catalog" sub="List medicines and pricing" cta="Add Medicine" />
              <ChecklistRow href={pharmacyRoutes.inventory} label="Set opening inventory" sub="Add stock batches and expiry dates" cta="Add Stock" />
              <ChecklistRow href={pharmacyRoutes.orders} label="Receive first order" sub="Manage and fulfil incoming orders" cta="View Orders" />
              <ChecklistRow href={pharmacyRoutes.settings} label="Configure payout settings" sub="Settlement and payment preferences" cta="Configure" />
            </div>
          </div>

          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-5">
            <div className="text-[13px] font-semibold text-slate-100 mb-1">Quick Tips</div>
            <p className="text-[11.5px] text-[#94A3B8] leading-relaxed">
              Keep top-selling medicines in stock and review expiring batches every week to reduce dead inventory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
