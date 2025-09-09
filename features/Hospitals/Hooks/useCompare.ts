import { useState } from "react";

export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>([]);

  function addToCompare(id: string) {
    if (!compareList.includes(id)) {
      setCompareList((prev) => [...prev, id]);
    }
  }

  function removeFromCompare(id: string) {
    setCompareList((prev) => prev.filter((h) => h !== id));
  }

  function resetCompare() {
    setCompareList([]);
  }

  return { compareList, addToCompare, removeFromCompare, resetCompare };
}
