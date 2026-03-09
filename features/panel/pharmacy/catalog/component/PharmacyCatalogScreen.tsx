"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";
import { Medicine } from "@/features/panel/pharmacy/pharmacy-medicines/types/pharmacyMedicine";

type CategoryFilter = "all" | "Diabetes" | "Cardiac" | "Antibiotic" | "Vitamins" | "Gastro";

function tag(label: string, tone: "blue" | "teal" | "amber" | "red" | "green") {
  const cls =
    tone === "green"
      ? "bg-[#22c55e]/15 text-[#22c55e]"
      : tone === "teal"
        ? "bg-[#14b8a6]/15 text-[#14b8a6]"
        : tone === "amber"
          ? "bg-[#f59e0b]/15 text-[#f59e0b]"
          : tone === "red"
            ? "bg-[#ef4444]/15 text-[#ef4444]"
            : "bg-[#3b82f6]/15 text-[#3b82f6]";
  return <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${cls}`}>{label}</span>;
}

export default function PharmacyCatalogScreen() {
  const [catalog, setCatalog] = useState<Medicine[]>([]);
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    getMedicines()
      .then((rows) => {
        setCatalog(rows);
        setActiveMap(
          rows.reduce<Record<string, boolean>>((acc, row) => {
            acc[row.id] = true;
            return acc;
          }, {})
        );
      })
      .catch(() => setCatalog([]));
  }, []);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return catalog.filter((r) => {
      const category = (r.category || "General").trim();
      const byCategory = filter === "all" ? true : category.toLowerCase() === filter.toLowerCase();
      const hay = `${r.name} ${r.brand || ""} ${category}`.toLowerCase();
      const bySearch = q ? hay.includes(q) : true;
      return byCategory && bySearch;
    });
  }, [catalog, filter, search]);

  const stats = useMemo(() => {
    const total = catalog.length;
    const active = catalog.filter((r) => activeMap[r.id] !== false).length;
    const out = catalog.filter((r) => r.stock.reduce((s, x) => s + x.quantity, 0) <= 0).length;
    const generic = catalog.filter((r) => !!r.genericName?.trim()).length;
    return { total, active, out, generic };
  }, [catalog, activeMap]);

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? rows.map((r) => r.id) : []);
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["all", "Diabetes", "Cardiac", "Antibiotic", "Vitamins", "Gastro"] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-3 py-1 text-[11px] ${
                  filter === cat
                    ? "border-[#3b82f6]/40 bg-[#3b82f6]/15 text-[#3b82f6]"
                    : "border-white/[0.1] bg-white/[0.03] text-[#CBD5E1]"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search catalog..."
              className="w-[220px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100 outline-none"
            />
            <button className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[11px] text-[#CBD5E1]">
              Bulk Upload CSV
            </button>
            <Link
              href="/pharmacy/medicines/add"
              className="rounded-md bg-[#3B82F6] px-3 py-2 text-[11px] font-medium text-white"
            >
              Add Product
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Total Products</div>
            <div className="mt-1 text-[24px] font-bold text-[#3b82f6]">{stats.total}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Active Listings</div>
            <div className="mt-1 text-[24px] font-bold text-[#22c55e]">{stats.active}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Out of Stock</div>
            <div className="mt-1 text-[24px] font-bold text-[#f59e0b]">{stats.out}</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Generic Available</div>
            <div className="mt-1 text-[24px] font-bold text-[#14b8a6]">{stats.generic}</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-4 py-3">
            <div className="text-[13px] font-semibold text-slate-100">Product Catalog</div>
            <div className="text-[11px] text-[#94A3B8]">
              {stats.total} products · Last updated just now
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={rows.length > 0 && selected.length === rows.length}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-3 py-2">Medicine</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Form</th>
                  <th className="px-3 py-2">Rx Req.</th>
                  <th className="px-3 py-2">MRP ₹</th>
                  <th className="px-3 py-2">Selling ₹</th>
                  <th className="px-3 py-2">Margin</th>
                  <th className="px-3 py-2">Stock</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-10 text-center text-xs text-[#64748B]">
                      No products found
                    </td>
                  </tr>
                ) : (
                  rows.map((p) => {
                    const stock = p.stock.reduce((sum, s) => sum + s.quantity, 0);
                    const mrp = p.mrp ?? p.price;
                    const selling = p.price;
                    const margin = mrp > 0 ? Math.round(((selling - (p.stock[0]?.purchasePrice ?? selling * 0.7)) / selling) * 100) : 0;
                    const rxRequired = !["otc", "vitamins"].includes((p.category || "").toLowerCase());
                    const active = activeMap[p.id] !== false;

                    return (
                      <tr key={p.id} className="border-b border-white/[0.07] last:border-b-0">
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selected.includes(p.id)}
                            onChange={(e) => toggleRow(p.id, e.target.checked)}
                          />
                        </td>
                        <td className="px-3 py-2 text-xs font-medium text-slate-100">{p.name}</td>
                        <td className="px-3 py-2 text-xs text-[#94A3B8]">{p.brand || "-"}</td>
                        <td className="px-3 py-2 text-xs">{tag(p.category || "General", "blue")}</td>
                        <td className="px-3 py-2 text-xs text-[#CBD5E1]">{p.dosageForm || "-"}</td>
                        <td className="px-3 py-2 text-xs">{rxRequired ? tag("Required", "amber") : tag("No", "green")}</td>
                        <td className="px-3 py-2 text-xs font-mono text-[#CBD5E1]">{mrp.toFixed(2)}</td>
                        <td className="px-3 py-2">
                          <input
                            defaultValue={selling.toFixed(2)}
                            className="w-[64px] rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-xs text-slate-100"
                          />
                        </td>
                        <td className={`px-3 py-2 text-xs font-semibold ${margin >= 40 ? "text-[#22c55e]" : margin >= 25 ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                          {margin}%
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-100">{stock}</td>
                        <td className="px-3 py-2">{active ? tag("Active", "green") : tag("Paused", "red")}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1.5">
                            <Link href={`/pharmacy/medicines/${p.id}`} className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => setActiveMap((prev) => ({ ...prev, [p.id]: !active }))}
                              className={`rounded px-2 py-1 text-[10px] ${
                                active
                                  ? "border border-white/[0.1] bg-white/[0.04] text-[#CBD5E1]"
                                  : "bg-[#22c55e]/15 text-[#22c55e]"
                              }`}
                            >
                              {active ? "Pause" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
