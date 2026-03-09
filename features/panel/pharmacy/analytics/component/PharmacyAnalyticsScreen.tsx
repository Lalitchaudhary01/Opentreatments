"use client";

import { useMemo, useState } from "react";

const revenueByPeriod = {
  "7d": [32000, 44000, 28000, 36200, 41000, 38500, 48100],
  "30d": [188000, 212000, 198000, 294000],
  "3m": [620000, 710000, 680000, 294000],
};

export default function PharmacyAnalyticsScreen() {
  const [period, setPeriod] = useState<"7d" | "30d" | "3m">("7d");
  const values = useMemo(() => revenueByPeriod[period], [period]);
  const max = Math.max(...values, 1);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["7-Day Revenue", "₹2.94L", "▲ 12.0% vs last week", "text-[#22c55e]"],
            ["Gross Margin", "22.4%", "▲ 0.8% vs last week", "text-[#22c55e]"],
            ["Avg Bill Value", "₹299", "▲ ₹14 vs last week", "text-[#22c55e]"],
            ["Rx Fill Rate", "94.1%", "▲ 1.2% vs last week", "text-[#22c55e]"],
            ["Return Rate", "3.2%", "▼ 0.3% vs last week", "text-[#ef4444]"],
          ].map(([label, val, delta, tone]) => (
            <div key={label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
              <div className="text-[11px] text-[#94A3B8]">{label}</div>
              <div className="mt-1 text-[22px] font-bold text-slate-100">{val}</div>
              <div className={`text-[10px] ${tone}`}>{delta}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex flex-wrap items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">Revenue Trend</div>
                <div className="text-[11px] text-[#94A3B8]">Last {period === "7d" ? "7 days" : period === "30d" ? "30 days" : "3 months"}</div>
              </div>
              <div className="flex gap-1.5">
                {(["7d", "30d", "3m"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-full border px-3 py-1 text-[11px] ${
                      p === period
                        ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                        : "border-white/[0.1] bg-white/[0.03] text-[#CBD5E1]"
                    }`}
                  >
                    {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "3 Months"}
                  </button>
                ))}
                <button className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[11px] text-[#CBD5E1]">Export CSV</button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex h-44 items-end gap-2">
                {values.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div className="text-[10px] text-[#64748B]">₹{Math.round(v / 1000)}k</div>
                    <div className="w-full rounded-t bg-gradient-to-t from-[#1d4ed8]/20 to-[#3b82f6]" style={{ height: `${(v / max) * 100}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3">
              <div className="text-[13px] font-semibold text-slate-100">Revenue by Category</div>
              <div className="text-[11px] text-[#94A3B8]">Top 5 this week</div>
            </div>
            <div className="space-y-2 p-4 text-xs">
              {[
                ["Chronic Meds", "38%", "₹1.12L", "#3b82f6"],
                ["Acute / Antibiotic", "24%", "₹70.6k", "#14b8a6"],
                ["OTC / Vitamins", "18%", "₹52.9k", "#a78bfa"],
                ["Injectables", "12%", "₹35.3k", "#f59e0b"],
                ["Others", "8%", "₹23.5k", "#64748b"],
              ].map(([name, pct, val, color]) => (
                <div key={name} className="flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <div className="flex items-center gap-2 text-[#CBD5E1]">
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <span>{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#94A3B8]">{pct}</span>
                    <span className="text-slate-100">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3">
              <div className="text-[13px] font-semibold text-slate-100">Top Medicines</div>
              <div className="text-[11px] text-[#94A3B8]">By revenue · last 7 days</div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-4 py-2">Medicine</th>
                  <th className="px-4 py-2">Units Sold</th>
                  <th className="px-4 py-2">Revenue</th>
                  <th className="px-4 py-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Metformin 500mg", "412", "₹18,240", "▲ 9%"],
                  ["Atorvastatin 10mg", "340", "₹15,640", "▲ 12%"],
                  ["Pantoprazole 40mg", "280", "₹9,800", "▲ 7%"],
                  ["Amlodipine 5mg", "248", "₹7,440", "▲ 4%"],
                ].map(([m, u, r, t]) => (
                  <tr key={m} className="border-b border-white/[0.07] last:border-b-0">
                    <td className="px-4 py-2 text-xs text-slate-100">{m}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{u}</td>
                    <td className="px-4 py-2 text-xs text-[#14b8a6]">{r}</td>
                    <td className="px-4 py-2 text-xs text-[#22c55e]">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3">
              <div className="text-[13px] font-semibold text-slate-100">GST Summary (MTD)</div>
            </div>
            <div className="space-y-2 p-4 text-sm">
              <div className="flex justify-between"><span className="text-[#94A3B8]">CGST (2.5%)</span><span className="text-slate-100">₹1,840</span></div>
              <div className="flex justify-between"><span className="text-[#94A3B8]">SGST (2.5%)</span><span className="text-slate-100">₹1,840</span></div>
              <div className="flex justify-between"><span className="text-[#94A3B8]">Total GST Collected</span><span className="font-bold text-[#14b8a6]">₹3,680</span></div>
              <button className="mt-2 w-full rounded border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">Export GSTR-1 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
