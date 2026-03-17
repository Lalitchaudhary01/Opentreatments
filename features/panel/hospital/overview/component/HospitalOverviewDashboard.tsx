import { ArrowUpRight, BadgeIndianRupee, CalendarDays, Clock3, Star, Users } from "lucide-react";
import Link from "next/link";

const metrics = [
  {
    label: "Today's Appointments",
    value: "84",
    sub: "18 in progress · 32 done",
    delta: "+12%",
    color: "text-[#14b8a6]",
    icon: CalendarDays,
  },
  {
    label: "Patients Admitted",
    value: "218",
    sub: "14 discharged today",
    delta: "+3",
    color: "text-[#3b82f6]",
    icon: Users,
  },
  {
    label: "Pending Requests",
    value: "12",
    sub: "2 emergency · 10 routine",
    delta: "Urgent",
    color: "text-[#ef4444]",
    icon: Clock3,
  },
  {
    label: "Revenue Today",
    value: "₹3.2L",
    sub: "Target ₹4L · 80% reached",
    delta: "+18%",
    color: "text-[#f59e0b]",
    icon: BadgeIndianRupee,
  },
  {
    label: "Average Rating",
    value: "4.7",
    sub: "from 1,240 reviews",
    delta: "+0.2",
    color: "text-[#a78bfa]",
    icon: Star,
  },
];

const appointmentRows = [
  {
    id: "APT-2410",
    patient: "Elena Vasquez",
    doctor: "Dr. Kofi Osei",
    department: "Cardiology",
    slot: "09:30 AM",
    status: "In Progress",
  },
  {
    id: "APT-2411",
    patient: "Rohan Sharma",
    doctor: "Dr. Priya Sadiq",
    department: "General Medicine",
    slot: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "APT-2412",
    patient: "Neha Iyer",
    doctor: "Dr. Jin-Hee Kim",
    department: "Dermatology",
    slot: "10:30 AM",
    status: "Pending",
  },
  {
    id: "APT-2413",
    patient: "Samuel Okafor",
    doctor: "Dr. Wei Ling",
    department: "Orthopedics",
    slot: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: "APT-2414",
    patient: "Kavita Rao",
    doctor: "Dr. Amara Diallo",
    department: "Neurology",
    slot: "11:30 AM",
    status: "Cancelled",
  },
];

const statusPillClass: Record<string, string> = {
  Confirmed: "bg-[rgba(34,197,94,.12)] text-[#4ade80]",
  "In Progress": "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]",
  Pending: "bg-[rgba(245,158,11,.12)] text-[#fbbf24]",
  Cancelled: "bg-[rgba(239,68,68,.12)] text-[#f87171]",
};

const activities = [
  "Emergency request received — Bed E-04 · Cardiology",
  "New patient registered — Samuel Okafor, 41M",
  "Payment received — INV-8835 · ₹1,400 via UPI",
  "Appointment rescheduled — Deepa Kulkarni to 12 Mar",
  "Insurance claim pending — Star Health · INV-8840",
];

export default function HospitalOverviewDashboard() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-5 transition hover:-translate-y-[2px] hover:border-white/[0.14]">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/[0.06] ${metric.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#94a3b8]">{metric.delta}</span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-[#f1f5f9]">{metric.value}</div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">{metric.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{metric.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[8fr_4fr]">
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div>
              <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Today's Appointment Queue</h2>
              <p className="mt-0.5 text-[11px] text-[#94a3b8]">Real-time slot tracking by department</p>
            </div>
            <Link href="/hospital/appointments" className="text-[11.5px] font-medium text-[#3b82f6]">
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                  <th className="px-5 py-3">Appt ID</th>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Doctor</th>
                  <th className="px-5 py-3">Dept</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentRows.map((row) => (
                  <tr key={row.id} className="border-t border-white/[0.07] text-[12.5px] text-[#94a3b8] hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-[11px] text-[#3b82f6]">{row.id}</td>
                    <td className="px-5 py-3 text-[#e2e8f0]">{row.patient}</td>
                    <td className="px-5 py-3">{row.doctor}</td>
                    <td className="px-5 py-3">{row.department}</td>
                    <td className="px-5 py-3">{row.slot}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPillClass[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4">
            <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Live Activity</h2>
            <p className="mt-0.5 text-[11px] text-[#94a3b8]">Important operational updates</p>
          </div>
          <div className="space-y-2 p-4">
            {activities.map((item) => (
              <div key={item} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[12px] text-[#cbd5e1]">{item}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.07] p-4">
            <Link href="/hospital/analytics" className="inline-flex items-center gap-1 text-[12px] font-medium text-[#3b82f6]">
              Open Analytics <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
