// /features/pharmacy-medicines/types/pharmacyMedicine.ts

// ---------------- Medicine Type ----------------
export interface Medicine {
  id: string;
  pharmacyId: string;

  name: string;
  genericName?: string;
  brand?: string;
  category?: string;
  dosageForm?: string; // e.g., Tablet, Syrup, Injection
  strength?: string; // e.g., 500mg, 250ml
  manufacturer?: string;

  description?: string;
  price: number;
  mrp?: number;
  gst?: number;

  stock: StockEntry[]; // batch-wise stock entries

  createdAt: Date;
  updatedAt: Date;
}

// ---------------- StockEntry Type ----------------
export type StockType = "INCOMING" | "OUTGOING";

export interface StockEntry {
  id: string;
  medicineId: string;
  pharmacyId: string;

  batchNumber: string;
  quantity: number;
  expiryDate: Date;

  purchasePrice?: number;
  sellingPrice?: number;
  type: StockType; // track INCOMING / OUTGOING stock

  createdAt: Date;
  updatedAt: Date;
}
