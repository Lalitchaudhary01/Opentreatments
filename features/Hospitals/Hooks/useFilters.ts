import { useState } from "react";

export interface Filters {
  city?: string;
  services?: string[];
  minCost?: number;
  maxCost?: number;
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({});

  function updateFilter(key: keyof Filters, value: any) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({});
  }

  return { filters, updateFilter, resetFilters };
}
