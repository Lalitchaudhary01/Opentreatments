import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";
import PharmacyMedicineList from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineList";

export default async function MedicinesPage() {
  const medicines = await getMedicines();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Medicines</h1>
      <PharmacyMedicineList medicines={medicines} />
    </div>
  );
}
