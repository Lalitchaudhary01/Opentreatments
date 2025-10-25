"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Medicine } from "@/features/panel/pharmacy/pharmacy-medicines/types/pharmacyMedicine";
import { getMedicineById } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicineById";
import { updateMedicine } from "@/features/panel/pharmacy/pharmacy-medicines/actions/updateMedicine";
import PharmacyMedicineForm from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineForm";

type Props = {
  params: { id: string };
};

export default function EditMedicinePage({ params }: Props) {
  const router = useRouter();
  const [medicine, setMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    async function fetchMedicine() {
      const data = await getMedicineById(params.id);
      setMedicine(data);
    }
    fetchMedicine();
  }, [params.id]);

  async function handleSubmit(values: any) {
    await updateMedicine(params.id, values);
    router.push(`/pharmacy-medicines/${params.id}`);
  }

  if (!medicine) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Medicine</h1>
      <PharmacyMedicineForm initialData={medicine} onSubmit={handleSubmit} />
    </div>
  );
}
