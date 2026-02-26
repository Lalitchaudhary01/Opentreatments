import { StockType, InventoryChangeType } from "@prisma/client"

export interface StockEntryInput {
  medicineId: string
  batchNumber: string
  quantity: number
  expiryDate: Date
  purchasePrice?: number
  sellingPrice?: number
}

export interface PharmacyStockEntry {
  id: string
  pharmacyId: string
  medicineId: string
  batchNumber: string
  quantity: number
  expiryDate: Date
  purchasePrice?: number | null
  sellingPrice?: number | null
  type: StockType
  createdAt: Date
  updatedAt: Date
}

export interface InventoryLogEntry {
  id: string
  stockEntryId: string
  medicineId: string
  pharmacyId: string
  changeType: InventoryChangeType
  quantityChanged: number
  note?: string | null
  createdAt: Date
}