// features/panel/lab/lib/validations/labProfileSchema.ts

import { z } from 'zod'

export const labProfileSchema = z.object({
  // Basic Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  registrationNumber: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  
  // Accreditation
  accreditations: z.array(z.string()).default([]),
  licenseNumber: z.string().optional(),
  licenseExpiry: z.date().optional(),
  
  // Documents
  documents: z.array(z.instanceof(File)).optional(),
  
  // Collection
  homeCollection: z.boolean().default(false),
  homeCollectionFee: z.number().optional(),
  
  // Collection Centers
  collectionCenters: z.array(z.object({
    name: z.string().min(2, 'Center name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    pincode: z.string().length(6, 'Pincode must be 6 digits'),
    phone: z.string().min(10, 'Phone number is required'),
    isActive: z.boolean().default(true)
  })).optional()
})

export type LabProfileInput = z.infer<typeof labProfileSchema>

export const labProfilePartialSchema = labProfileSchema.partial()
export type LabProfilePartialInput = z.infer<typeof labProfilePartialSchema>