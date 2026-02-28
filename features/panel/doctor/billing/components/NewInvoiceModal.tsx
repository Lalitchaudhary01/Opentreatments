"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { BillingInvoice } from "../types";

export default function NewInvoiceModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (invoice: BillingInvoice) => void;
}) {
  const [patient, setPatient] = useState("");
  const [service, setService] = useState("Consultation");
  const [amount, setAmount] = useState(500);
  const [mode, setMode] = useState("UPI");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] rounded-2xl bg-[#1c2840] border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">Create Invoice</h3>
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
            <span className="text-slate-300 text-xs">Patient</span>
            <input
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              placeholder="Search patient"
              className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Service</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              >
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Procedure</option>
                <option>Blood Test</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-slate-300 text-xs">Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
              />
            </label>
          </div>

          <label className="space-y-1.5 block">
            <span className="text-slate-300 text-xs">Payment Mode</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-800/70 border border-white/10 text-slate-100"
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
              <option>Net Banking</option>
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
              onCreate({
                id: `INV-${Math.floor(Math.random() * 9000 + 1000)}`,
                patient: patient.trim() || "Patient",
                service,
                amount,
                date: new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                }),
                status: "PENDING",
                mode,
              });
              setPatient("");
              setService("Consultation");
              setAmount(500);
              setMode("UPI");
            }}
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
