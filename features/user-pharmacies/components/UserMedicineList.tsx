"use client";

import { useEffect, useState } from "react";
import { getMedicinesByPharmacy } from "../actions/getMedicinesByPharmacy";
import { UserMedicine } from "../types/userPharmacy";

interface Props {
  pharmacyId: string;
}

export default function UserMedicineList({ pharmacyId }: Props) {
  const [medicines, setMedicines] = useState<UserMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicines() {
      setLoading(true);
      const data = await getMedicinesByPharmacy(pharmacyId);
      setMedicines(data);
      setLoading(false);
    }

    fetchMedicines();
  }, [pharmacyId]);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading medicines...</p>
    );
  }

  if (medicines.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No medicines available.</p>
    );
  }

  return (
    <div className="space-y-3">
      {medicines.map((medicine) => (
        <div
          key={medicine.id}
          className="p-3 border rounded-md shadow-sm flex flex-col gap-1"
        >
          <h3 className="font-semibold text-lg">{medicine.name}</h3>
          {medicine.description && (
            <p className="text-sm text-muted-foreground">
              {medicine.description}
            </p>
          )}
          <p className="text-sm">Price: ₹{medicine.price.toFixed(2)}</p>
          {/* <p className="text-sm">Stock: {medicine.stock}</p> */}
        </div>
      ))}
    </div>
  );
}
