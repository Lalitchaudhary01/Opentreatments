import { StockType } from "@prisma/client";

export interface StockEntryInput {
  medicineId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchasePrice?: number;
  sellingPrice?: number;
  type?: StockType; // default INCOMING
}

export interface StockEntryView {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchasePrice?: number | null;
  sellingPrice?: number | null;
  createdAt: Date;
}
