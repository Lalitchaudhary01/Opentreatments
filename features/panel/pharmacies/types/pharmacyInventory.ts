export type StockType = "INCOMING" | "OUTGOING"

export interface StockEntry {
  id: string
  medicineId: string
  pharmacyId: string

  batchNumber: string
  quantity: number
  expiryDate: string

  purchasePrice?: number | null
  sellingPrice?: number | null

  type: StockType

  createdAt: string
  updatedAt: string
}

export interface AddStockEntryInput {
  medicineId: string
  batchNumber: string
  quantity: number
  expiryDate: string
  purchasePrice?: number
  sellingPrice?: number
}