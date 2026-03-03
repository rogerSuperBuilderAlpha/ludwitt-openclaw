/**
 * String Helper Utilities
 * 
 * Common string manipulation functions
 */

/**
 * Truncate string to max length with optional ellipsis
 */
export function truncateString(str: string, maxLength: number, addEllipsis: boolean = true): string {
  if (str.length <= maxLength) {
    return str
  }
  return addEllipsis ? str.substring(0, maxLength) + '...' : str.substring(0, maxLength)
}

/**
 * Truncate string to max length (no ellipsis)
 */
export function truncate(str: string, maxLength: number): string {
  return truncateString(str, maxLength, false)
}

