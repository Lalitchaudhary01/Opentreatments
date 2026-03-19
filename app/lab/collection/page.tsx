import { Plus } from "lucide-react";

const homeCollections = [
  { name: "Anjali Shah", addr: "Khar Road, Khar West", test: "HbA1c + Blood Sugar", time: "09:30", tech: "Priya Nair", status: "In Progress" },
  { name: "Mohammed Rashid", addr: "Khar West, Mumbai", test: "Urine Routine", time: "10:15", tech: "Priya Nair", status: "Upcoming" },
  { name: "Priya Menon", addr: "Santacruz East, Mumbai", test: "CBC + Blood Sugar", time: "11:00", tech: "Priya Nair", status: "Upcoming" },
  { name: "Ramesh Shah", addr: "Andheri West, Mumbai", test: "Thyroid Panel", time: "09:00", tech: "Amit Kumar", status: "Collected" },
];

function tone(status: string) {
  if (status === "Collected") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "In Progress") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  return "bg-slate-200/70 text-slate-600 dark:bg-white/[0.08] dark:text-[#94A3B8]";
}

export default function LabCollectionPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Sample Collection</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">9 home collections · 6 walk-ins today</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-[34px] rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">Assign Routes</button>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              Add Walk-in
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">Scheduled Home Collections</div>
            <div className="space-y-2.5">
              {homeCollections.map((h) => (
                <div key={`${h.name}-${h.time}`} className="rounded-[12px] border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-[#161f30]">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">{h.name}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">{h.addr}</div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${tone(h.status)}`}>{h.status}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 text-[11.5px] text-slate-600 dark:border-white/[0.07] dark:text-[#94A3B8]">
                    <span className="mr-3">{h.test}</span>
                    <span className="mr-3">{h.time}</span>
                    <span>{h.tech}</span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    <button className="rounded-md bg-[#14b8a6]/15 px-2.5 py-1 text-[11px] text-[#14b8a6]">Mark Collected</button>
                    <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">Reassign</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">Collection Route Map — Priya Nair</div>
            <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
                <div>
                  <div className="text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">Bandra → Khar → Santacruz</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">6 stops · ~14 km · Est. 3h 15m</div>
                </div>
                <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">On Track</span>
              </div>

              <div className="relative h-[360px] bg-gradient-to-br from-[#111827] via-[#0b1120] to-[#1e293b]">
                <div className="absolute right-3 top-3 w-[170px] rounded-[10px] border border-white/[0.1] bg-black/35 p-2.5 text-[11px] text-[#cbd5e1] backdrop-blur">
                  <div className="font-medium text-slate-100">Stops</div>
                  <div className="mt-1.5 space-y-1">
                    <div>08:30 Sunita Kapoor</div>
                    <div>09:00 Rakesh Verma</div>
                    <div className="text-[#60a5fa]">09:30 Anjali Shah</div>
                    <div>10:15 Mohammed Rashid</div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 rounded-[8px] border border-[#3b82f6]/35 bg-[#3b82f6]/14 px-3 py-1.5 text-[11px] font-medium text-[#60a5fa]">
                  Priya Nair · Khar Road
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
