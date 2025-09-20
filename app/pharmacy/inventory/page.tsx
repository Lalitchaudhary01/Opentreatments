"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockEntry } from "@/features/panel/pharmacy/pharmacy-inventory/types/pharmacyInventory";
import { getInventory } from "@/features/panel/pharmacy/pharmacy-inventory/types/getInventory";
import PharmacyInventoryForm from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryForm";
import PharmacyInventoryTable from "@/features/panel/pharmacy/pharmacy-inventory/components/PharmacyInventoryTable";

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
      <Card>
        <CardHeader>
          <CardTitle>Add Stock Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <PharmacyInventoryForm
            medicineId={selectedMedicine || ""}
            onSubmit={async () => {
              await fetchInventory();
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
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
