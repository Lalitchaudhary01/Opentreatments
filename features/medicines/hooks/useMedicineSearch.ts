"use client";

import { useState, useCallback } from "react";
import {
  MedicineSummary,
  GetMedicinesParams,
  UseMedicineSearchResult,
} from "../types/medicine";
import { getMedicines } from "../actions/getMedicnes";

export function useMedicineSearch(
  initialParams: Partial<GetMedicinesParams> = {}
): UseMedicineSearchResult {
  const [medicines, setMedicines] = useState<MedicineSummary[]>([]);
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [perPage] = useState(initialParams.perPage ?? 20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(
    async (params?: Partial<GetMedicinesParams>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMedicines({
          ...initialParams,
          ...params,
          page: 1,
          perPage,
        });
        setMedicines(result);
        setPage(1);
        setTotal(result.length); // TODO: replace with count if backend returns
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    },
    [initialParams, perPage]
  );

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await getMedicines({
        ...initialParams,
        page: nextPage,
        perPage,
      });
      setMedicines((prev) => [...prev, ...result]);
      setPage(nextPage);
    } catch (err: any) {
      setError(err.message ?? "Failed to load more");
    } finally {
      setLoading(false);
    }
  }, [page, perPage, initialParams]);

  return {
    medicines,
    total,
    page,
    perPage,
    loading,
    error,
    runSearch,
    loadMore,
  };
}
