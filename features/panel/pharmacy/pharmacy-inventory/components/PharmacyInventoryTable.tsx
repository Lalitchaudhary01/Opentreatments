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
import { deleteStockEntry } from "../actions/deleteStockEntry";
import { reduceStockOnSale } from "../actions/reduceStockOnSale";

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

  const handleReduceStock = async (id: string, availableQty: number) => {
    const qty = prompt(`Enter quantity to reduce (Available: ${availableQty})`);
    if (!qty) return;

    const numberQty = Number(qty);
    if (isNaN(numberQty) || numberQty <= 0) {
      alert("Invalid quantity");
      return;
    }
    if (numberQty > availableQty) {
      alert("Quantity exceeds available stock");
      return;
    }

    try {
      await reduceStockOnSale({
        stockEntryId: id,
        quantity: numberQty,
        reason: "SALE",
        note: "Stock reduced on sale",
      });
      refresh();
    } catch (err: any) {
      alert(err.message || "Failed to reduce stock");
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
            <TableCell>{item.medicine?.name || "Unknown Medicine"}</TableCell>
            <TableCell>{item.batchNumber}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>
              {new Date(item.expiryDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.purchasePrice || "-"}</TableCell>
            <TableCell>{item.sellingPrice || "-"}</TableCell>
            <TableCell className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleReduceStock(item.id, item.quantity)}
              >
                Reduce
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
