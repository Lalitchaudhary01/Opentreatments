"use client";

import { addMedicine } from "@/features/panel/pharmacy/pharmacy-medicines/actions/addMedicine";
import PharmacyMedicineForm from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineForm";
import { useRouter } from "next/navigation";


export default function AddMedicinePage() {
  const router = useRouter();

  async function handleSubmit(values: any) {
    await addMedicine(values);
    router.push("/pharmacy-medicines");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>
      <PharmacyMedicineForm onSubmit={handleSubmit} />
    </div>
  );
}
