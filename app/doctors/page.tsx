// /app/doctors/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getDoctors } from "@/features/IndependentDoctors/actions/getDoctors";
import CompareDrawer from "@/features/IndependentDoctors/compoents/CompareDrawer";
import DoctorCard from "@/features/IndependentDoctors/compoents/DoctorCard";
import DoctorFilters from "@/features/IndependentDoctors/compoents/DoctorFilters";
import { useCompare } from "@/features/IndependentDoctors/hooks/useCompare";
import { useFilters } from "@/features/IndependentDoctors/hooks/useFilters";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const { filters, updateFilter, clearFilters } = useFilters();
  const { compareList, addDoctor, removeDoctor, clearCompare } = useCompare();

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    if (
      filters.specialization &&
      !doctor.specialization
        .toLowerCase()
        .includes(filters.specialization.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.language &&
      !doctor.languages.some((lang) =>
        lang.toLowerCase().includes(filters.language.toLowerCase())
      )
    ) {
      return false;
    }
    if (
      filters.city &&
      (!doctor.city ||
        !doctor.city.toLowerCase().includes(filters.city.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>

      <div className="flex gap-6">
        <div className="w-1/4">
          <DoctorFilters filters={filters} updateFilter={updateFilter} />
          <button
            onClick={clearFilters}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        </div>

        <div className="w-3/4 space-y-4">
          {filteredDoctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onCompare={addDoctor}
                onViewProfile={(id) =>
                  (window.location.href = `/doctors/${id}`)
                }
              />
            ))
          )}
        </div>
      </div>

      {compareList.length > 0 && (
        <CompareDrawer
          compareList={compareList}
          removeDoctor={removeDoctor}
          onClose={clearCompare}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
