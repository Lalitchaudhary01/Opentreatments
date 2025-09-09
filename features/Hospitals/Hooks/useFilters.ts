import { useState } from "react";

export type Filters = {
  city?: string;
  service?: string;
  minCost?: number;
  maxCost?: number;
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({});

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters({});

  return { filters, updateFilter, resetFilters };
}
