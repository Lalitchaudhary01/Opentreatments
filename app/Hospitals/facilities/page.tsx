"use client";

import HospitalFacilityList from "@/features/panel/hospitals/hospital-Facility/components/HospitalFacilityList";

export default function FacilitiesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Facilities</h1>
      <p className="text-gray-600">
        Add, update, or remove facilities offered by your hospital.
      </p>

      <HospitalFacilityList />
    </div>
  );
}
