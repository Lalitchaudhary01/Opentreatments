export type PharmacyStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface PharmacyProfile {
  id: string
  name: string
  email: string
  phone: string

  address?: string | null
  city?: string | null
  state?: string | null
  country?: string | null

  latitude?: number | null
  longitude?: number | null

  gstNumber?: string | null
  licenseNumber: string
  ownerName: string

  status: PharmacyStatus

  userId: string

  createdAt: string
  updatedAt: string
}