// /features/doctors/hooks/useFilters.ts
import { useState } from "react";

export interface Filters {
  specialization?: string;
  language?: string;
  city?: string;
}

export function useFilters(initialFilters: Filters = {}) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilter = (key: keyof Filters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}
