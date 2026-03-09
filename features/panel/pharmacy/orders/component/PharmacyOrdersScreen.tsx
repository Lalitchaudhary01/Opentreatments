"use client";

import { useMemo, useState } from "react";

type OrderStatus = "New" | "Packed" | "Out for Delivery" | "Delivered" | "Cancelled";

type OrderRow = {
  id: string;
  customer: string;
  createdAt: string;
  items: number;
  amount: string;
  payment: "Paid" | "COD";
  status: OrderStatus;
};

const orders: OrderRow[] = [
  { id: "ORD-9821", customer: "Neha Sharma", createdAt: "10:22 AM", items: 4, amount: "\u20b9890", payment: "Paid", status: "New" },
  { id: "ORD-9819", customer: "Rohit Patil", createdAt: "10:08 AM", items: 2, amount: "\u20b9360", payment: "COD", status: "Packed" },
  { id: "ORD-9814", customer: "Aman Gupta", createdAt: "9:40 AM", items: 6, amount: "\u20b91,340", payment: "Paid", status: "Out for Delivery" },
  { id: "ORD-9807", customer: "Sana Khan", createdAt: "9:02 AM", items: 3, amount: "\u20b9620", payment: "Paid", status: "Delivered" },
  { id: "ORD-9803", customer: "Vikas Nair", createdAt: "8:54 AM", items: 1, amount: "\u20b9180", payment: "COD", status: "Cancelled" },
];

const statuses: Array<OrderStatus | "All"> = ["All", "New", "Packed", "Out for Delivery", "Delivered", "Cancelled"];

function statusClass(status: OrderStatus) {
  if (status === "Delivered") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "New") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  if (status === "Packed") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "Out for Delivery") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  return "bg-[#ef4444]/15 text-[#ef4444]";
}

export default function PharmacyOrdersScreen() {
  const [status, setStatus] = useState<OrderStatus | "All">("All");

  const rows = useMemo(
    () => (status === "All" ? orders : orders.filter((row) => row.status === status)),
    [status]
  );

  const stats = useMemo(
    () => ({
      new: orders.filter((o) => o.status === "New").length,
      packed: orders.filter((o) => o.status === "Packed").length,
      delivery: orders.filter((o) => o.status === "Out for Delivery").length,
      revenue: orders
        .filter((o) => o.status !== "Cancelled")
        .reduce((acc, o) => acc + Number(o.amount.replace(/[^\d]/g, "")), 0),
    }),
    []
  );

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                status === item
                  ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                  : "border-white/[0.08] bg-transparent text-[#94A3B8] hover:text-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">New Orders</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{stats.new}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Packed</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{stats.packed}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Out for Delivery</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{stats.delivery}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Today Revenue</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">\u20b9{Math.round(stats.revenue / 1000)}k</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-100">Customer Orders</h2>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">{rows.length} orders</p>
            </div>
            <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]">
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-[18px] py-[9px]">Order ID</th>
                  <th className="px-[18px] py-[9px]">Customer</th>
                  <th className="px-[18px] py-[9px]">Time</th>
                  <th className="px-[18px] py-[9px]">Items</th>
                  <th className="px-[18px] py-[9px]">Amount</th>
                  <th className="px-[18px] py-[9px]">Payment</th>
                  <th className="px-[18px] py-[9px]">Status</th>
                  <th className="px-[18px] py-[9px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                    <td className="px-[18px] py-[11px] text-[12px] font-medium text-slate-100">{row.id}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.customer}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.createdAt}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#CBD5E1]">{row.items}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#14b8a6]">{row.amount}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.payment}</td>
                    <td className="px-[18px] py-[11px]"><span className={`rounded-full px-2 py-1 text-[10px] font-medium ${statusClass(row.status)}`}>{row.status}</span></td>
                    <td className="px-[18px] py-[11px]"><button className="rounded-md border border-white/[0.12] bg-white/[0.03] px-2 py-1 text-[10px] text-[#CBD5E1]">View</button></td>
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
