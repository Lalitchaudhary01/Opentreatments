"use client";

import AddDoctorForm from "@/features/admin/IndependentDoctors/components/AddDoctorForm";

export default function AddDoctorPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Doctor</h1>
      <AddDoctorForm />
    </div>
  );
}
