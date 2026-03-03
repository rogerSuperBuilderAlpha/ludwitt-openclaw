/**
 * Test Utilities and Reporters
 * 
 * Helper functions for audit tests including statistics collection
 * and formatted reporting.
 */

// ============================================================================
// Statistics Collection
// ============================================================================

export interface AuditStats {
  total: number
  errors: number
  warnings: number
  byCategory: Record<string, number>
}

export interface AuditError {
  id: string
  category: string
  message: string
  severity: 'error' | 'warning'
}

export class AuditCollector {
  private errors: AuditError[] = []
  private warnings: AuditError[] = []
  private stats: Record<string, number> = {}
  private total = 0

  constructor(private readonly subjectName: string) {}

  setTotal(count: number): void {
    this.total = count
  }

  addError(id: string, category: string, message: string): void {
    this.errors.push({ id, category, message, severity: 'error' })
    this.incrementStat(`error:${category}`)
  }

  addWarning(id: string, category: string, message: string): void {
    this.warnings.push({ id, category, message, severity: 'warning' })
    this.incrementStat(`warning:${category}`)
  }

  incrementStat(key: string, amount = 1): void {
    this.stats[key] = (this.stats[key] || 0) + amount
  }

  addStatistic(key: string, value: string | number): void {
    // Store as a named statistic for the report
    this.stats[`stat:${key}`] = typeof value === 'number' ? value : 0
    // Also store the string representation for printing
    if (!this.namedStats) {
      this.namedStats = {}
    }
    this.namedStats[key] = String(value)
  }

  private namedStats: Record<string, string> = {}

  getErrors(): AuditError[] {
    return this.errors
  }

  getWarnings(): AuditError[] {
    return this.warnings
  }

  getStats(): AuditStats {
    return {
      total: this.total,
      errors: this.errors.length,
      warnings: this.warnings.length,
      byCategory: this.stats
    }
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  /**
   * Print a summary report to console
   */
  printReport(): void {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`${this.subjectName} AUDIT REPORT`)
    console.log(`${'='.repeat(60)}\n`)

    console.log(`Total items: ${this.total}`)
    console.log(`Errors: ${this.errors.length}`)
    console.log(`Warnings: ${this.warnings.length}`)

    if (this.errors.length > 0) {
      console.log(`\n--- ERRORS (${this.errors.length}) ---`)
      const errorsByCategory = this.groupBy(this.errors, 'category')
      for (const [category, items] of Object.entries(errorsByCategory)) {
        console.log(`\n[${category}] (${items.length})`)
        items.slice(0, 10).forEach(e => {
          console.log(`  - [${e.id}] ${e.message}`)
        })
        if (items.length > 10) {
          console.log(`  ... and ${items.length - 10} more`)
        }
      }
    }

    if (this.warnings.length > 0) {
      console.log(`\n--- WARNINGS (${this.warnings.length}) ---`)
      const warningsByCategory = this.groupBy(this.warnings, 'category')
      for (const [category, items] of Object.entries(warningsByCategory)) {
        console.log(`\n[${category}] (${items.length})`)
        items.slice(0, 5).forEach(w => {
          console.log(`  - [${w.id}] ${w.message}`)
        })
        if (items.length > 5) {
          console.log(`  ... and ${items.length - 5} more`)
        }
      }
    }

    // Print named statistics
    if (Object.keys(this.namedStats).length > 0) {
      console.log(`\n--- STATISTICS ---`)
      for (const [key, value] of Object.entries(this.namedStats)) {
        console.log(`  ${key}: ${value}`)
      }
    }

    console.log(`\n${'='.repeat(60)}\n`)
  }

  private groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce((acc, item) => {
      const k = String(item[key])
      if (!acc[k]) acc[k] = []
      acc[k].push(item)
      return acc
    }, {} as Record<string, T[]>)
  }
}

// ============================================================================
// Distribution Helpers
// ============================================================================

/**
 * Calculate distribution of values
 */
export function calculateDistribution<T>(
  items: T[],
  keyFn: (item: T) => string | number
): Record<string, number> {
  const distribution: Record<string, number> = {}
  
  for (const item of items) {
    const key = String(keyFn(item))
    distribution[key] = (distribution[key] || 0) + 1
  }
  
  return distribution
}

/**
 * Calculate grade distribution (1-12)
 */
export function calculateGradeDistribution<T extends { difficulty: number }>(
  items: T[]
): Record<number, number> {
  const distribution: Record<number, number> = {}
  
  for (let grade = 1; grade <= 12; grade++) {
    distribution[grade] = 0
  }
  
  for (const item of items) {
    const grade = Math.round(item.difficulty)
    if (grade >= 1 && grade <= 12) {
      distribution[grade]++
    }
  }
  
  return distribution
}

/**
 * Print a histogram to console
 */
export function printHistogram(
  distribution: Record<string | number, number>,
  title: string,
  maxBarWidth = 40
): void {
  console.log(`\n${title}`)
  console.log('-'.repeat(50))
  
  const entries = Object.entries(distribution).sort((a, b) => {
    // Try numeric sort first
    const numA = Number(a[0])
    const numB = Number(b[0])
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB
    }
    return a[0].localeCompare(b[0])
  })
  
  const maxCount = Math.max(...Object.values(distribution), 1)
  
  for (const [key, count] of entries) {
    const barWidth = Math.round((count / maxCount) * maxBarWidth)
    const bar = '█'.repeat(barWidth) || '░'
    console.log(`  ${String(key).padStart(12)}: ${bar} ${count}`)
  }
}

// ============================================================================
// Coverage Helpers
// ============================================================================

/**
 * Calculate field coverage (what percentage have this optional field)
 */
export function calculateFieldCoverage<T extends object>(
  items: T[],
  fields: (keyof T)[]
): Record<string, { count: number; percent: number }> {
  const coverage: Record<string, { count: number; percent: number }> = {}
  const total = items.length || 1
  
  for (const field of fields) {
    const count = items.filter(item => {
      const value = item[field]
      if (Array.isArray(value)) return value.length > 0
      return value !== undefined && value !== null && value !== ''
    }).length
    
    coverage[String(field)] = {
      count,
      percent: Math.round((count / total) * 100)
    }
  }
  
  return coverage
}

/**
 * Print coverage report
 */
export function printCoverageReport(
  coverage: Record<string, { count: number; percent: number }>,
  total: number,
  title: string
): void {
  console.log(`\n${title}`)
  console.log('-'.repeat(50))
  
  for (const [field, data] of Object.entries(coverage)) {
    const bar = '█'.repeat(Math.round(data.percent / 5)) + 
                '░'.repeat(20 - Math.round(data.percent / 5))
    console.log(`  ${field.padEnd(25)} ${bar} ${data.percent}% (${data.count}/${total})`)
  }
}

// ============================================================================
// Assertion Helpers
// ============================================================================

/**
 * Create a detailed test failure message
 */
export function formatErrorList(errors: AuditError[], maxShow = 20): string {
  if (errors.length === 0) return 'No errors'
  
  const lines = errors.slice(0, maxShow).map(e => 
    `  [${e.id}] (${e.category}) ${e.message}`
  )
  
  if (errors.length > maxShow) {
    lines.push(`  ... and ${errors.length - maxShow} more errors`)
  }
  
  return lines.join('\n')
}

/**
 * Helper to create detailed test descriptions
 */
export function describeValidation(
  description: string,
  itemCount: number,
  validCount: number
): string {
  const percent = Math.round((validCount / Math.max(itemCount, 1)) * 100)
  return `${description}: ${validCount}/${itemCount} (${percent}%)`
}
