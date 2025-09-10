"use client";
import { useState, useEffect } from "react";
import { MedicineSearchResult } from "../types/medicine";
import { getMedicines } from "../actions/getMedicnes";

export function useMedicineSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MedicineSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);
      getMedicines(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }, 400); // debounce 400ms

    return () => clearTimeout(handler);
  }, [query]);

  return { query, setQuery, results, loading };
}
