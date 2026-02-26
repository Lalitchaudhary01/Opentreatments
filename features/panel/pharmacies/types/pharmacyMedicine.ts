export interface MedicineInput {
  name: string
  genericName?: string
  strength?: string
  brand?: string
  category?: string
  dosageForm?: string
  manufacturer?: string
  price: number
  mrp?: number
  gst?: number
  description?: string
}

export interface PharmacyMedicine {
  id: string
  pharmacyId: string
  name: string
  genericName?: string | null
  strength?: string | null
  brand?: string | null
  category?: string | null
  dosageForm?: string | null
  manufacturer?: string | null
  price: number
  mrp?: number | null
  gst?: number | null
  description?: string | null
  createdAt: Date
  updatedAt: Date
}