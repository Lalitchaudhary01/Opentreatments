"use client";

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
    box: "border-blue-500/30 bg-blue-950/45",
    icon: "text-blue-400",
    strip: "bg-blue-500/12",
  },
  rx: {
    box: "border-emerald-500/30 bg-emerald-950/45",
    icon: "text-emerald-400",
    strip: "bg-emerald-500/12",
  },
  lab: {
    box: "border-violet-500/30 bg-violet-950/45",
    icon: "text-violet-400",
    strip: "bg-violet-500/12",
  },
  scan: {
    box: "border-amber-500/30 bg-amber-950/45",
    icon: "text-amber-400",
    strip: "bg-amber-500/12",
  },
  report: {
    box: "border-pink-500/30 bg-pink-950/45",
    icon: "text-pink-400",
    strip: "bg-pink-500/12",
  },
};

function recordIcon(tone: PatientRecord["tone"]) {
  if (tone === "xray") return <ScanText className="w-5 h-5" />;
  if (tone === "lab") return <TestTube2 className="w-5 h-5" />;
  if (tone === "scan") return <FileSearch className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
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
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-[3px] p-3 md:p-6">
      <div className="mx-auto w-full max-w-[1160px] rounded-[22px] border border-white/10 bg-[#1c2841] text-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
          <h2 className="text-[26px] leading-none font-bold tracking-tight">{patient.displayName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-[92px] h-[92px] rounded-full bg-[#2a4880] flex items-center justify-center text-[40px] font-bold text-[#62a5ff]">
              {patient.avatar}
            </div>

            <div>
              <p className="text-[28px] leading-none font-bold tracking-tight">{patient.displayName}</p>
              <p className="text-[18px] text-slate-400 mt-1">#{patient.patientId} · {patient.visits} visits · {patient.phoneNumber}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-1.5 text-emerald-400 text-[18px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {patient.status}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-4 py-1.5 text-red-400 text-[18px]">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {patient.bloodGroup}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-4 py-1.5 text-blue-400 text-[18px]">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {patient.gender || "Female"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-white/10 py-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Date of Birth</p>
              <p className="text-[24px] mt-2 leading-none">{patient.dob || "12 Mar 1988"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500 uppercase tracking-wide">City</p>
              <p className="text-[24px] mt-2 leading-none">{patient.city}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Last Visit</p>
              <p className="text-[24px] mt-2 leading-none">{patient.lastVisit}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[24px] font-semibold">Medical Records</h3>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-[14px] text-blue-400">6 files</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <button className="text-[14px] hover:text-white">Select all</button>
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 text-blue-400 px-4 py-2 text-[14px] hover:bg-blue-500/10">
                  <Upload className="w-5 h-5" /> Upload
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
              {["All", "X-Ray", "Prescription", "Lab", "Scan", "Report"].map((f, idx) => (
                <button
                  key={f}
                  className={`rounded-xl border px-4 py-1.5 text-[14px] ${
                    idx === 0
                      ? "border-blue-500/60 bg-blue-500/15 text-blue-400"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {mockRecords.map((record) => {
                const tone = toneClasses[record.tone];
                return (
                  <div
                    key={record.id}
                    className={`rounded-2xl border ${tone.box} overflow-hidden`}
                  >
                    <div className="p-3 flex items-center justify-between">
                      <button className="w-8 h-8 rounded-md border border-white/60" />
                      <button className="w-9 h-9 rounded-xl bg-black/30 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-slate-200" />
                      </button>
                    </div>

                    <div className={`h-[150px] flex flex-col items-center justify-center gap-3 ${tone.icon}`}>
                      {recordIcon(record.tone)}
                      <span className="text-[18px] font-semibold">{record.shortLabel}</span>
                    </div>

                    <div className={`${tone.strip} px-4 py-3 border-t border-white/10`}>
                      <p className="text-[20px] font-semibold text-slate-100 truncate leading-tight">{record.title}</p>
                      <p className="text-[14px] text-slate-400 leading-tight">{record.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-8 py-5 flex items-center justify-end gap-3 bg-[#1a243b]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3 text-[14px] text-slate-300 hover:bg-white/[0.08]"
          >
            Close
          </button>
          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3 text-[14px] text-slate-300 hover:bg-white/[0.08]">
            + Invoice
          </button>
          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3 text-[14px] text-slate-300 hover:bg-white/[0.08]">
            + Book Appointment
          </button>
          <button className="rounded-2xl bg-emerald-600 px-7 py-3 text-[14px] text-white hover:bg-emerald-500 inline-flex items-center gap-2">
            <Check className="w-5 h-5" /> Send as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
