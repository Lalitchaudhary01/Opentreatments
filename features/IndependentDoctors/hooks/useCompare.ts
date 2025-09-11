// features/IndependentDoctors/hooks/useCompare.ts
"use client";

import { useState, useEffect } from "react";
import { IndependentDoctor } from "../types/IndependentDoctor";

export const useCompare = () => {
  const [compareList, setCompareList] = useState<IndependentDoctor[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) setCompareList(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever compareList changes
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addDoctor = (doctor: IndependentDoctor) => {
    setCompareList((prev) => {
      if (!prev.find((d) => d.id === doctor.id)) return [...prev, doctor];
      return prev;
    });
  };

  const removeDoctor = (id: string) => {
    setCompareList((prev) => prev.filter((d) => d.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  return { compareList, addDoctor, removeDoctor, clearCompare };
};
