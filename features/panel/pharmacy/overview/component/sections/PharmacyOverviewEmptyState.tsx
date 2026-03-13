import Link from "next/link";
import {
  Box,
  ClipboardPlus,
  CreditCard,
  Settings,
  Sparkles,
  UserPlus,
} from "lucide-react";

const setupSteps = [
  {
    title: "Set Up Store Profile",
    desc: "Add your store name, GSTIN, address and license details",
    active: true,
  },
  {
    title: "Add Your Inventory",
    desc: "Import medicines or add stock manually to start billing",
  },
  {
    title: "Configure Staff Access",
    desc: "Add pharmacists and define role-based permissions",
  },
  {
    title: "Set Pricing & Margins",
    desc: "Define default margins, GST slabs and launch offers",
  },
  {
    title: "Make Your First Sale",
    desc: "Open the billing counter and process your first transaction",
  },
  {
    title: "Connect Integrations",
    desc: "Link your accounting software, WhatsApp and payment gateway",
  },
];

const quickCards = [
  {
    title: "New Sale",
    sub: "Open the POS billing counter",
    href: "/pharmacy/billing",
    icon: CreditCard,
    tone: "bg-[#3b82f6]/15 text-[#3b82f6]",
  },
  {
    title: "Add Stock",
    sub: "Record new inventory items",
    href: "/pharmacy/inventory",
    icon: Box,
    tone: "bg-[#14b8a6]/15 text-[#14b8a6]",
  },
  {
    title: "Add Customer",
    sub: "Register a new patient profile",
    href: "/pharmacy/customers",
    icon: UserPlus,
    tone: "bg-[#f59e0b]/15 text-[#f59e0b]",
  },
  {
    title: "Settings",
    sub: "Configure your pharmacy",
    href: "/pharmacy/settings",
    icon: Settings,
    tone: "bg-[#a78bfa]/15 text-[#a78bfa]",
  },
];

export default function PharmacyOverviewEmptyState({
  pharmacyFirstName,
}: {
  pharmacyFirstName: string;
}) {
  return (
    <div className="min-h-full bg-[#0B1120] px-7 py-[22px]">
      <div className="flex flex-col gap-6">
        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="188"
                  strokeDashoffset="188"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[16px] font-bold text-slate-100">0%</div>
                <div className="text-[9px] text-[#64748B]">done</div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-semibold tracking-[-.02em] text-slate-100">Welcome to PharmOS</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#94A3B8]">
                You&apos;re 6 steps away from running your pharmacy at full speed. Complete each step,
                or load demo data to explore instantly.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/pharmacy/store" className="rounded-[8px] bg-[#3b82f6] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#2563eb]">
                  Start Setup
                </Link>
                <button className="rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]">
                  Load Demo Data
                </button>
                <button className="rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.08]">
                  Watch Tutorial
                </button>
              </div>
              <p className="mt-3 text-[11px] text-[#64748B]">Store: {pharmacyFirstName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          {setupSteps.map((step, idx) => (
            <div
              key={step.title}
              className={`flex cursor-pointer items-start gap-3 rounded-[12px] border p-4 transition ${
                step.active
                  ? "border-[#3b82f6]/50 bg-[#3b82f6]/10"
                  : "border-white/[0.07] bg-[#161f30] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/8"
              }`}
            >
              <div
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                  step.active
                    ? "border-[#3b82f6] bg-[#3b82f6]/15 text-[#60a5fa]"
                    : "border-white/[0.15] bg-[#1d2637] text-[#94A3B8]"
                }`}
              >
                {idx + 1}
              </div>
              <div>
                <div className="mb-1 text-[13px] font-semibold text-slate-100">{step.title}</div>
                <div className="text-[11.5px] leading-relaxed text-[#64748B]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[12px] border border-white/[0.07] bg-[#161f30] p-4 transition hover:-translate-y-[1px] hover:border-white/[0.14]"
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] ${card.tone}`}>
                <card.icon className="h-4 w-4" />
              </div>
              <div className="text-[13px] font-semibold text-slate-100">{card.title}</div>
              <div className="mt-1 text-[11px] text-[#94A3B8]">{card.sub}</div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-[12px] border border-[#f59e0b]/35 bg-[#f59e0b]/10 px-4 py-3">
          <Sparkles className="h-4 w-4 text-[#f59e0b]" />
          <p className="flex-1 text-[12px] text-[#fcd34d]">
            <strong>New here?</strong> Load demo data to explore all features with realistic pharmacy data instantly.
          </p>
          <button className="rounded-[8px] border border-[#f59e0b]/40 bg-[#f59e0b]/20 px-3 py-2 text-[11px] font-semibold text-[#fbbf24]">
            Load Demo Data →
          </button>
        </div>
      </div>
    </div>
  );
}
