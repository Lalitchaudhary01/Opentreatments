"use client";

import { ReactNode, useMemo, useState } from "react";
import { ArrowUpRight, CreditCard, FileText, Plus, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingInvoice, InvoiceStatus } from "../types";
import NewInvoiceModal from "./NewInvoiceModal";

const seedInvoices: BillingInvoice[] = [
  { id: "INV-0188", patient: "Arjun Kumar", service: "Consultation", amount: 500, date: "20 Feb", status: "PAID", mode: "UPI" },
  { id: "INV-0187", patient: "Priya Menon", service: "Follow-up", amount: 300, date: "20 Feb", status: "PENDING", mode: "-" },
  { id: "INV-0186", patient: "Sunita Rao", service: "Procedure", amount: 1200, date: "20 Feb", status: "PENDING", mode: "-" },
  { id: "INV-0185", patient: "Vikram Nair", service: "Consultation", amount: 500, date: "19 Feb", status: "PAID", mode: "Cash" },
  { id: "INV-0184", patient: "Deepa Sharma", service: "Blood Test", amount: 800, date: "18 Feb", status: "PENDING", mode: "-" },
  { id: "INV-0183", patient: "Ravi Pillai", service: "Consultation", amount: 500, date: "18 Feb", status: "PAID", mode: "Card" },
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
    const paid = invoices.filter((i) => i.status === "PAID");
    const pending = invoices.filter((i) => i.status === "PENDING");
    const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
    const pendingAmount = pending.reduce((sum, i) => sum + i.amount, 0);

    return {
      totalRevenue: totalAmount,
      collected: paid.reduce((sum, i) => sum + i.amount, 0),
      pendingAmount,
      totalInvoices: invoices.length,
      pendingCount: pending.length,
    };
  }, [invoices]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Total Revenue"
            value={`Rs ${stats.totalRevenue.toLocaleString()}`}
            helper="+12%"
            icon={<Wallet className="w-4 h-4" />}
          />
          <StatCard
            label="Collected"
            value={`Rs ${stats.collected.toLocaleString()}`}
            helper="Paid"
            icon={<CreditCard className="w-4 h-4" />}
          />
          <StatCard
            label="Pending Amount"
            value={`Rs ${stats.pendingAmount.toLocaleString()}`}
            helper={`${stats.pendingCount} inv`}
            icon={<FileText className="w-4 h-4" />}
            helperTone="amber"
          />
          <StatCard
            label="Total Invoices"
            value={`${stats.totalInvoices}`}
            helper={`+${Math.max(1, Math.floor(stats.totalInvoices / 4))}`}
            icon={<FileText className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {["all", "PENDING", "PAID"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f as "all" | InvoiceStatus)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm border transition-colors",
                  filter === f
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                    : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300"
                )}
              >
                {f === "all" ? "All" : f === "PENDING" ? "Pending" : "Paid"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>

        <div className="space-y-2.5">
          {filtered.map((invoice) => (
            <div
              key={invoice.id}
              className="rounded-xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {invoice.id}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {invoice.patient} · {invoice.service}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium",
                    invoice.status === "PAID"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-amber-500/15 text-amber-400"
                  )}
                >
                  {invoice.status}
                </span>

                {invoice.status === "PENDING" ? (
                  <button
                    type="button"
                    onClick={() =>
                      setInvoices((prev) =>
                        prev.map((i) =>
                          i.id === invoice.id ? { ...i, status: "PAID", mode: "UPI" } : i
                        )
                      )
                    }
                    className="px-3 py-1.5 rounded-lg text-xs bg-green-500 text-white hover:bg-green-400"
                  >
                    Mark Paid
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-[52px] text-center">
                    {invoice.mode}
                  </span>
                )}

                <div className="text-right min-w-[90px]">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Rs {invoice.amount.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{invoice.date}</p>
                </div>
              </div>
            </div>
          ))}
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
  helper,
  icon,
  helperTone = "green",
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
  helperTone?: "green" | "amber";
}) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">{icon}</div>
        <div
          className={cn(
            "px-2 py-1 rounded-full text-[10px] inline-flex items-center gap-1",
            helperTone === "green"
              ? "bg-green-500/15 text-green-400"
              : "bg-amber-500/15 text-amber-400"
          )}
        >
          <ArrowUpRight className="w-3 h-3" />
          {helper}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}
