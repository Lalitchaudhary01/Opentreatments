"use client";

import { type ReactNode, useMemo, useState } from "react";
import {
  Activity,
  BadgeIndianRupee,
  CheckCheck,
  Clock3,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import ServiceFormModal from "./ServiceFormModal";
import { DoctorService, ServiceCategory } from "../types";

const seedServices: DoctorService[] = [
  {
    id: "S1",
    name: "General Consultation",
    category: "Consultation",
    price: 500,
    duration: 20,
    sessions: 62,
    status: "Active",
    desc: "Initial or follow-up discussion about symptoms, medical history, and treatment plan.",
    avail: "All Days",
  },
  {
    id: "S2",
    name: "Minor Procedure",
    category: "Procedure",
    price: 1200,
    duration: 45,
    sessions: 18,
    status: "Active",
    desc: "Minor in-clinic procedures including wound care, suturing, and minor excisions.",
    avail: "Weekdays Only",
  },
  {
    id: "S3",
    name: "Follow-up Visit",
    category: "Consultation",
    price: 300,
    duration: 10,
    sessions: 41,
    status: "Active",
    desc: "Short revisit to assess recovery and adjust ongoing treatment.",
    avail: "All Days",
  },
  {
    id: "S4",
    name: "Blood Test Panel",
    category: "Diagnostic",
    price: 800,
    duration: 15,
    sessions: 14,
    status: "Active",
    desc: "Complete blood count, lipid profile, blood glucose and other basic diagnostics.",
    avail: "Weekdays Only",
  },
  {
    id: "S5",
    name: "ECG Recording",
    category: "Diagnostic",
    price: 600,
    duration: 20,
    sessions: 6,
    status: "Active",
    desc: "12-lead electrocardiogram with printed report and doctor interpretation.",
    avail: "All Days",
  },
  {
    id: "S6",
    name: "X-Ray",
    category: "Diagnostic",
    price: 600,
    duration: 25,
    sessions: 9,
    status: "Active",
    desc: "Digital X-ray of chest, limbs, or spine with radiologist report.",
    avail: "Mon/Wed/Fri",
  },
  {
    id: "S7",
    name: "Physiotherapy",
    category: "Therapy",
    price: 900,
    duration: 60,
    sessions: 11,
    status: "Active",
    desc: "Guided physical therapy session for musculoskeletal and post-surgical recovery.",
    avail: "Tue/Thu/Sat",
  },
  {
    id: "S8",
    name: "Vaccination",
    category: "Preventive",
    price: 400,
    duration: 10,
    sessions: 7,
    status: "Inactive",
    desc: "Routine vaccinations for adults and children as per immunisation schedule.",
    avail: "Weekdays Only",
  },
];

const categoryMeta: Record<
  ServiceCategory,
  { emoji: string; color: string; bg: string }
> = {
  Consultation: { emoji: "🩺", color: "text-blue-400", bg: "bg-blue-500/15" },
  Procedure: { emoji: "🛠️", color: "text-teal-400", bg: "bg-teal-500/15" },
  Diagnostic: { emoji: "🧪", color: "text-violet-400", bg: "bg-violet-500/15" },
  Therapy: { emoji: "💆", color: "text-amber-400", bg: "bg-amber-500/15" },
  Preventive: { emoji: "🛡️", color: "text-green-400", bg: "bg-green-500/15" },
};

const filters: ("all" | ServiceCategory)[] = [
  "all",
  "Consultation",
  "Procedure",
  "Diagnostic",
  "Therapy",
];

export default function DoctorServicesScreen() {
  const [services, setServices] = useState<DoctorService[]>(seedServices);
  const [activeFilter, setActiveFilter] = useState<"all" | ServiceCategory>("all");
  const [editing, setEditing] = useState<DoctorService | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return services;
    return services.filter((s) => s.category === activeFilter);
  }, [activeFilter, services]);

  const stats = useMemo(() => {
    const activeCount = services.filter((s) => s.status === "Active").length;
    const avgValue = Math.round(
      services.reduce((sum, s) => sum + s.price, 0) / Math.max(services.length, 1)
    );
    const sessions = services.reduce((sum, s) => sum + s.sessions, 0);
    const revenue = services.reduce((sum, s) => sum + s.sessions * s.price, 0);
    return { activeCount, avgValue, sessions, revenue };
  }, [services]);

  const topByRevenue = useMemo(() => {
    return [...services]
      .sort((a, b) => b.price * b.sessions - a.price * a.sessions)
      .slice(0, 5);
  }, [services]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-[18px]">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<CheckCheck className="h-[17px] w-[17px]" />}
            iconTone="blue"
            delta="Active"
            label="Active Services"
            value={`${stats.activeCount}`}
          />
          <StatCard
            icon={<BadgeIndianRupee className="h-[17px] w-[17px]" />}
            iconTone="teal"
            delta="+12%"
            label="Avg Service Value"
            value={`₹${stats.avgValue.toLocaleString("en-IN")}`}
          />
          <StatCard
            icon={<Clock3 className="h-[17px] w-[17px]" />}
            iconTone="amber"
            delta="+8"
            label="Sessions This Month"
            value={`${stats.sessions}`}
          />
          <StatCard
            icon={<Activity className="h-[17px] w-[17px]" />}
            iconTone="green"
            delta="+18%"
            label="Revenue from Services"
            value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[10px]">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={
                    isActive
                      ? "rounded-[20px] border border-blue-500/40 bg-blue-500/15 px-3 py-[5px] text-[11.5px] font-medium text-blue-400"
                      : "rounded-[20px] border border-slate-200 bg-white px-3 py-[5px] text-[11.5px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-white/[0.07] dark:bg-[#161f30] dark:text-[#94A3B8] dark:hover:border-white/20 dark:hover:text-slate-200"
                  }
                >
                  {filter === "all" ? "All" : filter}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className="inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
          >
            <Plus className="h-[13px] w-[13px]" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[1fr_300px]">
          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2" id="svc-grid">
            {filteredServices.length === 0 ? (
              <div className="col-span-full rounded-[14px] border border-slate-200 bg-white px-6 py-14 text-center dark:border-white/[0.07] dark:bg-[#161f30]">
                <div className="mb-3 text-3xl">🩺</div>
                <div className="mb-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">No services in this category</div>
                <div className="text-[11.5px] text-slate-500 dark:text-[#94A3B8]">
                  Click <strong className="text-blue-400">Add Service</strong> to list your first one.
                </div>
              </div>
            ) : (
              filteredServices.map((s) => {
                const meta = categoryMeta[s.category];
                const isActive = s.status === "Active";
                const revenueK = (s.price * s.sessions / 1000).toFixed(1);

                return (
                  <div
                    key={s.id}
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
                            <div className="text-[13px] font-semibold leading-[1.2] text-slate-900 dark:text-slate-100">{s.name}</div>
                            <div className={`mt-[2px] text-[10.5px] font-medium ${meta.color}`}>{s.category}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setServices((prev) =>
                              prev.map((item) =>
                                item.id === s.id
                                  ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
                                  : item
                              )
                            )
                          }
                          className="relative h-5 w-9 rounded-[10px] transition-colors"
                          style={{ background: isActive ? "#22c55e" : "rgba(255,255,255,0.1)" }}
                        >
                          <span
                            className="absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-all"
                            style={{ left: isActive ? "19px" : "3px" }}
                          />
                        </button>
                      </div>

                      <div className="text-[11.5px] leading-[1.55] text-slate-500 dark:text-[#94A3B8]">{s.desc}</div>
                    </div>

                    <div className="grid grid-cols-3 border-b border-slate-200 dark:border-white/[0.07]">
                      <MiniStat value={`₹${s.price.toLocaleString("en-IN")}`} label="Per Session" bordered />
                      <MiniStat value={`${s.duration} min`} label="Duration" bordered />
                      <MiniStat value={`${s.sessions}`} label="Sessions" />
                    </div>

                    <div className="flex items-center justify-between px-[14px] py-[11px]">
                      <div className="flex items-center gap-[5px]">
                        <Clock3 className="h-[11px] w-[11px] text-slate-400 dark:text-[#64748b]" />
                        <span className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{s.avail}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Rev:</span>
                        <span className="text-[11.5px] font-semibold text-green-400">₹{revenueK}k</span>
                        <div className="ml-2 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditing(s);
                              setOpenModal(true);
                            }}
                            className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-blue-500/10 text-blue-400"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setServices((prev) => prev.filter((item) => item.id !== s.id))}
                            className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-red-500/10 text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex flex-col gap-[14px]">
            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
                <div>
                  <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Quick Tips</div>
                  <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">Listing best practices</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-[18px] py-[14px]">
                <Tip icon="💡" tone="bg-blue-500/15" text="Set a clear duration so patients know what to expect during booking." />
                <Tip icon="📋" tone="bg-teal-500/15" text="Add a short description — it builds patient confidence and reduces pre-visit questions." />
                <Tip icon="💰" tone="bg-amber-500/15" text="Keep pricing transparent. Services with listed prices get 2x more bookings." />
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
                {topByRevenue.map((s, idx) => {
                  const rev = s.price * s.sessions;
                  const maxRev = topByRevenue[0] ? topByRevenue[0].price * topByRevenue[0].sessions : 1;
                  const pct = Math.round((rev / Math.max(maxRev, 1)) * 100);
                  const meta = categoryMeta[s.category];
                  return (
                    <div
                      key={s.id}
                      className={`border-b border-slate-200 px-[18px] py-[10px] dark:border-white/[0.07] ${idx === topByRevenue.length - 1 ? "border-b-0" : ""}`}
                    >
                      <div className="mb-[6px] flex items-center justify-between">
                        <div className="flex items-center gap-[7px]">
                          <span className="text-[13px]">{meta.emoji}</span>
                          <span className="text-[12px] font-medium text-slate-700 dark:text-slate-200">{s.name}</span>
                        </div>
                        <span className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">₹{(rev / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded bg-slate-200 dark:bg-white/10">
                        <div className={`h-full rounded ${meta.color.replace("text", "bg")}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceFormModal
        open={openModal}
        editService={editing}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSave={(payload) => {
          if (editing) {
            setServices((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...payload } : s)));
          } else {
            setServices((prev) => [
              ...prev,
              {
                id: `S${Date.now()}`,
                sessions: 0,
                ...payload,
              },
            ]);
          }
          setOpenModal(false);
          setEditing(null);
        }}
      />
    </div>
  );
}

function StatCard({
  icon,
  iconTone,
  delta,
  value,
  label,
}: {
  icon: ReactNode;
  iconTone: "blue" | "teal" | "amber" | "green";
  delta: string;
  value: string;
  label: string;
}) {
  const toneClass =
    iconTone === "blue"
      ? "bg-blue-500/15 text-blue-400"
      : iconTone === "teal"
      ? "bg-teal-500/15 text-teal-400"
      : iconTone === "amber"
      ? "bg-amber-500/15 text-amber-400"
      : "bg-green-500/15 text-green-400";

  return (
    <div className="rounded-[13px] border border-slate-200 bg-white p-[18px] transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
      <div className="mb-3 flex items-start justify-between">
        <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] ${toneClass}`}>{icon}</div>
        <span className="inline-flex items-center rounded-full bg-green-500/15 px-[7px] py-[2px] text-[10px] font-medium text-green-400">{delta}</span>
      </div>
      <div className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{label}</div>
    </div>
  );
}

function MiniStat({ value, label, bordered }: { value: string; label: string; bordered?: boolean }) {
  return (
    <div className={`px-[14px] py-[11px] text-center ${bordered ? "border-r border-slate-200 dark:border-white/[0.07]" : ""}`}>
      <div className="text-[14px] font-bold text-slate-900 dark:text-slate-100">{value}</div>
      <div className="mt-[2px] text-[9.5px] text-slate-500 dark:text-[#94A3B8]">{label}</div>
    </div>
  );
}

function Tip({ icon, tone, text }: { icon: string; tone: string; text: string }) {
  return (
    <div className="flex items-start gap-[10px]">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-[13px] ${tone}`}>{icon}</div>
      <div className="text-[11.5px] leading-[1.5] text-slate-500 dark:text-[#94A3B8]">{text}</div>
    </div>
  );
}
