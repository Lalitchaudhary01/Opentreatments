"use client";

import HospitalServiceList from "@/features/panel/hospitals/hospital-services/components/HospitalServiceList";

export default function HospitalServicesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Hospital Services</h1>
      <HospitalServiceList />
    </div>
  );
}
