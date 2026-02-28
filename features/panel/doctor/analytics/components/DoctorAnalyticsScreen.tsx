"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Kpi = {
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  tone: "blue" | "green" | "amber" | "teal";
  icon: ReactNode;
};

type Insight = {
  title: string;
  body: string;
  tone: "blue" | "green" | "amber" | "teal";
  icon: ReactNode;
};

const kpis: Kpi[] = [
  {
    title: "Appointments This Month",
    value: "384",
    delta: "+14%",
    trend: "up",
    tone: "blue",
    icon: <CalendarDays className="h-[17px] w-[17px]" />,
  },
  {
    title: "Patient Retention",
    value: "78%",
    delta: "+4pp",
    trend: "up",
    tone: "green",
    icon: <Users className="h-[17px] w-[17px]" />,
  },
  {
    title: "No-show Rate",
    value: "4.2%",
    delta: "-0.8pp",
    trend: "down",
    tone: "amber",
    icon: <Clock3 className="h-[17px] w-[17px]" />,
  },
  {
    title: "Avg Appts / Day",
    value: "18.3",
    delta: "+9%",
    trend: "up",
    tone: "teal",
    icon: <TrendingUp className="h-[17px] w-[17px]" />,
  },
];

const legends = [
  { label: "Consultation (52%)", color: "#3b82f6" },
  { label: "Follow-up (31%)", color: "#14b8a6" },
  { label: "Procedure (17%)", color: "#f59e0b" },
];

const heat = [2, 8, 15, 18, 12, 6, 10, 14, 9, 3];

const insights: Insight[] = [
  {
    title: "Peak: 9–11 AM",
    body: "68% of revenue before noon. An afternoon slot could add ~₹8k/month.",
    tone: "blue",
    icon: <Clock3 className="h-[17px] w-[17px]" />,
  },
  {
    title: "Retention at 78%",
    body: "21 repeat patients this month. SMS reminders are working well.",
    tone: "green",
    icon: <Users className="h-[17px] w-[17px]" />,
  },
  {
    title: "Thursday is busiest",
    body: "24 avg appointments. Consider adding a second doctor on Thursdays.",
    tone: "amber",
    icon: <AlertTriangle className="h-[17px] w-[17px]" />,
  },
  {
    title: "Procedures up 24%",
    body: "Highest MoM growth of any service type this February.",
    tone: "teal",
    icon: <TrendingUp className="h-[17px] w-[17px]" />,
  },
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

function drawDaily(canvas: HTMLCanvasElement | null) {
  const r = setupCanvas(canvas);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);

  const lbl = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vals = [4200, 6100, 5300, 7800, 3600, 1200, 400];
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const cw = w - padL - padR;
  const ch = h - padT - padB;
  const n = 7;
  const maxV = Math.max(...vals) * 1.2;

  ctx.strokeStyle = "rgba(148,163,184,0.25)";
  ctx.lineWidth = 1;
  [0, 1, 2, 3].forEach((i) => {
    const y = padT + ch - ch * (i / 3);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + cw, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(148,163,184,0.5)";
    ctx.font = "9px Sora";
    ctx.textAlign = "right";
    ctx.fillText(`₹${(maxV * (i / 3) / 1000).toFixed(0)}k`, padL - 5, y + 3);
  });

  const pts = vals.map((v, i) => ({
    x: padL + (cw / (n - 1)) * i,
    y: padT + ch - (v / maxV) * ch,
  }));

  const g = ctx.createLinearGradient(0, padT, 0, padT + ch);
  g.addColorStop(0, "rgba(59,130,246,0.3)");
  g.addColorStop(1, "rgba(59,130,246,0.01)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, padT + ch);
  pts.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[n - 1].x, padT + ch);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();

  pts.forEach((p, i) => {
    const current = i === 3;
    ctx.fillStyle = current ? "#fff" : "#3b82f6";
    ctx.strokeStyle = current ? "#3b82f6" : "#0b1120";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, current ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = current ? "#60a5fa" : "rgba(148,163,184,0.7)";
    ctx.font = current ? "bold 9.5px Sora" : "9px Sora";
    ctx.textAlign = "center";
    ctx.fillText(lbl[i], p.x, padT + ch + 18);
  });
}

function drawAppt(canvas: HTMLCanvasElement | null) {
  const r = setupCanvas(canvas);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);

  const padL = 30;
  const padR = 12;
  const padT = 10;
  const padB = 22;
  const cw = w - padL - padR;
  const ch = h - padT - padB;
  const weeks = ["Wk1", "Wk2", "Wk3", "Wk4"];
  const series = [
    { d: [48, 52, 55, 45], c: "rgba(59,130,246,0.85)" },
    { d: [28, 31, 34, 29], c: "rgba(20,184,166,0.85)" },
    { d: [16, 18, 15, 17], c: "rgba(245,158,11,0.85)" },
  ];
  const maxV = 120;

  ctx.strokeStyle = "rgba(148,163,184,0.22)";
  ctx.lineWidth = 1;
  [0, 60, 120].forEach((v) => {
    const y = padT + ch - (v / maxV) * ch;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + cw, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(148,163,184,0.5)";
    ctx.font = "8px Sora";
    ctx.textAlign = "right";
    ctx.fillText(String(v), padL - 4, y + 3);
  });

  const gap = cw / 4;
  const bw = gap * 0.18;
  series.forEach((s, si) =>
    weeks.forEach((_, i) => {
      const cx = padL + gap * i + gap / 2 + (si - 1) * bw * 1.3;
      const bh = (s.d[i] / maxV) * ch;
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.rect(cx - bw / 2, padT + ch - bh, bw, bh);
      ctx.fill();
    })
  );

  weeks.forEach((l, i) => {
    ctx.fillStyle = "rgba(148,163,184,0.7)";
    ctx.font = "9px Sora";
    ctx.textAlign = "center";
    ctx.fillText(l, padL + gap * i + gap / 2, padT + ch + 16);
  });
}

export default function DoctorAnalyticsScreen() {
  const dailyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const apptCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const maxHeat = useMemo(() => Math.max(...heat), []);

  useEffect(() => {
    const render = () => {
      drawDaily(dailyCanvasRef.current);
      drawAppt(apptCanvasRef.current);
    };
    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-7 py-[22px] dark:bg-[#111827]">
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <KpiCard key={k.title} item={k} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
            <div className="px-5 pb-0 pt-4">
              <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Daily Revenue — This Week</div>
              <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Feb 16–22, 2026</div>
            </div>
            <div className="p-5">
              <div className="relative h-[160px]">
                <canvas ref={dailyCanvasRef} className="h-full w-full" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
            <div className="px-5 pb-0 pt-4">
              <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Appointments by Type</div>
              <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Feb 2026 · 384 total</div>
            </div>
            <div className="p-5">
              <div className="relative h-[130px]">
                <canvas ref={apptCanvasRef} className="h-full w-full" />
              </div>
              <div className="mt-[14px] flex flex-wrap gap-[14px]">
                {legends.map((l) => (
                  <div key={l.label} className="flex items-center gap-[6px] text-[11.5px] text-slate-500 dark:text-[#94A3B8]">
                    <div className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_290px]">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Peak Appointment Hours</div>
                <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Average across Feb 2026</div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="grid grid-cols-10 gap-[5px]">
                {heat.map((v, i) => {
                  const op = Number((0.08 + (v / maxHeat) * 0.85).toFixed(2));
                  return (
                    <div
                      key={`heat-${i}`}
                      className="flex h-11 items-center justify-center rounded-[7px] text-[10px] font-semibold"
                      style={{
                        background: `rgba(59,130,246,${op})`,
                        color: op > 0.5 ? "white" : "rgba(148,163,184,0.6)",
                      }}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-slate-400 dark:text-[#475569]">
                <span>8AM</span>
                <span>9AM</span>
                <span>10AM</span>
                <span>11AM</span>
                <span>12PM</span>
                <span>1PM</span>
                <span>2PM</span>
                <span>3PM</span>
                <span>4PM</span>
                <span>5PM</span>
              </div>

              <div className="mt-[14px] flex items-center gap-2">
                <span className="text-[10px] text-slate-400 dark:text-[#475569]">Low</span>
                <div className="h-[5px] flex-1 rounded bg-gradient-to-r from-blue-500/10 to-blue-500" />
                <span className="text-[10px] text-slate-400 dark:text-[#475569]">High</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-[#475569]">Smart Insights</div>
            {insights.map((ins) => (
              <InsightCard key={ins.title} item={ins} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ item }: { item: Kpi }) {
  return (
    <div className="rounded-[13px] border border-slate-200 bg-white p-[18px] transition-all hover:-translate-y-[2px] hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex h-[34px] w-[34px] items-center justify-center rounded-[9px]",
            item.tone === "blue" && "bg-blue-500/15 text-blue-400",
            item.tone === "green" && "bg-green-500/15 text-green-400",
            item.tone === "amber" && "bg-amber-500/15 text-amber-400",
            item.tone === "teal" && "bg-teal-500/15 text-teal-400"
          )}
        >
          {item.icon}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-[3px] rounded-[20px] px-[7px] py-[2px] text-[10px] font-medium",
            item.trend === "up" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          )}
        >
          {item.trend === "up" ? <ArrowUp className="h-[10px] w-[10px]" /> : <ArrowDown className="h-[10px] w-[10px]" />}
          {item.delta}
        </span>
      </div>

      <div className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-slate-100">{item.value}</div>
      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{item.title}</div>
    </div>
  );
}

function InsightCard({ item }: { item: Insight }) {
  return (
    <div className="flex items-start gap-[14px] rounded-[13px] border border-slate-200 bg-white px-[18px] py-4 transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]",
          item.tone === "blue" && "bg-blue-500/15 text-blue-400",
          item.tone === "green" && "bg-green-500/15 text-green-400",
          item.tone === "amber" && "bg-amber-500/15 text-amber-400",
          item.tone === "teal" && "bg-teal-500/15 text-teal-400"
        )}
      >
        {item.icon}
      </div>

      <div>
        <div className="mb-[3px] text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">{item.title}</div>
        <div className="text-[11.5px] leading-[1.5] text-slate-500 dark:text-[#94A3B8]">{item.body}</div>
      </div>
    </div>
  );
}
