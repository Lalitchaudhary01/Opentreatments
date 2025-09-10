"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CompareItem } from "../types/medicine";

interface CompareDrawerProps {
  items: CompareItem[];
  open: boolean;
  onClose: () => void;
}

export function CompareDrawer({ items, open, onClose }: CompareDrawerProps) {
  if (!open) return null;

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Compare Medicines</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Form</th>
                <th className="px-2 py-1">Strength</th>
                <th className="px-2 py-1">Pack Size</th>
                <th className="px-2 py-1">Price</th>
                <th className="px-2 py-1">Pharmacy</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1">{item.form}</td>
                  <td className="px-2 py-1">{item.strength}</td>
                  <td className="px-2 py-1">{item.packSize}</td>
                  <td className="px-2 py-1">₹{item.price}</td>
                  <td className="px-2 py-1">{item.pharmacyName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
