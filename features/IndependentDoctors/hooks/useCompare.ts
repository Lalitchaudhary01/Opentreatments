// /features/doctors/hooks/useCompare.ts
import { useState } from "react";
import { IndependentDoctor } from "../types/IndependentDoctor";

export function useCompare(maxCompare = 3) {
  const [compareList, setCompareList] = useState<IndependentDoctor[]>([]);

  const addDoctor = (doctor: IndependentDoctor) => {
    if (compareList.find(d => d.id === doctor.id)) return; // Already added
    if (compareList.length >= maxCompare) return; // Max limit
    setCompareList([...compareList, doctor]);
  };

  const removeDoctor = (id: string) => {
    setCompareList(compareList.filter(d => d.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return {
    compareList,
    addDoctor,
    removeDoctor,
    clearCompare,
    canAdd: compareList.length < maxCompare,
  };
}
