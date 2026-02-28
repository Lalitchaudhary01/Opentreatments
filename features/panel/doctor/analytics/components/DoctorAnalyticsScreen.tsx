"use client";

import { ReactNode, useMemo } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalyticsDailyPoint, AnalyticsInsight, AnalyticsTypePoint } from "../types";

const dailyRevenue: AnalyticsDailyPoint[] = [
  { day: "Mon", revenue: 11200 },
  { day: "Tue", revenue: 13400 },
  { day: "Wed", revenue: 12100 },
  { day: "Thu", revenue: 14900 },
  { day: "Fri", revenue: 14100 },
  { day: "Sat", revenue: 9300 },
  { day: "Sun", revenue: 7100 },
];

const appointmentsByType: AnalyticsTypePoint[] = [
  { type: "Consultation", value: 52, color: "#3b82f6" },
  { type: "Follow-up", value: 31, color: "#14b8a6" },
  { type: "Procedure", value: 17, color: "#f59e0b" },
];

const heatMap = [2, 8, 15, 18, 12, 6, 10, 14, 9, 3];

const insights: AnalyticsInsight[] = [
  {
    title: "Peak: 9–11 AM",
    body: "68% of revenue before noon. An afternoon slot could add approx Rs 8k/month.",
    tone: "blue",
  },
  {
    title: "Retention at 78%",
    body: "21 repeat patients this month. Reminder flow is working well.",
    tone: "green",
  },
  {
    title: "Thursday is busiest",
    body: "24 avg appointments. Consider adding a second doctor on Thursdays.",
    tone: "amber",
  },
  {
    title: "Procedures up 24%",
    body: "Highest MoM growth among all appointment categories.",
    tone: "teal",
  },
];

export default function DoctorAnalyticsScreen() {
  const maxRevenue = useMemo(
    () => Math.max(...dailyRevenue.map((d) => d.revenue)),
    []
  );
  const maxHeat = useMemo(() => Math.max(...heatMap), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            title="Appointments This Month"
            value="384"
            delta="+14%"
            icon={<CalendarDays className="w-4 h-4" />}
          />
          <KpiCard
            title="Patient Retention"
            value="78%"
            delta="+4pp"
            icon={<Users className="w-4 h-4" />}
          />
          <KpiCard
            title="No-show Rate"
            value="4.2%"
            delta="-0.8pp"
            icon={<Clock3 className="w-4 h-4" />}
            trend="down"
          />
          <KpiCard
            title="Avg Appts / Day"
            value="18.3"
            delta="+9%"
            icon={<TrendingUp className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-5 pt-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Daily Revenue — This Week</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Feb 16–22, 2026</p>
            </div>
            <div className="p-5 pt-4">
              <div className="h-[170px] flex items-end gap-3">
                {dailyRevenue.map((d) => {
                  const pct = Math.max(6, Math.round((d.revenue / maxRevenue) * 100));
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full max-w-[42px] rounded-t-md bg-[#3b82f6]" style={{ height: `${pct}%` }} />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-5 pt-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Appointments by Type</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Feb 2026 · 384 total</p>
            </div>

            <div className="p-5 pt-4">
              <div className="space-y-4">
                {appointmentsByType.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">{item.type}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.value}%`, background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
                {appointmentsByType.map((item) => (
                  <div key={item.type} className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
          <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Peak Appointment Hours</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Average across Feb 2026</p>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-10 gap-1.5">
                {heatMap.map((v, idx) => {
                  const intensity = 0.1 + (v / maxHeat) * 0.85;
                  return (
                    <div
                      key={`heat-${idx}`}
                      className="h-11 rounded-lg flex items-center justify-center text-[10px] font-semibold"
                      style={{
                        background: `rgba(59,130,246,${intensity.toFixed(2)})`,
                        color: intensity > 0.5 ? "#fff" : "rgba(148,163,184,0.85)",
                      }}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
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

              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Low</span>
                <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400">High</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.08em] font-semibold text-slate-500 dark:text-slate-400">Smart Insights</div>
            {insights.map((insight) => (
              <InsightCard key={insight.title} insight={insight} />
            ))}
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

function InsightCard({ insight }: { insight: AnalyticsInsight }) {
  const toneClasses = {
    blue: "bg-blue-500/15 text-blue-400",
    green: "bg-green-500/15 text-green-400",
    amber: "bg-amber-500/15 text-amber-400",
    teal: "bg-teal-500/15 text-teal-400",
  };

  return (
    <div className="rounded-xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-3.5 flex items-start gap-2.5">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", toneClasses[insight.tone])}>
        <Activity className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{insight.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{insight.body}</p>
      </div>
    </div>
  );
}
