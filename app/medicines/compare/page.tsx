"use client";

import { useState, useEffect } from "react";
import { useCompare } from "@/features/medicines/hooks/useCompare";
import CompareDrawer from "@/features/medicines/components/CompareDrawer";
import { getMedicines } from "@/features/medicines/actions/getMedicnes";
import { MedicineDetail } from "@/features/medicines/types/medicine";

export default function ComparePage() {
  const { addItem, isOpen } = useCompare();
  const [medicines, setMedicines] = useState<MedicineDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await getMedicines({ perPage: 20 }); // thoda limit laga
        setMedicines(result.items || []);
      } catch (err) {
        console.error("Failed to load medicines", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6">Loading medicines...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Compare Medicines</h1>
      <p className="text-gray-600">
        Select medicines you want to compare. They will appear in the compare
        drawer.
      </p>

      {/* Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {medicines.map((med) => (
          <div
            key={med.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h2 className="font-semibold">{med.name}</h2>
            <p className="text-sm text-gray-600">{med.strength}</p>
            <p className="text-sm">₹{med.price}</p>
            <button
              onClick={() => addItem(med)}
              className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add to Compare
            </button>
          </div>
        ))}
      </div>

      {/* Compare Drawer */}
      {isOpen && <CompareDrawer />}
    </div>
  );
}
