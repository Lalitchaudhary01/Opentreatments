// features/panel/lab/types/test.types.ts

export interface LabTest {
  id: string
  labId: string
  name: string
  code?: string
  description?: string
  category: string
  subCategory?: string
  
  // Parameters
  sampleType?: string
  volume?: string
  container?: string
  method?: string
  
  // Requirements
  fastingRequired: boolean
  fastingHours?: number
  preparation?: string
  
  // Pricing
  price: number
  discountedPrice?: number
  tatHours?: number
  
  // Parameters & Reference Ranges
  parameters: TestParameter[]
  
  // Status
  isActive: boolean
  isPopular: boolean
  isHomeCollection: boolean
  
  createdAt: Date
  updatedAt: Date
}

export interface TestParameter {
  name: string
  unit?: string
  normalRange?: string
  minValue?: number
  maxValue?: number
  isCritical?: boolean
}

export interface TestFormData {
  name: string
  code?: string
  description?: string
  category: string
  subCategory?: string
  sampleType?: string
  volume?: string
  container?: string
  method?: string
  fastingRequired: boolean
  fastingHours?: number
  preparation?: string
  price: number
  discountedPrice?: number
  tatHours?: number
  parameters: TestParameter[]
  isPopular?: boolean
  isHomeCollection?: boolean
}

// 🔴 REMOVE THIS INTERFACE - It's causing conflict
// export interface TestCategory {
//   id: string
//   name: string
//   description?: string
//   subCategories: string[]
//   testCount?: number
// }

// ✅ Instead, export a type alias if needed
export type TestCategoryType = {
  id: string
  name: string
  description?: string
  subCategories: string[]
  testCount?: number
}