import { BarChart3, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Orders", value: "1,248", delta: "+12.4%", up: true },
  { label: "Reports Delivered", value: "1,102", delta: "+9.2%", up: true },
  { label: "Avg TAT", value: "7.4 hrs", delta: "-0.8 hrs", up: true },
  { label: "Revenue", value: "₹4.8L", delta: "+18.1%", up: true },
];

const bars = [52, 60, 64, 58, 70, 76, 68, 81, 74, 88, 92, 86];

export default function LabAnalyticsPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Reports & Analytics</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">March 2026</p>
          </div>
          <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
            <BarChart3 className="h-3.5 w-3.5" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-[12px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">{kpi.label}</div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.delta}
                </span>
              </div>
              <div className="mt-2 text-[24px] font-semibold text-slate-900 dark:text-slate-100">{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[7fr_5fr]">
          <div className="rounded-[14px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Orders Trend</div>
            <div className="mt-4 flex h-[220px] items-end gap-2">
              {bars.map((height, idx) => (
                <div key={idx} className="flex-1 rounded-t bg-[#3b82f6]/75" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10.5px] text-slate-500 dark:text-[#64748B]">
              <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
            </div>
          </div>

          <div className="rounded-[14px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Category Contribution</div>
            <div className="mt-4 space-y-3">
              {[
                { name: "Biochemistry", pct: 34, color: "bg-[#3b82f6]" },
                { name: "Hematology", pct: 24, color: "bg-[#14b8a6]" },
                { name: "Hormones", pct: 19, color: "bg-[#a78bfa]" },
                { name: "Microbiology", pct: 13, color: "bg-[#f59e0b]" },
                { name: "Others", pct: 10, color: "bg-[#64748b]" },
              ].map((row) => (
                <div key={row.name}>
                  <div className="mb-1.5 flex items-center justify-between text-[12px]">
                    <span className="text-slate-700 dark:text-[#CBD5E1]">{row.name}</span>
                    <span className="text-slate-500 dark:text-[#94A3B8]">{row.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
