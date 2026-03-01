"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Upload,
  X,
  FileText,
  ScanText,
  TestTube2,
  FileSearch,
  Check,
} from "lucide-react";

export type PatientRecord = {
  id: string;
  shortLabel: string;
  title: string;
  meta: string;
  tone: "xray" | "rx" | "lab" | "scan" | "report";
};

export type PatientModalData = {
  id: string;
  displayName: string;
  patientId: string;
  visits: number;
  phoneNumber: string;
  city: string;
  lastVisit: string;
  bloodGroup: string;
  status: string;
  avatar: string;
  gender?: string;
  dob?: string;
};

const mockRecords: PatientRecord[] = [
  {
    id: "1",
    shortLabel: "X-RAY",
    title: "Chest X-Ray",
    meta: "18 Feb 2026 · 1.2 MB",
    tone: "xray",
  },
  {
    id: "2",
    shortLabel: "Rx",
    title: "Prescription #Rx-0041-9",
    meta: "18 Feb 2026 · 0.4 MB",
    tone: "rx",
  },
  {
    id: "3",
    shortLabel: "LAB",
    title: "CBC Blood Report",
    meta: "05 Jan 2026 · 0.8 MB",
    tone: "lab",
  },
  {
    id: "4",
    shortLabel: "SCAN",
    title: "Abdominal Ultrasound",
    meta: "05 Jan 2026 · 2.1 MB",
    tone: "scan",
  },
  {
    id: "5",
    shortLabel: "RPT",
    title: "Follow-up Notes",
    meta: "20 Feb 2026 · 0.2 MB",
    tone: "report",
  },
  {
    id: "6",
    shortLabel: "Rx",
    title: "Prescription Refill",
    meta: "22 Feb 2026 · 0.3 MB",
    tone: "rx",
  },
];

const toneClasses = {
  xray: {
    canvas: "bg-[#0b1f45]",
  },
  rx: {
    canvas: "bg-[#0c2f26]",
  },
  lab: {
    canvas: "bg-[#2b153d]",
  },
  scan: {
    canvas: "bg-[#3a2304]",
  },
  report: {
    canvas: "bg-[#2f1231]",
  },
};

function recordIcon(tone: PatientRecord["tone"]) {
  if (tone === "xray") return <ScanText className="w-5 h-5" />;
  if (tone === "lab") return <TestTube2 className="w-5 h-5" />;
  if (tone === "scan") return <FileSearch className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
}

function toneColor(tone: PatientRecord["tone"]) {
  if (tone === "xray") return "text-blue-400";
  if (tone === "rx") return "text-emerald-400";
  if (tone === "lab") return "text-violet-300";
  if (tone === "scan") return "text-amber-400";
  return "text-pink-400";
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.547 5.874L0 24l6.294-1.52A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.892a9.88 9.88 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 0 1 2.108 12c0-5.458 4.434-9.892 9.892-9.892 5.458 0 9.893 4.434 9.893 9.892 0 5.459-4.435 9.892-9.893 9.892z" />
    </svg>
  );
}

export default function PatientDetailsModal({
  open,
  patient,
  onClose,
}: {
  open: boolean;
  patient: PatientModalData | null;
  onClose: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | "xray" | "rx" | "lab" | "scan" | "report">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setActiveFilter("all");
      setSelectedIds([]);
    }
  }, [open, patient?.id]);

  const visibleRecords = (() => {
    if (activeFilter === "all") return mockRecords;
    return mockRecords.filter((r) => r.tone === activeFilter);
  })();

  if (!open || !patient) return null;

  const allVisibleSelected = visibleRecords.length > 0 && visibleRecords.every((r) => selectedIds.includes(r.id));

  const toggleRecord = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleRecords.some((r) => r.id === id)));
      return;
    }
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleRecords.map((r) => r.id)])));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-[4px] flex items-center justify-center p-3">
      <div className="w-full max-w-[700px] max-h-[85vh] overflow-hidden rounded-2xl border border-white/[0.14] bg-[#1c2840] text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="px-[22px] py-4 border-b border-white/[0.07] flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#f1f5f9] leading-none">{patient.displayName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-[7px] bg-white/[0.06] hover:bg-white/[0.1] transition-colors flex items-center justify-center"
          >
            <X className="w-[14px] h-[14px] text-slate-400" />
          </button>
        </div>

        <div className="px-[22px] py-5 max-h-[70vh] overflow-y-auto">
          <div className="mb-4 pb-4 border-b border-white/[0.07] flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-[19px] font-bold" style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa" }}>
              {patient.avatar}
            </div>

            <div className="flex-1">
              <div className="text-base font-bold text-[#f1f5f9]">{patient.displayName}</div>
              <div className="text-[11.5px] text-slate-400 mt-0.5">#{patient.patientId} · {patient.visits} visits · {patient.phoneNumber}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium bg-emerald-500/15 text-emerald-400">
                  <span className="w-[5px] h-[5px] rounded-full bg-emerald-400" />
                  {patient.status}
                </span>
                <span className="inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium bg-red-500/15 text-red-400">
                  <span className="w-[5px] h-[5px] rounded-full bg-red-400" />
                  {patient.bloodGroup}
                </span>
                <span className="inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium bg-blue-500/15 text-blue-400">
                  <span className="w-[5px] h-[5px] rounded-full bg-blue-400" />
                  {patient.gender || "Female"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
            <div className="rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.04em]">Date of Birth</p>
              <p className="text-[13px] mt-1 font-medium text-[#f1f5f9]">{patient.dob || "12 Mar 1988"}</p>
            </div>
            <div className="rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.04em]">City</p>
              <p className="text-[13px] mt-1 font-medium text-[#f1f5f9]">{patient.city}</p>
            </div>
            <div className="rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.04em]">Last Visit</p>
              <p className="text-[13px] mt-1 font-medium text-[#f1f5f9]">{patient.lastVisit}</p>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-[#f1f5f9]">Medical Records</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-[10px] bg-blue-500/15 text-blue-400 font-semibold">{mockRecords.length} files</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="text-[11px] font-medium text-slate-400 hover:text-slate-200"
                >
                  {allVisibleSelected ? "Deselect all" : "Select all"}
                </button>
                <button className="inline-flex items-center gap-1.5 text-[11px] rounded-[7px] px-2.5 py-[5px] border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <Upload className="w-[13px] h-[13px]" /> Upload
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                { label: "All", value: "all" as const },
                { label: "X-Ray", value: "xray" as const },
                { label: "Prescription", value: "rx" as const },
                { label: "Lab", value: "lab" as const },
                { label: "Scan", value: "scan" as const },
                { label: "Report", value: "report" as const },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-2.5 py-[3px] rounded-lg text-[10.5px] font-medium border transition-colors ${
                    activeFilter === f.value
                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                      : "bg-white/[0.05] border-white/[0.07] text-slate-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {visibleRecords.map((record) => {
                const selected = selectedIds.includes(record.id);
                return (
                  <div
                    key={record.id}
                    onClick={() => toggleRecord(record.id)}
                    className={`relative rounded-[10px] overflow-hidden border-2 cursor-pointer transition-colors ${
                      selected ? "border-[#25d366]" : "border-white/[0.07]"
                    }`}
                  >
                    <div className="absolute top-1.5 left-1.5 z-10 w-[18px] h-[18px] rounded-[5px] border-2 border-white/60 bg-transparent flex items-center justify-center">
                      {selected ? <Check className="w-[10px] h-[10px] text-[#25d366]" /> : null}
                    </div>
                    <button className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-md bg-black/50 flex items-center justify-center">
                      <Eye className="w-[11px] h-[11px] text-white" />
                    </button>

                    <div className={`aspect-[5/4] flex items-center justify-center ${toneClasses[record.tone].canvas}`}>
                      <div className={`flex flex-col items-center gap-2 ${toneColor(record.tone)}`}>
                        {recordIcon(record.tone)}
                        <span className="text-[12px] font-semibold">{record.shortLabel}</span>
                      </div>
                    </div>

                    <div className="px-[7px] py-[5px] bg-black/60">
                      <p className="text-[9.5px] font-semibold text-white truncate">{record.title}</p>
                      <p className="text-[8.5px] text-white/55 mt-0.5">{record.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedIds.length > 0 ? (
              <div className="mt-3 px-3 py-2 rounded-[10px] border border-[#25d366]/20 bg-[#25d366]/10 flex items-center justify-between">
                <span className="text-xs text-[#4ade80] font-medium">{selectedIds.length} files selected</span>
                <button type="button" className="text-[11px] text-slate-400" onClick={() => setSelectedIds([])}>
                  Clear
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-[22px] py-[14px] border-t border-white/[0.07] flex items-center justify-end gap-[9px] bg-[#1a243b]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-[5px] px-[13px] py-[7px] rounded-lg text-xs font-medium border border-white/[0.07] bg-white/[0.06] text-slate-300"
          >
            Close
          </button>
          <button className="inline-flex items-center gap-[5px] px-[13px] py-[7px] rounded-lg text-xs font-medium border border-white/[0.07] bg-white/[0.06] text-slate-300">
            + Invoice
          </button>
          <button className="inline-flex items-center gap-[5px] px-[13px] py-[7px] rounded-lg text-xs font-medium border border-white/[0.07] bg-white/[0.06] text-slate-300">
            + Book Appointment
          </button>
          <button
            className={`inline-flex items-center gap-[7px] px-[14px] py-[7px] rounded-lg text-xs font-semibold text-white ${
              selectedIds.length ? "bg-[#25d366]" : "bg-[#25d366] opacity-40 pointer-events-none"
            }`}
            title={selectedIds.length ? "Send selected files" : "Select records first"}
          >
            <WhatsAppIcon /> Send as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
