import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Plus,
  UserRound,
} from "lucide-react";

const statCards = [
  {
    title: "Today's Total",
    value: "84",
    sub: "18 in progress",
    delta: "+12%",
    color: "text-[#14b8a6]",
    icon: CalendarDays,
  },
  {
    title: "Completed",
    value: "32",
    sub: "Avg consult: 21 min",
    delta: "+8%",
    color: "text-[#22c55e]",
    icon: CheckCircle2,
  },
  {
    title: "Waiting",
    value: "24",
    sub: "Longest wait: 26 min",
    delta: "Live",
    color: "text-[#f59e0b]",
    icon: Clock3,
  },
  {
    title: "Pending Confirmations",
    value: "8",
    sub: "2 emergency marked",
    delta: "Urgent",
    color: "text-[#ef4444]",
    icon: CircleAlert,
  },
];

const rows = [
  {
    initials: "AM",
    patient: "Arjun Mehta",
    patientId: "PT-00430",
    dept: "Emergency",
    time: "10:00 AM",
    type: "EMERGENCY",
    status: "Urgent",
    rowTone: "bg-[rgba(239,68,68,.03)]",
  },
  {
    initials: "EV",
    patient: "Elena Vasquez",
    patientId: "PT-00421",
    dept: "Cardiology",
    time: "09:30 AM",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    initials: "RS",
    patient: "Rohan Sharma",
    patientId: "PT-00418",
    dept: "Orthopedics",
    time: "09:45 AM",
    type: "New Visit",
    status: "Waiting",
  },
  {
    initials: "PN",
    patient: "Priya Nair",
    patientId: "PT-00415",
    dept: "Neurology",
    time: "10:15 AM",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    initials: "SO",
    patient: "Samuel Okafor",
    patientId: "PT-00428",
    dept: "General",
    time: "10:30 AM",
    type: "New Visit",
    status: "Scheduled",
  },
  {
    initials: "MK",
    patient: "Meera Krishnan",
    patientId: "PT-00412",
    dept: "Cardiology",
    time: "11:00 AM",
    type: "Post-Op",
    status: "Scheduled",
  },
  {
    initials: "DK",
    patient: "Deepa Kulkarni",
    patientId: "PT-00409",
    dept: "OB-GYN",
    time: "08:00 AM",
    type: "Routine Check",
    status: "Completed",
    rowTone: "opacity-60",
  },
];

function deptPill(dept: string) {
  if (dept === "Emergency") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (dept === "Cardiology") return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (dept === "Orthopedics") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (dept === "Neurology") return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  if (status === "Urgent") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (status === "In Progress") return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
  if (status === "Waiting") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (status === "Completed") return "bg-[rgba(34,197,94,.12)] text-[#4ade80]";
  return "bg-[rgba(148,163,184,.1)] text-[#94a3b8]";
}

export default function HospitalAppointmentsScreen() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/[0.06] ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#94a3b8]">
                  {card.delta}
                </span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-[#f1f5f9]">{card.value}</div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">{card.title}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{card.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold text-[#f1f5f9]">All Appointments</h2>
            <p className="mt-0.5 text-[11px] text-[#94a3b8]">10 March 2026</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Today', 'In Progress', 'Waiting', 'Completed', 'Emergency'].map((filter, idx) => (
              <button
                key={filter}
                className={`rounded-full border px-3 py-1 text-[11px] transition ${
                  idx === 0
                    ? 'border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]'
                    : 'border-white/[0.08] text-[#94a3b8] hover:border-white/[0.14] hover:text-[#e2e8f0]'
                }`}
              >
                {filter}
              </button>
            ))}

            <select className="h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 text-[11px] text-[#cbd5e1] outline-none">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Neurology</option>
              <option>General</option>
            </select>

            <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              Book Appointment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">PT #</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Slot</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.patient}-${row.time}`} className={`border-t border-white/[0.07] text-[12.5px] text-[#94a3b8] ${row.rowTone ?? 'hover:bg-white/[0.02]'}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[10px] font-bold text-white">
                        {row.initials}
                      </div>
                      <span className="font-medium text-[#e2e8f0]">{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#60a5fa]">{row.patientId}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${deptPill(row.dept)}`}>
                      {row.dept}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#cbd5e1]">{row.time}</td>
                  <td className="px-5 py-3">
                    {row.type === "EMERGENCY" ? (
                      <span className="rounded px-2 py-1 text-[9.5px] font-bold text-[#f87171] bg-[rgba(239,68,68,.15)]">EMERGENCY</span>
                    ) : (
                      row.type
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">
                        View
                      </button>
                      <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">
                        Reschedule
                      </button>
                      <button className="rounded border border-[#14b8a6]/25 bg-[rgba(20,184,166,.12)] px-2.5 py-1 text-[11px] text-[#2dd4bf] hover:bg-[rgba(20,184,166,.2)]">
                        {row.status === "Urgent" ? "Attend" : "Start"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[11.5px] text-[#475569]">Showing 7 of 84 · Page 1 of 12</span>
          <div className="flex items-center gap-1.5">
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">← Prev</button>
            <button className="rounded border border-[#3b82f6]/35 bg-[rgba(59,130,246,.14)] px-2.5 py-1 text-[11px] text-[#60a5fa]">1</button>
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">2</button>
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">3</button>
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">Next →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
