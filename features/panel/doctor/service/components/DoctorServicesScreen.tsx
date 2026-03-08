"use client";

import { useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Activity, BadgeIndianRupee, CheckCheck, Clock3, Plus } from "lucide-react";
import { DoctorService, ServiceCategory } from "../types";
import { SERVICE_FILTERS } from "../constants/serviceConfig";
import {
  createDoctorService,
  deleteDoctorService,
  type DoctorServicePayload,
  toggleDoctorServiceStatus,
  updateDoctorService,
} from "../actions/doctorServiceActions";
import StatCard from "./ui/StatCard";
import FirstTimeServicesState from "./sections/FirstTimeServicesState";

const ServiceFormModal = dynamic(() => import("./ServiceFormModal"), { ssr: false });
const ServicesGrid = dynamic(() => import("./sections/ServicesGrid"));
const ServicesInsights = dynamic(() => import("./sections/ServicesInsights"));

export default function DoctorServicesScreen({
  firstTime = false,
  initialServices = [],
}: {
  firstTime?: boolean;
  initialServices?: DoctorService[];
}) {
  const [services, setServices] = useState<DoctorService[]>(initialServices);
  const [activeFilter, setActiveFilter] = useState<"all" | ServiceCategory>("all");
  const [editing, setEditing] = useState<DoctorService | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isSaving, startSaving] = useTransition();

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

  const onSaveService = (payload: DoctorServicePayload) => {
    startSaving(async () => {
      try {
        if (editing) {
          const updated = await updateDoctorService(editing.id, payload);
          setServices((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
        } else {
          const created = await createDoctorService(payload);
          setServices((prev) => [created, ...prev]);
        }
        setOpenModal(false);
        setEditing(null);
      } catch (error) {
        const message =
          error instanceof Error && !error.message.includes("Invalid `")
            ? error.message
            : "Failed to save service. Please try again.";
        alert(message);
      }
    });
  };

  const onToggleStatus = (service: DoctorService) => {
    const nextStatus = service.status === "Active" ? "Inactive" : "Active";
    startSaving(async () => {
      try {
        const updated = await toggleDoctorServiceStatus(service.id, nextStatus);
        setServices((prev) => prev.map((item) => (item.id === service.id ? updated : item)));
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to update status");
      }
    });
  };

  const onDeleteService = (serviceId: string) => {
    startSaving(async () => {
      try {
        await deleteDoctorService(serviceId);
        setServices((prev) => prev.filter((item) => item.id !== serviceId));
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to delete service");
      }
    });
  };

  const openCreateModal = () => {
    setEditing(null);
    setOpenModal(true);
  };

  if (firstTime && services.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-7 py-[22px] dark:bg-[#111827]">
        <FirstTimeServicesState onAdd={openCreateModal} />
        <ServiceFormModal
          open={openModal}
          editService={editing}
          onClose={() => {
            setOpenModal(false);
            setEditing(null);
          }}
          onSave={onSaveService}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-7 py-[22px] dark:bg-[#111827]">
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
            {SERVICE_FILTERS.map((filter) => {
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
            onClick={openCreateModal}
            className="inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
          >
            <Plus className="h-[13px] w-[13px]" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[1fr_300px]">
          <ServicesGrid
            services={filteredServices}
            isSaving={isSaving}
            onEdit={(service) => {
              setEditing(service);
              setOpenModal(true);
            }}
            onToggleStatus={onToggleStatus}
            onDelete={onDeleteService}
          />
          <ServicesInsights topByRevenue={topByRevenue} />
        </div>
      </div>

      <ServiceFormModal
        open={openModal}
        editService={editing}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSave={onSaveService}
      />
    </div>
  );
}
