// app/admin/hospitals/[id]/edit/page.tsx
import HospitalForm from "@/features/admin/hospitals/components/HospitalForm";
import { getHospitalById } from "@/features/admin/hospitals/actions/getHospitalById";
import { notFound, redirect } from "next/navigation";

interface EditHospitalPageProps {
  params: { id: string };
}

export default async function EditHospitalPage({
  params,
}: EditHospitalPageProps) {
  const hospital = await getHospitalById(params.id);

  if (!hospital) return notFound();

  async function handleSuccess() {
    redirect("/admin/hospitals");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Hospital</h1>
      <HospitalForm initialData={hospital} />
    </div>
  );
}
