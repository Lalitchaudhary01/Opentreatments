"use client";

const txns = [
  { id: "TXN-00881", date: "27 Feb", patient: "Priya Menon", order: "PH-8841", gross: 955, discount: 0, net: 955, margin: 38, status: "paid" },
  { id: "TXN-00880", date: "27 Feb", patient: "Arjun Kumar", order: "PH-8840", gross: 142, discount: 0, net: 142, margin: 32, status: "cod" },
  { id: "TXN-00879", date: "27 Feb", patient: "Sunita Rao", order: "PH-8839", gross: 222, discount: 22, net: 200, margin: 36, status: "paid" },
  { id: "TXN-00878", date: "27 Feb", patient: "Vikram Nair", order: "PH-8838", gross: 168, discount: 0, net: 168, margin: 42, status: "paid" },
];

function rs(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function PharmacyEarningsScreen() {
  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="rounded-[16px] border border-[#14b8a6]/25 bg-gradient-to-r from-[#14b8a6]/20 to-[#0f766e]/10 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5eead4]">Next Payout</div>
              <div className="mt-1 text-[36px] font-bold leading-none tracking-[-0.04em] text-white">₹1,42,840</div>
              <div className="mt-2 text-xs text-[#94A3B8]">
                Scheduled: <span className="font-semibold text-[#34d399]">Monday, Mar 3, 2026</span>
              </div>
            </div>
            <div className="grid min-w-[220px] gap-2">
              <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs"><span className="text-[#94A3B8]">Gross Revenue</span><span className="font-bold text-white">₹1,68,200</span></div>
              <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs"><span className="text-[#94A3B8]">Platform Fee (8%)</span><span className="font-bold text-[#ef4444]">-₹13,456</span></div>
              <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs"><span className="text-[#94A3B8]">Refunds</span><span className="font-bold text-[#ef4444]">-₹11,904</span></div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[11px] text-[#CBD5E1]">View History</button>
              <button className="rounded bg-[#3B82F6] px-3 py-2 text-[11px] font-medium text-white">Download Report</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Revenue (Feb)</div><div className="mt-1 text-[24px] font-bold text-[#22c55e]">₹5.6L</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Avg Margin</div><div className="mt-1 text-[24px] font-bold text-[#14b8a6]">34.2%</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Refunds</div><div className="mt-1 text-[24px] font-bold text-[#ef4444]">₹11.9K</div></div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4"><div className="text-[11px] text-[#94A3B8]">Orders Filled</div><div className="mt-1 text-[24px] font-bold text-[#3b82f6]">1,284</div></div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <div>
              <div className="text-[13px] font-semibold text-slate-100">Transaction History</div>
              <div className="text-[11px] text-[#94A3B8]">February 2026</div>
            </div>
            <button className="rounded border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-4 py-2">Txn ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Order</th>
                  <th className="px-4 py-2">Gross</th>
                  <th className="px-4 py-2">Discount</th>
                  <th className="px-4 py-2">Net</th>
                  <th className="px-4 py-2">Margin</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.07] last:border-b-0">
                    <td className="px-4 py-2 text-xs text-slate-100">{t.id}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{t.date}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{t.patient}</td>
                    <td className="px-4 py-2 text-xs text-[#CBD5E1]">{t.order}</td>
                    <td className="px-4 py-2 text-xs text-slate-100">{rs(t.gross)}</td>
                    <td className="px-4 py-2 text-xs text-[#ef4444]">-{rs(t.discount)}</td>
                    <td className="px-4 py-2 text-xs font-semibold text-[#14b8a6]">{rs(t.net)}</td>
                    <td className="px-4 py-2 text-xs text-slate-100">{t.margin}%</td>
                    <td className="px-4 py-2">
                      <span className={`rounded-full px-2 py-1 text-[10px] ${t.status === "paid" ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}>
                        {t.status.toUpperCase()}
                      </span>
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
