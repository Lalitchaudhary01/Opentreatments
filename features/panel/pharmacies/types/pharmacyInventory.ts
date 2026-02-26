export interface StockEntry {
  id: string;
  pharmacyId: string;
  medicineId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchasePrice?: number | null;
  sellingPrice?: number | null;
  type: "INCOMING" | "OUTGOING";
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryLog {
  id: string;
  stockEntryId: string;
  medicineId: string;
  pharmacyId: string;
  changeType: string;
  quantityChanged: number;
  note?: string | null;
  createdAt: Date;
}