"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { HolidayBlock } from "../types";

export default function HolidayModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<HolidayBlock, "id">) => void;
}) {
  const [label, setLabel] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("Public Holiday");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] rounded-2xl bg-[#1c2840] border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">Add Holiday / Time Off</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <label className="space-y-1.5 block">
            <span className="text-slate-300 text-xs">Label</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Conference"
              className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">From</span>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">To</span>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>
          </div>

          <label className="space-y-1.5 block">
            <span className="text-slate-300 text-xs">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
            >
              <option>Public Holiday</option>
              <option>Conference / Training</option>
              <option>Personal Leave</option>
              <option>Other</option>
            </select>
          </label>
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
              if (!from || !to) return;
              onSave({
                label: label.trim() || "Time Off",
                from,
                to,
                type,
              });
              setLabel("");
              setFrom("");
              setTo("");
              setType("Public Holiday");
            }}
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500"
          >
            Block Dates
          </button>
        </div>
      </div>
    </div>
  );
}
