"use client";

import { useFilters } from "../hooks/useFilters";


export default function HospitalFilters() {
  const { filters, updateFilter, resetFilters } = useFilters();

  return (
    <div className="p-4 border rounded space-y-2">
      <input
        type="text"
        placeholder="City"
        value={filters.city || ""}
        onChange={(e) => updateFilter("city", e.target.value)}
        className="border p-2 rounded w-full"
      />
      {/* Example for services filter */}
      <input
        type="text"
        placeholder="Service"
        value={filters.services?.join(", ") || ""}
        onChange={(e) =>
          updateFilter(
            "services",
            e.target.value.split(",").map((s) => s.trim())
          )
        }
        className="border p-2 rounded w-full"
      />
      <button
        onClick={resetFilters}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
