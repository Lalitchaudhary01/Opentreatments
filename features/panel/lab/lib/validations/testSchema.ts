// features/panel/lab/lib/validations/testSchema.ts

import { z } from 'zod'

export const testParameterSchema = z.object({
  name: z.string().min(1, 'Parameter name is required'),
  unit: z.string().optional(),
  normalRange: z.string().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  isCritical: z.boolean().default(false)
})

export const testSchema = z.object({
  name: z.string().min(2, 'Test name must be at least 2 characters'),
  code: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  
  // Parameters
  sampleType: z.string().optional(),
  volume: z.string().optional(),
  container: z.string().optional(),
  method: z.string().optional(),
  
  // Requirements
  fastingRequired: z.boolean().default(false),
  fastingHours: z.number().optional(),
  preparation: z.string().optional(),
  
  // Pricing
  price: z.number().min(1, 'Price must be greater than 0'),
  discountedPrice: z.number().optional(),
  tatHours: z.number().optional(),
  
  // Parameters & Reference Ranges
  parameters: z.array(testParameterSchema).default([]),
  
  // Status
  isPopular: z.boolean().default(false),
  isHomeCollection: z.boolean().default(true)
})

export type TestInput = z.infer<typeof testSchema>

export const testBulkImportSchema = z.array(testSchema).min(1, 'At least one test is required')
export type TestBulkImportInput = z.infer<typeof testBulkImportSchema>