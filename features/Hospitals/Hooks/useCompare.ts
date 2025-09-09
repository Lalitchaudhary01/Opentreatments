import { useState } from "react";
import type { Hospital } from "../types/hospital";

export function useCompare() {
  const [compareList, setCompareList] = useState<Hospital[]>([]);

  const addToCompare = (hospital: Hospital) => {
    setCompareList(prev => {
      if (prev.find(h => h.id === hospital.id)) return prev;
      return [...prev, hospital];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(h => h.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  return { compareList, addToCompare, removeFromCompare, clearCompare };
}
