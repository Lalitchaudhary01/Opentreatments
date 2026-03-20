import { Search, UserPlus } from "lucide-react";

const patients = [
  { name: "Sunita Kapoor", id: "PT-1021", ageSex: "43 / F", lastTest: "CBC", doctor: "Dr. Mehra", total: 12 },
  { name: "Rakesh Verma", id: "PT-2048", ageSex: "52 / M", lastTest: "Lipid Profile", doctor: "Dr. Iyer", total: 8 },
  { name: "Anjali Shah", id: "PT-1186", ageSex: "31 / F", lastTest: "HbA1c", doctor: "Dr. Nair", total: 5 },
  { name: "Arjun Pillai", id: "PT-2251", ageSex: "39 / M", lastTest: "LFT", doctor: "Dr. Sethi", total: 9 },
];

const avColors = ["#3b82f6", "#14b8a6", "#a78bfa", "#f59e0b", "#22c55e", "#f97316"];

export default function LabPatientsPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Patients</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">3,284 registered patients</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[230px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search patients..."
                className="h-[34px] w-full rounded-[8px] border border-slate-200 bg-slate-100 pl-9 pr-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100"
              />
            </div>
            <select className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100">
              <option>All Patients</option>
              <option>Frequent</option>
              <option>New This Month</option>
            </select>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <UserPlus className="h-3.5 w-3.5" />
              Add Patient
            </button>
          </div>
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Age / Sex</th>
                  <th className="px-4 py-3 font-semibold">Last Test</th>
                  <th className="px-4 py-3 font-semibold">Doctor</th>
                  <th className="px-4 py-3 font-semibold">Total Tests</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => {
                  const initials = p.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={p.id} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: avColors[idx % avColors.length] }}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">{p.name}</div>
                            <div className="text-[10.5px] text-slate-500 dark:text-[#64748B]">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{p.ageSex}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{p.lastTest}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{p.doctor}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{p.total}</td>
                      <td className="px-4 py-3">
                        <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
