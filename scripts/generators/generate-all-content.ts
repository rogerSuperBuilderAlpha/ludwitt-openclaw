#!/usr/bin/env npx ts-node
/**
 * Master Content Generator
 * 
 * Runs all subject generators with configurable options.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-all-content.ts --all
 *   npx ts-node scripts/generators/generate-all-content.ts --subject math --count 50
 *   npx ts-node scripts/generators/generate-all-content.ts --estimate
 *   npx ts-node scripts/generators/generate-all-content.ts --dry-run
 */

import {
  SubjectType,
  GenerationResult,
  estimateCost,
  formatCost,
  printSummary,
  formatDuration,
} from './generator-core'

// Import generators
import { generateMathProblems } from './generate-math-v2'
import { generateReadingExercises } from './generate-reading'
import { generateLatinExercises } from './generate-latin'
import { generateGreekExercises } from './generate-greek'
import { generateLogicProblems } from './generate-logic'

// ============================================================================
// Types
// ============================================================================

interface MasterOptions {
  subjects: SubjectType[]
  counts: Record<SubjectType, number>
  dryRun: boolean
  estimateOnly: boolean
}

// Default targets based on gap analysis
const DEFAULT_COUNTS: Record<SubjectType, number> = {
  math: 293,
  reading: 200,
  latin: 130,
  greek: 141,
  logic: 100,
}

// ============================================================================
// Cost Estimation
// ============================================================================

function showTotalEstimate(subjects: SubjectType[], counts: Record<SubjectType, number>): void {
  console.log('\n' + '='.repeat(60))
  console.log('COST ESTIMATE')
  console.log('='.repeat(60))

  let totalInputTokens = 0
  let totalOutputTokens = 0
  let totalCost = 0

  for (const subject of subjects) {
    const count = counts[subject]
    const estimate = estimateCost(subject, count)
    
    console.log(`\n${subject.toUpperCase()} (${count} problems):`)
    console.log(`  Input:  ${estimate.inputTokens.toLocaleString()} tokens = $${estimate.inputCost.toFixed(4)}`)
    console.log(`  Output: ${estimate.outputTokens.toLocaleString()} tokens = $${estimate.outputCost.toFixed(4)}`)
    console.log(`  Total:  $${estimate.totalCost.toFixed(4)}`)

    totalInputTokens += estimate.inputTokens
    totalOutputTokens += estimate.outputTokens
    totalCost += estimate.totalCost
  }

  console.log('\n' + '-'.repeat(60))
  console.log('GRAND TOTAL:')
  console.log(`  Input:  ${totalInputTokens.toLocaleString()} tokens`)
  console.log(`  Output: ${totalOutputTokens.toLocaleString()} tokens`)
  console.log(`  Cost:   $${totalCost.toFixed(4)}`)
  console.log('='.repeat(60))
}

// ============================================================================
// Generator Runner
// ============================================================================

async function runGenerator(
  subject: SubjectType,
  count: number,
  dryRun: boolean
): Promise<GenerationResult<unknown>> {
  switch (subject) {
    case 'math':
      return generateMathProblems({ count, dryRun })
    case 'reading':
      return generateReadingExercises({ count, dryRun })
    case 'latin':
      return generateLatinExercises({ count, dryRun })
    case 'greek':
      return generateGreekExercises({ count, dryRun })
    case 'logic':
      return generateLogicProblems({ count, dryRun })
    default:
      throw new Error(`Unknown subject: ${subject}`)
  }
}

async function runAllGenerators(options: MasterOptions): Promise<void> {
  const { subjects, counts, dryRun, estimateOnly } = options

  console.log('\n' + '='.repeat(60))
  console.log('Ludwitt CONTENT GENERATOR')
  console.log('='.repeat(60))
  console.log(`\nSubjects: ${subjects.join(', ')}`)
  console.log(`Dry run: ${dryRun}`)
  console.log(`Estimate only: ${estimateOnly}`)

  // Show cost estimate
  showTotalEstimate(subjects, counts)

  if (estimateOnly) {
    console.log('\n[ESTIMATE ONLY] Exiting without generating.')
    return
  }

  if (dryRun) {
    console.log('\n[DRY RUN] Would generate content with the above parameters.')
    return
  }

  // Confirm before proceeding
  console.log('\nPress Ctrl+C within 5 seconds to cancel...')
  await new Promise(resolve => setTimeout(resolve, 5000))

  const startTime = Date.now()
  const results = new Map<SubjectType, GenerationResult<unknown>>()

  for (const subject of subjects) {
    console.log('\n' + '='.repeat(60))
    console.log(`GENERATING ${subject.toUpperCase()}`)
    console.log('='.repeat(60))

    try {
      const result = await runGenerator(subject, counts[subject], dryRun)
      results.set(subject, result)
    } catch (error) {
      console.error(`\n✗ Failed to generate ${subject}:`, error)
      results.set(subject, {
        success: false,
        problems: [],
        errors: [error instanceof Error ? error.message : String(error)],
        tokensUsed: { input: 0, output: 0 },
        estimatedCost: 0,
      })
    }
  }

  // Print summary
  printSummary(results)

  const duration = Date.now() - startTime
  console.log(`\nTotal time: ${formatDuration(duration)}`)
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs(): MasterOptions {
  const args = process.argv.slice(2)
  const options: MasterOptions = {
    subjects: [],
    counts: { ...DEFAULT_COUNTS },
    dryRun: false,
    estimateOnly: false,
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--all':
      case '-a':
        options.subjects = ['math', 'reading', 'latin', 'greek', 'logic']
        break
      case '--subject':
      case '-s':
        const subject = args[++i] as SubjectType
        if (!options.subjects.includes(subject)) {
          options.subjects.push(subject)
        }
        break
      case '--count':
      case '-c':
        const count = parseInt(args[++i], 10)
        // Apply count to all subjects if --all was specified, otherwise to last subject
        if (options.subjects.length > 0) {
          const lastSubject = options.subjects[options.subjects.length - 1]
          options.counts[lastSubject] = count
        } else {
          // Apply to all as default
          for (const key of Object.keys(options.counts)) {
            options.counts[key as SubjectType] = count
          }
        }
        break
      case '--math':
        options.subjects.push('math')
        break
      case '--reading':
        options.subjects.push('reading')
        break
      case '--latin':
        options.subjects.push('latin')
        break
      case '--greek':
        options.subjects.push('greek')
        break
      case '--logic':
        options.subjects.push('logic')
        break
      case '--dry-run':
        options.dryRun = true
        break
      case '--estimate':
        options.estimateOnly = true
        break
      case '--help':
      case '-h':
        console.log(`
Ludwitt Content Generator

Usage:
  npx ts-node scripts/generators/generate-all-content.ts [options]

Subject Selection:
  --all, -a             Generate for all subjects (default targets)
  --subject, -s <name>  Generate for specific subject (can repeat)
  --math                Include math (shorthand for --subject math)
  --reading             Include reading
  --latin               Include latin
  --greek               Include greek
  --logic               Include logic

Count Options:
  --count, -c <n>       Number of problems (applies to last subject or all)

Mode Options:
  --dry-run             Show what would be generated without making API calls
  --estimate            Show cost estimate only

Default Targets (based on gap analysis):
  Math:    ${DEFAULT_COUNTS.math} problems
  Reading: ${DEFAULT_COUNTS.reading} exercises
  Latin:   ${DEFAULT_COUNTS.latin} exercises
  Greek:   ${DEFAULT_COUNTS.greek} exercises
  Logic:   ${DEFAULT_COUNTS.logic} problems
  Total:   ${Object.values(DEFAULT_COUNTS).reduce((a, b) => a + b, 0)} problems

Examples:
  # Generate all subjects with default targets
  npx ts-node scripts/generators/generate-all-content.ts --all

  # Generate specific subjects
  npx ts-node scripts/generators/generate-all-content.ts --math --latin

  # Generate with custom counts
  npx ts-node scripts/generators/generate-all-content.ts --subject math --count 50

  # Cost estimate only
  npx ts-node scripts/generators/generate-all-content.ts --all --estimate

  # Dry run (no API calls)
  npx ts-node scripts/generators/generate-all-content.ts --all --dry-run
        `)
        process.exit(0)
    }
  }

  // Default to all subjects if none specified
  if (options.subjects.length === 0) {
    console.log('No subjects specified. Use --help for usage.')
    process.exit(1)
  }

  return options
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const options = parseArgs()

  try {
    await runAllGenerators(options)
    console.log('\n✓ Content generation complete!')
  } catch (error) {
    console.error('\n✗ Generation failed:', error)
    process.exit(1)
  }
}

main()
