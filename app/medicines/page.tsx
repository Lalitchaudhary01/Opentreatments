"use client";

import MedicineSearch from "@/features/medicines/components/MedicineSearch";
import MedicineTable from "@/features/medicines/components/MedicineTable";
import { useMedicineSearch } from "@/features/medicines/hooks/useMedicineSearch";

export default function MedicinesPage() {
  const { query, setQuery, results, loading } = useMedicineSearch();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Find Medicines</h1>

      {/* 🔍 Search Box */}
      <MedicineSearch />

      {/* 🌀 Loader */}
      {loading && <p className="text-gray-500">Loading medicines...</p>}

      {/* 📋 Results Table */}
      {!loading && results.length > 0 && <MedicineTable medicines={results} />}

      {/* ❌ Empty State */}
      {!loading && results.length === 0 && query.length > 0 && (
        <p className="text-gray-400">No medicines found for "{query}"</p>
      )}
    </div>
  );
}
