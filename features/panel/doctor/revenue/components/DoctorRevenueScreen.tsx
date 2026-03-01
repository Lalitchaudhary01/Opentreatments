"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Clock3,
  IndianRupee,
  Landmark,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevenueByService, RevenueHistoryItem } from "../types";

const paymentHistory: RevenueHistoryItem[] = [
  { inv: "INV-0188", name: "Arjun Kumar", av: "AK", col: "rgba(20,184,166,0.2)", ac: "#2dd4bf", svc: "Consultation", date: "20 Feb", mode: "UPI", amt: 500, status: "PAID" },
  { inv: "INV-0187", name: "Priya Menon", av: "PM", col: "rgba(59,130,246,0.2)", ac: "#60a5fa", svc: "Follow-up", date: "20 Feb", mode: "—", amt: 300, status: "PENDING" },
  { inv: "INV-0186", name: "Sunita Rao", av: "SR", col: "rgba(245,158,11,0.2)", ac: "#fbbf24", svc: "Procedure", date: "20 Feb", mode: "—", amt: 1200, status: "PENDING" },
  { inv: "INV-0185", name: "Vikram Nair", av: "VN", col: "rgba(139,92,246,0.2)", ac: "#a78bfa", svc: "Consultation", date: "19 Feb", mode: "Cash", amt: 500, status: "PAID" },
  { inv: "INV-0184", name: "Deepa Sharma", av: "DS", col: "rgba(236,72,153,0.2)", ac: "#f472b6", svc: "Blood Test", date: "18 Feb", mode: "—", amt: 800, status: "PENDING" },
  { inv: "INV-0183", name: "Ravi Pillai", av: "RP", col: "rgba(34,197,94,0.2)", ac: "#4ade80", svc: "Consultation", date: "18 Feb", mode: "Card", amt: 500, status: "PAID" },
  { inv: "INV-0182", name: "Meena Joshi", av: "MJ", col: "rgba(251,191,36,0.2)", ac: "#fbbf24", svc: "Follow-up", date: "15 Feb", mode: "UPI", amt: 300, status: "PAID" },
  { inv: "INV-0181", name: "Karan Mehta", av: "KM", col: "rgba(59,130,246,0.2)", ac: "#60a5fa", svc: "Consultation", date: "14 Feb", mode: "UPI", amt: 500, status: "PAID" },
  { inv: "INV-0180", name: "Sanjay Bhat", av: "SB", col: "rgba(20,184,166,0.2)", ac: "#2dd4bf", svc: "Procedure", date: "13 Feb", mode: "Net Banking", amt: 1200, status: "PAID" },
  { inv: "INV-0179", name: "Anita Desai", av: "AD", col: "rgba(167,139,250,0.2)", ac: "#c4b5fd", svc: "Consultation", date: "12 Feb", mode: "Cash", amt: 500, status: "PAID" },
];

const revenueByService: RevenueByService[] = [
  { svc: "Consultation", icon: "🩺", count: 62, rev: 31000, color: "#3b82f6" },
  { svc: "Procedure", icon: "⚕️", count: 18, rev: 21600, color: "#14b8a6" },
  { svc: "Follow-up", icon: "📋", count: 41, rev: 12300, color: "#f59e0b" },
  { svc: "Blood Test", icon: "🧪", count: 14, rev: 11200, color: "#a78bfa" },
  { svc: "X-Ray", icon: "🔬", count: 9, rev: 5400, color: "#f472b6" },
  { svc: "ECG", icon: "❤️", count: 6, rev: 3600, color: "#22c55e" },
];

function setupCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}

function drawWeekly(canvas: HTMLCanvasElement | null) {
  const r = setupCanvas(canvas);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const sub = ["Feb 1–7", "Feb 8–14", "Feb 15–21", "Feb 22–28"];
  const C = [20700, 25400, 31000, 15000];
  const P = [8670, 10630, 12990, 6300];
  const F = [5170, 6350, 7750, 3760];
  const totals = labels.map((_, i) => C[i] + P[i] + F[i]);
  const maxV = Math.max(...totals) * 1.2;

  const padL = 52;
  const padR = 20;
  const padT = 28;
  const padB = 52;
  const cw = w - padL - padR;
  const ch = h - padT - padB;
  const gap = cw / 4;
  const bw = gap * 0.5;

  const layers = [
    { d: F, c: "rgba(245,158,11,0.85)" },
    { d: P, c: "rgba(20,184,166,0.85)" },
    { d: C, c: "rgba(59,130,246,0.92)" },
  ];

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((f) => {
    const y = padT + ch - ch * f;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + cw, y);
    ctx.stroke();

    ctx.fillStyle = "rgba(148,163,184,0.5)";
    ctx.font = "10px Sora";
    ctx.textAlign = "right";
    ctx.fillText(`₹${(maxV * f / 1000).toFixed(0)}k`, padL - 8, y + 4);
  });

  labels.forEach((_, i) => {
    const x = padL + gap * i + (gap - bw) / 2;
    const isCur = i === 2;
    let sy = padT + ch;

    layers.forEach((layer, li) => {
      const bh = (layer.d[i] / maxV) * ch;
      ctx.fillStyle = isCur ? layer.c : layer.c.replace(/0\.\d+\)$/, "0.3)");
      if (li === layers.length - 1) {
        const rr = 5;
        ctx.beginPath();
        ctx.moveTo(x + rr, sy - bh);
        ctx.lineTo(x + bw - rr, sy - bh);
        ctx.arcTo(x + bw, sy - bh, x + bw, sy - bh + rr, rr);
        ctx.lineTo(x + bw, sy);
        ctx.lineTo(x, sy);
        ctx.lineTo(x, sy - bh + rr);
        ctx.arcTo(x, sy - bh, x + rr, sy - bh, rr);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(x, sy - bh, bw, bh);
      }
      sy -= bh;
    });

    if (isCur) {
      const bw2 = 58;
      const bh2 = 18;
      const bx = x + bw / 2 - bw2 / 2;
      const by = sy - 34;
      ctx.fillStyle = "rgba(59,130,246,0.15)";
      ctx.strokeStyle = "rgba(59,130,246,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw2, bh2, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 9px Sora";
      ctx.textAlign = "center";
      ctx.fillText("Current", x + bw / 2, by + 12);
    }

    ctx.fillStyle = isCur ? "rgba(241,245,249,0.9)" : "rgba(148,163,184,0.4)";
    ctx.font = isCur ? "bold 10px Sora" : "9.5px Sora";
    ctx.textAlign = "center";
    ctx.fillText(`₹${(totals[i] / 1000).toFixed(0)}k`, x + bw / 2, sy - (isCur ? 40 : 8));

    ctx.fillStyle = isCur ? "#60a5fa" : "rgba(148,163,184,0.65)";
    ctx.font = isCur ? "bold 10px Sora" : "10px Sora";
    ctx.fillText(labels[i], x + bw / 2, padT + ch + 16);

    ctx.fillStyle = "rgba(148,163,184,0.4)";
    ctx.font = "9px Sora";
    ctx.fillText(sub[i], x + bw / 2, padT + ch + 32);
  });
}

export default function DoctorRevenueScreen() {
  const revCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const render = () => drawWeekly(revCanvasRef.current);
    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  const pendingRevenue = useMemo(
    () => paymentHistory.filter((p) => p.status === "PENDING").reduce((sum, p) => sum + p.amt, 0),
    []
  );

  const maxServiceRev = revenueByService[0]?.rev || 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Total Revenue" value="₹3,84,200" delta="+18%" trend="up" tone="blue" icon={<IndianRupee className="h-[17px] w-[17px]" />} />
          <KpiCard title="This Month" value="₹92,100" delta="+12%" trend="up" tone="teal" icon={<CalendarDays className="h-[17px] w-[17px]" />} />
          <KpiCard title="Pending Revenue" value={`₹${pendingRevenue.toLocaleString("en-IN")}`} delta="3 inv" trend="down" tone="amber" icon={<Clock3 className="h-[17px] w-[17px]" />} />
          <KpiCard title="Next Payout" value="₹72,851" delta="Mar 1" trend="up" tone="green" icon={<Landmark className="h-[17px] w-[17px]" />} />
        </div>

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1fr_260px]">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] transition-colors hover:border-white/20">
            <div className="flex items-center justify-between px-5 pb-0 pt-4">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Weekly Revenue</div>
                <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Feb 2026 · 4 weeks</div>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-[#475569]">₹92,100 total</span>
            </div>
            <div className="p-5">
              <div className="relative h-[200px]">
                <canvas ref={revCanvasRef} className="h-full w-full" />
              </div>
              <div className="mt-[14px] flex flex-wrap gap-[14px]">
                <Legend label="Consultation" color="#3b82f6" />
                <Legend label="Procedure" color="#14b8a6" />
                <Legend label="Follow-up" color="#f59e0b" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
            <div className="border-b border-slate-200 dark:border-white/[0.07] px-[18px] py-[13px]">
              <div className="text-[12.5px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Current Month Breakdown</div>
              <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">February 2026</div>
            </div>

            <div>
              <BreakdownLine label="Gross Revenue" value="₹92,100" />
              <BreakdownLine label="Platform Commission" sub="(10%)" value="-₹9,210" danger />
              <BreakdownLine label="Processing Fees" value="-₹2,671" danger />
              <BreakdownLine label="Taxes" sub="(Est.)" value="-₹7,368" danger />
              <div className="flex items-center justify-between border-t border-green-500/20 bg-green-500/10 px-[18px] py-3">
                <span className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Net Payout</span>
                <span className="text-[16px] font-bold text-green-400">₹72,851</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1fr_330px]">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Payment History</div>
                <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Recent transactions</div>
              </div>
              <span className="cursor-pointer text-[12px] font-medium text-blue-400">Export CSV →</span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {[
                    "Invoice",
                    "Patient",
                    "Service",
                    "Date",
                    "Mode",
                    "Amount",
                    "Status",
                  ].map((h) => (
                    <th key={h} className="border-b border-slate-200 dark:border-white/[0.07] px-[18px] py-[9px] text-left text-[10px] font-semibold uppercase tracking-[.07em] text-slate-500 dark:text-[#475569]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p) => (
                  <tr key={p.inv} className="border-b border-slate-200 dark:border-white/[0.07] last:border-b-0">
                    <td className="px-[18px] py-[11px] text-[11.5px] font-medium text-blue-400">{p.inv}</td>
                    <td className="px-[18px] py-[11px] text-[12.5px] text-slate-500 dark:text-[#94A3B8]">
                      <div className="flex items-center gap-[10px]">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold" style={{ background: p.col, color: p.ac }}>
                          {p.av}
                        </div>
                        <span className="text-[12px] text-slate-900 dark:text-[#F1F5F9]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-[18px] py-[11px] text-[12.5px] text-slate-500 dark:text-[#94A3B8]">{p.svc}</td>
                    <td className="px-[18px] py-[11px] text-[12.5px] text-slate-500 dark:text-[#475569]">{p.date}</td>
                    <td className="px-[18px] py-[11px] text-[12.5px] text-slate-500 dark:text-[#94A3B8]">{p.mode}</td>
                    <td className="px-[18px] py-[11px] text-[12.5px] font-semibold text-slate-900 dark:text-[#F1F5F9]">₹{p.amt.toLocaleString("en-IN")}</td>
                    <td className="px-[18px] py-[11px]">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium",
                          p.status === "PAID" ? "bg-[rgba(34,197,94,.12)] text-[#4ade80]" : "bg-[rgba(245,158,11,.12)] text-[#fbbf24]"
                        )}
                      >
                        <span className={cn("h-[5px] w-[5px] rounded-full", p.status === "PAID" ? "bg-[#4ade80]" : "bg-[#fbbf24]")} />
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
            <div className="border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
              <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Revenue by Service</div>
              <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">February 2026</div>
            </div>

            <div>
              {revenueByService.map((s) => {
                const pct = Math.round((s.rev / maxServiceRev) * 100);
                return (
                  <div key={s.svc} className="border-b border-slate-200 dark:border-white/[0.07] px-[18px] py-3 last:border-b-0 hover:bg-white/[0.02]">
                    <div className="mb-[7px] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px]">{s.icon}</span>
                        <div>
                          <div className="text-[12.5px] font-medium text-slate-900 dark:text-[#F1F5F9]">{s.svc}</div>
                          <div className="text-[10px] text-slate-500 dark:text-[#475569]">{s.count} sessions</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] font-bold text-slate-900 dark:text-[#F1F5F9]">₹{s.rev.toLocaleString("en-IN")}</div>
                        <div className="text-[10px] text-slate-500 dark:text-[#475569]">₹{Math.round(s.rev / s.count).toLocaleString("en-IN")}/session</div>
                      </div>
                    </div>
                    <div className="h-1 overflow-hidden rounded bg-slate-100 dark:bg-white/[0.06]">
                      <div className="h-full rounded" style={{ width: `${pct}%`, background: s.color }} />
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
  trend,
  tone,
  icon,
}: {
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  tone: "blue" | "teal" | "amber" | "green";
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-[18px] transition-all hover:-translate-y-[2px] hover:border-white/20">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex h-[34px] w-[34px] items-center justify-center rounded-[9px]",
            tone === "blue" && "bg-blue-500/15 text-blue-400",
            tone === "teal" && "bg-teal-500/15 text-teal-400",
            tone === "amber" && "bg-amber-500/15 text-amber-400",
            tone === "green" && "bg-green-500/15 text-green-400"
          )}
        >
          {icon}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-[3px] rounded-[20px] px-[7px] py-[2px] text-[10px] font-medium",
            trend === "up" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          )}
        >
          {trend === "up" ? <ArrowUp className="h-[10px] w-[10px]" /> : <ArrowDown className="h-[10px] w-[10px]" />}
          {delta}
        </span>
      </div>

      <div className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#F1F5F9]">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{title}</div>
    </div>
  );
}

function BreakdownLine({ label, sub, value, danger }: { label: string; sub?: string; value: string; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-[18px] py-3">
      <span className="text-[12px] text-slate-500 dark:text-[#94A3B8]">
        {label} {sub ? <span className="text-[10px] text-slate-500 dark:text-[#475569]">{sub}</span> : null}
      </span>
      <span className={cn("text-[12.5px] font-medium", danger ? "text-red-400" : "text-slate-900 dark:text-[#F1F5F9] font-semibold")}>{value}</span>
    </div>
  );
}

function Legend({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-[6px] text-[11.5px] text-slate-500 dark:text-[#94A3B8]">
      <div className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
