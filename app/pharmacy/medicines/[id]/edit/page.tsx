"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Medicine } from "@/features/panel/pharmacy/pharmacy-medicines/types/pharmacyMedicine";
import { getMedicineById } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicineById";
import { updateMedicine } from "@/features/panel/pharmacy/pharmacy-medicines/actions/updateMedicine";
import PharmacyMedicineForm from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineForm";

export default function EditMedicinePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
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
    router.push(`/pharmacy/medicines/${params.id}`);
  }

  if (!medicine) return <p className="p-6 text-[#CBD5E1]">Loading...</p>;

  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Medicine</h1>
      <PharmacyMedicineForm initialData={medicine} onSubmit={handleSubmit} />
    </div>
  );
}
