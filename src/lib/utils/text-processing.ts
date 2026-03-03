/**
 * Text Processing Utilities
 * 
 * Common text normalization and processing functions
 */

/**
 * Normalize text for comparison (lowercase, remove punctuation, normalize whitespace)
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

/**
 * Split text into words, filtering out empty strings
 */
export function splitWords(text: string): string[] {
  return text.split(' ').filter(w => w.length > 0)
}

