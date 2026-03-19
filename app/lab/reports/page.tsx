import { FileText, Filter, Search } from "lucide-react";

const reportRows = [
  {
    patient: "Sunita Kapoor",
    test: "CBC + ESR",
    doctor: "Dr. Mehra",
    sampleDate: "19 Mar 2026",
    status: "PENDING",
  },
  {
    patient: "Rakesh Verma",
    test: "Lipid Profile",
    doctor: "Dr. Iyer",
    sampleDate: "19 Mar 2026",
    status: "VERIFIED",
  },
  {
    patient: "Anjali Shah",
    test: "HbA1c",
    doctor: "Dr. Nair",
    sampleDate: "18 Mar 2026",
    status: "GENERATING",
  },
  {
    patient: "Mohit Arora",
    test: "LFT",
    doctor: "Dr. Sethi",
    sampleDate: "18 Mar 2026",
    status: "READY",
  },
];

function tone(status: string) {
  if (status === "VERIFIED" || status === "READY") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "GENERATING") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

export default function LabReportsPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Reports</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">7 pending · 48 generated today</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </button>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <FileText className="h-3.5 w-3.5" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
            <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Recent Reports Queue</div>
            <div className="relative w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search patient or test..."
                className="h-8 w-full rounded-lg border border-slate-200 bg-slate-100 pl-9 pr-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Test Name</th>
                  <th className="px-4 py-3 font-semibold">Referring Doctor</th>
                  <th className="px-4 py-3 font-semibold">Sample Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row) => (
                  <tr key={`${row.patient}-${row.test}`} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{row.patient}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.test}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.doctor}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-[#94A3B8]">{row.sampleDate}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${tone(row.status)}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                        View
                      </button>
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
