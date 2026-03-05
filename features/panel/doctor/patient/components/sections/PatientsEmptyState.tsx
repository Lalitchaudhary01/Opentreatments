import Link from "next/link";
import { AddOfflinePatientModal } from "../AddOfflinePatientModal";

export default function PatientsEmptyState({ doctorId }: { doctorId: string }) {
  return (
    <div className="min-h-screen bg-slate-50 px-7 py-[22px] dark:bg-[#111827]">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[14px] border border-slate-200 bg-white p-0 dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
          <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Patient Directory</div>
          <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">0 registered</div>
        </div>
        <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
          <div className="mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-teal-500/10 text-teal-500">
            <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div className="mb-2 text-[15px] font-semibold text-slate-900 dark:text-slate-100">No patients registered</div>
          <p className="mb-5 max-w-[320px] text-[12.5px] leading-[1.7] text-slate-500 dark:text-[#94A3B8]">
            Register your first patient manually, or patients who book online will be automatically added to your directory.
          </p>
          <div className="flex flex-wrap gap-3">
            <AddOfflinePatientModal
              doctorId={doctorId}
              triggerLabel="+ Register Patient"
              triggerClassName="inline-flex h-9 items-center rounded-lg bg-[#3b82f6] px-4 text-[12px] font-medium text-white hover:bg-[#2563eb]"
            />
            <Link href="/doctor/appointments?new=1" className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-4 text-[12px] font-medium text-slate-700 hover:bg-slate-100 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5">
              Create First Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
