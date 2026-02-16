// features/panel/lab/lib/utils/form-helpers.ts

export function formatFormData<T extends Record<string, any>>(data: T): FormData {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    
    if (value instanceof File) {
      formData.append(key, value)
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString())
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item)
        } else {
          formData.append(`${key}[${index}]`, JSON.stringify(item))
        }
      })
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, String(value))
    }
  })
  
  return formData
}

export function parseFormData<T>(formData: FormData): T {
  const data: Record<string, any> = {}
  
  formData.forEach((value, key) => {
    // Check if key is array notation (e.g., "items[0]")
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/)
    
    if (arrayMatch) {
      const [, arrayKey, index] = arrayMatch
      if (!data[arrayKey]) data[arrayKey] = []
      data[arrayKey][parseInt(index)] = value
    } else {
      // Try to parse JSON
      try {
        data[key] = JSON.parse(value as string)
      } catch {
        data[key] = value
      }
    }
  })
  
  return data as T
}

export function getDirtyFields<T extends Record<string, any>>(
  formData: T,
  initialData: T
): Partial<T> {
  const dirtyFields: Partial<T> = {}
  
  Object.keys(formData).forEach((key) => {
    const formValue = formData[key]
    const initialValue = initialData[key]
    
    if (JSON.stringify(formValue) !== JSON.stringify(initialValue)) {
      dirtyFields[key as keyof T] = formValue
    }
  })
  
  return dirtyFields
}

export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

export function getFileError(file: File): string | null {
  if (!validateFileSize(file)) {
    return 'File size must be less than 5MB'
  }
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  if (!validateFileType(file, allowedTypes)) {
    return 'File must be JPEG, PNG or PDF'
  }
  
  return null
}