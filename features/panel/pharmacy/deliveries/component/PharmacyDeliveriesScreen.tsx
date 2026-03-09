"use client";

import { useMemo, useState } from "react";

type DeliveryStatus = "Assigned" | "Picked" | "In Transit" | "Delivered" | "Failed";

type DeliveryRow = {
  id: string;
  orderId: string;
  rider: string;
  eta: string;
  zone: string;
  status: DeliveryStatus;
};

const deliveries: DeliveryRow[] = [
  { id: "DL-4401", orderId: "ORD-9821", rider: "Akash S", eta: "12m", zone: "Koregaon Park", status: "Assigned" },
  { id: "DL-4398", orderId: "ORD-9814", rider: "Nitin P", eta: "20m", zone: "Camp", status: "Picked" },
  { id: "DL-4391", orderId: "ORD-9808", rider: "Sahil K", eta: "8m", zone: "Aundh", status: "In Transit" },
  { id: "DL-4387", orderId: "ORD-9803", rider: "Dheeraj M", eta: "Done", zone: "Kothrud", status: "Delivered" },
  { id: "DL-4384", orderId: "ORD-9799", rider: "Ritesh N", eta: "-", zone: "Baner", status: "Failed" },
];

function tone(status: DeliveryStatus) {
  if (status === "Delivered") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "Failed") return "bg-[#ef4444]/15 text-[#ef4444]";
  if (status === "In Transit") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  if (status === "Picked") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

export default function PharmacyDeliveriesScreen() {
  const [active, setActive] = useState<DeliveryStatus | "All">("All");

  const rows = useMemo(
    () => (active === "All" ? deliveries : deliveries.filter((item) => item.status === active)),
    [active]
  );

  const counts = useMemo(
    () => ({
      assigned: deliveries.filter((d) => d.status === "Assigned").length,
      transit: deliveries.filter((d) => d.status === "In Transit").length,
      done: deliveries.filter((d) => d.status === "Delivered").length,
      failed: deliveries.filter((d) => d.status === "Failed").length,
    }),
    []
  );

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Assigned</div><div className="mt-1 text-[22px] font-bold text-slate-100">{counts.assigned}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">In Transit</div><div className="mt-1 text-[22px] font-bold text-slate-100">{counts.transit}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Delivered</div><div className="mt-1 text-[22px] font-bold text-slate-100">{counts.done}</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Failed</div><div className="mt-1 text-[22px] font-bold text-slate-100">{counts.failed}</div></div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", "Assigned", "Picked", "In Transit", "Delivered", "Failed"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                active === item
                  ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                  : "border-white/[0.08] bg-transparent text-[#94A3B8] hover:text-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-100">Delivery Dispatch Board</h2>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">{rows.length} deliveries</p>
            </div>
            <button className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white">Assign Rider</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-[18px] py-[9px]">Delivery ID</th>
                  <th className="px-[18px] py-[9px]">Order ID</th>
                  <th className="px-[18px] py-[9px]">Rider</th>
                  <th className="px-[18px] py-[9px]">ETA</th>
                  <th className="px-[18px] py-[9px]">Zone</th>
                  <th className="px-[18px] py-[9px]">Status</th>
                  <th className="px-[18px] py-[9px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                    <td className="px-[18px] py-[11px] text-[12px] font-medium text-slate-100">{row.id}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#CBD5E1]">{row.orderId}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{row.rider}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.eta}</td>
                    <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{row.zone}</td>
                    <td className="px-[18px] py-[11px]"><span className={`rounded-full px-2 py-1 text-[10px] font-medium ${tone(row.status)}`}>{row.status}</span></td>
                    <td className="px-[18px] py-[11px]"><button className="rounded-md border border-white/[0.12] bg-white/[0.03] px-2 py-1 text-[10px] text-[#CBD5E1]">Track</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
