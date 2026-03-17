import { AlertTriangle, Plus, UserPlus, Users, UserRoundCheck } from "lucide-react";

const stats = [
  { label: "Currently Admitted", value: "218", sub: "14 discharged today", delta: "+3", icon: Users, color: "text-[#3b82f6]" },
  { label: "Discharged Today", value: "14", sub: "Avg stay: 4.2 days", delta: "+14", icon: UserRoundCheck, color: "text-[#22c55e]" },
  { label: "New Registrations", value: "6", sub: "Today", delta: "+6", icon: UserPlus, color: "text-[#14b8a6]" },
  { label: "ICU Patients", value: "8", sub: "2 critical, 6 stable", delta: "2 critical", icon: AlertTriangle, color: "text-[#ef4444]" },
];

const rows = [
  ["EV", "Elena Vasquez", "PT-00421", "45F", "Cardiology", "Under Observation"],
  ["RS", "Rohan Sharma", "PT-00418", "32M", "Orthopedics", "Stable"],
  ["AM", "Arjun Mehta", "PT-00430", "58M", "Emergency / Cardiology", "Critical"],
  ["PN", "Priya Nair", "PT-00415", "29F", "Neurology", "Stable"],
  ["SO", "Samuel Okafor", "PT-00428", "41M", "General Medicine", "Recovering"],
  ["MK", "Meera Krishnan", "PT-00412", "62F", "Cardiology", "Post-Op"],
] as const;

function deptPill(dept: string) {
  if (dept.includes("Emergency")) return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (dept.includes("Cardiology")) return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (dept.includes("Orthopedics")) return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (dept.includes("Neurology")) return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  if (status === "Critical") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (status === "Stable") return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
  if (status === "Recovering") return "bg-[rgba(34,197,94,.12)] text-[#4ade80]";
  if (status === "Post-Op") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  return "bg-[rgba(148,163,184,.1)] text-[#94a3b8]";
}

export default function HospitalPatientsScreen() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/[0.06] ${s.color}`}><Icon className="h-4 w-4" /></div>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#94a3b8]">{s.delta}</span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-[#f1f5f9]">{s.value}</div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{s.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Patient Registry</h2>
            <p className="mt-0.5 text-[11px] text-[#94a3b8]">218 admitted · sorted by last activity</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Admitted', 'Discharged', 'New'].map((f, i) => (
              <button key={f} className={`rounded-full border px-3 py-1 text-[11px] transition ${i === 0 ? 'border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]' : 'border-white/[0.08] text-[#94a3b8] hover:border-white/[0.14] hover:text-[#e2e8f0]'}`}>
                {f}
              </button>
            ))}
            <select className="h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 text-[11px] text-[#cbd5e1] outline-none">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>ICU</option>
              <option>Emergency</option>
            </select>
            <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              Add Patient
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">PT #</th>
                <th className="px-5 py-3">Age / Gender</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[2]} className="border-t border-white/[0.07] text-[12.5px] text-[#94a3b8] hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[10px] font-bold text-white">{r[0]}</div>
                      <span className="font-medium text-[#e2e8f0]">{r[1]}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#60a5fa]">{r[2]}</td>
                  <td className="px-5 py-3">{r[3]}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${deptPill(r[4])}`}>{r[4]}</span></td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(r[5])}`}>{r[5]}</span></td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">View Record</button>
                      <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">Discharge</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
          <span className="text-[11.5px] text-[#475569]">Showing 6 of 218 · Page 1 of 37</span>
          <div className="flex items-center gap-1.5">
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">← Prev</button>
            <button className="rounded border border-[#3b82f6]/35 bg-[rgba(59,130,246,.14)] px-2.5 py-1 text-[11px] text-[#60a5fa]">1</button>
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">2</button>
            <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8]">Next →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
