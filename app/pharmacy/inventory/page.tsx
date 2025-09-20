"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockEntry } from "@/features/panel/pharmacy/pharmacy-inventory/types/pharmacyInventory";

import PharmacyInventoryForm from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryForm";
import PharmacyInventoryTable from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryTable";
import { getInventory } from "@/features/panel/pharmacy/pharmacy-inventory/actions/getInventory";

export default function PharmacyInventoryPage() {
  const [inventory, setInventory] = useState<StockEntry[]>([]);
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

  return (
    <div className="space-y-8 p-4">
      {/* Stock Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Stock Entry</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMedicine ? (
            <PharmacyInventoryForm
              medicineId={selectedMedicine}
              onSubmit={async () => {
                await fetchInventory();
              }}
            />
          ) : (
            <p className="text-sm text-gray-500">
              Select a medicine first to add stock
            </p>
          )}
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <PharmacyInventoryTable
            inventory={inventory}
            refresh={fetchInventory}
            onSelectMedicine={(id: string) => setSelectedMedicine(id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
