"use client";

import { useEffect, useMemo, useState } from "react";

import { addStockEntry } from "@/features/panel/pharmacy/pharmacy-inventory/actions/addStockEntry";
import { getInventory } from "@/features/panel/pharmacy/pharmacy-inventory/actions/getInventory";
import { StockEntry } from "@/features/panel/pharmacy/pharmacy-inventory/types/pharmacyInventory";
import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";

type FilterKey = "all" | "low" | "out" | "expiring" | "ok";

function daysLeft(expiry: Date | string) {
  const now = new Date();
  const d = new Date(expiry);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function pill(label: string, tone: "blue" | "amber" | "red" | "green" | "orange") {
  const cls =
    tone === "green"
      ? "bg-[#22c55e]/15 text-[#22c55e]"
      : tone === "amber"
        ? "bg-[#f59e0b]/15 text-[#f59e0b]"
        : tone === "orange"
          ? "bg-[#fb923c]/15 text-[#fb923c]"
          : tone === "red"
            ? "bg-[#ef4444]/15 text-[#ef4444]"
            : "bg-[#3b82f6]/15 text-[#3b82f6]";

  return <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${cls}`}>{label}</span>;
}

function formatRs(v: number) {
  return `₹${v.toFixed(2)}`;
}

export default function PharmacyInventoryScreen() {
  const [inventory, setInventory] = useState<StockEntry[]>([]);
  const [medicines, setMedicines] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    medicineId: "",
    batchNumber: "",
    quantity: "1",
    expiryDate: "",
    purchasePrice: "",
    sellingPrice: "",
  });

  const load = async () => {
    const [inv, meds] = await Promise.all([getInventory(), getMedicines()]);
    setInventory(inv);
    const mapped = meds.map((m) => ({ id: m.id, name: m.name }));
    setMedicines(mapped);
    setForm((prev) => ({ ...prev, medicineId: prev.medicineId || mapped[0]?.id || "" }));
  };

  useEffect(() => {
    load().catch(() => {
      setInventory([]);
      setMedicines([]);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = inventory;

    if (filter === "low") rows = rows.filter((r) => r.quantity > 0 && r.quantity < 20);
    if (filter === "out") rows = rows.filter((r) => r.quantity === 0);
    if (filter === "expiring") rows = rows.filter((r) => daysLeft(r.expiryDate) >= 0 && daysLeft(r.expiryDate) <= 30);
    if (filter === "ok") rows = rows.filter((r) => r.quantity >= 20 && daysLeft(r.expiryDate) > 30);

    if (q) {
      rows = rows.filter((r) => {
        const n = (r.medicine?.name || "").toLowerCase();
        const b = (r.medicine?.brand || "").toLowerCase();
        const batch = (r.batchNumber || "").toLowerCase();
        return n.includes(q) || b.includes(q) || batch.includes(q);
      });
    }

    return rows;
  }, [filter, inventory, search]);

  const stats = useMemo(() => {
    const low = inventory.filter((r) => r.quantity > 0 && r.quantity < 20).length;
    const out = inventory.filter((r) => r.quantity === 0).length;
    const exp = inventory.filter((r) => daysLeft(r.expiryDate) >= 0 && daysLeft(r.expiryDate) <= 30).length;
    const totalSku = new Set(inventory.map((r) => r.medicineId)).size;
    const value = inventory.reduce((sum, r) => sum + (r.quantity * (r.purchasePrice || 0)), 0);
    return { low, out, exp, totalSku, value };
  }, [inventory]);

  const riskRows = useMemo(() => {
    return inventory
      .filter((r) => daysLeft(r.expiryDate) <= 90)
      .sort((a, b) => daysLeft(a.expiryDate) - daysLeft(b.expiryDate));
  }, [inventory]);

  const toggleAll = (checked: boolean) => {
    setSelectedRows(checked ? filtered.map((r) => r.id) : []);
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelectedRows((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const saveQty = (id: string, quantity: number) => {
    setInventory((prev) => prev.map((r) => (r.id === id ? { ...r, quantity: Math.max(0, quantity) } : r)));
  };

  const savePP = (id: string, pp: number) => {
    setInventory((prev) => prev.map((r) => (r.id === id ? { ...r, purchasePrice: pp } : r)));
  };

  const onAddStock = async () => {
    if (!form.medicineId || !form.batchNumber || !form.expiryDate) return;
    setSaving(true);
    try {
      await addStockEntry({
        medicineId: form.medicineId,
        batchNumber: form.batchNumber,
        quantity: Math.max(1, Number(form.quantity || 1)),
        expiryDate: new Date(form.expiryDate),
        purchasePrice: form.purchasePrice ? Number(form.purchasePrice) : undefined,
        sellingPrice: form.sellingPrice ? Number(form.sellingPrice) : undefined,
      });
      setForm((p) => ({
        ...p,
        batchNumber: "",
        quantity: "1",
        expiryDate: "",
        purchasePrice: "",
        sellingPrice: "",
      }));
      await load();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="max-w-[1400px] space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Total SKUs</div>
            <div className="mt-1 text-[24px] font-bold text-[#3b82f6]">{stats.totalSku}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Low Stock</div>
            <div className="mt-1 text-[24px] font-bold text-[#f59e0b]">{stats.low}</div>
            <div className="text-[10px] text-[#64748B]">{stats.out} out of stock</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Expiring ≤30d</div>
            <div className="mt-1 text-[24px] font-bold text-[#ef4444]">{stats.exp}</div>
            <div className="text-[10px] text-[#64748B]">take action now</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Inventory Value</div>
            <div className="mt-1 text-[24px] font-bold text-[#22c55e]">₹{(stats.value / 100000).toFixed(2)}L</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-4 py-3">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicine, brand, batch..."
                className="w-full max-w-[280px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100 outline-none"
              />
              {(["all", "low", "out", "expiring", "ok"] as FilterKey[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-3 py-1 text-[11px] ${
                    filter === f
                      ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                      : "border-white/[0.1] bg-white/[0.03] text-[#CBD5E1]"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "low"
                      ? "Low Stock"
                      : f === "out"
                        ? "Out of Stock"
                        : f === "expiring"
                          ? "Expiring"
                          : "OK"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]">Export</button>
              <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]">+ GRN</button>
              <button className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white">+ Product</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={filtered.length > 0 && selectedRows.length === filtered.length}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-3 py-2">Medicine</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Batch</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">Stock</th>
                  <th className="px-3 py-2">Min</th>
                  <th className="px-3 py-2">Expiry</th>
                  <th className="px-3 py-2">PP (₹)</th>
                  <th className="px-3 py-2">MRP (₹)</th>
                  <th className="px-3 py-2">Margin</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="px-4 py-10 text-center text-xs text-[#64748B]">
                      No inventory rows found
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => {
                    const d = daysLeft(r.expiryDate);
                    const isLow = r.quantity > 0 && r.quantity < 20;
                    const isOut = r.quantity === 0;
                    const isExp = d <= 30;
                    const mrp = r.sellingPrice || r.medicine?.mrp || r.medicine?.price || 0;
                    const pp = r.purchasePrice || 0;
                    const margin = mrp > 0 ? Math.round(((mrp - pp) / mrp) * 100) : 0;

                    const status = isOut
                      ? pill("Out", "red")
                      : d < 0
                        ? pill("Expired", "red")
                        : isExp
                          ? pill("Expiring", "orange")
                          : isLow
                            ? pill("Low", "amber")
                            : pill("OK", "green");

                    return (
                      <tr key={r.id} className={`border-b border-white/[0.07] last:border-b-0 ${d < 0 ? "opacity-60" : ""}`}>
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(r.id)}
                            onChange={(e) => toggleOne(r.id, e.target.checked)}
                          />
                        </td>
                        <td className="px-3 py-2 text-xs font-medium text-slate-100">{r.medicine?.name || "Medicine"}</td>
                        <td className="px-3 py-2 text-xs text-[#94A3B8]">{r.medicine?.brand || "-"}</td>
                        <td className="px-3 py-2 text-xs">{pill(r.medicine?.category || "General", "blue")}</td>
                        <td className="px-3 py-2 font-mono text-xs text-[#CBD5E1]">{r.batchNumber}</td>
                        <td className="px-3 py-2 text-xs text-[#64748B]">-</td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            min={0}
                            defaultValue={r.quantity}
                            onBlur={(e) => saveQty(r.id, Number(e.target.value || 0))}
                            className={`w-16 rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-xs ${
                              isOut ? "text-[#ef4444]" : isLow ? "text-[#f59e0b]" : "text-slate-100"
                            }`}
                          />
                        </td>
                        <td className="px-3 py-2 text-xs text-[#64748B]">20</td>
                        <td className={`px-3 py-2 text-xs ${d < 0 ? "text-[#ef4444]" : d <= 30 ? "text-[#f59e0b]" : "text-[#CBD5E1]"}`}>
                          {new Date(r.expiryDate).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            step="0.01"
                            defaultValue={pp}
                            onBlur={(e) => savePP(r.id, Number(e.target.value || 0))}
                            className="w-20 rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-xs text-slate-100"
                          />
                        </td>
                        <td className="px-3 py-2 font-mono text-xs text-slate-100">₹{mrp.toFixed(2)}</td>
                        <td className={`px-3 py-2 text-xs font-semibold ${margin >= 40 ? "text-[#22c55e]" : margin >= 25 ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                          {margin}%
                        </td>
                        <td className="px-3 py-2">{status}</td>
                        <td className="px-3 py-2">
                          <button className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">
                            Restock
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <div>
              <div className="text-[13px] font-semibold text-slate-100">Expiry Risk Monitor</div>
              <div className="text-[11px] text-[#94A3B8]">{riskRows.length} batches at risk</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-3 py-2">Medicine</th>
                  <th className="px-3 py-2">Batch</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">Expiry</th>
                  <th className="px-3 py-2">Days Left</th>
                  <th className="px-3 py-2">Value at Risk</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {riskRows.map((r) => {
                  const d = daysLeft(r.expiryDate);
                  const pp = r.purchasePrice || 0;
                  const val = r.quantity * pp;
                  return (
                    <tr key={`risk-${r.id}`} className="border-b border-white/[0.07] last:border-b-0">
                      <td className="px-3 py-2 text-xs font-medium text-slate-100">{r.medicine?.name || "Medicine"}</td>
                      <td className="px-3 py-2 font-mono text-xs text-[#CBD5E1]">{r.batchNumber}</td>
                      <td className="px-3 py-2 text-xs font-semibold text-slate-100">{r.quantity}</td>
                      <td className={`px-3 py-2 text-xs ${d < 0 ? "text-[#ef4444]" : d <= 30 ? "text-[#f59e0b]" : "text-[#CBD5E1]"}`}>
                        {new Date(r.expiryDate).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-3 py-2 text-xs">
                        {d < 0 ? pill("Expired", "red") : d <= 15 ? pill(`${d}d — URGENT`, "red") : d <= 30 ? pill(`${d}d`, "orange") : pill(`${d}d`, "amber")}
                      </td>
                      <td className={`px-3 py-2 font-mono text-xs ${val > 1000 ? "text-[#ef4444]" : "text-[#f59e0b]"}`}>₹{val.toFixed(0)}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1.5">
                          <button className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">
                            Notify Dist.
                          </button>
                          <button className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">
                            Discount
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-4">
          <div className="mb-2 text-[12px] font-semibold text-slate-100">Quick Add Stock</div>
          <div className="grid gap-2 md:grid-cols-3">
            <select
              value={form.medicineId}
              onChange={(e) => setForm((p) => ({ ...p, medicineId: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            >
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Batch Number"
              value={form.batchNumber}
              onChange={(e) => setForm((p) => ({ ...p, batchNumber: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            />
            <input
              type="number"
              min={1}
              placeholder="Qty"
              value={form.quantity}
              onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            />
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm((p) => ({ ...p, expiryDate: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Purchase Price"
              value={form.purchasePrice}
              onChange={(e) => setForm((p) => ({ ...p, purchasePrice: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Selling Price"
              value={form.sellingPrice}
              onChange={(e) => setForm((p) => ({ ...p, sellingPrice: e.target.value }))}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"
            />
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={onAddStock}
              disabled={saving}
              className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Stock Entry"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
