"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MedicineSummary } from "../types/medicine";
import { cn } from "@/lib/utils";
import { getMedicines } from "../actions/getMedicnes";

interface MedicineSearchProps {
  onSelect: (medicine: MedicineSummary) => void;
}

export function MedicineSearch({ onSelect }: MedicineSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MedicineSummary[]>([]);
  const [loading, setLoading] = useState(false);

  // debounce search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      const meds = await getMedicines({ query, perPage: 5 });
      setResults(meds);
      setLoading(false);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">
      <Input
        placeholder="Search medicines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {loading && <div className="absolute right-3 top-2 text-sm">⏳</div>}
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
          {results.map((med) => (
            <div
              key={med.id}
              onClick={() => onSelect(med)}
              className={cn(
                "cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
              )}
            >
              {med.name}{" "}
              <span className="text-gray-500">
                ({med.genericName ?? "Generic"})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
