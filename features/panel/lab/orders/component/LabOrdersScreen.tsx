import { Plus } from "lucide-react";

const orders = [
  { id: "ORD-1201", patient: "Sunita Kapoor", test: "CBC", time: "08:40", type: "Home Collection", tech: "Priya Nair", status: "Pending" },
  { id: "ORD-1202", patient: "Rakesh Verma", test: "Lipid Profile", time: "09:05", type: "Walk-in", tech: "Counter", status: "Sample Collected" },
  { id: "ORD-1203", patient: "Anjali Shah", test: "HbA1c", time: "09:30", type: "Home Collection", tech: "Priya Nair", status: "Processing" },
  { id: "ORD-1204", patient: "Mohit Arora", test: "LFT", time: "10:12", type: "Walk-in", tech: "Counter", status: "Report Ready" },
  { id: "ORD-1205", patient: "Leela Krishnan", test: "Thyroid Panel", time: "10:42", type: "Home Collection", tech: "Amit Kumar", status: "Completed" },
  { id: "ORD-1206", patient: "Arjun Pillai", test: "Blood Sugar", time: "11:20", type: "Home Collection", tech: "Sunita Rao", status: "Cancelled" },
];

function pill(status: string) {
  if (status === "Completed" || status === "Sample Collected") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "Pending") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  if (status === "Processing") return "bg-[#a78bfa]/20 text-[#a78bfa]";
  if (status === "Report Ready") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  return "bg-[#ef4444]/15 text-[#ef4444]";
}

export default function LabOrdersPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Test Orders</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">All orders · 124 total today</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100">
              <option>All Collection Types</option>
              <option>Home Collection</option>
              <option>Walk-in</option>
            </select>
            <select className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Collected</option>
              <option>Processing</option>
              <option>Completed</option>
            </select>
            <input type="date" defaultValue="2026-03-19" className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100" />
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              New Order
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All (124)", "Pending Collection (12)", "Sample Collected (22)", "Processing (18)", "Report Ready (7)", "Completed (58)", "Cancelled (7)"].map((chip, i) => (
            <button
              key={chip}
              className={`rounded-full border px-3 py-1 text-[11px] ${
                i === 0
                  ? "border-[#3b82f6]/35 bg-[#3b82f6]/12 text-[#60a5fa]"
                  : "border-slate-200 bg-slate-100 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94A3B8]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Test</th>
                  <th className="px-4 py-3 font-semibold">Booking Time</th>
                  <th className="px-4 py-3 font-semibold">Collection</th>
                  <th className="px-4 py-3 font-semibold">Technician</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{o.patient}</div>
                      <div className="text-[10.5px] text-slate-500 dark:text-[#64748B]">{o.id}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{o.test}</td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-slate-700 dark:text-[#CBD5E1]">{o.time}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{o.type}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{o.tech}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${pill(o.status)}`}>{o.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">Assign</button>
                        <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">Update</button>
                      </div>
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
