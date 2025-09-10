"use client";

import { useState, useCallback } from "react";
import { CompareItem } from "../types/medicine";

export function useCompare() {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);

  const addToCompare = useCallback((item: CompareItem) => {
    setCompareList((prev) => {
      if (prev.find((x) => x.id === item.id)) return prev; // avoid duplicates
      return [...prev, item];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return { compareList, addToCompare, removeFromCompare, clearCompare };
}
