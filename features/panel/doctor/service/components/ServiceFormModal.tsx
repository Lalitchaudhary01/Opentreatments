"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { DoctorService, ServiceCategory, ServiceStatus } from "../types";

type FormState = {
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  desc: string;
  avail: string;
  status: ServiceStatus;
};

const defaultForm: FormState = {
  name: "",
  category: "Consultation",
  price: 500,
  duration: 30,
  desc: "",
  avail: "All Days",
  status: "Active",
};

export default function ServiceFormModal({
  open,
  editService,
  onClose,
  onSave,
}: {
  open: boolean;
  editService: DoctorService | null;
  onClose: () => void;
  onSave: (payload: Omit<DoctorService, "id" | "sessions">) => void;
}) {
  const [form, setForm] = useState<FormState>(defaultForm);

  useEffect(() => {
    if (!open) return;
    if (!editService) {
      setForm(defaultForm);
      return;
    }

    setForm({
      name: editService.name,
      category: editService.category,
      price: editService.price,
      duration: editService.duration,
      desc: editService.desc,
      avail: editService.avail,
      status: editService.status,
    });
  }, [open, editService]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[4px]">
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/20 bg-white dark:bg-[#1b263b]">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-[22px] pb-4 pt-5">
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
            {editService ? "Edit Service" : "Add New Service"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="h-7 w-7 rounded-[7px] bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 flex items-center justify-center"
          >
            <X className="h-[14px] w-[14px] text-slate-500 dark:text-[#94A3B8]" />
          </button>
        </div>

        <div className="px-[22px] py-5 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Service Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="e.g. General Consultation"
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              />
            </label>

            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Category</span>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((s) => ({ ...s, category: e.target.value as ServiceCategory }))
                }
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              >
                <option>Consultation</option>
                <option>Procedure</option>
                <option>Diagnostic</option>
                <option>Therapy</option>
                <option>Preventive</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Price (₹)</span>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) =>
                  setForm((s) => ({ ...s, price: Number(e.target.value || 0) }))
                }
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              />
            </label>

            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Duration (minutes)</span>
              <input
                type="number"
                min={5}
                step={5}
                value={form.duration}
                onChange={(e) =>
                  setForm((s) => ({ ...s, duration: Number(e.target.value || 30) }))
                }
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              />
            </label>
          </div>

          <label className="mb-[14px] block">
            <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Description</span>
            <textarea
              rows={3}
              value={form.desc}
              onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
              placeholder="Brief description of what this service includes..."
              className="min-h-[70px] w-full resize-none rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Availability</span>
              <select
                value={form.avail}
                onChange={(e) => setForm((s) => ({ ...s, avail: e.target.value }))}
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              >
                <option>All Days</option>
                <option>Weekdays Only</option>
                <option>Weekends Only</option>
                <option>Mon/Wed/Fri</option>
                <option>Tue/Thu/Sat</option>
              </select>
            </label>

            <label className="mb-[14px] block">
              <span className="mb-[5px] block text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Status</span>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((s) => ({ ...s, status: e.target.value as ServiceStatus }))
                }
                className="w-full rounded-[9px] border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/5 px-3 py-[9px] text-[13px] text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-[9px] border-t border-slate-200 dark:border-white/[0.07] px-[22px] py-[14px]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-[5px] rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 px-[13px] py-[7px] text-[12px] font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-white/5 dark:text-[#94A3B8] dark:hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (!form.name.trim()) return;
              onSave({
                name: form.name.trim(),
                category: form.category,
                price: form.price,
                duration: form.duration,
                desc: form.desc.trim(),
                avail: form.avail,
                status: form.status,
              });
            }}
            className="inline-flex items-center gap-[5px] rounded-lg bg-[#3b82f6] px-[13px] py-[7px] text-[12px] font-medium text-white transition hover:bg-[#2563eb]"
          >
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
}
