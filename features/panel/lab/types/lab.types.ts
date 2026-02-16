// features/panel/lab/types/lab.types.ts

export type LabStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'

export interface LabCompany {
  id: string
  userId: string
  name: string
  slug: string
  registrationNumber?: string
  email: string
  phone?: string
  address: string
  city?: string
  state?: string
  pincode?: string
  latitude?: number
  longitude?: number
  website?: string
  logo?: string
  coverImage?: string
  description?: string
  
  // Accreditation
  accreditations: string[]
  documents: string[]
  licenseNumber?: string
  licenseExpiry?: Date
  
  // Operational
  homeCollection: boolean
  homeCollectionFee?: number
  collectionCenters: CollectionCenter[]
  
  // Stats
  rating: number
  totalReviews: number
  totalBookings: number
  
  // Status
  status: LabStatus
  rejectionReason?: string
  verifiedAt?: Date
  isActive: boolean
  
  createdAt: Date
  updatedAt: Date
}

export interface CollectionCenter {
  id: string
  name: string
  address: string
  city: string
  pincode: string
  phone: string
  latitude?: number
  longitude?: number
  isActive: boolean
}

export interface LabProfileFormData {
  name: string
  registrationNumber?: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  website?: string
  description?: string
  accreditations: string[]
  licenseNumber?: string
  licenseExpiry?: Date
  documents: File[]
  homeCollection: boolean
  homeCollectionFee?: number
  collectionCenters: CollectionCenter[]
}

export interface LabStats {
  totalTests: number
  totalPackages: number
  totalTechnicians: number
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  totalRevenue: number
  monthlyRevenue: number
  pendingReports: number
}