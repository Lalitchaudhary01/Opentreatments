import { DoctorService } from "../../types";
import { SERVICE_CATEGORY_META, SERVICE_TIPS } from "../../constants/serviceConfig";
import Tip from "../ui/Tip";

export default function ServicesInsights({
  topByRevenue,
}: {
  topByRevenue: DoctorService[];
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
          <div>
            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Quick Tips</div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">Listing best practices</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-[18px] py-[14px]">
          {SERVICE_TIPS.map((tip) => (
            <Tip key={tip.text} icon={tip.icon} tone={tip.tone} text={tip.text} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
          <div>
            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Top by Revenue</div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">February 2026</div>
          </div>
        </div>

        <div className="py-[6px]" id="svc-top-rev">
          {topByRevenue.map((service, idx) => {
            const revenue = service.price * service.sessions;
            const maxRevenue = topByRevenue[0]
              ? topByRevenue[0].price * topByRevenue[0].sessions
              : 1;
            const widthPct = Math.round((revenue / Math.max(maxRevenue, 1)) * 100);
            const meta = SERVICE_CATEGORY_META[service.category];

            return (
              <div
                key={service.id}
                className={`border-b border-slate-200 px-[18px] py-[10px] dark:border-white/[0.07] ${idx === topByRevenue.length - 1 ? "border-b-0" : ""}`}
              >
                <div className="mb-[6px] flex items-center justify-between">
                  <div className="flex items-center gap-[7px]">
                    <span className="text-[13px]">{meta.emoji}</span>
                    <span className="text-[12px] font-medium text-slate-700 dark:text-slate-200">{service.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">₹{(revenue / 1000).toFixed(1)}k</span>
                </div>
                <div className="h-1 overflow-hidden rounded bg-slate-200 dark:bg-white/10">
                  <div className={`h-full rounded ${meta.color.replace("text", "bg")}`} style={{ width: `${widthPct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
