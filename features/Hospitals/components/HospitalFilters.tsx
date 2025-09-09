"use client";

import { useFilters } from "../hooks/useFilters";
import { useState } from "react";

export default function HospitalFilters() {
  const { filters, updateFilter, resetFilters } = useFilters();
  const [city, setCity] = useState(filters.city || "");
  const [service, setService] = useState(filters.service || "");

  const applyFilters = () => {
    updateFilter("city", city);
    updateFilter("service", service);
  };

  return (
    <div className="p-4 border rounded flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
      <button onClick={resetFilters} className="bg-gray-300 px-4 py-2 rounded">
        Reset
      </button>
    </div>
  );
}
