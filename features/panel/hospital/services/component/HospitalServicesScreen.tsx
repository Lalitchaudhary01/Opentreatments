import { Activity, BadgeIndianRupee, HeartPulse, Plus, Shapes } from "lucide-react";

const stats = [
  { label: "Total Services", value: "186", sub: "Across 8 categories", delta: "+12", icon: BadgeIndianRupee, color: "text-[#3b82f6]" },
  { label: "Active Packages", value: "8", sub: "Health checkup bundles", delta: "8 active", icon: Shapes, color: "text-[#14b8a6]" },
  { label: "Avg Service Price", value: "₹840", sub: "Across all categories", delta: "+3", icon: HeartPulse, color: "text-[#f59e0b]" },
  { label: "Monthly Revenue", value: "₹8.4L", sub: "From services & tests", delta: "+22%", icon: Activity, color: "text-[#22c55e]" },
];

const rows = [
  ["Cardiology Consultation", "Consultation", "Cardiology", "30 min", "₹1,500", "Active"],
  ["General OPD Consultation", "Consultation", "General", "20 min", "₹800", "Active"],
  ["Knee Arthroscopy", "Procedure", "Orthopedics", "2-3 hrs", "₹65,000", "Active"],
  ["Full Body Health Checkup", "Package", "Multiple", "3-4 hrs", "₹4,999", "Active"],
  ["CBC + ESR + CRP", "Lab Test", "Pathology", "30 min", "₹650", "Active"],
  ["COVID RT-PCR", "Lab Test", "Pathology", "6 hrs", "₹500", "Archived"],
] as const;

function categoryPill(category: string) {
  if (category === "Consultation") return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (category === "Procedure") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (category === "Package") return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  if (category === "Lab Test") return "bg-[rgba(148,163,184,.12)] text-slate-500 dark:text-[#94a3b8]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  return status === "Active"
    ? "bg-[rgba(34,197,94,.12)] text-[#4ade80]"
    : "bg-[rgba(148,163,184,.12)] text-slate-500 dark:text-[#94a3b8]";
}

export default function HospitalServicesScreen() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-slate-100 dark:bg-white/[0.06] ${s.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-[#94a3b8]">{s.delta}</span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">{s.value}</div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{s.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Service Catalog</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Manage consultations, procedures and packages</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Consultations', 'Procedures', 'Lab Tests', 'Packages'].map((f, i) => (
              <button
                key={f}
                className={`rounded-full border px-3 py-1 text-[11px] transition ${
                  i === 0
                    ? 'border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]'
                    : 'border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#94a3b8] hover:border-white/[0.14] hover:text-slate-900 dark:hover:text-[#e2e8f0]'
                }`}
              >
                {f}
              </button>
            ))}
            <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              Add Service
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Service Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className={`border-t border-slate-200 dark:border-white/[0.07] text-[12.5px] ${row[5] === 'Archived' ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-[#e2e8f0]">{row[0]}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${categoryPill(row[1])}`}>{row[1]}</span></td>
                  <td className="px-5 py-3 text-slate-500 dark:text-[#94a3b8]">{row[2]}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-[#94a3b8]">{row[3]}</td>
                  <td className="px-5 py-3 font-semibold text-slate-900 dark:text-[#f1f5f9]">{row[4]}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(row[5])}`}>{row[5]}</span></td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">Edit</button>
                      <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">{row[5] === 'Archived' ? 'Restore' : 'Archive'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
