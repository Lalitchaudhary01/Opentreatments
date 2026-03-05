import Link from "next/link";
import { ChipFilter } from "../../types";
import { AddOfflinePatientModal } from "@/features/panel/doctor/patient/components/AddOfflinePatientModal";

export default function AppointmentsFilterBar({
  chips,
  activeFilter,
  doctorId,
  openNew,
}: {
  chips: { name: string; value: ChipFilter; count: number }[];
  activeFilter: ChipFilter;
  doctorId: string;
  openNew: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[10px]">
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => {
          const isActive = chip.value === activeFilter;
          return (
            <Link
              key={chip.value}
              href={`/doctor/appointments?filter=${chip.value}`}
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

      <AddOfflinePatientModal doctorId={doctorId} triggerLabel="New" defaultOpen={openNew} />
    </div>
  );
}
