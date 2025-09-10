import { useState } from "react";
import { MedicineDetail } from "../types";

export function useCompare() {
  const [items, setItems] = useState<MedicineDetail[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addItem(medicine: MedicineDetail) {
    if (!items.find((m) => m.id === medicine.id)) {
      setItems([...items, medicine]);
    }
    setIsOpen(true);
  }

  function removeItem(id: string) {
    setItems(items.filter((m) => m.id !== id));
  }

  function clear() {
    setItems([]);
    setIsOpen(false);
  }

  return { items, isOpen, addItem, removeItem, clear };
}
