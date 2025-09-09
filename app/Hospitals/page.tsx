"use client";

import Header from "@/components/layout/Header";
import { getHospitals } from "@/features/Hospitals/actions/getHospitals";
import CompareDrawer from "@/features/Hospitals/components/CompareDrawer";
import HospitalCard from "@/features/Hospitals/components/HospitalCard";
import HospitalFilters from "@/features/Hospitals/components/HospitalFilters";
import type { Hospital } from "@/features/Hospitals/types/hospital";
import { useEffect, useState } from "react";

export default function HospitalListingPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);

  async function fetchHospitals() {
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading Hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content container with proper top spacing */}
      <div className="flex flex-1 pt-16">
        {" "}
        {/* Added pt-16 to account for fixed header */}
        {/* Sidebar */}
        {filtersOpen && (
          <div className="w-80 shrink-0 border-r">
            <HospitalFilters onClose={() => setFiltersOpen(false)} />
          </div>
        )}
        {/* Main Content */}
        <div
          className={`p-6 space-y-6 transition-all bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pt-6 ${
            filtersOpen ? "flex-1" : "w-full"
          }`}
        >
          {!filtersOpen && (
            <button
              onClick={() => setFiltersOpen(true)}
              className="mb-4 px-4 py-2 rounded-md border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              Show Filters
            </button>
          )}

          {/* Hospital Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitals.map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>

          <CompareDrawer />
        </div>
      </div>
    </div>
  );
}
