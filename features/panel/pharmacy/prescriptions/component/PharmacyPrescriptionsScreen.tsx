"use client";

import { useMemo, useState } from "react";

type RxStatus = "Pending" | "Verified" | "Clarification" | "Rejected";

type PrescriptionItem = {
  id: string;
  patient: string;
  uploaded: string;
  medicines: string[];
  orderId: string;
  status: RxStatus;
  doctor: string;
};

const prescriptions: PrescriptionItem[] = [
  {
    id: "RX-0440",
    patient: "Sunita Rao",
    uploaded: "10m ago",
    medicines: ["Amoxicillin 500mg", "Pan-D 40mg"],
    orderId: "ORD-8921",
    status: "Pending",
    doctor: "Dr. Priya Sharma",
  },
  {
    id: "RX-0439",
    patient: "Vijay Deshmukh",
    uploaded: "25m ago",
    medicines: ["Metformin 500mg", "Atorvastatin 10mg"],
    orderId: "ORD-8920",
    status: "Clarification",
    doctor: "Dr. Amit Joshi",
  },
  {
    id: "RX-0438",
    patient: "Rahul Mehta",
    uploaded: "40m ago",
    medicines: ["Azithromycin 500mg", "Paracetamol 500mg"],
    orderId: "ORD-8919",
    status: "Pending",
    doctor: "Dr. Kavita Nair",
  },
  {
    id: "RX-0437",
    patient: "Karan Patil",
    uploaded: "1h ago",
    medicines: ["Telmisartan 40mg"],
    orderId: "ORD-8918",
    status: "Verified",
    doctor: "Dr. Suresh Rao",
  },
  {
    id: "RX-0436",
    patient: "Pooja Singh",
    uploaded: "2h ago",
    medicines: ["Pantoprazole 40mg", "Domperidone 10mg"],
    orderId: "ORD-8917",
    status: "Verified",
    doctor: "Dr. Anand Patel",
  },
  {
    id: "RX-0435",
    patient: "Neha Jain",
    uploaded: "3h ago",
    medicines: ["Insulin Glargine"],
    orderId: "ORD-8916",
    status: "Rejected",
    doctor: "Dr. Priya Sharma",
  },
];

const filters: Array<{ key: "all" | RxStatus; label: string }> = [
  { key: "all", label: "All" },
  { key: "Pending", label: "Pending" },
  { key: "Verified", label: "Verified" },
  { key: "Clarification", label: "Needs Clarification" },
];

function statusClass(status: RxStatus) {
  if (status === "Verified") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "Pending") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  if (status === "Clarification") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  return "bg-[#ef4444]/15 text-[#ef4444]";
}

export default function PharmacyPrescriptionsScreen() {
  const [filter, setFilter] = useState<"all" | RxStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(prescriptions[0]?.id ?? null);
  const [note, setNote] = useState("");
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  const rows = useMemo(
    () => (filter === "all" ? prescriptions : prescriptions.filter((rx) => rx.status === filter)),
    [filter]
  );
  const selected = useMemo(
    () => prescriptions.find((rx) => rx.id === selectedId) ?? rows[0] ?? null,
    [rows, selectedId]
  );
  const openDetails = useMemo(
    () => prescriptions.find((rx) => rx.id === openDetailsId) ?? null,
    [openDetailsId]
  );

  const stats = useMemo(
    () => ({
      verified: prescriptions.filter((rx) => rx.status === "Verified").length,
      pending: prescriptions.filter((rx) => rx.status === "Pending").length,
      clarification: prescriptions.filter((rx) => rx.status === "Clarification").length,
      rejected: prescriptions.filter((rx) => rx.status === "Rejected").length,
    }),
    []
  );

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                filter === item.key
                  ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                  : "border-white/[0.08] bg-transparent text-[#94A3B8] hover:text-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Prescription Queue</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">{rows.length} prescriptions</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-[18px] py-[9px]">Rx ID</th>
                    <th className="px-[18px] py-[9px]">Patient</th>
                    <th className="px-[18px] py-[9px]">Uploaded</th>
                    <th className="px-[18px] py-[9px]">Medicines Detected</th>
                    <th className="px-[18px] py-[9px]">Order</th>
                    <th className="px-[18px] py-[9px]">Status</th>
                    <th className="px-[18px] py-[9px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`cursor-pointer border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02] ${
                        selected?.id === row.id ? "bg-white/[0.03]" : ""
                      }`}
                    >
                      <td className="px-[18px] py-[11px] text-[12px] font-medium text-slate-100">{row.id}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.patient}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.uploaded}</td>
                      <td className="max-w-[280px] truncate px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.medicines.join(", ")}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.orderId}</td>
                      <td className="px-[18px] py-[11px]">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${statusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-[18px] py-[11px]">
                        <div className="flex gap-2">
                          <button type="button" className="rounded-md border border-[#14b8a6]/30 bg-[#14b8a6]/10 px-2 py-1 text-[10px] text-[#14b8a6]">
                            Verify
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDetailsId(row.id);
                            }}
                            className="rounded-md border border-white/[0.12] bg-white/[0.03] px-2 py-1 text-[10px] text-[#CBD5E1]"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Quick Preview</div>
              <div className="p-4">
                {selected ? (
                  <div className="space-y-2 rounded-lg border border-[#14b8a6]/30 bg-[#14b8a6]/5 p-3">
                    <p className="text-xs text-[#94A3B8]">{selected.id}</p>
                    <p className="text-sm font-semibold text-slate-100">{selected.patient}</p>
                    <p className="text-xs text-[#94A3B8]">{selected.doctor}</p>
                    <p className="text-xs text-[#CBD5E1]">{selected.medicines.join(", ")}</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#14b8a6]/30 p-6 text-center text-xs text-[#64748B]">
                    Click a row to preview
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Pharmacist Notes</div>
              <div className="p-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-[100px] w-full resize-none rounded-lg border border-white/[0.1] bg-white/[0.04] p-3 text-xs text-slate-100 outline-none"
                  placeholder="Add notes for selected prescription..."
                />
                <button type="button" className="mt-2 w-full rounded-lg bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">
                  Save Note
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Rx Stats Today</div>
              <div className="space-y-2 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Verified</span>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[#22c55e]">{stats.verified}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Pending</span>
                  <span className="rounded-full bg-[#f59e0b]/15 px-2 py-1 text-[#f59e0b]">{stats.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Clarification</span>
                  <span className="rounded-full bg-[#3b82f6]/15 px-2 py-1 text-[#3b82f6]">{stats.clarification}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Rejected</span>
                  <span className="rounded-full bg-[#ef4444]/15 px-2 py-1 text-[#ef4444]">{stats.rejected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openDetails ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
          <div className="w-full max-w-[760px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111a2a]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <div>
                <p className="text-xs text-[#94A3B8]">Prescription Details</p>
                <h3 className="text-sm font-semibold text-slate-100">{openDetails.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenDetailsId(null)}
                className="rounded-md border border-white/[0.12] bg-white/[0.03] px-2 py-1 text-xs text-[#CBD5E1]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-[1fr_260px]">
              <div className="rounded-xl border border-dashed border-[#3b82f6]/35 bg-[#3b82f6]/5 p-6 text-center">
                <p className="text-sm font-medium text-slate-100">Prescription Preview</p>
                <p className="mt-1 text-xs text-[#94A3B8]">Scanned copy area (as in HTML view panel)</p>
                <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 text-xs text-[#64748B]">
                  Preview placeholder
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Patient</span>
                  <span className="text-slate-100">{openDetails.patient}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Doctor</span>
                  <span className="text-slate-100">{openDetails.doctor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Uploaded</span>
                  <span className="text-slate-100">{openDetails.uploaded}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Order</span>
                  <span className="text-slate-100">{openDetails.orderId}</span>
                </div>
                <div className="pt-1">
                  <p className="mb-1 text-[#94A3B8]">Detected medicines</p>
                  <div className="space-y-1">
                    {openDetails.medicines.map((med) => (
                      <div key={med} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[#CBD5E1]">
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="rounded-md border border-[#14b8a6]/30 bg-[#14b8a6]/10 px-2 py-1.5 text-[11px] text-[#14b8a6]">
                    Verify Rx
                  </button>
                  <button className="rounded-md border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-2 py-1.5 text-[11px] text-[#f59e0b]">
                    Ask Clarification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
