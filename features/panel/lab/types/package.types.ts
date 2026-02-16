// features/panel/lab/types/package.types.ts

export interface LabPackage {
  id: string
  labId: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  image?: string
  
  // Package Type
  category: string
  popularFor: string[]
  samplesRequired: string[]
  
  // Pricing
  price: number
  discountedPrice?: number
  discountPercent?: number
  
  // Requirements
  fastingRequired: boolean
  reportTat?: number
  
  // Status
  isActive: boolean
  isFeatured: boolean
  
  // Stats
  totalBookings: number
  
  // Relations
  tests: PackageTest[]
  
  createdAt: Date
  updatedAt: Date
}

export interface PackageTest {
  testId: string
  testName: string
  testCategory: string
  price: number
}

export interface PackageFormData {
  name: string
  description?: string
  shortDesc?: string
  image?: File
  category: string
  popularFor: string[]
  samplesRequired: string[]
  price: number
  discountedPrice?: number
  fastingRequired: boolean
  reportTat?: number
  isFeatured?: boolean
  testIds: string[]
}

// 🔴 If this exists and conflicts, rename it
export interface PackageCategoryType {
  id: string
  name: string
  description?: string
  packageCount?: number
}