#!/usr/bin/env npx ts-node
/**
 * Reading Exercise Generator
 * 
 * Generates ReadingExercise format exercises using AI.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-reading.ts --count 50
 *   npx ts-node scripts/generators/generate-reading.ts --count 10 --grade 6 --type vocabulary
 *   npx ts-node scripts/generators/generate-reading.ts --dry-run
 */

import * as path from 'path'
import {
  GenerationResult,
  callAnthropicWithRetry,
  extractJSON,
  processBatches,
  writeGeneratedFile,
  estimateCost,
  formatCost,
  generateTimestampId,
  formatDuration,
} from './generator-core'
import { SYSTEM_PROMPT, READING_PROMPT, getReadingBatchPrompt } from './generation-prompts'
import { validateBatch, printValidationReport } from './problem-validator'

// ============================================================================
// Types
// ============================================================================

interface ReadingExerciseGenerated {
  id: string
  type: string
  difficulty: number
  passage: string
  lexileScore?: number
  questions: {
    id: string
    question: string
    type: string
    options?: string[]
    correctAnswer: string | string[]
    explanation: string
    skill: string
  }[]
  timeEstimate: number
  genre?: string
  contentArea?: string
  tags: string[]
}

interface GeneratorOptions {
  count: number
  gradeLevel?: number
  type?: string
  dryRun: boolean
}

// ============================================================================
// Reading Types
// ============================================================================

const READING_TYPES = ['comprehension', 'vocabulary', 'grammar', 'critical-analysis']

const TYPE_BY_GRADE: Record<number, string[]> = {
  1: ['comprehension', 'vocabulary'],
  2: ['comprehension', 'vocabulary'],
  3: ['comprehension', 'vocabulary', 'grammar'],
  4: ['comprehension', 'vocabulary', 'grammar'],
  5: ['comprehension', 'vocabulary', 'grammar'],
  6: ['comprehension', 'vocabulary', 'grammar'],
  7: ['comprehension', 'grammar', 'critical-analysis'],
  8: ['comprehension', 'grammar', 'critical-analysis'],
  9: ['comprehension', 'critical-analysis'],
  10: ['comprehension', 'critical-analysis'],
  11: ['comprehension', 'critical-analysis'],
  12: ['comprehension', 'critical-analysis'],
}

// ============================================================================
// Generator
// ============================================================================

async function generateReadingBatch(
  batchNum: number,
  count: number,
  gradeLevel?: number,
  type?: string
): Promise<ReadingExerciseGenerated[]> {
  // If no grade specified, distribute across grades
  const grade = gradeLevel || (batchNum % 12) + 1
  
  // If no type specified, pick appropriate type for grade
  const readingType = type || TYPE_BY_GRADE[grade][batchNum % TYPE_BY_GRADE[grade].length]

  const prompt = getReadingBatchPrompt(count, grade, readingType)
  const fullPrompt = `${READING_PROMPT}\n\n${prompt}`

  const response = await callAnthropicWithRetry(fullPrompt, SYSTEM_PROMPT, 1600)
  
  let exercises = extractJSON<ReadingExerciseGenerated>(response.content)

  // Post-process: ensure IDs are unique and fields are set
  exercises = exercises.map((e, i) => {
    const exerciseId = e.id || generateTimestampId(`gen-read-${readingType}`)
    return {
      ...e,
      id: exerciseId,
      type: readingType,
      difficulty: e.difficulty || grade + (i * 0.1),
      questions: (e.questions || []).map((q, qi) => ({
        ...q,
        id: q.id || `${exerciseId}-q${qi + 1}`,
      })),
      timeEstimate: e.timeEstimate || (60 + grade * 15),
      tags: e.tags || [readingType, `grade-${grade}`],
    }
  })

  return exercises
}

async function generateReadingExercises(options: GeneratorOptions): Promise<GenerationResult<ReadingExerciseGenerated>> {
  const { count, gradeLevel, type, dryRun } = options

  console.log('\n=== Reading Exercise Generator ===')
  console.log(`  Target count: ${count}`)
  console.log(`  Grade level: ${gradeLevel || 'all grades (1-12)'}`)
  console.log(`  Type: ${type || 'varied'}`)
  console.log(`  Dry run: ${dryRun}`)

  // Show cost estimate
  const costEstimate = estimateCost('reading', count)
  console.log(formatCost(costEstimate))

  if (dryRun) {
    console.log('\n[DRY RUN] Would generate exercises with the above parameters.')
    return {
      success: true,
      problems: [],
      errors: [],
      tokensUsed: { input: costEstimate.inputTokens, output: costEstimate.outputTokens },
      estimatedCost: costEstimate.totalCost,
    }
  }

  const startTime = Date.now()

  const result = await processBatches<ReadingExerciseGenerated>({
    subject: 'reading',
    totalCount: count,
    batchSize: 3, // Generate 3 exercises per API call (larger output)
    generateBatch: (batchNum, batchCount) => 
      generateReadingBatch(batchNum, batchCount, gradeLevel, type),
    dryRun,
  })

  // Validate generated exercises
  console.log('\n  Validating generated exercises...')
  const { valid, invalid, duplicates } = validateBatch(result.problems, 'reading')
  printValidationReport('reading', valid.length, invalid, duplicates)

  // Write valid exercises to file
  if (valid.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(
      process.cwd(),
      'src/data/basics/reading/generated',
      `batch-${timestamp}.ts`
    )

    writeGeneratedFile(
      outputPath,
      "import type { ReadingExercise } from '@/lib/types/basics'",
      `GENERATED_READING_${timestamp.replace(/-/g, '_')}`,
      'ReadingExercise',
      valid,
      dryRun
    )
  }

  const duration = Date.now() - startTime
  console.log(`\n  Completed in ${formatDuration(duration)}`)

  return {
    ...result,
    problems: valid,
  }
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs(): GeneratorOptions {
  const args = process.argv.slice(2)
  const options: GeneratorOptions = {
    count: 50,
    dryRun: false,
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--count':
      case '-c':
        options.count = parseInt(args[++i], 10)
        break
      case '--grade':
      case '-g':
        options.gradeLevel = parseInt(args[++i], 10)
        break
      case '--type':
      case '-t':
        options.type = args[++i]
        break
      case '--dry-run':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
Reading Exercise Generator

Usage:
  npx ts-node scripts/generators/generate-reading.ts [options]

Options:
  --count, -c <n>     Number of exercises to generate (default: 50)
  --grade, -g <n>     Target grade level 1-12 (default: all grades)
  --type, -t <type>   Exercise type: ${READING_TYPES.join(', ')}
  --dry-run           Show cost estimate without generating
  --help, -h          Show this help message

Examples:
  npx ts-node scripts/generators/generate-reading.ts --count 100
  npx ts-node scripts/generators/generate-reading.ts --grade 5 --type vocabulary --count 20
  npx ts-node scripts/generators/generate-reading.ts --dry-run
        `)
        process.exit(0)
    }
  }

  return options
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const options = parseArgs()

  try {
    const result = await generateReadingExercises(options)

    if (result.success) {
      console.log('\n✓ Generation completed successfully')
      console.log(`  Generated: ${result.problems.length} exercises`)
      console.log(`  Estimated cost: $${result.estimatedCost.toFixed(4)}`)
    } else {
      console.log('\n✗ Generation completed with errors:')
      result.errors.forEach(e => console.log(`  - ${e}`))
    }
  } catch (error) {
    console.error('\n✗ Generation failed:', error)
    process.exit(1)
  }
}

// Only run main when this file is executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`
if (isMainModule) {
  main()
}

export { generateReadingExercises, GeneratorOptions }
