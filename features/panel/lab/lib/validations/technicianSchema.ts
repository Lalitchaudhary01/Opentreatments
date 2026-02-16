// features/panel/lab/lib/validations/technicianSchema.ts

import { z } from 'zod'

export const technicianSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number is required'),
  employeeId: z.string().optional(),
  designation: z.string().min(1, 'Designation is required'),
  specialization: z.array(z.string()).default([]),
  experience: z.number().optional(),
  qualification: z.string().optional(),
  certificates: z.array(z.instanceof(File)).default([])
})

export type TechnicianInput = z.infer<typeof technicianSchema>

export const technicianScheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  isAvailable: z.boolean().default(true)
}).refine((data) => {
  const start = data.startTime.split(':').map(Number)
  const end = data.endTime.split(':').map(Number)
  const startMinutes = start[0] * 60 + start[1]
  const endMinutes = end[0] * 60 + end[1]
  return endMinutes > startMinutes
}, { message: 'End time must be after start time' })

export type TechnicianScheduleInput = z.infer<typeof technicianScheduleSchema>