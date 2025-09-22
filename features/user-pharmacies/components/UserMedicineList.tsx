"use client";

import { useEffect, useState } from "react";
import { getMedicinesByPharmacy } from "../actions/getMedicinesByPharmacy";
import { UserMedicine } from "../types/userPharmacy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-full rounded" />
        ))}
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No medicines available.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicines.map((med) => (
          <TableRow key={med.id}>
            <TableCell>{med.name}</TableCell>
            <TableCell>₹{med.price}</TableCell>
            <TableCell>{med.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
