/**
 * Content Validation Utilities
 * 
 * Shared validators for problem content across all subjects.
 */

// ============================================================================
// ID Format Validation
// ============================================================================

/**
 * Valid ID format patterns by subject
 * Format: {subject-prefix}-{optional-version}-g{grade}-{topic}-{num}
 */
const ID_PATTERNS: Record<string, RegExp[]> = {
  math: [
    // math-v2 format: alg-v2-g6-linear-001
    /^[a-z]+-v2-g\d{1,2}-[a-z-]+-\d{3}$/,
    // Alternate: arith-v2-g3-add-001
    /^[a-z]+-v2-g\d{1,2}-[a-z]+-\d{3}$/,
    // Word problems: wp-v2-g8-time-001
    /^wp-v2-g\d{1,2}-[a-z]+-\d{3}$/
  ],
  reading: [
    // read-g1-bird-001
    /^read-g\d{1,2}-[a-z-]+-\d{3}$/,
    // stem-bio-g5-001
    /^stem-[a-z]+-g\d{1,2}-\d{3}$/,
    // vocab-g3-001
    /^vocab-g\d{1,2}-\d{3}$/,
    // grammar-pos-001 (parts of speech)
    /^grammar-[a-z]+-\d{3}$/,
    // lit-poetry-g10-001
    /^lit-[a-z]+-g\d{1,2}-\d{3}$/
  ],
  latin: [
    // lat-g3-001
    /^lat-g\d{1,2}-\d{3}$/,
    // lat-vocab-001
    /^lat-vocab-\d{3}$/,
    // lat-conj-001 (conjugation)
    /^lat-conj-\d{3}$/,
    // lat-decl-001 (declension)
    /^lat-decl-\d{3}$/
  ],
  greek: [
    // grk-g3-001
    /^grk-g\d{1,2}-\d{3}$/,
    // grk-vocab-001
    /^grk-vocab-\d{3}$/,
    // grk-alpha-001 (alphabet)
    /^grk-alpha-\d{3}$/
  ]
}

/**
 * Validate ID format for a given subject
 */
export function validateIdFormat(id: string, subject: 'math' | 'reading' | 'latin' | 'greek'): boolean {
  if (!id || typeof id !== 'string') return false
  
  const patterns = ID_PATTERNS[subject]
  if (!patterns) return false
  
  return patterns.some(pattern => pattern.test(id))
}

/**
 * Extract grade level from ID if present
 */
export function extractGradeFromId(id: string): number | null {
  const match = id.match(/-g(\d{1,2})-/)
  if (match) {
    return parseInt(match[1], 10)
  }
  return null
}

// ============================================================================
// Difficulty Validation
// ============================================================================

/**
 * Validate difficulty is in valid range (1.0 to 12.0)
 */
export function validateDifficulty(difficulty: number): { valid: boolean; message?: string } {
  if (typeof difficulty !== 'number' || isNaN(difficulty)) {
    return { valid: false, message: 'Difficulty must be a number' }
  }
  if (difficulty < 1.0 || difficulty > 12.0) {
    return { valid: false, message: `Difficulty ${difficulty} out of range [1.0, 12.0]` }
  }
  return { valid: true }
}

/**
 * Check if difficulty matches grade level (within 1.0)
 * Tolerance of 1.0 allows intentional variation (e.g., easier/harder problems within a grade)
 */
export function difficultyMatchesGrade(difficulty: number, gradeLevel: number): boolean {
  return Math.abs(difficulty - gradeLevel) <= 1.0
}

// ============================================================================
// Time Estimate Validation
// ============================================================================

/**
 * Validate time estimate is reasonable (10-600 seconds)
 */
export function validateTimeEstimate(timeEstimate: number): { valid: boolean; warning?: string } {
  if (typeof timeEstimate !== 'number' || isNaN(timeEstimate)) {
    return { valid: false, warning: 'Time estimate must be a number' }
  }
  if (timeEstimate < 10) {
    return { valid: true, warning: `Time estimate ${timeEstimate}s is unusually low (< 10s)` }
  }
  if (timeEstimate > 600) {
    return { valid: true, warning: `Time estimate ${timeEstimate}s is unusually high (> 600s)` }
  }
  return { valid: true }
}

// ============================================================================
// Unicode Validation for Classical Languages
// ============================================================================

// Greek Unicode ranges
const GREEK_BASIC_RANGE = /[\u0370-\u03FF]/  // Greek and Coptic
const GREEK_EXTENDED_RANGE = /[\u1F00-\u1FFF]/  // Greek Extended

/**
 * Check if text contains Greek Unicode characters
 */
export function containsGreekUnicode(text: string): boolean {
  if (!text) return false
  return GREEK_BASIC_RANGE.test(text) || GREEK_EXTENDED_RANGE.test(text)
}

/**
 * Validate that Greek text is valid (contains expected characters)
 */
export function validateGreekUnicode(text: string): { valid: boolean; issues: string[] } {
  const issues: string[] = []
  
  if (!text || text.trim() === '') {
    return { valid: false, issues: ['Empty Greek text'] }
  }

  // Check that it actually contains Greek characters
  if (!containsGreekUnicode(text)) {
    issues.push('No Greek Unicode characters found')
  }

  // Check for common issues
  // Latin lookalikes that should be Greek
  const latinLookalikes = /[AaBbEeHhIiKkMmNnOoPpTtXxYyZz]/g
  const latinMatches = text.match(latinLookalikes)
  if (latinMatches && latinMatches.length > 2) {
    // Allow some Latin (for numbers, punctuation context)
    // but flag if there are too many
    issues.push(`Possible Latin lookalikes: ${latinMatches.slice(0, 5).join(', ')}`)
  }

  return {
    valid: issues.length === 0,
    issues
  }
}

/**
 * Count words in Greek text (split by whitespace)
 */
export function countGreekWords(text: string): number {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(w => w.length > 0).length
}

// ============================================================================
// Latin Text Validation
// ============================================================================

// Latin macron characters
const LATIN_MACRONS = /[āēīōūĀĒĪŌŪ]/

/**
 * Check if text contains Latin macrons
 */
export function containsLatinMacrons(text: string): boolean {
  if (!text) return false
  return LATIN_MACRONS.test(text)
}

/**
 * Validate Latin text (basic Latin alphabet, optionally with macrons)
 */
export function validateLatinText(text: string): { valid: boolean; issues: string[] } {
  const issues: string[] = []
  
  if (!text || text.trim() === '') {
    return { valid: false, issues: ['Empty Latin text'] }
  }

  // Check for unexpected characters (non-Latin script)
  // Allow: a-z, A-Z, macrons, punctuation, spaces, numbers
  const allowedPattern = /^[a-zA-ZāēīōūĀĒĪŌŪ\s.,;:!?'"()-\d]+$/
  if (!allowedPattern.test(text)) {
    // Find the problematic characters
    const problematic = text.split('').filter(c => !allowedPattern.test(c))
    if (problematic.length > 0) {
      issues.push(`Unexpected characters: ${[...new Set(problematic)].slice(0, 5).join(', ')}`)
    }
  }

  // Check for Greek characters accidentally mixed in
  if (containsGreekUnicode(text)) {
    issues.push('Contains Greek Unicode characters (should be Latin only)')
  }

  return {
    valid: issues.length === 0,
    issues
  }
}

/**
 * Count words in Latin text
 */
export function countLatinWords(text: string): number {
  if (!text) return 0
  // Remove punctuation and split by whitespace
  return text.replace(/[.,;:!?'"()-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0)
    .length
}

// ============================================================================
// Required Fields Validation
// ============================================================================

/**
 * Check if an object has all required fields
 */
export function validateRequiredFields<T extends object>(
  obj: T,
  requiredFields: (keyof T)[]
): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  
  for (const field of requiredFields) {
    const value = obj[field]
    if (value === undefined || value === null || value === '') {
      missing.push(String(field))
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  }
}

/**
 * Check if an array field is non-empty
 */
export function validateNonEmptyArray(arr: unknown): boolean {
  return Array.isArray(arr) && arr.length > 0
}

// ============================================================================
// ID Uniqueness
// ============================================================================

/**
 * Find duplicate IDs in a list
 */
export function findDuplicateIds(ids: string[]): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()
  
  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.add(id)
    } else {
      seen.add(id)
    }
  }
  
  return Array.from(duplicates)
}

/**
 * Find duplicate IDs across multiple arrays with source tracking
 */
export function findDuplicateIdsWithSource(
  sources: Array<{ name: string; ids: string[] }>
): Array<{ id: string; sources: string[] }> {
  const idToSources = new Map<string, string[]>()
  
  for (const source of sources) {
    for (const id of source.ids) {
      const existing = idToSources.get(id) || []
      existing.push(source.name)
      idToSources.set(id, existing)
    }
  }
  
  const duplicates: Array<{ id: string; sources: string[] }> = []
  for (const [id, foundSources] of idToSources) {
    if (foundSources.length > 1) {
      duplicates.push({ id, sources: foundSources })
    }
  }
  
  return duplicates
}
