"use client";

import { useState } from "react";
import { useInventory } from "@/features/panel/pharmacies/hooks";
import { InventorySection } from "@/features/panel/pharmacies/components/sections";

export function InventoryClientView({ pharmacyId }: { pharmacyId: string }) {
  const { items, add, remove, reduce } = useInventory(pharmacyId);

  const [medicineId, setMedicineId] = useState("");
  const [qty, setQty] = useState(1);

  const addStock = async () => {
    if (!medicineId) return;

    await add({
      medicineId,
      batchNumber: "BATCH-1",
      quantity: qty,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180),
    });

    setMedicineId("");
    setQty(1);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <input
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
          placeholder="Medicine ID"
          className="border p-2"
        />
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
          className="border p-2 w-24"
        />
        <button
          onClick={addStock}
          className="px-3 py-2 bg-primary text-white rounded"
        >
          Add Stock
        </button>
      </div>

      <InventorySection
        items={items.map((i) => ({
          ...i,
          actions: true,
        }))}
      />

      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.id} className="flex gap-2 text-sm">
            <span>{i.medicine.name}</span>
            <button onClick={() => reduce(i.id, 1)}>-1</button>
            <button onClick={() => remove(i.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
