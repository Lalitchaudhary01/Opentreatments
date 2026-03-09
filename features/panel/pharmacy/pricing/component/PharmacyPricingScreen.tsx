"use client";

import { useMemo, useState } from "react";

type Offer = {
  id: string;
  name: string;
  type: string;
  discount: string;
  on: string;
  used: number;
  revenue: number;
  till: string;
  status: "Active" | "Expiring";
};

const offersData: Offer[] = [
  { id: "OF1", name: "Diabetes Care Bundle", type: "Bundle Pack", discount: "15%", on: "Diabetes Category", used: 84, revenue: 12400, till: "Mar 31", status: "Active" },
  { id: "OF2", name: "Summer Vitamins Sale", type: "Flat Discount %", discount: "10%", on: "Vitamins", used: 142, revenue: 8900, till: "Mar 15", status: "Active" },
  { id: "OF3", name: "First Order Discount", type: "Flat Discount", discount: "₹50", on: "All Products", used: 212, revenue: 18400, till: "Mar 31", status: "Active" },
  { id: "OF4", name: "Buy 3 Get 1 Free", type: "Buy X Get Y", discount: "1 Free", on: "OTC Products", used: 68, revenue: 4200, till: "Feb 28", status: "Expiring" },
];

function badge(tone: "green" | "blue" | "teal" | "amber", text: string) {
  const cls =
    tone === "green"
      ? "bg-[#22c55e]/15 text-[#22c55e]"
      : tone === "teal"
        ? "bg-[#14b8a6]/15 text-[#14b8a6]"
        : tone === "amber"
          ? "bg-[#f59e0b]/15 text-[#f59e0b]"
          : "bg-[#3b82f6]/15 text-[#3b82f6]";
  return <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${cls}`}>{text}</span>;
}

export default function PharmacyPricingScreen() {
  const [offers, setOffers] = useState<Offer[]>(offersData);
  const [openCreate, setOpenCreate] = useState(false);

  const metrics = useMemo(() => {
    const active = offers.filter((o) => o.status === "Active").length;
    const revenue = offers.reduce((sum, o) => sum + o.revenue, 0);
    return { active, revenue };
  }, [offers]);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-100">Pricing & Offers</h2>
            <p className="text-xs text-[#94A3B8]">Manage discounts, bundles, and subscription refills</p>
          </div>
          <button
            onClick={() => setOpenCreate((v) => !v)}
            className="rounded-md bg-[#3B82F6] px-3 py-2 text-[11px] font-medium text-white"
          >
            Create Offer
          </button>
        </div>

        {openCreate ? (
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="grid gap-2 md:grid-cols-4">
              <input placeholder="Offer name" className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
              <input placeholder="Discount" className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
              <input placeholder="Category" className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
              <button
                onClick={() => {
                  setOffers((prev) => [
                    {
                      id: `OF${prev.length + 1}`,
                      name: "New Offer",
                      type: "Flat Discount",
                      discount: "10%",
                      on: "General",
                      used: 0,
                      revenue: 0,
                      till: "Apr 30",
                      status: "Active",
                    },
                    ...prev,
                  ]);
                  setOpenCreate(false);
                }}
                className="rounded bg-[#14b8a6] px-3 py-2 text-xs font-medium text-white"
              >
                Save Offer
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Active Offers</div><div className="mt-1 text-[24px] font-bold text-[#22c55e]">{metrics.active}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Revenue from Offers</div><div className="mt-1 text-[24px] font-bold text-[#3b82f6]">₹{metrics.revenue.toLocaleString("en-IN")}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Conversion Lift</div><div className="mt-1 text-[24px] font-bold text-[#14b8a6]">+14%</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Subscribers (Refills)</div><div className="mt-1 text-[24px] font-bold text-[#f59e0b]">142</div></div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-4 py-3">
            <div className="text-[13px] font-semibold text-slate-100">Offers & Campaigns</div>
            <div className="text-[11px] text-[#94A3B8]">Manage active and expiring offers</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-4 py-2">Offer</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Discount</th>
                  <th className="px-4 py-2">Applied On</th>
                  <th className="px-4 py-2">Used</th>
                  <th className="px-4 py-2">Revenue</th>
                  <th className="px-4 py-2">Valid Till</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o) => (
                  <tr key={o.id} className="border-b border-white/[0.07] last:border-b-0">
                    <td className="px-4 py-2 text-xs font-medium text-slate-100">{o.name}</td>
                    <td className="px-4 py-2 text-xs text-[#94A3B8]">{o.type}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{o.discount}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{o.on}</td>
                    <td className="px-4 py-2 text-xs text-slate-100">{o.used}</td>
                    <td className="px-4 py-2 text-xs text-[#14b8a6]">₹{o.revenue.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{o.till}</td>
                    <td className="px-4 py-2">{o.status === "Active" ? badge("green", "Active") : badge("amber", "Expiring")}</td>
                    <td className="px-4 py-2">
                      <button className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
