const processingKpis = [
  { label: "Samples Received", value: "28", tone: "text-[#f59e0b]", sub: "Awaiting assignment" },
  { label: "Under Testing", value: "18", tone: "text-[#a78bfa]", sub: "On machines now" },
  { label: "Quality Check", value: "5", tone: "text-[#60a5fa]", sub: "Review pending" },
  { label: "Ready for Report", value: "7", tone: "text-[#22c55e]", sub: "Results available" },
];

const samples = [
  { id: "SMP-441", patient: "Sunita Kapoor", test: "CBC", machine: "BA-200", tech: "Ramya", pct: 78, status: "Processing" },
  { id: "SMP-442", patient: "Rakesh Verma", test: "Lipid Profile", machine: "BioChem-X", tech: "Anand", pct: 34, status: "Queued" },
  { id: "SMP-443", patient: "Anjali Shah", test: "HbA1c", machine: "Hemo-Scan", tech: "Vikram", pct: 92, status: "Quality Check" },
  { id: "SMP-444", patient: "Arjun Pillai", test: "LFT", machine: "BioChem-X", tech: "Ramya", pct: 100, status: "Ready" },
];

function progressColor(pct: number) {
  if (pct >= 100) return "bg-[#22c55e]";
  if (pct >= 70) return "bg-[#3b82f6]";
  if (pct >= 40) return "bg-[#f59e0b]";
  return "bg-[#a78bfa]";
}

function statusTone(status: string) {
  if (status === "Ready") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "Quality Check") return "bg-[#60a5fa]/15 text-[#60a5fa]";
  if (status === "Processing") return "bg-[#a78bfa]/20 text-[#a78bfa]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

export default function LabProcessingPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Sample Processing</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">Internal lab workflow · 23 active samples</p>
          </div>
          <select className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100">
            <option>All Machines</option>
            <option>Blood Analyzer BA-200</option>
            <option>PCR Machine</option>
            <option>Centrifuge C-1000</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {processingKpis.map((card) => (
            <div key={card.label} className="rounded-[12px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">{card.label}</div>
              <div className={`mt-1 text-[24px] font-semibold ${card.tone}`}>{card.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
            <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Active Samples</div>
            <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">23 in progress</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Sample ID</th>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Test</th>
                  <th className="px-4 py-3 font-semibold">Machine</th>
                  <th className="px-4 py-3 font-semibold">Technician</th>
                  <th className="px-4 py-3 font-semibold">Progress</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3 font-mono text-[11px] text-[#14b8a6]">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.patient}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.test}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.machine}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.tech}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-[110px] overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.08]">
                          <div className={`h-full ${progressColor(row.pct)}`} style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="font-mono text-[10.5px] text-slate-500 dark:text-[#64748B]">{row.pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusTone(row.status)}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
