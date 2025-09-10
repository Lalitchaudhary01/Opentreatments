"use client";
import Link from "next/link";
import { MedicineBase } from "../types/medicine";
import PriceTag from "./PriceTag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MedicineTableProps {
  medicines: MedicineBase[];
}

export default function MedicineTable({ medicines }: MedicineTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Form</TableHead>
          <TableHead>Strength</TableHead>
          <TableHead>Pack</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicines.map((med) => (
          <TableRow key={med.id}>
            <TableCell>
              <Link
                href={`/medicines/${med.slug}`}
                className="text-primary hover:underline font-medium"
              >
                {med.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">{med.form}</TableCell>
            <TableCell className="text-muted-foreground">
              {med.strength}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {med.packSize}
            </TableCell>
            <TableCell className="text-right">
              <PriceTag price={med.price} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
