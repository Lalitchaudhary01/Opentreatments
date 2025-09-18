"use client";

import HospitalInsuranceList from "@/features/panel/hospitals/hospital-insurances/components/HospitalInsuranceList";

export default function InsurancesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Insurances</h1>
      <p className="text-gray-600">
        Add, update, or remove insurances accepted by your hospital.
      </p>

      <HospitalInsuranceList />
    </div>
  );
}
