"use client";

import PharmacyMedicineCard from "./PharmacyMedicineCard";
import { Medicine } from "../types/pharmacyMedicine";

type Props = {
  medicines: Medicine[];
};

export default function PharmacyMedicineList({ medicines }: Props) {
  if (!medicines.length) {
    return <p className="text-gray-500">No medicines available.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {medicines.map((med) => (
        <PharmacyMedicineCard key={med.id} medicine={med} />
      ))}
    </div>
  );
}
