#!/usr/bin/env npx ts-node
/**
 * Math V2 Problem Generator
 * 
 * Generates MathProblemV2 format problems using AI.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-math-v2.ts --count 50
 *   npx ts-node scripts/generators/generate-math-v2.ts --count 10 --grade 6 --type algebra
 *   npx ts-node scripts/generators/generate-math-v2.ts --dry-run
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
import { SYSTEM_PROMPT, MATH_V2_PROMPT, getMathBatchPrompt } from './generation-prompts'
import { validateBatch, printValidationReport } from './problem-validator'

// ============================================================================
// Types
// ============================================================================

interface MathProblemGenerated {
  id: string
  version: 2
  type: string
  difficulty: number
  gradeLevel: number
  question: {
    text: string
    latex?: string
  }
  answer: {
    type: string
    correct: string
    acceptable: string[]
  }
  solution: {
    steps: { number: number; description: string; latex?: string }[]
    method: string
  }
  hints: { level: string; text: string }[]
  pedagogy: {
    topic: string
    subTopic: string
    skills: string[]
    prerequisites: string[]
    concepts: string[]
    commonMistakes: string[]
    scaffoldingLevel: string
  }
  metadata: {
    source: string
    createdAt: string
    tags: string[]
  }
}

interface GeneratorOptions {
  count: number
  gradeLevel?: number
  type?: string
  topic?: string
  dryRun: boolean
}

// ============================================================================
// Math Types and Topics
// ============================================================================

const MATH_TYPES = [
  'arithmetic',
  'pre-algebra',
  'algebra',
  'geometry',
  'statistics',
  'calculus',
]

const TYPE_BY_GRADE: Record<number, string[]> = {
  1: ['arithmetic'],
  2: ['arithmetic'],
  3: ['arithmetic'],
  4: ['arithmetic', 'pre-algebra'],
  5: ['pre-algebra', 'geometry'],
  6: ['pre-algebra', 'algebra', 'geometry'],
  7: ['algebra', 'geometry', 'statistics'],
  8: ['algebra', 'geometry', 'statistics'],
  9: ['algebra', 'geometry', 'statistics'],
  10: ['algebra', 'geometry', 'statistics'],
  11: ['algebra', 'calculus', 'statistics'],
  12: ['calculus', 'statistics'],
}

// ============================================================================
// Generator
// ============================================================================

async function generateMathBatch(
  batchNum: number,
  count: number,
  gradeLevel?: number,
  type?: string,
  topic?: string
): Promise<MathProblemGenerated[]> {
  // If no grade specified, distribute across grades
  const grade = gradeLevel || (batchNum % 12) + 1
  
  // If no type specified, pick appropriate type for grade
  const mathType = type || TYPE_BY_GRADE[grade][batchNum % TYPE_BY_GRADE[grade].length]

  const prompt = getMathBatchPrompt(count, grade, mathType, topic)
  const fullPrompt = `${MATH_V2_PROMPT}\n\n${prompt}`

  const response = await callAnthropicWithRetry(fullPrompt, SYSTEM_PROMPT, 1200)
  
  let problems = extractJSON<MathProblemGenerated>(response.content)

  // Post-process: ensure IDs are unique and metadata is set
  problems = problems.map((p, i) => ({
    ...p,
    id: p.id || generateTimestampId(`gen-math-${mathType}`),
    version: 2,
    gradeLevel: grade,
    difficulty: p.difficulty || grade + (i * 0.1),
    metadata: {
      ...p.metadata,
      source: 'ai-generated',
      createdAt: new Date().toISOString(),
    },
  }))

  return problems
}

async function generateMathProblems(options: GeneratorOptions): Promise<GenerationResult<MathProblemGenerated>> {
  const { count, gradeLevel, type, topic, dryRun } = options

  console.log('\n=== Math V2 Problem Generator ===')
  console.log(`  Target count: ${count}`)
  console.log(`  Grade level: ${gradeLevel || 'all grades (1-12)'}`)
  console.log(`  Type: ${type || 'varied'}`)
  console.log(`  Topic: ${topic || 'varied'}`)
  console.log(`  Dry run: ${dryRun}`)

  // Show cost estimate
  const costEstimate = estimateCost('math', count)
  console.log(formatCost(costEstimate))

  if (dryRun) {
    console.log('\n[DRY RUN] Would generate problems with the above parameters.')
    return {
      success: true,
      problems: [],
      errors: [],
      tokensUsed: { input: costEstimate.inputTokens, output: costEstimate.outputTokens },
      estimatedCost: costEstimate.totalCost,
    }
  }

  const startTime = Date.now()

  const result = await processBatches<MathProblemGenerated>({
    subject: 'math',
    totalCount: count,
    batchSize: 5, // Generate 5 problems per API call
    generateBatch: (batchNum, batchCount) => 
      generateMathBatch(batchNum, batchCount, gradeLevel, type, topic),
    dryRun,
  })

  // Validate generated problems
  console.log('\n  Validating generated problems...')
  const { valid, invalid, duplicates } = validateBatch(result.problems, 'math')
  printValidationReport('math', valid.length, invalid, duplicates)

  // Write valid problems to file
  if (valid.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(
      process.cwd(),
      'src/data/basics/math-v2/generated',
      `batch-${timestamp}.ts`
    )

    writeGeneratedFile(
      outputPath,
      "import type { MathProblemV2 } from '@/lib/types/math-v2'",
      `GENERATED_MATH_${timestamp.replace(/-/g, '_')}`,
      'MathProblemV2',
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
      case '--topic':
        options.topic = args[++i]
        break
      case '--dry-run':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
Math V2 Problem Generator

Usage:
  npx ts-node scripts/generators/generate-math-v2.ts [options]

Options:
  --count, -c <n>     Number of problems to generate (default: 50)
  --grade, -g <n>     Target grade level 1-12 (default: all grades)
  --type, -t <type>   Math type: ${MATH_TYPES.join(', ')}
  --topic <topic>     Specific topic to focus on
  --dry-run           Show cost estimate without generating
  --help, -h          Show this help message

Examples:
  npx ts-node scripts/generators/generate-math-v2.ts --count 100
  npx ts-node scripts/generators/generate-math-v2.ts --grade 8 --type algebra --count 20
  npx ts-node scripts/generators/generate-math-v2.ts --dry-run
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
    const result = await generateMathProblems(options)

    if (result.success) {
      console.log('\n✓ Generation completed successfully')
      console.log(`  Generated: ${result.problems.length} problems`)
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

export { generateMathProblems, GeneratorOptions }
