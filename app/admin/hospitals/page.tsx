import HospitalTable from "@/features/admin/hospitals/components/HospitalForm/HopitalTable";

export default function AdminHospitalsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospitals (Admin)</h1>
      <HospitalTable />
    </div>
  );
}
