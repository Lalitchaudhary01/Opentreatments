"use client";

import { useEffect, useState, useTransition } from "react";
import { Activity, BadgeIndianRupee, HeartPulse, Shapes, X } from "lucide-react";
import {
  createHospitalService,
  getHospitalServices,
  type HospitalServiceListItem,
} from "../actions";

const stats = [
  { label: "Total Services", value: "186", sub: "Across 8 categories", delta: "+12", icon: BadgeIndianRupee, color: "text-[#3b82f6]" },
  { label: "Active Packages", value: "8", sub: "Health checkup bundles", delta: "8 active", icon: Shapes, color: "text-[#14b8a6]" },
  { label: "Avg Service Price", value: "₹840", sub: "Across all categories", delta: "+3", icon: HeartPulse, color: "text-[#f59e0b]" },
  { label: "Monthly Revenue", value: "₹8.4L", sub: "From services & tests", delta: "+22%", icon: Activity, color: "text-[#22c55e]" },
];

function categoryPill(category: string) {
  if (category === "Consultation") return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (category === "Procedure") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (category === "Package") return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  if (category === "Lab Test") return "bg-[rgba(148,163,184,.12)] text-slate-500 dark:text-[#94a3b8]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  return status === "Active"
    ? "bg-[rgba(34,197,94,.12)] text-[#4ade80]"
    : "bg-[rgba(148,163,184,.12)] text-slate-500 dark:text-[#94a3b8]";
}

export default function HospitalServicesScreen() {
  const [rows, setRows] = useState<HospitalServiceListItem[]>([]);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isLoadingRows, startLoadingRows] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const [form, setForm] = useState({
    name: "",
    category: "Consultation",
    department: "Cardiology",
    price: "",
    duration: "30 min",
    description: "",
  });

  useEffect(() => {
    startLoadingRows(async () => {
      try {
        const data = await getHospitalServices();
        setRows(data);
      } catch (error) {
        const err = error as { message?: string };
        alert(err?.message || "Failed to load services");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setIsAddServiceOpen(false);
    setForm({
      name: "",
      category: "Consultation",
      department: "Cardiology",
      price: "",
      duration: "30 min",
      description: "",
    });
  };

  const handleAddService = () => {
    if (!form.name.trim()) {
      alert("Service name is required");
      return;
    }

    const parsedPrice = Number(form.price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Price must be a valid amount");
      return;
    }

    startSaving(async () => {
      const result = await createHospitalService({
        name: form.name,
        category: form.category,
        department: form.department,
        price: parsedPrice,
        duration: form.duration,
        description: form.description,
      });

      if (!result.success) {
        alert(result.error);
        return;
      }

      setRows((prev) => [result.service, ...prev]);
      closeModal();
    });
  };

  return (
    <>
      <div className="space-y-[18px] px-6 py-5">
        <section className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-[13px] border border-slate-200 bg-white p-5 transition hover:-translate-y-[2px] hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/[0.14]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-slate-100 dark:bg-white/[0.06] ${s.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-[rgba(34,197,94,.12)] px-2 py-0.5 text-[10px] font-medium text-[#22c55e]">{s.delta}</span>
                </div>
                <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">{s.value}</div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{s.label}</p>
                <p className="mt-1 text-[10.5px] text-slate-500 dark:text-[#64748b]">{s.sub}</p>
              </div>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Service Catalog</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Manage consultations, procedures &amp; packages</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Consultations", "Procedures", "Lab Tests", "Packages"].map((f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    i === 0
                      ? "border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]"
                      : "border-slate-200 text-slate-500 hover:border-white/[0.14] hover:text-slate-900 dark:border-white/[0.08] dark:text-[#94a3b8] dark:hover:text-[#e2e8f0]"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button
                onClick={() => setIsAddServiceOpen(true)}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]"
              >
                + Add Service
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#64748b]">
                  <th className="px-5 py-3">Service Name</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Price (₹)</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr className="border-t border-slate-200 dark:border-white/[0.07]">
                    <td colSpan={7} className="px-5 py-6 text-center text-[12px] text-slate-500 dark:text-[#94a3b8]">
                      {isLoadingRows ? "Loading services..." : "No services yet. Add your first service."}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`group border-t border-slate-200 text-[12.5px] hover:bg-slate-50 dark:border-white/[0.07] dark:hover:bg-white/[0.02] ${row.status === "Archived" ? "opacity-60" : ""}`}
                    >
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-[#e2e8f0]">{row.name}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${categoryPill(row.category)}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 dark:text-[#94a3b8]">{row.department}</td>
                      <td className="px-5 py-3 text-slate-500 dark:text-[#94a3b8]">{row.duration}</td>
                      <td className="px-5 py-3 font-semibold text-slate-900 dark:text-[#f1f5f9]">{row.priceLabel}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                          <button className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]">
                            Edit
                          </button>
                          <button className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]">
                            {row.status === "Archived" ? "Restore" : "Archive"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {isAddServiceOpen ? (
          <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[4px]">
            <div className="flex max-h-[88vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[18px] border border-black/20 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:border-white/[0.14] dark:bg-[#111827] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-white/[0.07]">
                <h3 className="text-[16px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Add New Service</h3>
                <button
                  onClick={closeModal}
                  className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/[0.06] dark:text-[#94a3b8] dark:hover:bg-white/[0.12]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto px-6 py-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Service Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                    placeholder="e.g. Cardiology Consultation"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                    >
                      <option>Consultation</option>
                      <option>Procedure</option>
                      <option>Lab Test</option>
                      <option>Imaging</option>
                      <option>Package</option>
                      <option>Surgery</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Department</label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                    >
                      <option>Cardiology</option>
                      <option>Radiology</option>
                      <option>Pathology</option>
                      <option>Orthopedics</option>
                      <option>Neurology</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Price (₹)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                      placeholder="1200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Duration</label>
                    <input
                      value={form.duration}
                      onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                      placeholder="30 minutes"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[.07em] text-[#64748b]">Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12.5px] text-slate-700 outline-none focus:border-[#3b82f6]/40 focus:bg-[#3b82f6]/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#e2e8f0]"
                    placeholder="Brief description…"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4 dark:border-white/[0.07]">
                <button
                  onClick={closeModal}
                  disabled={isSaving}
                  className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-200 disabled:opacity-50 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-[#cbd5e1] dark:hover:bg-white/[0.1]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddService}
                  disabled={isSaving}
                  className="rounded-lg bg-[#3b82f6] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1d4ed8] disabled:opacity-60"
                >
                  {isSaving ? "Adding..." : "Add Service"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
