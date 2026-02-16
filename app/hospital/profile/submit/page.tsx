"use client";

import { HospitalProfileForm } from "@/features/panel/hospitals/hospital-profile/components/HospitalProfileForm";

export default function SubmitHospitalProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Hospital Profile</h1>
      <HospitalProfileForm isEdit={false} />
    </div>
  );
}
