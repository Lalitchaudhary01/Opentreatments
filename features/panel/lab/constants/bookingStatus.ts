// features/panel/lab/constants/bookingStatus.ts

export const bookingStatuses = {
  PENDING: {
    label: 'Pending',
    color: 'yellow',
    icon: 'Clock',
    description: 'Waiting for lab confirmation'
  },
  CONFIRMED: {
    label: 'Confirmed',
    color: 'blue',
    icon: 'CheckCircle',
    description: 'Booking confirmed by lab'
  },
  TECHNICIAN_ASSIGNED: {
    label: 'Technician Assigned',
    color: 'purple',
    icon: 'User',
    description: 'Technician assigned for collection'
  },
  SAMPLE_COLLECTED: {
    label: 'Sample Collected',
    color: 'indigo',
    icon: 'Droplet',
    description: 'Sample collected from patient'
  },
  SAMPLE_RECEIVED: {
    label: 'Sample Received',
    color: 'cyan',
    icon: 'Package',
    description: 'Sample received at lab'
  },
  PROCESSING: {
    label: 'Processing',
    color: 'orange',
    icon: 'Loader',
    description: 'Testing in progress'
  },
  REPORT_READY: {
    label: 'Report Ready',
    color: 'green',
    icon: 'FileText',
    description: 'Report generated'
  },
  COMPLETED: {
    label: 'Completed',
    color: 'emerald',
    icon: 'CheckCircle2',
    description: 'Report delivered'
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'red',
    icon: 'XCircle',
    description: 'Booking cancelled'
  },
  RESCHEDULED: {
    label: 'Rescheduled',
    color: 'gray',
    icon: 'Calendar',
    description: 'Appointment rescheduled'
  }
} as const

export const sampleStatuses = {
  PENDING: { label: 'Pending', color: 'yellow' },
  SCHEDULED: { label: 'Scheduled', color: 'blue' },
  COLLECTED: { label: 'Collected', color: 'green' },
  RECEIVED: { label: 'Received', color: 'purple' },
  REJECTED: { label: 'Rejected', color: 'red' },
  PROCESSING: { label: 'Processing', color: 'orange' },
  COMPLETED: { label: 'Completed', color: 'emerald' }
} as const

export const paymentStatuses = {
  PENDING: { label: 'Pending', color: 'yellow' },
  SUCCESS: { label: 'Success', color: 'green' },
  FAILED: { label: 'Failed', color: 'red' },
  REFUNDED: { label: 'Refunded', color: 'gray' }
} as const