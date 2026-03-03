/**
 * Error Helper Utilities
 * 
 * Common error handling and message extraction utilities
 */

/**
 * Extract error message from unknown error type
 */
export function getErrorMessage(error: unknown, fallback: string = 'An error occurred'): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return fallback
}

/**
 * Check if error is a specific type
 */
export function isError(error: unknown, message: string): boolean {
  return error instanceof Error && error.message.includes(message)
}

