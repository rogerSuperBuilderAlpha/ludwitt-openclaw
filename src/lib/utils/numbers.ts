/**
 * Number utility functions
 * 
 * Common number conversion, validation, and formatting functions
 */

/**
 * Safely convert value to number with fallback
 */
export function toNumber(value: unknown, fallback: number = 0): number {
  if (typeof value === 'number') {
    return isNaN(value) ? fallback : value
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? fallback : parsed
  }
  return fallback
}

/**
 * Safely convert value to integer with fallback
 */
export function toInteger(value: unknown, fallback: number = 0): number {
  if (typeof value === 'number') {
    return isNaN(value) ? fallback : Math.floor(value)
  }
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? fallback : parsed
  }
  return fallback
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Converts a decimal value (0-1) to a percentage
 * @param value - Decimal value between 0 and 1
 * @param decimals - Number of decimal places (default: 0)
 * @returns Percentage value
 */
export function toPercentage(value: number, decimals: number = 0): number {
  if (decimals === 0) {
    return Math.round(value * 100)
  }
  const multiplier = Math.pow(10, decimals)
  return Math.round(value * 100 * multiplier) / multiplier
}

/**
 * Formats a decimal value as a percentage string
 * @param value - Decimal value between 0 and 1
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string (e.g., "75%")
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${toPercentage(value, decimals)}%`
}

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formats a number with thousand separators
 */
export function formatNumber(value: number): string {
  return value.toLocaleString()
}

/**
 * Calculate average of numbers in array
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

/**
 * Round number to nearest integer
 */
export function round(value: number): number {
  return Math.round(value)
}
