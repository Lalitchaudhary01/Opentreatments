import { StockType, InventoryChangeType } from "@prisma/client";

// ------------------------ Medicine ------------------------
export interface Medicine {
  id: string;
  name: string;
  genericName?: string | null;
  brand?: string | null;
  category?: string | null;
  dosageForm?: string | null;
  strength?: string | null;
  manufacturer?: string | null;
  description?: string | null;
  price: number;
  mrp?: number | null;
  gst?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

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
  medicine?: Medicine;
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
