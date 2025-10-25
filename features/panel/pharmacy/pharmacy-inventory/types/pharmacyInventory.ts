import { StockType, InventoryChangeType } from "@prisma/client";

// ------------------------ Stock Entry ------------------------
export interface StockEntry {
  id: string;
  medicineId: string;
  pharmacyId: string;

  batchNumber: string;
  quantity: number;
  expiryDate: Date;

  purchasePrice?: number | null;
  sellingPrice?: number | null;
  type: StockType;

  createdAt: Date;
  updatedAt: Date;

  // optional relation fields
  logs?: InventoryLog[];
}

// ------------------------ Inventory Log ------------------------
export interface InventoryLog {
  id: string;
  stockEntryId: string;
  medicineId: string;
  pharmacyId: string;

  changeType: InventoryChangeType;
  quantityChanged: number;
  note?: string | null;

  createdAt: Date;
}
