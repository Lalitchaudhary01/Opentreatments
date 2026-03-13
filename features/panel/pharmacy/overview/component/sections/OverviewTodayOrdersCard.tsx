"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Eye,
  Pill,
  StickyNote,
  Truck,
  UserRound,
  X,
} from "lucide-react";

export type OverviewOrderRow = {
  id: string;
  patient: string;
  items: number;
  hasRx: boolean;
  amount: number;
  status: string;
};

type Props = {
  dateLabel: string;
  orders: OverviewOrderRow[];
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function initials(name?: string | null) {
  if (!name?.trim()) return "PT";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function orderStatusTone(status: string) {
  if (status === "DELIVERED") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "CANCELLED") return "bg-[#ef4444]/15 text-[#ef4444]";
  if (status === "PACKED") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "CONFIRMED") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

function drawerPrimaryAction(status: string) {
  if (status === "PENDING") return "Accept Order";
  if (status === "CONFIRMED") return "Mark as Packed";
  if (status === "PACKED") return "Dispatch Now";
  if (status === "DELIVERED") return "Delivered";
  return "Update Order";
}

export default function OverviewTodayOrdersCard({ dateLabel, orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<OverviewOrderRow | null>(null);
  const [note, setNote] = useState("");

  const drawerOpen = !!selectedOrder;

  return (
    <>
      <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
          <div>
            <div className="text-[13px] font-semibold text-slate-100">Today's Orders</div>
            <div className="mt-[2px] text-[11px] text-[#94A3B8]">
              {dateLabel} · {orders.length} orders
            </div>
          </div>
          <Link href="/pharmacy/orders" className="text-[11.5px] font-medium text-[#3b82f6]">
            <span className="inline-flex items-center gap-1">
              <Truck className="h-3.5 w-3.5" />
              Manage all →
            </span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                <th className="px-[18px] py-[9px]"></th>
                <th className="px-[18px] py-[9px]">Order</th>
                <th className="px-[18px] py-[9px]">Patient</th>
                <th className="px-[18px] py-[9px]">Items</th>
                <th className="px-[18px] py-[9px]">Rx</th>
                <th className="px-[18px] py-[9px]">Amount</th>
                <th className="px-[18px] py-[9px]">Status</th>
                <th className="px-[18px] py-[9px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                  <td className="px-[18px] py-[11px]">
                    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#3b82f6]/20 text-[10px] font-bold text-[#60a5fa]">
                      {initials(order.patient)}
                    </div>
                  </td>
                  <td className="px-[18px] py-[11px] text-[12px] text-slate-100">#{order.id}</td>
                  <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{order.patient}</td>
                  <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{order.items}</td>
                  <td className="px-[18px] py-[11px] text-[12px] text-[#f59e0b]">{order.hasRx ? "Yes" : "No"}</td>
                  <td className="px-[18px] py-[11px] text-[12px] text-[#14b8a6]">{formatAmount(order.amount)}</td>
                  <td className="px-[18px] py-[11px]">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${orderStatusTone(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-[18px] py-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setNote("");
                      }}
                      className="inline-flex items-center gap-1 rounded-[7px] border border-white/[0.1] bg-white/[0.06] px-3 py-[6px] text-[11.5px] text-[#94A3B8] hover:bg-white/[0.1] hover:text-[#CBD5E1]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          onClick={() => setSelectedOrder(null)}
          className={`absolute inset-0 bg-black/55 backdrop-blur-[3px] transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[420px] border-l border-white/[0.1] bg-[#111b2d] shadow-2xl transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedOrder ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/[0.1] px-[22px] py-[18px]">
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-100">Order #{selectedOrder.id}</h3>
                  <p className="mt-[3px] text-[11px] text-[#64748B]">8 min ago | Home Delivery | COD</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-white/[0.06] text-[#94A3B8] hover:bg-white/[0.12]"
                >
                  <X className="h-[14px] w-[14px]" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-[22px] py-5 text-[12px]">
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${orderStatusTone(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                  {selectedOrder.hasRx ? (
                    <span className="rounded-full bg-[#f59e0b]/15 px-2 py-1 text-[10px] font-medium text-[#f59e0b]">Rx Required</span>
                  ) : null}
                  <span className="rounded-full bg-[#3b82f6]/15 px-2 py-1 text-[10px] font-medium text-[#60a5fa]">Home</span>
                  <span className="rounded-full bg-[#14b8a6]/15 px-2 py-1 text-[10px] font-medium text-[#2dd4bf]">COD</span>
                </div>

                <div className="rounded-[10px] border border-white/[0.1] bg-white/[0.02] p-[12px_14px]">
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[.06em] text-[#64748B]">
                    <UserRound className="h-3.5 w-3.5" />
                    Patient
                  </div>
                  <div className="mt-[6px] flex items-center gap-[10px]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b82f6]/20 text-[11px] font-bold text-[#60a5fa]">
                      {initials(selectedOrder.patient)}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-semibold text-slate-100">{selectedOrder.patient}</div>
                      <div className="text-[12px] text-[#94A3B8]">+91 98XXXXXX21</div>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[.06em] text-[#64748B]">
                  <Pill className="h-3.5 w-3.5" />
                  Items ({selectedOrder.items})
                </div>
                <div className="overflow-hidden rounded-[10px] border border-white/[0.1]">
                  <div className="flex items-center justify-between border-b border-white/[0.1] px-[15px] py-[11px]">
                    <div>
                      <div className="text-[12.5px] font-medium text-slate-100">Prescription Medicines</div>
                      <div className="text-[11px] text-[#64748B]">Qty: {selectedOrder.items}</div>
                    </div>
                    <div className="font-semibold text-slate-100">{formatAmount(selectedOrder.amount)}</div>
                  </div>
                  <div className="flex items-center justify-between bg-white/[0.03] px-[15px] py-[11px]">
                    <span className="font-semibold text-[#CBD5E1]">Total</span>
                    <span className="text-[15px] font-bold text-slate-100">{formatAmount(selectedOrder.amount)}</span>
                  </div>
                </div>

                {selectedOrder.hasRx ? (
                  <div className="rounded-[10px] border border-[#f59e0b]/25 bg-[#f59e0b]/10 px-[14px] py-[11px] text-[12px] text-[#fbbf24]">
                    Prescription required - verify before packing
                  </div>
                ) : null}

                <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[.06em] text-[#64748B]">
                  <StickyNote className="h-3.5 w-3.5" />
                  Pharmacist Note
                </div>
                <div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Substitutions, missing items, patient instructions..."
                    className="h-20 w-full resize-none rounded-[8px] border border-white/[0.1] bg-white/[0.04] px-[11px] py-[9px] text-[12px] text-[#CBD5E1] outline-none placeholder:text-[#64748B]"
                  />
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.1] px-[22px] py-[14px]">
                <button className="inline-flex items-center gap-1 rounded-[8px] border border-[#3b82f6]/35 bg-[#3b82f6]/20 px-3 py-[7px] text-[11.5px] font-medium text-[#93c5fd]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {drawerPrimaryAction(selectedOrder.status)}
                </button>
                <button className="inline-flex items-center gap-1 rounded-[8px] border border-[#f59e0b]/35 bg-[#f59e0b]/20 px-3 py-[7px] text-[11.5px] font-medium text-[#fbbf24]">
                  <Pill className="h-3.5 w-3.5" />
                  Substitutes
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="inline-flex items-center gap-1 rounded-[8px] border border-white/[0.1] bg-white/[0.06] px-3 py-[7px] text-[11.5px] text-[#94A3B8]"
                >
                  <X className="h-3.5 w-3.5" />
                  Save & Close
                </button>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
