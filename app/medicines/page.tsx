"use client";

import { useMedicineSearch } from "@/features/medicines/hooks/useMedicineSearch";

import { useDrawer } from "@/features/medicines/hooks/useDrawer";

import { MedicineSummary } from "@/features/medicines/types/medicine";
import { MedicineSearch } from "@/features/medicines/components/MedicineSearch";
import { MedicineTable } from "@/features/medicines/components/MedicineTable";
import { DetailDrawer } from "@/features/medicines/components/DetailDrawer";

export default function MedicinesPage() {
  const { medicines, loading, runSearch } = useMedicineSearch();
  const { isOpen, data, openDrawer, closeDrawer } =
    useDrawer<MedicineSummary>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Search Medicines</h1>

      {/* 🔍 Search Input */}
      <MedicineSearch onSelect={(q) => runSearch({ query: q })} />

      {/* 📊 Results Table */}
      <MedicineTable
        medicines={medicines}
        loading={loading}
        onRowClick={(med) => openDrawer(med)}
      />

      {/* 📌 Detail Drawer */}
      <DetailDrawer open={isOpen} onClose={closeDrawer} medicine={data} />
    </div>
  );
}
