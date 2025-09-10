"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MedicineDetail } from "../types/medicine";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMedicineBySlug } from "../actions/getMedicinesBySlug";

interface DetailDrawerProps {
  slug: string | null;
  open: boolean;
  onClose: () => void;
}

export function DetailDrawer({ slug, open, onClose }: DetailDrawerProps) {
  const [medicine, setMedicine] = useState<MedicineDetail | null>(null);

  useEffect(() => {
    if (slug) {
      getMedicineBySlug(slug).then(setMedicine);
    }
  }, [slug]);

  if (!medicine) return null;

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4 space-y-4">
        <DrawerHeader>
          <DrawerTitle>{medicine.name}</DrawerTitle>
          <p className="text-sm text-gray-500">{medicine.genericName}</p>
        </DrawerHeader>

        <div className="space-y-3">
          <h3 className="font-medium">Substitutes</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {medicine.substitutes?.map((s) => (
              <li key={s.id}>
                {s.name} ({s.form}) – ₹{s.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Price Trend</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={medicine.priceTrends ?? []}>
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Nearby Pharmacies</h3>
          <ul className="text-sm text-gray-700">
            {medicine.nearbyPharmacies?.map((p) => (
              <li key={p.id}>
                {p.name} – {p.city}
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full">➕ Add to list</Button>
      </DrawerContent>
    </Drawer>
  );
}
