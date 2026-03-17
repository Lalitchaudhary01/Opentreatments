import { Activity, BadgeIndianRupee, CalendarClock, Users } from "lucide-react";

const kpis = [
  { label: "Monthly Revenue", value: "₹86.4L", trend: "+12% vs last month", icon: BadgeIndianRupee, color: "text-[#22c55e]" },
  { label: "Appointment Conversion", value: "68%", trend: "+4% improvement", icon: CalendarClock, color: "text-[#3b82f6]" },
  { label: "Avg Wait Time", value: "18 min", trend: "-2 min better", icon: Activity, color: "text-[#14b8a6]" },
  { label: "Patient Satisfaction", value: "94%", trend: "+2% uplift", icon: Users, color: "text-[#a78bfa]" },
  { label: "Occupancy", value: "81%", trend: "ICU at 92%", icon: Activity, color: "text-[#f59e0b]" },
];

const bars = [42, 46, 51, 58, 63, 55, 68];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const deptMix = [
  ["Cardiology", 28, "#3b82f6"],
  ["Orthopedics", 22, "#14b8a6"],
  ["General Medicine", 18, "#f59e0b"],
  ["Neurology", 14, "#a78bfa"],
  ["Others", 18, "#94a3b8"],
] as const;

export default function HospitalAnalyticsScreen() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-5">
              <div className={`mb-3 flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/[0.06] ${kpi.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-[26px] font-bold leading-none tracking-[-0.03em] text-[#f1f5f9]">{kpi.value}</div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">{kpi.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{kpi.trend}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-5">
          <div className="mb-4">
            <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Weekly Appointments Trend</h2>
            <p className="mt-0.5 text-[11px] text-[#94a3b8]">Appointments completed per day</p>
          </div>
          <div className="flex h-[180px] items-end gap-2">
            {bars.map((value, idx) => (
              <div key={days[idx]} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[9px] text-[#475569]">{value}</span>
                <div className="w-full rounded-t bg-[#3b82f6]" style={{ height: `${value * 2}px` }} />
                <span className={`text-[10px] ${idx === 6 ? 'text-[#14b8a6] font-semibold' : 'text-[#64748b]'}`}>{days[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-5">
          <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Department Mix</h2>
          <p className="mt-0.5 text-[11px] text-[#94a3b8]">Share of active appointments</p>
          <div className="mt-4 space-y-2.5">
            {deptMix.map(([name, pct, color]) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-[11px] text-[#94a3b8]">
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: color }} />{name}</span>
                  <span className="font-medium text-[#e2e8f0]">{pct}%</span>
                </div>
                <div className="h-[6px] rounded bg-white/[0.06]"><div className="h-[6px] rounded" style={{ width: `${pct}%`, background: color }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
