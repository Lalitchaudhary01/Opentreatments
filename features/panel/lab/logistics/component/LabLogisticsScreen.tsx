import { Clock3, MapPin, Truck } from "lucide-react";

const routes = [
  {
    tech: "Priya Nair",
    area: "Bandra–Khar–Santacruz",
    status: "On Route",
    stops: ["Sunita Kapoor · Bandra", "Rakesh Verma · Bandra E", "Anjali Shah · Khar"],
  },
  {
    tech: "Amit Kumar",
    area: "Andheri–Jogeshwari",
    status: "Starting",
    stops: ["Ramesh Shah · Andheri W", "Kavya Iyer · Andheri E", "Sanjay Bose · Jogeshwari"],
  },
  {
    tech: "Sunita Rao",
    area: "Juhu–Vile Parle",
    status: "Delayed",
    stops: ["Leela Krishnan · Juhu", "Ritu Gupta · Vile Parle E", "Arjun Pillai · Vile Parle W"],
  },
];

const completed = [
  { patient: "Sunita Kapoor", area: "Bandra", test: "CBC", technician: "Priya Nair", collectedAt: "08:35", received: "09:10" },
  { patient: "Rakesh Verma", area: "Andheri", test: "Lipid", technician: "Amit Kumar", collectedAt: "09:10", received: "09:48" },
  { patient: "Anjali Shah", area: "Juhu", test: "HbA1c", technician: "Sunita Rao", collectedAt: "09:55", received: "10:32" },
];

function routeTone(status: string) {
  if (status === "On Route") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "Starting") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

export default function LabLogisticsPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Home Collection Logistics</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">3 active technicians · 9 collections today</p>
          </div>
          <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
            <Truck className="h-3.5 w-3.5" />
            Assign Pickup
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {routes.map((route) => (
            <div key={route.tech} className="rounded-[12px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">{route.tech}</div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">
                    <MapPin className="h-3.5 w-3.5" />
                    {route.area}
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${routeTone(route.status)}`}>{route.status}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {route.stops.map((stop) => (
                  <div key={stop} className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-[11.5px] text-slate-700 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                    {stop}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="border-b border-slate-200 px-4 py-3 text-[12px] font-semibold text-slate-900 dark:border-white/[0.07] dark:text-slate-100">
            Completed Pickups (Today)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Area</th>
                  <th className="px-4 py-3 font-semibold">Test</th>
                  <th className="px-4 py-3 font-semibold">Technician</th>
                  <th className="px-4 py-3 font-semibold">Collected At</th>
                  <th className="px-4 py-3 font-semibold">Received in Lab</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((row) => (
                  <tr key={`${row.patient}-${row.collectedAt}`} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{row.patient}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.area}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.test}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.technician}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" />{row.collectedAt}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.received}</td>
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
