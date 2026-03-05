import { CheckCheck, Plus } from "lucide-react";
import { STARTER_SERVICE_SUGGESTIONS } from "../../constants/serviceConfig";

export default function FirstTimeServicesState({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-[12px] border border-amber-400/25 bg-amber-500/10 px-[18px] py-[14px] text-[12.5px] text-slate-600 dark:text-[#94A3B8]">
        We&apos;ve pre-suggested 3 starter services based on your specialty. <strong className="text-amber-500">Add them with one click</strong> or create your own.
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STARTER_SERVICE_SUGGESTIONS.map((s) => (
          <div key={s.name} className="rounded-[13px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">{s.name}</div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">{s.cat}</div>
            <div className="mt-3 text-[12px] font-semibold text-blue-500">{s.price}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
          <div>
            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Your Services</div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">0 added</div>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
          >
            <Plus className="h-[13px] w-[13px]" />
            Add Service
          </button>
        </div>

        <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
          <div className="mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-blue-500/10 text-blue-500">
            <CheckCheck className="h-8 w-8" />
          </div>
          <div className="mb-2 text-[15px] font-semibold text-slate-900 dark:text-slate-100">No services added yet</div>
          <p className="mb-5 max-w-[320px] text-[12.5px] leading-[1.7] text-slate-500 dark:text-[#94A3B8]">
            Services you add appear here and on your public booking page for patients to choose from.
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-9 items-center rounded-lg bg-[#3b82f6] px-4 text-[12px] font-medium text-white hover:bg-[#2563eb]"
          >
            + Add Your First Service
          </button>
        </div>
      </div>
    </div>
  );
}
