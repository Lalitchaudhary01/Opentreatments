// app/admin/hospitals/[id]/edit/page.tsx
import HospitalForm from "@/features/admin/hospitals/components/HospitalForm/HospitalForm";
import { getHospitalById } from "@/features/admin/hospitals/actions/getHospitalById";

interface Props {
  params: { id: string };
}

export default async function EditHospitalPage({ params }: Props) {
  const hospital = await getHospitalById(params.id);

  if (!hospital) {
    return <div className="p-6 text-red-600">❌ Hospital not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Hospital</h1>
      <HospitalForm initialData={hospital} />
    </div>
  );
}
