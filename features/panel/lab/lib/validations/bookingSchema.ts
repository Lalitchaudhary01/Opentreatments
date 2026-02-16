// features/panel/lab/lib/validations/bookingSchema.ts

import { z } from 'zod'

export const bookingItemSchema = z.object({
  itemType: z.enum(['test', 'package']),
  testId: z.string().optional(),
  packageId: z.string().optional(),
}).refine((data) => {
  if (data.itemType === 'test') return !!data.testId
  if (data.itemType === 'package') return !!data.packageId
  return false
}, { message: 'Invalid item selection' })

export const bookingSchema = z.object({
  // Items
  items: z.array(bookingItemSchema).min(1, 'At least one item is required'),
  
  // Schedule
  appointmentDate: z.date().min(new Date(), 'Appointment date must be in future'),
  appointmentSlot: z.string().min(1, 'Time slot is required'),
  
  // Collection Type
  collectionType: z.enum(['home', 'lab', 'center']),
  collectionCenter: z.string().optional(),
  
  // Patient Details
  patientName: z.string().min(2, 'Patient name is required'),
  patientAge: z.number().min(1, 'Age is required').max(150, 'Invalid age'),
  patientGender: z.enum(['Male', 'Female', 'Other']),
  patientPhone: z.string().min(10, 'Phone number is required'),
  patientEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  
  // Address (required for home collection)
  address: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  landmark: z.string().optional(),
}).refine((data) => {
  if (data.collectionType === 'home') {
    return !!data.address && !!data.city && !!data.pincode
  }
  return true
}, { message: 'Address is required for home collection' })

export type BookingInput = z.infer<typeof bookingSchema>

export const bookingStatusUpdateSchema = z.object({
  status: z.enum([
    'PENDING', 'CONFIRMED', 'TECHNICIAN_ASSIGNED', 'SAMPLE_COLLECTED',
    'SAMPLE_RECEIVED', 'PROCESSING', 'REPORT_READY', 'COMPLETED', 'CANCELLED'
  ]),
  note: z.string().optional()
})

export type BookingStatusUpdateInput = z.infer<typeof bookingStatusUpdateSchema>