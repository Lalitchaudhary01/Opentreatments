// features/panel/lab/types/server-action.types.ts

export type ServerActionResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ActionState = {
  isLoading: boolean
  error: string | null
  success: boolean
}

export type SortDirection = 'asc' | 'desc'

export interface PaginationParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortDirection?: SortDirection
  filters?: Record<string, any>
}