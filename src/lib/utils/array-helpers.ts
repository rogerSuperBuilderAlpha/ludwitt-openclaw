/**
 * Array Helper Utilities
 * 
 * Common array manipulation functions
 */

/**
 * Combine arrays from multiple sources, handling null/undefined
 */
export function combineArrays<T>(...arrays: (T[] | null | undefined)[]): T[] {
  return arrays.filter((arr): arr is T[] => Array.isArray(arr)).flat()
}

/**
 * Get unique items from an array
 */
export function getUnique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Filter array by date range
 */
export function filterByDateRange<T extends { timestamp?: Date | string | number | any }>(
  items: T[],
  startDate: Date,
  endDate: Date,
  getTimestamp?: (item: T) => Date | string | number | undefined
): T[] {
  return items.filter(item => {
    const timestamp = getTimestamp ? getTimestamp(item) : item.timestamp
    if (!timestamp) return false
    
    const itemDate = timestamp instanceof Date 
      ? timestamp 
      : new Date(timestamp)
    
    if (isNaN(itemDate.getTime())) return false
    
    return itemDate >= startDate && itemDate <= endDate
  })
}
