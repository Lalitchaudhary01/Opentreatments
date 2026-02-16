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

export async function createServerAction<T>(
  action: () => Promise<T> | T
): Promise<ServerActionResponse<T>> {
  try {
    const data = await action()
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}