import Link from "next/link";
import { Search } from "lucide-react";
import { AddOfflinePatientModal } from "../AddOfflinePatientModal";

type UiFilter = "all" | "recent" | "active" | "new";

export default function PatientsToolbar({
  chips,
  filter,
  query,
  doctorId,
  openNew,
}: {
  chips: { name: string; value: UiFilter; count: number }[];
  filter: UiFilter;
  query: string;
  doctorId: string;
  openNew: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[10px]">
      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip) => {
          const isActive = filter === chip.value;
          return (
            <Link
              key={chip.value}
              href={`/doctor/patients?filter=${chip.value}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className={`rounded-[20px] border px-3 py-[5px] text-[11.5px] font-medium transition-colors ${
                isActive
                  ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                  : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/[0.07] text-slate-500 dark:text-[#94A3B8] hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {chip.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <form method="GET" action="/doctor/patients" className="relative">
          <input type="hidden" name="filter" value={filter} />
          <Search className="absolute left-[11px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-slate-400 dark:text-[#475569]" />
          <input
            name="q"
            defaultValue={query}
            placeholder="Search patients..."
            className="h-[33px] w-[180px] rounded-lg border border-slate-200 bg-white pl-[34px] pr-3 text-[12px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-[#475569] dark:focus:border-white/20"
          />
        </form>
        <AddOfflinePatientModal
          doctorId={doctorId}
          triggerLabel="Add Patient"
          defaultOpen={openNew}
          triggerClassName="inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
        />
      </div>
    </div>
  );
}
