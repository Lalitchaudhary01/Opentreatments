import Link from "next/link";
import {
  AlertCircle,
  BadgeIndianRupee,
  CalendarDays,
  ChevronRight,
  Clock3,
  Star,
  TriangleAlert,
  Users,
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  sub: string;
  delta: string;
  tone: "teal" | "blue" | "red" | "amber" | "purple";
  fill: string;
  href: string;
};

const statCards: StatCard[] = [
  {
    title: "Today's Appointments",
    value: "84",
    sub: "18 in progress · 32 done",
    delta: "+12%",
    tone: "teal",
    fill: "68%",
    href: "/hospital/appointments",
  },
  {
    title: "Patients Admitted",
    value: "218",
    sub: "14 discharged today",
    delta: "+3",
    tone: "blue",
    fill: "82%",
    href: "/hospital/patients",
  },
  {
    title: "Pending Requests",
    value: "12",
    sub: "2 emergency · 10 routine",
    delta: "Urgent",
    tone: "red",
    fill: "40%",
    href: "/hospital/appointments",
  },
  {
    title: "Revenue Today",
    value: "₹3.2L",
    sub: "Target ₹4L · 80% reached",
    delta: "+18%",
    tone: "amber",
    fill: "80%",
    href: "/hospital/billing",
  },
  {
    title: "Average Rating",
    value: "4.7",
    sub: "from 1,240 reviews",
    delta: "+0.2",
    tone: "purple",
    fill: "94%",
    href: "/hospital/reviews",
  },
];

const tableRows = [
  {
    initials: "EV",
    name: "Elena Vasquez",
    patientNo: "PT-00421",
    dept: "Cardiology",
    deptTone: "blue",
    time: "09:30",
    type: "Follow-up",
    status: "In Progress",
    statusTone: "teal",
    avatarTone: "from-blue-500 to-blue-700",
  },
  {
    initials: "RS",
    name: "Rohan Sharma",
    patientNo: "PT-00418",
    dept: "Orthopedics",
    deptTone: "amber",
    time: "09:45",
    type: "New Visit",
    status: "Waiting",
    statusTone: "amber",
    avatarTone: "from-teal-500 to-teal-700",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    patientNo: "PT-00430",
    dept: "Emergency",
    deptTone: "red",
    time: "10:00",
    type: "EMER",
    status: "Urgent",
    statusTone: "red",
    avatarTone: "from-red-500 to-red-700",
    emergency: true,
  },
  {
    initials: "PN",
    name: "Priya Nair",
    patientNo: "PT-00415",
    dept: "Neurology",
    deptTone: "purple",
    time: "10:15",
    type: "Follow-up",
    status: "Scheduled",
    statusTone: "slate",
    avatarTone: "from-green-500 to-green-700",
  },
  {
    initials: "MK",
    name: "Meera Krishnan",
    patientNo: "PT-00412",
    dept: "Cardiology",
    deptTone: "blue",
    time: "11:00",
    type: "Post-Op",
    status: "Scheduled",
    statusTone: "slate",
    avatarTone: "from-violet-400 to-violet-700",
  },
];

const recentActivity = [
  {
    time: "09:12",
    tone: "red",
    text: "Emergency: Arjun Mehta — chest pain, routed to E-04.",
    cta: "Attend",
    href: "/hospital/appointments",
  },
  {
    time: "09:28",
    tone: "teal",
    text: "Appointment booked — Priya Sharma → Dr. Osei 11:00 AM Cardiology",
  },
  {
    time: "09:41",
    tone: "green",
    text: "New patient registered — Samuel Okafor, 41M. OPD, General Medicine.",
    cta: "View",
    href: "/hospital/patients",
  },
  {
    time: "10:05",
    tone: "amber",
    text: "Payment received — INV-8835 · Samuel Okafor · ₹1,400 via UPI.",
    cta: "View",
    href: "/hospital/billing",
  },
  {
    time: "10:48",
    tone: "blue",
    text: "Appointment rescheduled — Deepa Kulkarni moved to Mar 12, 10:30 AM.",
    cta: "View",
    href: "/hospital/appointments",
  },
  {
    time: "11:04",
    tone: "purple",
    text: "New review: 5★ — Dr. Priya Sadiq from Riya Nair.",
    cta: "View",
    href: "/hospital/reviews",
  },
  {
    time: "11:20",
    tone: "amber",
    text: "Insurance claim pending — Star Health · INV-8840 · ₹1.22L.",
    cta: "Process",
    href: "/hospital/billing",
  },
];

const pendingActions = [
  {
    title: "Emergency triage — 2 patients",
    sub: "Arjun Mehta · Kavita Rao awaiting assignment",
    time: "now",
    tone: "red",
    href: "/hospital/appointments",
  },
  {
    title: "3 patients awaiting discharge",
    sub: "Rohan Sharma · Priya Nair · Samuel Okafor",
    time: "10:05",
    tone: "blue",
    href: "/hospital/patients",
  },
  {
    title: "5 reviews awaiting reply",
    sub: "Including 1 negative review — action required",
    time: "09:41",
    tone: "purple",
    href: "/hospital/reviews",
  },
  {
    title: "Insurance claim awaiting docs",
    sub: "Star Health · INV-8840 · ₹1,22,400",
    time: "09:30",
    tone: "teal",
    href: "/hospital/billing",
  },
  {
    title: "6 appointments unconfirmed",
    sub: "Scheduled for today · awaiting patient confirmation",
    time: "08:50",
    tone: "amber",
    href: "/hospital/appointments",
  },
];

function toneClasses(tone: string) {
  if (tone === "teal") return "text-[#14b8a6] bg-[#14b8a6]/10";
  if (tone === "blue") return "text-[#3b82f6] bg-[#3b82f6]/10";
  if (tone === "red") return "text-[#ef4444] bg-[#ef4444]/10";
  if (tone === "amber") return "text-[#f59e0b] bg-[#f59e0b]/10";
  if (tone === "purple") return "text-[#a78bfa] bg-[#a78bfa]/10";
  if (tone === "green") return "text-[#22c55e] bg-[#22c55e]/10";
  return "text-slate-500 bg-slate-100";
}

function deptPill(tone: string) {
  if (tone === "blue") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  if (tone === "amber") return "bg-[#f59e0b]/15 text-[#fbbf24]";
  if (tone === "red") return "bg-[#ef4444]/15 text-[#f87171]";
  if (tone === "purple") return "bg-[#a78bfa]/15 text-[#c4b5fd]";
  return "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300";
}

function statusPill(tone: string) {
  if (tone === "teal") return "bg-[#14b8a6]/15 text-[#2dd4bf]";
  if (tone === "amber") return "bg-[#f59e0b]/15 text-[#fbbf24]";
  if (tone === "red") return "bg-[#ef4444]/15 text-[#f87171]";
  return "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300";
}

export default function HospitalOverviewDashboard() {
  return (
    <div className="space-y-[18px] px-6 py-5">
      <section className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon =
            card.tone === "teal"
              ? CalendarDays
              : card.tone === "blue"
                ? Users
                : card.tone === "red"
                  ? AlertCircle
                  : card.tone === "amber"
                    ? BadgeIndianRupee
                    : Star;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[13px] border border-slate-200 bg-white p-5 transition hover:-translate-y-[2px] hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/[0.14]"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] ${toneClasses(card.tone)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    card.delta === "Urgent"
                      ? "bg-[#ef4444]/12 text-[#f87171]"
                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-[#94a3b8]"
                  }`}
                >
                  {card.delta}
                </span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">
                {card.value}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{card.title}</p>
              <p className="mt-1 text-[10.5px] text-slate-500 dark:text-[#64748b]">{card.sub}</p>
              <div className="mt-2 h-1.5 w-full rounded bg-slate-100 dark:bg-white/[0.06]">
                <div className={`h-1.5 rounded ${toneClasses(card.tone).split(" ")[1]}`} style={{ width: card.fill }} />
              </div>
            </Link>
          );
        })}
      </section>

      <section>
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Upcoming Appointments</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Next 3 hours · 26 scheduled</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[11px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#cbd5e1]">
                <option>All Departments</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </select>
              <Link href="/hospital/appointments" className="text-[11.5px] font-medium text-[#3b82f6]">
                View all →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#64748b]">
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">PT #</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Date & Time</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={`${row.patientNo}-${row.time}`}
                    className={`border-t border-slate-200 text-[12.5px] text-slate-500 dark:border-white/[0.07] dark:text-[#94a3b8] ${
                      row.emergency ? "bg-[#ef4444]/[0.03]" : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${row.avatarTone} text-[10px] font-semibold text-white`}
                        >
                          {row.initials}
                        </div>
                        <div className="font-medium text-slate-800 dark:text-[#e2e8f0]">{row.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-[11px] text-[#3b82f6]">{row.patientNo}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${deptPill(row.deptTone)}`}>
                        {row.dept}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono">{row.time}</td>
                    <td className="px-5 py-3">
                      {row.type === "EMER" ? (
                        <span className="rounded bg-[#ef4444]/15 px-2 py-0.5 text-[9.5px] font-bold text-[#f87171]">EMER</span>
                      ) : (
                        row.type
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusPill(row.statusTone)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]">
                          {row.emergency ? "Cancel" : row.status === "Waiting" ? "Confirm" : "Reschedule"}
                        </button>
                        <button className={`rounded px-2.5 py-1 text-[11px] font-medium text-white ${row.emergency ? "bg-[#ef4444]" : "bg-[#14b8a6]"}`}>
                          {row.emergency ? "Attend" : "Start"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 dark:border-white/[0.07]">
            <span className="text-[11.5px] text-slate-500 dark:text-[#94a3b8]">Showing 5 of 26</span>
            <Link
              href="/hospital/appointments"
              className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]"
            >
              View all 26 →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Recent Activity</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Today · last 2 hours</p>
            </div>
            <button className="text-[11px] text-[#3b82f6]">All logs →</button>
          </div>

          <div>
            {recentActivity.map((item) => (
              <div
                key={`${item.time}-${item.text}`}
                className="flex items-start gap-2.5 border-b border-slate-200 px-5 py-3 last:border-b-0 hover:bg-slate-50 dark:border-white/[0.07] dark:hover:bg-white/[0.02]"
              >
                <div className="w-[42px] pt-0.5 text-[10px] font-mono text-slate-500 dark:text-[#94a3b8]">{item.time}</div>
                <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-md ${toneClasses(item.tone)}`}>
                  {item.tone === "red" ? (
                    <TriangleAlert className="h-3.5 w-3.5" />
                  ) : item.tone === "green" ? (
                    <Users className="h-3.5 w-3.5" />
                  ) : item.tone === "amber" ? (
                    <BadgeIndianRupee className="h-3.5 w-3.5" />
                  ) : item.tone === "purple" ? (
                    <Star className="h-3.5 w-3.5" />
                  ) : (
                    <CalendarDays className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-[12px] leading-5 text-slate-700 dark:text-[#cbd5e1]">
                  {item.text}{" "}
                  {item.cta && item.href ? (
                    <Link href={item.href} className="font-medium text-[#3b82f6]">
                      {item.cta} →
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Pending Actions</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Requires attention</p>
            </div>
            <span className="rounded-full bg-[#ef4444]/15 px-2 py-0.5 text-[10px] font-medium text-[#f87171]">5</span>
          </div>

          <div>
            {pendingActions.map((item) => (
              <Link
                href={item.href}
                key={`${item.title}-${item.time}`}
                className="flex items-start gap-3 border-b border-slate-200 px-[18px] py-[13px] last:border-b-0 hover:bg-slate-50 dark:border-white/[0.07] dark:hover:bg-white/[0.02]"
              >
                <div className={`flex h-[30px] w-[30px] items-center justify-center rounded-lg ${toneClasses(item.tone)}`}>
                  <Clock3 className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12.5px] font-medium text-slate-800 dark:text-[#e2e8f0]">{item.title}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">{item.sub}</div>
                </div>
                <div className="flex items-center gap-1 pt-0.5 text-[10px] font-mono text-slate-500 dark:text-[#94a3b8]">
                  {item.time}
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 px-4 py-3 text-center dark:border-white/[0.07]">
            <button className="text-[11.5px] font-medium text-[#3b82f6]">View all 5 pending →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
