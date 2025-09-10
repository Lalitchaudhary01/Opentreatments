"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MedicineSummary } from "../types/medicine";
import { PriceTag } from "./PriceTag";

interface MedicineTableProps {
  medicines: MedicineSummary[];
}

export function MedicineTable({ medicines }: MedicineTableProps) {
  if (!medicines.length) {
    return <div className="text-gray-500 text-sm">No medicines found</div>;
  }

  const minPrice = Math.min(...medicines.map((m) => m.price));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Brand</TableHead>
          <TableHead>Form</TableHead>
          <TableHead>Strength</TableHead>
          <TableHead>Pack Size</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Pharmacy</TableHead>
          <TableHead>Availability</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicines.map((med) => (
          <TableRow key={med.id}>
            <TableCell>{med.name}</TableCell>
            <TableCell>{med.form}</TableCell>
            <TableCell>{med.strength}</TableCell>
            <TableCell>{med.packSize}</TableCell>
            <TableCell>
              <PriceTag price={med.price} highlight={med.price === minPrice} />
            </TableCell>
            <TableCell>{med.pharmacy?.name}</TableCell>
            <TableCell>
              {med.availability ? (
                <span className="text-green-600">In stock</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
