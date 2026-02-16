// /features/pharmacy-medicines/types/pharmacyMedicine.ts

// ---------------- Medicine Type ----------------
export interface Medicine {
  id: string;
  pharmacyId: string;

  name: string;
  genericName?: string | null;
  brand?: string | null;
  category?: string | null;
  dosageForm?: string | null; // e.g., Tablet, Syrup, Injection
  strength?: string | null; // e.g., 500mg, 250ml
  manufacturer?: string | null;

  description?: string | null;
  price: number;
  mrp?: number | null;
  gst?: number | null;

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

  purchasePrice?: number | null;
  sellingPrice?: number | null;
  type: StockType; // track INCOMING / OUTGOING stock

  createdAt: Date;
  updatedAt: Date;
}
