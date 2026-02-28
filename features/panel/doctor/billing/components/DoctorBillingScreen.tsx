"use client";

import { type ReactNode, useMemo, useState } from "react";
import { CheckCheck, ChevronDown, ChevronUp, Clock3, CreditCard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingInvoice, InvoiceStatus } from "../types";
import NewInvoiceModal from "./NewInvoiceModal";

const seedInvoices: BillingInvoice[] = [
  { id: "INV-0188", patient: "Arjun Kumar", service: "Consultation", amount: 500, date: "20 Feb", status: "PAID", mode: "UPI" },
  { id: "INV-0187", patient: "Priya Menon", service: "Follow-up", amount: 300, date: "20 Feb", status: "PENDING", mode: "—" },
  { id: "INV-0186", patient: "Sunita Rao", service: "Procedure", amount: 1200, date: "20 Feb", status: "PENDING", mode: "—" },
  { id: "INV-0185", patient: "Vikram Nair", service: "Consultation", amount: 500, date: "19 Feb", status: "PAID", mode: "Cash" },
  { id: "INV-0184", patient: "Deepa Sharma", service: "Blood Test", amount: 800, date: "18 Feb", status: "PENDING", mode: "—" },
  { id: "INV-0183", patient: "Ravi Pillai", service: "Consultation", amount: 500, date: "18 Feb", status: "PAID", mode: "Card" },
  { id: "INV-0182", patient: "Meena Joshi", service: "Follow-up", amount: 300, date: "15 Feb", status: "PAID", mode: "UPI" },
];

export default function DoctorBillingScreen() {
  const [invoices, setInvoices] = useState<BillingInvoice[]>(seedInvoices);
  const [filter, setFilter] = useState<"all" | InvoiceStatus>("all");
  const [openModal, setOpenModal] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return invoices;
    return invoices.filter((i) => i.status === filter);
  }, [filter, invoices]);

  const stats = useMemo(() => {
    const pending = invoices.filter((i) => i.status === "PENDING");
    const pendingAmount = pending.reduce((sum, i) => sum + i.amount, 0);
    return {
      pendingAmount,
      pendingCount: pending.length,
      collectedMonth: 88500,
      totalInvoices: invoices.length,
    };
  }, [invoices]);

  return (
    <div className="min-h-screen bg-slate-50 px-7 py-[22px] dark:bg-[#111827]">
      <div className="w-full space-y-[18px]">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Pending Invoices"
            value={`₹${stats.pendingAmount.toLocaleString("en-IN")}`}
            delta={`${stats.pendingCount} due`}
            deltaTone="down"
            icon={<Clock3 className="h-[16px] w-[16px]" />}
            iconTone="amber"
          />

          <StatCard
            label="Collected This Month"
            value={`₹${stats.collectedMonth.toLocaleString("en-IN")}`}
            delta="+12%"
            deltaTone="up"
            icon={<CheckCheck className="h-[16px] w-[16px]" />}
            iconTone="green"
          />

          <StatCard
            label="Total Invoices"
            value={`${stats.totalInvoices}`}
            delta="+8"
            deltaTone="up"
            icon={<CreditCard className="h-[16px] w-[16px]" />}
            iconTone="blue"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[10px]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All" },
              { id: "PENDING", label: "Pending" },
              { id: "PAID", label: "Paid" },
            ].map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id as "all" | InvoiceStatus)}
                  className={
                    active
                      ? "rounded-[20px] border border-blue-500/40 bg-blue-500/15 px-3 py-[5px] text-[11.5px] font-medium text-blue-400"
                      : "rounded-[20px] border border-slate-200 bg-transparent px-3 py-[5px] text-[11.5px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-white/[0.07] dark:text-[#94A3B8] dark:hover:border-white/20 dark:hover:text-slate-200"
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
          >
            <Plus className="h-[13px] w-[13px]" />
            New Invoice
          </button>
        </div>

        <div className="flex flex-col gap-[10px]" id="inv-list">
          {filtered.map((invoice) => {
            const pending = invoice.status === "PENDING";
            return (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-[12px] border border-slate-200 bg-white px-[18px] py-4 transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20"
              >
                <div>
                  <div className="text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">{invoice.id}</div>
                  <div className="mt-[2px] text-[11.5px] text-slate-500 dark:text-slate-300">
                    {invoice.patient} · {invoice.service}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium",
                      pending ? "bg-[rgba(245,158,11,0.12)] text-[#fbbf24]" : "bg-[rgba(34,197,94,0.12)] text-[#4ade80]"
                    )}
                  >
                    <span className={cn("h-[5px] w-[5px] rounded-full", pending ? "bg-[#fbbf24]" : "bg-[#4ade80]")} />
                    {invoice.status}
                  </span>

                  {pending ? (
                    <button
                      type="button"
                      onClick={() =>
                        setInvoices((prev) =>
                          prev.map((i) => (i.id === invoice.id ? { ...i, status: "PAID", mode: "UPI" } : i))
                        )
                      }
                      className="rounded-[7px] border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.12)] px-[10px] py-1 text-[11px] font-semibold text-[#22c55e] hover:bg-[rgba(34,197,94,0.22)]"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <span className="min-w-[36px] text-center text-[11.5px] text-slate-500 dark:text-[#94A3B8]">{invoice.mode}</span>
                  )}

                  <div className="text-right">
                    <div className="text-[15px] font-bold text-slate-900 dark:text-slate-100">₹{invoice.amount.toLocaleString("en-IN")}</div>
                    <div className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{invoice.date}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NewInvoiceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={(invoice) => {
          setInvoices((prev) => [invoice, ...prev]);
          setOpenModal(false);
        }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  deltaTone,
  icon,
  iconTone,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down";
  icon: ReactNode;
  iconTone: "blue" | "green" | "amber";
}) {
  return (
    <div className="rounded-[14px] border border-slate-200 bg-white px-[18px] py-4 dark:border-white/[0.07] dark:bg-[#161f30]">
      <div className="mb-[10px] flex items-center justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-[10px]",
            iconTone === "blue" && "bg-blue-500/15 text-blue-400",
            iconTone === "green" && "bg-green-500/15 text-green-400",
            iconTone === "amber" && "bg-amber-500/15 text-amber-400"
          )}
        >
          {icon}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-[999px] px-[8px] py-[3px] text-[10px] font-semibold",
            deltaTone === "up" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          )}
        >
          {deltaTone === "up" ? <ChevronUp className="h-[11px] w-[11px]" /> : <ChevronDown className="h-[11px] w-[11px]" />}
          {delta}
        </span>
      </div>

      <div className="text-[27px] font-bold leading-none tracking-[-0.01em] text-slate-900 dark:text-slate-100">{value}</div>
      <div className="mt-[7px] text-[12px] text-slate-500 dark:text-[#94A3B8]">{label}</div>
    </div>
  );
}
