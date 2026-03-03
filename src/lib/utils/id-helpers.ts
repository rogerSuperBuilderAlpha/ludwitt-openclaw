/**
 * ID Helper Utilities
 * 
 * Common ID generation patterns for Firestore documents
 */

/**
 * Generate a document ID using userId and timestamp
 */
export function generateDocumentId(userId: string, ...parts: (string | number)[]): string {
  const timestamp = Date.now()
  const partsStr = parts.length > 0 ? `_${parts.join('_')}` : ''
  return `${userId}_${timestamp}${partsStr}`
}

/**
 * Generate a document ID using userId and a specific value
 */
export function generateDocumentIdWithValue(userId: string, value: string | number): string {
  return `${userId}_${value}`
}

/**
 * Generate a document ID with prefix
 */
export function generateDocumentIdWithPrefix(prefix: string, ...parts: (string | number)[]): string {
  return `${prefix}_${parts.join('_')}`
}

