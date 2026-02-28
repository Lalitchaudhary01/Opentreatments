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
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] rounded-2xl bg-[#1c2840] border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">
            {editService ? "Edit Service" : "Add New Service"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Service Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="e.g. General Consultation"
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Category</span>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((s) => ({ ...s, category: e.target.value as ServiceCategory }))
                }
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
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
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Price (Rs)</span>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) =>
                  setForm((s) => ({ ...s, price: Number(e.target.value || 0) }))
                }
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Duration (minutes)</span>
              <input
                type="number"
                min={5}
                step={5}
                value={form.duration}
                onChange={(e) =>
                  setForm((s) => ({ ...s, duration: Number(e.target.value || 30) }))
                }
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>
          </div>

          <label className="space-y-1.5 block">
            <span className="text-slate-300 text-xs">Description</span>
            <textarea
              rows={3}
              value={form.desc}
              onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
              placeholder="Brief description..."
              className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100 resize-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Availability</span>
              <select
                value={form.avail}
                onChange={(e) => setForm((s) => ({ ...s, avail: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              >
                <option>All Days</option>
                <option>Weekdays Only</option>
                <option>Weekends Only</option>
                <option>Mon/Wed/Fri</option>
                <option>Tue/Thu/Sat</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Status</span>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((s) => ({ ...s, status: e.target.value as ServiceStatus }))
                }
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm bg-white/10 text-slate-300 hover:bg-white/15"
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
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500"
          >
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
}
