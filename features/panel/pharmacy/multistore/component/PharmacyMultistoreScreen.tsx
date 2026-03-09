"use client";

import { useMemo } from "react";

type Branch = {
  id: string;
  name: string;
  city: string;
  manager: string;
  status: "Active" | "Paused";
  orders: number;
  revenue: string;
  stockHealth: number;
};

const branches: Branch[] = [
  { id: "BR-01", name: "Sunrise Pharmacy - KP", city: "Pune", manager: "Ramesh K", status: "Active", orders: 218, revenue: "\u20b93.2L", stockHealth: 88 },
  { id: "BR-02", name: "Sunrise Pharmacy - Aundh", city: "Pune", manager: "Akash M", status: "Active", orders: 164, revenue: "\u20b92.4L", stockHealth: 82 },
  { id: "BR-03", name: "Sunrise Pharmacy - Thane", city: "Mumbai", manager: "Priya S", status: "Paused", orders: 41, revenue: "\u20b960k", stockHealth: 71 },
];

export default function PharmacyMultistoreScreen() {
  const stats = useMemo(
    () => ({
      stores: branches.length,
      active: branches.filter((b) => b.status === "Active").length,
      orders: branches.reduce((acc, b) => acc + b.orders, 0),
      avgStock: Math.round(branches.reduce((acc, b) => acc + b.stockHealth, 0) / Math.max(branches.length, 1)),
    }),
    []
  );

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Total Stores</div><div className="mt-1 text-[22px] font-bold text-slate-100">{stats.stores}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Active Stores</div><div className="mt-1 text-[22px] font-bold text-slate-100">{stats.active}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Combined Orders</div><div className="mt-1 text-[22px] font-bold text-slate-100">{stats.orders}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Avg Stock Health</div><div className="mt-1 text-[22px] font-bold text-slate-100">{stats.avgStock}%</div></div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Store Network</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">Central visibility across all branches</p>
              </div>
              <button className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white">Add Store</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-[18px] py-[9px]">Branch</th>
                    <th className="px-[18px] py-[9px]">City</th>
                    <th className="px-[18px] py-[9px]">Manager</th>
                    <th className="px-[18px] py-[9px]">Orders</th>
                    <th className="px-[18px] py-[9px]">Revenue</th>
                    <th className="px-[18px] py-[9px]">Stock Health</th>
                    <th className="px-[18px] py-[9px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                      <td className="px-[18px] py-[11px] text-[12px] font-medium text-slate-100">{branch.name}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#CBD5E1]">{branch.city}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{branch.manager}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{branch.orders}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#14b8a6]">{branch.revenue}</td>
                      <td className="px-[18px] py-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-[#14b8a6]" style={{ width: `${branch.stockHealth}%` }} /></div>
                          <span className="text-[11px] text-[#94A3B8]">{branch.stockHealth}%</span>
                        </div>
                      </td>
                      <td className="px-[18px] py-[11px]"><span className={`rounded-full px-2 py-1 text-[10px] font-medium ${branch.status === "Active" ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}>{branch.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Central Controls</div>
              <div className="space-y-2 p-4 text-xs">
                <button className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-left text-[#CBD5E1]">Sync catalog to all stores</button>
                <button className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-left text-[#CBD5E1]">Push pricing update</button>
                <button className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-left text-[#CBD5E1]">Transfer stock between branches</button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Alerts</div>
              <div className="space-y-2 p-4 text-xs">
                <div className="rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-3 text-[#f59e0b]">Thane branch stock health below 75%</div>
                <div className="rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/10 p-3 text-[#3b82f6]">Aundh branch requested 12 units transfer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
