"use client";

import { useMemo, useState } from "react";

type CustomerSegment = "All" | "Retail" | "Prescription" | "Subscription";

type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  city: string;
  lastOrder: string;
  orders: number;
  spent: string;
  segment: Exclude<CustomerSegment, "All">;
};

const customers: CustomerRow[] = [
  {
    id: "CUST-9082",
    name: "Neha Sharma",
    phone: "+91 98765 21109",
    city: "Pune",
    lastOrder: "2h ago",
    orders: 28,
    spent: "\u20b926,420",
    segment: "Prescription",
  },
  {
    id: "CUST-9071",
    name: "Rohit Patil",
    phone: "+91 98989 10223",
    city: "Pune",
    lastOrder: "Today, 10:14",
    orders: 17,
    spent: "\u20b914,880",
    segment: "Retail",
  },
  {
    id: "CUST-9059",
    name: "Priya Joshi",
    phone: "+91 98111 76154",
    city: "Mumbai",
    lastOrder: "Yesterday",
    orders: 42,
    spent: "\u20b938,200",
    segment: "Subscription",
  },
  {
    id: "CUST-9038",
    name: "Vikas Nair",
    phone: "+91 98000 41344",
    city: "Pune",
    lastOrder: "2 days ago",
    orders: 11,
    spent: "\u20b98,920",
    segment: "Retail",
  },
  {
    id: "CUST-9012",
    name: "Sunita Rao",
    phone: "+91 99220 88211",
    city: "Nashik",
    lastOrder: "3 days ago",
    orders: 34,
    spent: "\u20b931,560",
    segment: "Prescription",
  },
];

const segments: CustomerSegment[] = ["All", "Retail", "Prescription", "Subscription"];

function segmentTone(segment: CustomerRow["segment"]) {
  if (segment === "Prescription") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  if (segment === "Subscription") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

export default function PharmacyCustomersScreen() {
  const [segment, setSegment] = useState<CustomerSegment>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((row) => {
      const segmentMatch = segment === "All" || row.segment === segment;
      if (!segmentMatch) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.phone.toLowerCase().includes(q) ||
        row.city.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q)
      );
    });
  }, [query, segment]);

  const totals = useMemo(() => {
    const totalCustomers = customers.length;
    const activeToday = customers.filter((row) => row.lastOrder.includes("ago") || row.lastOrder.includes("Today")).length;
    const repeatRate = Math.round((customers.filter((row) => row.orders >= 15).length / Math.max(customers.length, 1)) * 100);
    const totalRevenue = customers.reduce((acc, row) => acc + Number(row.spent.replace(/[^\d]/g, "")), 0);
    return { totalCustomers, activeToday, repeatRate, totalRevenue };
  }, []);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            {segments.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSegment(item)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  segment === item
                    ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                    : "border-white/[0.08] bg-transparent text-[#94A3B8] hover:text-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
            <div className="ml-auto min-w-[220px] flex-1 md:max-w-[300px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customer by name, ID or phone"
                className="h-9 w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 text-xs text-slate-100 outline-none placeholder:text-[#64748B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="text-[11px] text-[#94A3B8]">Total Customers</div>
              <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.totalCustomers}</div>
              <div className="text-[10px] text-[#22c55e]">+8 this week</div>
            </div>
            <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="text-[11px] text-[#94A3B8]">Active Today</div>
              <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.activeToday}</div>
              <div className="text-[10px] text-[#22c55e]">+3 vs yesterday</div>
            </div>
            <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="text-[11px] text-[#94A3B8]">Repeat Purchase</div>
              <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.repeatRate}%</div>
              <div className="text-[10px] text-[#22c55e]">Healthy loyalty</div>
            </div>
            <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="text-[11px] text-[#94A3B8]">LTV Tracked</div>
              <div className="mt-1 text-[22px] font-bold text-slate-100">
                \u20b9{Math.round(totals.totalRevenue / 1000)}k
              </div>
              <div className="text-[10px] text-[#22c55e]">Across registered buyers</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-100">Customer Directory</h2>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">{rows.length} visible customers</p>
            </div>
            <button
              type="button"
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-[18px] py-[9px]">Customer ID</th>
                  <th className="px-[18px] py-[9px]">Name</th>
                  <th className="px-[18px] py-[9px]">Phone</th>
                  <th className="px-[18px] py-[9px]">City</th>
                  <th className="px-[18px] py-[9px]">Last Order</th>
                  <th className="px-[18px] py-[9px]">Orders</th>
                  <th className="px-[18px] py-[9px]">Spent</th>
                  <th className="px-[18px] py-[9px]">Segment</th>
                  <th className="px-[18px] py-[9px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                    <td className="px-[18px] py-[11px] text-[12px] font-medium text-slate-100">{row.id}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.name}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#CBD5E1]">{row.phone}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.city}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.lastOrder}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.orders}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#14b8a6]">{row.spent}</td>
                    <td className="px-[18px] py-[11px]">
                      <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${segmentTone(row.segment)}`}>
                        {row.segment}
                      </span>
                    </td>
                    <td className="px-[18px] py-[11px]">
                      <div className="flex gap-2">
                        <button className="rounded-md border border-white/[0.12] bg-white/[0.03] px-2 py-1 text-[10px] text-[#CBD5E1]">
                          View
                        </button>
                        <button className="rounded-md border border-[#14b8a6]/30 bg-[#14b8a6]/10 px-2 py-1 text-[10px] text-[#14b8a6]">
                          Message
                        </button>
                      </div>
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
