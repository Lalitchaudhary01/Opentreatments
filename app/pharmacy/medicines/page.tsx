import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";
import PharmacyMedicineList from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineList";

export default async function MedicinesPage() {
  const medicines = await getMedicines();

  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Medicine Catalog</h1>
      <PharmacyMedicineList medicines={medicines} />
    </div>
  );
}
