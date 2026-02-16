// features/panel/lab/lib/utils/server-action-wrapper.ts

import { ServerActionResponse } from '../../types/server-action.types'
import { z } from 'zod'

export async function withServerAction<T>(
  action: () => Promise<T>,
  errorMessage = 'Something went wrong'
): Promise<ServerActionResponse<T>> {
  try {
    const data = await action()
    return { success: true, data }
  } catch (error) {
    console.error('Server Action Error:', error)
    
    if (error instanceof Error) {
      return { 
        success: false, 
        error: error.message 
      }
    }
    
    return { 
      success: false, 
      error: errorMessage 
    }
  }
}

export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ServerActionResponse<T> {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!fieldErrors[path]) {
          fieldErrors[path] = []
        }
        fieldErrors[path].push(err.message)
      })
      return { 
        success: false, 
        fieldErrors,
        error: 'Validation failed' 
      }
    }
    return { 
      success: false, 
      error: 'Invalid form data' 
    }
  }
}

export function createSuccessResponse<T>(data: T): ServerActionResponse<T> {
  return { success: true, data }
}

export function createErrorResponse(error: string): ServerActionResponse {
  return { success: false, error }
}

export function createValidationErrorResponse(
  fieldErrors: Record<string, string[]>
): ServerActionResponse {
  return { 
    success: false, 
    fieldErrors,
    error: 'Validation failed' 
  }
}