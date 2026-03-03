/**
 * Default Value Utilities
 * 
 * Common default value patterns to ensure consistency
 */

/**
 * Get value or default to empty array
 */
export function defaultToArray<T>(value: T[] | null | undefined): T[] {
  return (value || []) as T[]
}

/**
 * Get value or default to empty object
 */
export function defaultToObject<T extends Record<string, any>>(value: T | null | undefined): T {
  return value || ({} as T)
}

/**
 * Get value or default to zero
 */
export function defaultToZero(value: number | null | undefined): number {
  return value || 0
}

/**
 * Get value or default to empty string
 */
export function defaultToString(value: string | null | undefined): string {
  return value || ''
}

/**
 * Get value or default to null
 */
export function defaultToNull<T>(value: T | null | undefined): T | null {
  return value ?? null
}

/**
 * Get value or default to undefined
 */
export function defaultToUndefined<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined
}

