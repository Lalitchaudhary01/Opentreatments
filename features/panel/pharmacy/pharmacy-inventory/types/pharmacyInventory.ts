// ------------------------ Enums ------------------------
export enum StockType {
  INCOMING = "INCOMING",
  OUTGOING = "OUTGOING",
}

export enum InventoryChangeType {
  SALE = "SALE",
  DAMAGE = "DAMAGE",
  EXPIRE = "EXPIRE",
  MANUAL_ADJUSTMENT = "MANUAL_ADJUSTMENT",
}

// ------------------------ Stock Entry ------------------------
export interface StockEntry {
  id: string;
  medicineId: string;
  pharmacyId: string;

  batchNumber: string;
  quantity: number;
  expiryDate: Date;

  purchasePrice?: number;
  sellingPrice?: number;
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
  note?: string;

  createdAt: Date;
}
