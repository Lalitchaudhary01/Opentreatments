import { Clock3, Pencil, Trash2 } from "lucide-react";
import { DoctorService, ServiceCategory } from "../../types";
import { SERVICE_CATEGORY_META } from "../../constants/serviceConfig";
import MiniStat from "../ui/MiniStat";

export default function ServicesGrid({
  services,
  isSaving,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  services: DoctorService[];
  isSaving: boolean;
  onEdit: (service: DoctorService) => void;
  onToggleStatus: (service: DoctorService) => void;
  onDelete: (serviceId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2" id="svc-grid">
      {services.length === 0 ? (
        <div className="col-span-full rounded-[14px] border border-slate-200 bg-white px-6 py-14 text-center dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="mb-3 text-3xl">🩺</div>
          <div className="mb-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">No services in this category</div>
          <div className="text-[11.5px] text-slate-500 dark:text-[#94A3B8]">
            Click <strong className="text-blue-400">Add Service</strong> to list your first one.
          </div>
        </div>
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSaving={isSaving}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

function ServiceCard({
  service,
  isSaving,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  service: DoctorService;
  isSaving: boolean;
  onEdit: (service: DoctorService) => void;
  onToggleStatus: (service: DoctorService) => void;
  onDelete: (serviceId: string) => void;
}) {
  const meta = SERVICE_CATEGORY_META[service.category as ServiceCategory];
  const isActive = service.status === "Active";
  const revenueK = ((service.price * service.sessions) / 1000).toFixed(1);

  return (
    <div
      className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]"
      style={{ opacity: isActive ? 1 : 0.6 }}
    >
      <div className="border-b border-slate-200 px-[18px] pb-[14px] pt-[18px] dark:border-white/[0.07]">
        <div className="mb-[10px] flex items-start justify-between gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <div className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[18px] ${meta.bg}`}>
              {meta.emoji}
            </div>
            <div>
              <div className="text-[13px] font-semibold leading-[1.2] text-slate-900 dark:text-slate-100">{service.name}</div>
              <div className={`mt-[2px] text-[10.5px] font-medium ${meta.color}`}>{service.category}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleStatus(service)}
            disabled={isSaving}
            className="relative h-5 w-9 rounded-[10px] transition-colors"
            style={{ background: isActive ? "#22c55e" : "rgba(255,255,255,0.1)" }}
          >
            <span
              className="absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-all"
              style={{ left: isActive ? "19px" : "3px" }}
            />
          </button>
        </div>

        <div className="text-[11.5px] leading-[1.55] text-slate-500 dark:text-[#94A3B8]">{service.desc}</div>
      </div>

      <div className="grid grid-cols-3 border-b border-slate-200 dark:border-white/[0.07]">
        <MiniStat value={`₹${service.price.toLocaleString("en-IN")}`} label="Per Session" bordered />
        <MiniStat value={`${service.duration} min`} label="Duration" bordered />
        <MiniStat value={`${service.sessions}`} label="Sessions" />
      </div>

      <div className="flex items-center justify-between px-[14px] py-[11px]">
        <div className="flex items-center gap-[5px]">
          <Clock3 className="h-[11px] w-[11px] text-slate-400 dark:text-[#64748b]" />
          <span className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{service.avail}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Rev:</span>
          <span className="text-[11.5px] font-semibold text-green-400">₹{revenueK}k</span>
          <div className="ml-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(service)}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-blue-500/10 text-blue-400"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(service.id)}
              disabled={isSaving}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-red-500/10 text-red-400"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
