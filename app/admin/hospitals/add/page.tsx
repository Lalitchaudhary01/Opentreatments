// app/admin/hospitals/add/page.tsx

import HospitalForm from "@/features/admin/hospitals/components/HospitalForm";

export default function AddHospitalPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Hospital</h1>
      <HospitalForm />
    </div>
  );
}
