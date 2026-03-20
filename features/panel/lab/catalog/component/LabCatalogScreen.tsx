import { FlaskConical, Plus, Search } from "lucide-react";

const tests = [
  { name: "Complete Blood Count", category: "Hematology", price: 450, tat: "6 hrs", sample: "Blood", fasting: "No", active: true },
  { name: "Lipid Profile", category: "Biochemistry", price: 900, tat: "8 hrs", sample: "Blood", fasting: "Yes", active: true },
  { name: "HbA1c", category: "Diabetes", price: 700, tat: "12 hrs", sample: "Blood", fasting: "No", active: true },
  { name: "Thyroid Panel", category: "Hormone", price: 1100, tat: "24 hrs", sample: "Blood", fasting: "No", active: false },
];

export default function LabCatalogPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Test Catalog</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">148 active tests · 12 packages</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[230px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search tests..."
                className="h-[34px] w-full rounded-[8px] border border-slate-200 bg-slate-100 pl-9 pr-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100"
              />
            </div>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              Add Test
            </button>
          </div>
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Test Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">TAT</th>
                  <th className="px-4 py-3 font-semibold">Sample</th>
                  <th className="px-4 py-3 font-semibold">Fasting</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.name} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-[#3b82f6]/15 p-1.5 text-[#60a5fa]">
                          <FlaskConical className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{test.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{test.category}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">₹{test.price}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{test.tat}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{test.sample}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{test.fasting}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          test.active ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]"
                        }`}
                      >
                        {test.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                        Edit
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
