"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockEntry } from "@/features/panel/pharmacy/pharmacy-inventory/types/pharmacyInventory";

import PharmacyInventoryForm from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryForm";
import PharmacyInventoryTable from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryTable";
import { getInventory } from "@/features/panel/pharmacy/pharmacy-inventory/actions/getInventory";
import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";

export default function PharmacyInventoryPage() {
  const [inventory, setInventory] = useState<StockEntry[]>([]);
  const [medicines, setMedicines] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const data = await getMedicines();
        const mapped = data.map((med) => ({ id: med.id, name: med.name }));
        setMedicines(mapped);
        if (mapped.length > 0) {
          setSelectedMedicine((prev) => prev ?? mapped[0].id);
        }
      } catch {
        setMedicines([]);
      }
    }

    fetchMedicines();
  }, []);

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Card className="border-white/[0.08] bg-[#111827] text-[#E2E8F0]">
        <CardHeader>
          <CardTitle>Add Stock Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.08em] text-[#64748B]">Select Medicine</label>
            <select
              className="mt-2 w-full rounded-lg border border-white/[0.08] bg-[#0B1120] px-3 py-2 text-sm text-white outline-none"
              value={selectedMedicine ?? ""}
              onChange={(e) => setSelectedMedicine(e.target.value || null)}
            >
              {medicines.map((medicine) => (
                <option key={medicine.id} value={medicine.id}>
                  {medicine.name}
                </option>
              ))}
            </select>
          </div>

          {selectedMedicine ? (
            <PharmacyInventoryForm medicineId={selectedMedicine} />
          ) : (
            <p className="text-sm text-[#94A3B8]">No medicines available. Please add a medicine first.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-white/[0.08] bg-[#111827] text-[#E2E8F0]">
        <CardHeader>
          <CardTitle>{loading ? "Inventory (Loading...)" : "Inventory"}</CardTitle>
        </CardHeader>
        <CardContent>
          <PharmacyInventoryTable
            inventory={inventory}
            refresh={fetchInventory}
          />
        </CardContent>
      </Card>
    </div>
  );
}
