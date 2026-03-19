import { CreditCard, Receipt, Search } from "lucide-react";

const bills = [
  {
    patient: "Sunita Kapoor",
    tests: "CBC, ESR",
    collection: "Home",
    total: 980,
    payment: "PAID",
    method: "UPI",
    date: "19 Mar 2026",
  },
  {
    patient: "Rakesh Verma",
    tests: "Lipid Profile",
    collection: "Walk-in",
    total: 900,
    payment: "PENDING",
    method: "Cash",
    date: "19 Mar 2026",
  },
  {
    patient: "Anjali Shah",
    tests: "HbA1c",
    collection: "Home",
    total: 700,
    payment: "PAID",
    method: "Card",
    date: "18 Mar 2026",
  },
];

export default function LabBillingPage() {
  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Billing & Payments</h1>
            <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">₹18,460 collected today · 12 invoices pending</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[230px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search invoice..."
                className="h-[34px] w-full rounded-[8px] border border-slate-200 bg-slate-100 pl-9 pr-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100"
              />
            </div>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
              <Receipt className="h-3.5 w-3.5" />
              Export
            </button>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <CreditCard className="h-3.5 w-3.5" />
              New Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { label: "Collected Today", value: "₹18,460", tone: "text-[#22c55e]" },
            { label: "Pending Invoices", value: "12", tone: "text-[#f59e0b]" },
            { label: "Avg. Ticket", value: "₹1,125", tone: "text-[#60a5fa]" },
          ].map((card) => (
            <div key={card.label} className="rounded-[12px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">{card.label}</div>
              <div className={`mt-1 text-[22px] font-semibold ${card.tone}`}>{card.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Tests</th>
                  <th className="px-4 py-3 font-semibold">Collection</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Method</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((row) => (
                  <tr key={`${row.patient}-${row.date}`} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{row.patient}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.tests}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.collection}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">₹{row.total}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          row.payment === "PAID" ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#f59e0b]/15 text-[#f59e0b]"
                        }`}
                      >
                        {row.payment}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.method}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-[#94A3B8]">{row.date}</td>
                    <td className="px-4 py-3">
                      <button className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                        View
                      </button>
                    </td>
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
