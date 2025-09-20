"use client";

import { StockEntry } from "../types/pharmacyInventory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteStockEntry } from "../types/deleteStockEntry";


type Props = {
  inventory: StockEntry[];
  refresh: () => void;
};

export default function PharmacyInventoryTable({ inventory, refresh }: Props) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stock entry?")) return;
    try {
      await deleteStockEntry(id);
      refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete stock entry");
    }
  };

  return (
    <Table className="max-w-4xl">
      <TableHead>
        <TableRow>
          <TableCell>Medicine</TableCell>
          <TableCell>Batch</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Expiry</TableCell>
          <TableCell>Purchase Price</TableCell>
          <TableCell>Selling Price</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.medicine.name}</TableCell>
            <TableCell>{item.batchNumber}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>
              {new Date(item.expiryDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.purchasePrice || "-"}</TableCell>
            <TableCell>{item.sellingPrice || "-"}</TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
