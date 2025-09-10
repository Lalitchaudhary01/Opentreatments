import AddHospitalWizard from "@/features/admin/hospitals/components/HospitalForm/AddHospitalWizard";
export default function AddHospitalPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Hospital</h1>
      <AddHospitalWizard />
    </div>
  );
}
