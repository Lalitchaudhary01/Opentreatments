import { BadgeIndianRupee, CheckCircle2, Clock3, FileText, Plus } from "lucide-react";

const stats = [
  { label: "Revenue Today", value: "₹3.2L", sub: "Target ₹4L · 80%", delta: "+18%", icon: BadgeIndianRupee, color: "text-[#22c55e]" },
  { label: "Pending Payments", value: "₹4.8L", sub: "8 invoices overdue", delta: "8 pending", icon: Clock3, color: "text-[#f59e0b]" },
  { label: "Insurance Claims", value: "₹2.1L", sub: "3 awaiting processing", delta: "3 pending", icon: FileText, color: "text-[#3b82f6]" },
  { label: "Paid Invoices", value: "24", sub: "₹2.4L collected", delta: "24 today", icon: CheckCircle2, color: "text-[#14b8a6]" },
];

const rows = [
  ["INV-8840", "Elena Vasquez", "Room + Cardiology + Lab (3 nights)", "₹1,22,400", "Star Health", "Mar 15", "Insurance Pending"],
  ["INV-8839", "Rohan Sharma", "Ortho Consultation + X-Ray", "₹3,800", "Self-pay", "Mar 12", "Pending"],
  ["INV-8838", "Priya Nair", "Neurology + MRI + Lab", "₹24,600", "HDFC Ergo", "Mar 20", "Claim Approved"],
  ["INV-8835", "Samuel Okafor", "OPD Consultation + Medicines", "₹1,400", "Self-pay", "Mar 10", "Paid"],
  ["INV-8830", "Meera Krishnan", "Cardiac Surgery + ICU (5 nights)", "₹3,84,000", "Max Bupa", "Mar 5", "Overdue"],
] as const;

function statusPill(status: string) {
  if (status === "Paid") return "bg-[rgba(34,197,94,.12)] text-[#4ade80]";
  if (status === "Insurance Pending") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (status === "Pending") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (status === "Claim Approved") return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (status === "Overdue") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  return "bg-[rgba(148,163,184,.1)] text-[#94a3b8]";
}

function insurancePill(name: string) {
  return name === "Self-pay"
    ? "bg-[rgba(148,163,184,.12)] text-[#94a3b8]"
    : "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

export default function HospitalBillingScreen() {
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
            <h2 className="text-[13px] font-semibold text-[#f1f5f9]">Invoices & Payments</h2>
            <p className="mt-0.5 text-[11px] text-[#94a3b8]">All billing · today</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Pending', 'Paid', 'Insurance', 'Overdue'].map((f, i) => (
              <button
                key={f}
                className={`rounded-full border px-3 py-1 text-[11px] transition ${
                  i === 0
                    ? 'border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]'
                    : 'border-white/[0.08] text-[#94a3b8] hover:border-white/[0.14] hover:text-[#e2e8f0]'
                }`}
              >
                {f}
              </button>
            ))}
            <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              New Invoice
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Invoice #</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Services</th>
                <th className="px-5 py-3">Total Amount</th>
                <th className="px-5 py-3">Insurance</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-white/[0.07] text-[12.5px] text-[#94a3b8] hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-[11px] text-[#60a5fa]">{row[0]}</td>
                  <td className="px-5 py-3 font-medium text-[#e2e8f0]">{row[1]}</td>
                  <td className="px-5 py-3">{row[2]}</td>
                  <td className="px-5 py-3 font-semibold text-[#f1f5f9]">{row[3]}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${insurancePill(row[4])}`}>{row[4]}</span></td>
                  <td className={`px-5 py-3 font-mono text-[11px] ${row[6] === 'Overdue' ? 'text-[#f87171]' : 'text-[#cbd5e1]'}`}>{row[5]}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(row[6])}`}>{row[6]}</span></td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">View</button>
                      <button className="rounded border border-[#14b8a6]/25 bg-[rgba(20,184,166,.12)] px-2.5 py-1 text-[11px] text-[#2dd4bf] hover:bg-[rgba(20,184,166,.2)]">Action</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
          <span className="text-[11.5px] text-[#475569]">Showing 5 of 142 invoices</span>
          <button className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#94a3b8] hover:bg-white/[0.08]">Load More</button>
        </div>
      </section>
    </div>
  );
}
