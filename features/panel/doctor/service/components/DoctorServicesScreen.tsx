"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  Activity,
  BadgeIndianRupee,
  Clock3,
  FlaskConical,
  HandHeart,
  Pencil,
  Plus,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    desc: "Initial or follow-up discussion about symptoms, history and treatment plan.",
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
    desc: "Minor in-clinic procedures such as wound care and suturing.",
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
    desc: "Short revisit to assess recovery and update treatment.",
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
    desc: "CBC, lipid profile, sugar and basic diagnostics.",
    avail: "Weekdays Only",
  },
  {
    id: "S5",
    name: "Physiotherapy",
    category: "Therapy",
    price: 900,
    duration: 60,
    sessions: 11,
    status: "Active",
    desc: "Guided physical therapy for musculoskeletal recovery.",
    avail: "Tue/Thu/Sat",
  },
  {
    id: "S6",
    name: "Vaccination",
    category: "Preventive",
    price: 400,
    duration: 10,
    sessions: 7,
    status: "Inactive",
    desc: "Routine vaccinations for adults and children.",
    avail: "Weekdays Only",
  },
];

const categoryMeta: Record<
  ServiceCategory,
  { icon: ReactNode; dot: string; bg: string }
> = {
  Consultation: {
    icon: <Stethoscope className="w-4 h-4" />,
    dot: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  Procedure: {
    icon: <Wrench className="w-4 h-4" />,
    dot: "text-teal-400",
    bg: "bg-teal-500/15",
  },
  Diagnostic: {
    icon: <FlaskConical className="w-4 h-4" />,
    dot: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  Therapy: {
    icon: <HandHeart className="w-4 h-4" />,
    dot: "text-amber-400",
    bg: "bg-amber-500/15",
  },
  Preventive: {
    icon: <ShieldCheck className="w-4 h-4" />,
    dot: "text-green-400",
    bg: "bg-green-500/15",
  },
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Active Services" value={`${stats.activeCount}`} helper="Active" icon={<Stethoscope className="w-4 h-4" />} />
          <StatCard label="Avg Service Value" value={`Rs ${stats.avgValue.toLocaleString()}`} helper="+12%" icon={<BadgeIndianRupee className="w-4 h-4" />} />
          <StatCard label="Sessions This Month" value={`${stats.sessions}`} helper="+8" icon={<Clock3 className="w-4 h-4" />} />
          <StatCard label="Revenue from Services" value={`Rs ${stats.revenue.toLocaleString()}`} helper="+18%" icon={<Activity className="w-4 h-4" />} />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm border transition-colors",
                  activeFilter === filter
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                    : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300"
                )}
              >
                {filter === "all" ? "All" : filter}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const meta = categoryMeta[service.category];
              const revenue = ((service.price * service.sessions) / 1000).toFixed(1);
              return (
                <div
                  key={service.id}
                  className={cn(
                    "rounded-2xl border overflow-hidden bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10",
                    service.status === "Inactive" && "opacity-65"
                  )}
                >
                  <div className="px-4 py-4 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", meta.bg, meta.dot)}>
                          {meta.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {service.name}
                          </p>
                          <p className={cn("text-xs mt-0.5", meta.dot)}>{service.category}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setServices((prev) =>
                            prev.map((s) =>
                              s.id === service.id
                                ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
                                : s
                            )
                          )
                        }
                        className={cn(
                          "w-10 h-5 rounded-full relative transition-colors",
                          service.status === "Active"
                            ? "bg-green-500"
                            : "bg-slate-300 dark:bg-slate-600"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
                            service.status === "Active" ? "left-5" : "left-0.5"
                          )}
                        />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="grid grid-cols-3 border-b border-slate-200 dark:border-white/10">
                    <MiniStat value={`Rs ${service.price}`} label="Per Session" />
                    <MiniStat value={`${service.duration} min`} label="Duration" withBorder />
                    <MiniStat value={`${service.sessions}`} label="Sessions" withBorder />
                  </div>

                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{service.avail}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Rev: <span className="text-green-500 font-semibold">Rs {revenue}k</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(service);
                            setOpenModal(true);
                          }}
                          className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setServices((prev) => prev.filter((s) => s.id !== service.id))
                          }
                          className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Quick Tips</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Listing best practices</p>
              </div>
              <div className="p-4 space-y-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>Set a clear duration so patients know what to expect.</p>
                <p>Add a short description to improve patient trust.</p>
                <p>Keep pricing transparent for better bookings.</p>
              </div>
            </div>

            <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Top by Revenue</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">February 2026</p>
              </div>

              <div className="py-1">
                {topByRevenue.map((service) => {
                  const rev = service.price * service.sessions;
                  const topRev = topByRevenue[0].price * topByRevenue[0].sessions;
                  const pct = Math.max(8, Math.round((rev / Math.max(topRev, 1)) * 100));
                  const meta = categoryMeta[service.category];
                  return (
                    <div key={service.id} className="px-4 py-3 border-b last:border-b-0 border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-800 dark:text-slate-200">{service.name}</p>
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          Rs {(rev / 1000).toFixed(1)}k
                        </p>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div className={cn("h-full rounded-full", meta.bg)} style={{ width: `${pct}%` }} />
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
            setServices((prev) =>
              prev.map((s) => (s.id === editing.id ? { ...s, ...payload } : s))
            );
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
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">{icon}</div>
        <div className="px-2 py-1 rounded-full text-[10px] bg-green-500/15 text-green-400">{helper}</div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}

function MiniStat({
  value,
  label,
  withBorder,
}: {
  value: string;
  label: string;
  withBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        "text-center py-3 px-2",
        withBorder && "border-l border-slate-200 dark:border-white/10"
      )}
    >
      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}
