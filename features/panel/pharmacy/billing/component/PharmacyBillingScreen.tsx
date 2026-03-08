"use client";

import { useMemo, useState } from "react";

type PayMode = "UPI" | "Cash" | "Card";

type Product = {
  id: string;
  name: string;
  brand: string;
  mrp: number;
  gst: number;
  batch: string;
};

type BillItem = Product & { qty: number };

type Sale = {
  id: string;
  patient: string;
  items: number;
  total: number;
  payment: PayMode;
  status: "Paid";
};

const catalog: Product[] = [
  { id: "MED-1", name: "Metformin 500mg", brand: "Glycomet", mrp: 5.5, gst: 5, batch: "BT-2240" },
  { id: "MED-2", name: "Atorvastatin 10mg", brand: "Atorva", mrp: 15, gst: 12, batch: "AT-1190" },
  { id: "MED-3", name: "Amoxicillin 500mg", brand: "Mox", mrp: 8, gst: 5, batch: "AM-0081" },
  { id: "MED-4", name: "Paracetamol 650mg", brand: "Dolo", mrp: 4.2, gst: 5, batch: "DL-4412" },
  { id: "MED-5", name: "Pantoprazole 40mg", brand: "Pan-40", mrp: 5.8, gst: 5, batch: "PN-0778" },
];

function formatRs(v: number) {
  return `₹${v.toFixed(2)}`;
}

export default function PharmacyBillingScreen() {
  const [billNo, setBillNo] = useState(8823);
  const [search, setSearch] = useState("");
  const [patient, setPatient] = useState("Walk-in");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<"flat" | "pct">("flat");
  const [payMode, setPayMode] = useState<PayMode>("UPI");
  const [cashTendered, setCashTendered] = useState(0);
  const [items, setItems] = useState<BillItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([
    { id: "BILL-08822", patient: "Sunita Rao", items: 3, total: 955, payment: "UPI", status: "Paid" },
    { id: "BILL-08821", patient: "Arjun Kumar", items: 2, total: 142, payment: "Cash", status: "Paid" },
  ]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return catalog.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(q));
  }, [search]);

  const subtotal = useMemo(() => items.reduce((sum, row) => sum + row.mrp * row.qty, 0), [items]);
  const gst = useMemo(() => items.reduce((sum, row) => sum + (row.mrp * row.qty * row.gst) / 100, 0), [items]);
  const discount = useMemo(() => {
    if (discountType === "flat") return Math.max(0, discountValue);
    return (subtotal * Math.max(0, discountValue)) / 100;
  }, [discountType, discountValue, subtotal]);
  const total = Math.max(0, subtotal + gst - discount);
  const change = Math.max(0, cashTendered - total);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setSearch("");
  };

  const clearBill = () => {
    setItems([]);
    setDiscountValue(0);
    setCashTendered(0);
    setPatient("Walk-in");
    setPayMode("UPI");
  };

  const completeBill = () => {
    if (items.length === 0) return;
    const newSale: Sale = {
      id: `BILL-0${billNo}`,
      patient: patient || "Walk-in",
      items: items.length,
      total,
      payment: payMode,
      status: "Paid",
    };
    setSales((prev) => [newSale, ...prev].slice(0, 6));
    setBillNo((n) => n + 1);
    clearBill();
  };

  const todayRevenue = sales.reduce((s, row) => s + row.total, 0);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="grid h-[calc(100vh-108px)] gap-3 xl:grid-cols-[1fr_340px]">
        <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">POS - New Bill</div>
                <div className="text-[11px] text-[#94A3B8]">Bill #BILL-0{billNo}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={clearBill} className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]">Clear</button>
                <button onClick={() => addItem(catalog[0])} className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white">+ Add Item</button>
              </div>
            </div>

            <div className="flex gap-2 border-b border-white/[0.07] p-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicine, brand or barcode..."
                className="flex-1 rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100 outline-none"
              />
              <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">Scan</button>
            </div>

            {filtered.length > 0 ? (
              <div className="max-h-[180px] overflow-y-auto border-b border-white/[0.07]">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className="flex w-full items-center justify-between border-b border-white/[0.06] px-4 py-2 text-left last:border-b-0 hover:bg-white/[0.03]"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-100">{item.name}</div>
                      <div className="text-[10px] text-[#64748B]">{item.brand}</div>
                    </div>
                    <div className="text-xs text-[#14b8a6]">{formatRs(item.mrp)}</div>
                  </button>
                ))}
              </div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Medicine</th>
                    <th className="px-4 py-2">Batch</th>
                    <th className="px-4 py-2">MRP</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">GST</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-xs text-[#64748B]">
                        Add items to begin billing
                      </td>
                    </tr>
                  ) : (
                    items.map((row, idx) => (
                      <tr key={row.id} className="border-b border-white/[0.07] last:border-b-0">
                        <td className="px-4 py-2 text-xs text-[#64748B]">{idx + 1}</td>
                        <td className="px-4 py-2">
                          <div className="text-xs text-slate-100">{row.name}</div>
                          <div className="text-[10px] text-[#64748B]">{row.brand}</div>
                        </td>
                        <td className="px-4 py-2 text-xs text-[#CBD5E1]">{row.batch}</td>
                        <td className="px-4 py-2 text-xs text-[#CBD5E1]">{formatRs(row.mrp)}</td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min={1}
                            value={row.qty}
                            onChange={(e) =>
                              setItems((prev) =>
                                prev.map((it) =>
                                  it.id === row.id ? { ...it, qty: Math.max(1, Number(e.target.value || 1)) } : it
                                )
                              )
                            }
                            className="w-12 rounded border border-white/[0.1] bg-white/[0.04] px-1.5 py-1 text-xs text-slate-100"
                          />
                        </td>
                        <td className="px-4 py-2 text-xs text-[#64748B]">{row.gst}%</td>
                        <td className="px-4 py-2 text-xs font-semibold text-slate-100">{formatRs(row.mrp * row.qty)}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => setItems((prev) => prev.filter((it) => it.id !== row.id))}
                            className="rounded border border-white/[0.1] px-2 py-1 text-[10px] text-[#CBD5E1]"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="text-[13px] font-semibold text-slate-100">Recent Bills - Today</div>
              <div className="text-xs text-[#94A3B8]">{formatRs(todayRevenue)} in {sales.length} bills</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-4 py-2">Bill</th>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((s) => (
                    <tr key={s.id} className="border-b border-white/[0.07] last:border-b-0">
                      <td className="px-4 py-2 text-xs text-slate-100">{s.id}</td>
                      <td className="px-4 py-2 text-xs text-[#CBD5E1]">{s.patient}</td>
                      <td className="px-4 py-2 text-xs text-[#CBD5E1]">{s.items}</td>
                      <td className="px-4 py-2 text-xs font-semibold text-slate-100">{formatRs(s.total)}</td>
                      <td className="px-4 py-2"><span className="rounded-full bg-[#3b82f6]/15 px-2 py-1 text-[10px] text-[#3b82f6]">{s.payment}</span></td>
                      <td className="px-4 py-2"><span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-4 py-3 text-[13px] font-semibold text-slate-100">Payment</div>
          <div className="min-h-0 flex-1 space-y-3 overflow-auto p-4">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.06em] text-[#64748B]">Patient</div>
              <input value={patient} onChange={(e) => setPatient(e.target.value)} className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
            </div>

            <div className="rounded-lg bg-white/[0.03] p-3">
              <div className="flex justify-between text-xs text-[#94A3B8]"><span>Subtotal</span><span>{formatRs(subtotal)}</span></div>
              <div className="mt-1 flex justify-between text-xs text-[#94A3B8]"><span>GST</span><span>{formatRs(gst)}</span></div>
              <div className="mt-1 flex justify-between text-xs text-[#94A3B8]"><span>Discount</span><span>-{formatRs(discount)}</span></div>
              <div className="mt-2 border-t border-white/[0.07] pt-2 flex justify-between text-sm font-semibold text-slate-100"><span>Total</span><span>{formatRs(total)}</span></div>
            </div>

            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.06em] text-[#64748B]">Discount</div>
              <div className="flex gap-2">
                <input type="number" value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value || 0))} className="w-20 rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
                <select value={discountType} onChange={(e) => setDiscountType(e.target.value as "flat" | "pct")} className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100">
                  <option value="flat">₹ Flat</option>
                  <option value="pct">% Percent</option>
                </select>
              </div>
            </div>

            <div>
              <div className="mb-2 text-[11px] uppercase tracking-[0.06em] text-[#64748B]">Payment Mode</div>
              <div className="grid grid-cols-3 gap-2">
                {(["UPI", "Cash", "Card"] as PayMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayMode(m)}
                    className={`rounded-md border px-2 py-2 text-xs ${
                      payMode === m
                        ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                        : "border-white/[0.1] bg-white/[0.04] text-[#CBD5E1]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.06em] text-[#64748B]">Cash Tendered</div>
              <div className="flex gap-2">
                <input type="number" value={cashTendered} onChange={(e) => setCashTendered(Number(e.target.value || 0))} className="flex-1 rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" />
                <div className="min-w-[86px] rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-2 text-center text-xs text-[#22c55e]">
                  {formatRs(change)}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] p-4">
            <div className="mb-3 text-center font-mono text-2xl font-bold text-slate-100">{formatRs(total)}</div>
            <button onClick={completeBill} className="w-full rounded-md bg-[#14b8a6] px-3 py-3 text-sm font-semibold text-white hover:brightness-110">
              Complete Bill & Print
            </button>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-2 text-[11px] text-[#CBD5E1]">Print Only</button>
              <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-2 text-[11px] text-[#CBD5E1]">Hold Bill</button>
              <button onClick={clearBill} className="rounded-md border border-[#ef4444]/40 bg-[#ef4444]/15 px-2 py-2 text-[11px] text-[#ef4444]">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
