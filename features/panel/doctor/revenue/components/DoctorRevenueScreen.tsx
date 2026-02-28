"use client";

import { ReactNode, useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  IndianRupee,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevenueByService, RevenueHistoryItem } from "../types";

const weeklyRevenue = [
  { week: "W1", consultation: 18200, procedure: 6200, followup: 3200 },
  { week: "W2", consultation: 20500, procedure: 7200, followup: 4100 },
  { week: "W3", consultation: 18800, procedure: 5900, followup: 3500 },
  { week: "W4", consultation: 21400, procedure: 7300, followup: 3800 },
];

const paymentHistory: RevenueHistoryItem[] = [
  { inv: "INV-0188", name: "Arjun Kumar", av: "AK", col: "rgba(20,184,166,0.2)", ac: "#2dd4bf", svc: "Consultation", date: "20 Feb", mode: "UPI", amt: 500, status: "PAID" },
  { inv: "INV-0187", name: "Priya Menon", av: "PM", col: "rgba(59,130,246,0.2)", ac: "#60a5fa", svc: "Follow-up", date: "20 Feb", mode: "-", amt: 300, status: "PENDING" },
  { inv: "INV-0186", name: "Sunita Rao", av: "SR", col: "rgba(245,158,11,0.2)", ac: "#fbbf24", svc: "Procedure", date: "20 Feb", mode: "-", amt: 1200, status: "PENDING" },
  { inv: "INV-0185", name: "Vikram Nair", av: "VN", col: "rgba(139,92,246,0.2)", ac: "#a78bfa", svc: "Consultation", date: "19 Feb", mode: "Cash", amt: 500, status: "PAID" },
  { inv: "INV-0184", name: "Deepa Sharma", av: "DS", col: "rgba(236,72,153,0.2)", ac: "#f472b6", svc: "Blood Test", date: "18 Feb", mode: "-", amt: 800, status: "PENDING" },
];

const revenueByService: RevenueByService[] = [
  { svc: "Consultation", icon: "🩺", count: 62, rev: 31000, color: "#3b82f6" },
  { svc: "Procedure", icon: "⚕️", count: 18, rev: 21600, color: "#14b8a6" },
  { svc: "Follow-up", icon: "📋", count: 41, rev: 12300, color: "#f59e0b" },
  { svc: "Blood Test", icon: "🧪", count: 14, rev: 11200, color: "#a78bfa" },
  { svc: "X-Ray", icon: "🔬", count: 9, rev: 5400, color: "#f472b6" },
];

export default function DoctorRevenueScreen() {
  const totals = useMemo(() => {
    const monthTotal = weeklyRevenue.reduce(
      (sum, row) => sum + row.consultation + row.procedure + row.followup,
      0
    );
    const pendingRevenue = paymentHistory
      .filter((p) => p.status === "PENDING")
      .reduce((sum, p) => sum + p.amt, 0);

    return {
      totalRevenue: 384200,
      monthTotal,
      pendingRevenue,
      nextPayout: 72851,
    };
  }, []);

  const maxStacked = useMemo(() => {
    return Math.max(
      ...weeklyRevenue.map((r) => r.consultation + r.procedure + r.followup)
    );
  }, []);

  const maxServiceRev = revenueByService[0]?.rev || 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard title="Total Revenue" value={`Rs ${totals.totalRevenue.toLocaleString()}`} delta="+18%" icon={<IndianRupee className="w-4 h-4" />} />
          <KpiCard title="This Month" value={`Rs ${totals.monthTotal.toLocaleString()}`} delta="+12%" icon={<CalendarDays className="w-4 h-4" />} />
          <KpiCard title="Pending Revenue" value={`Rs ${totals.pendingRevenue.toLocaleString()}`} delta="3 inv" icon={<Clock3 className="w-4 h-4" />} trend="down" />
          <KpiCard title="Next Payout" value={`Rs ${totals.nextPayout.toLocaleString()}`} delta="Mar 1" icon={<Landmark className="w-4 h-4" />} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4">
          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Weekly Revenue</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Feb 2026 · 4 weeks</p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Rs {totals.monthTotal.toLocaleString()} total</span>
            </div>

            <div className="p-5 pt-4">
              <div className="h-[210px] grid grid-cols-4 gap-6 items-end">
                {weeklyRevenue.map((week) => {
                  const stacked = week.consultation + week.procedure + week.followup;
                  const totalPct = (stacked / maxStacked) * 100;
                  const consultPct = (week.consultation / stacked) * totalPct;
                  const procPct = (week.procedure / stacked) * totalPct;
                  const followPct = (week.followup / stacked) * totalPct;

                  return (
                    <div key={week.week} className="h-full flex flex-col justify-end">
                      <div className="h-[180px] flex items-end justify-center">
                        <div className="w-12 rounded-t-md overflow-hidden bg-slate-100 dark:bg-white/10">
                          <div className="bg-[#f59e0b]" style={{ height: `${followPct}%` }} />
                          <div className="bg-[#14b8a6]" style={{ height: `${procPct}%` }} />
                          <div className="bg-[#3b82f6]" style={{ height: `${consultPct}%` }} />
                        </div>
                      </div>
                      <p className="text-center text-xs mt-2 text-slate-500 dark:text-slate-400">{week.week}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
                <Legend color="bg-[#3b82f6]" label="Consultation" />
                <Legend color="bg-[#14b8a6]" label="Procedure" />
                <Legend color="bg-[#f59e0b]" label="Follow-up" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Current Month Breakdown</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">February 2026</p>
            </div>

            <div className="text-sm">
              <BreakdownRow label="Gross Revenue" value="Rs 92,100" />
              <BreakdownRow label="Platform Commission (10%)" value="-Rs 9,210" danger />
              <BreakdownRow label="Processing Fees" value="-Rs 2,671" danger />
              <BreakdownRow label="Taxes (Est.)" value="-Rs 7,368" danger />
              <div className="px-4 py-3 bg-green-500/10 border-t border-green-500/20 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Net Payout</span>
                <span className="text-lg font-bold text-green-500">Rs 72,851</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-4">
          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Payment History</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Recent transactions</p>
              </div>
              <span className="text-xs text-blue-500 font-medium">Export CSV →</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                    <th className="text-left font-semibold px-4 py-2.5">Invoice</th>
                    <th className="text-left font-semibold px-4 py-2.5">Patient</th>
                    <th className="text-left font-semibold px-4 py-2.5">Service</th>
                    <th className="text-left font-semibold px-4 py-2.5">Date</th>
                    <th className="text-left font-semibold px-4 py-2.5">Mode</th>
                    <th className="text-left font-semibold px-4 py-2.5">Amount</th>
                    <th className="text-left font-semibold px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((item) => (
                    <tr key={item.inv} className="border-b last:border-b-0 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      <td className="px-4 py-3 text-blue-500 text-xs font-medium">{item.inv}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                            style={{ background: item.col, color: item.ac }}
                          >
                            {item.av}
                          </div>
                          <span className="text-xs">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs">{item.svc}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-4 py-3 text-xs">{item.mode}</td>
                      <td className="px-4 py-3 text-xs font-semibold">Rs {item.amt}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium",
                            item.status === "PAID"
                              ? "bg-green-500/15 text-green-400"
                              : "bg-amber-500/15 text-amber-400"
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Revenue by Service</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">February 2026</p>
            </div>

            <div>
              {revenueByService.map((service) => {
                const pct = Math.round((service.rev / maxServiceRev) * 100);
                return (
                  <div key={service.svc} className="px-4 py-3 border-b last:border-b-0 border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{service.icon}</span>
                        <div>
                          <p className="text-xs text-slate-900 dark:text-slate-100">{service.svc}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{service.count} sessions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Rs {service.rev.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Rs {Math.round(service.rev / service.count)}/session</p>
                      </div>
                    </div>

                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: service.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  delta,
  icon,
  trend = "up",
}: {
  title: string;
  value: string;
  delta: string;
  icon: ReactNode;
  trend?: "up" | "down";
}) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">{icon}</div>
        <div
          className={cn(
            "px-2 py-1 rounded-full text-[10px] inline-flex items-center gap-1",
            trend === "up" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"
          )}
        >
          {trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {delta}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{title}</p>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="px-4 py-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <span className={cn("text-sm", danger ? "text-red-400" : "text-slate-900 dark:text-slate-100 font-semibold")}>{value}</span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={cn("w-2.5 h-2.5 rounded-full", color)} />
      <span>{label}</span>
    </div>
  );
}
