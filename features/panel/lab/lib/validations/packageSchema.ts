// features/panel/lab/lib/validations/packageSchema.ts

import { z } from 'zod'

export const packageSchema = z.object({
  name: z.string().min(2, 'Package name must be at least 2 characters'),
  description: z.string().optional(),
  shortDesc: z.string().optional(),
  image: z.instanceof(File).optional(),
  
  // Package Type
  category: z.string().min(1, 'Category is required'),
  popularFor: z.array(z.string()).default([]),
  samplesRequired: z.array(z.string()).default([]),
  
  // Pricing
  price: z.number().min(1, 'Price must be greater than 0'),
  discountedPrice: z.number().optional(),
  
  // Requirements
  fastingRequired: z.boolean().default(false),
  reportTat: z.number().optional(),
  
  // Status
  isFeatured: z.boolean().default(false),
  
  // Tests
  testIds: z.array(z.string()).min(1, 'At least one test is required')
})

export type PackageInput = z.infer<typeof packageSchema>

export const packageUpdateSchema = packageSchema.partial()
export type PackageUpdateInput = z.infer<typeof packageUpdateSchema>