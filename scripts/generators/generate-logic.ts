#!/usr/bin/env npx ts-node
/**
 * Logic Problem Generator
 * 
 * Generates LogicProblem format problems using AI.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-logic.ts --count 50
 *   npx ts-node scripts/generators/generate-logic.ts --count 10 --unit 3
 *   npx ts-node scripts/generators/generate-logic.ts --dry-run
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
import { SYSTEM_PROMPT, LOGIC_PROMPT, getLogicBatchPrompt } from './generation-prompts'
import { validateBatch, printValidationReport } from './problem-validator'

// ============================================================================
// Types
// ============================================================================

interface LogicOption {
  label: string
  text: string
  isCorrect?: boolean
}

interface LogicProblemGenerated {
  id: string
  unit: number
  unitName?: string
  difficulty: number
  topic: string
  subTopic?: string
  problemType: string
  question: string
  options?: LogicOption[] | string[]  // Accept both formats, we'll convert
  correctAnswer: string
  acceptableAnswers?: string[]
  explanation: string
  hint?: string
  proofSteps?: { step: number; formula: string; justification: string }[]
  symbols?: string[]
  tags?: string[]
  timeEstimate?: number
}

interface GeneratorOptions {
  count: number
  unit?: number
  dryRun: boolean
}

// ============================================================================
// Logic Units
// ============================================================================

const LOGIC_UNITS = [
  { id: 1, name: 'Introduction to Logic', difficulty: 1.0 },
  { id: 2, name: 'Propositional Logic', difficulty: 1.5 },
  { id: 3, name: 'Truth Tables', difficulty: 2.0 },
  { id: 4, name: 'Propositional Proofs', difficulty: 2.5 },
  { id: 5, name: 'Predicate Logic', difficulty: 3.0 },
  { id: 6, name: 'FOL Proofs', difficulty: 3.5 },
  { id: 7, name: 'Set Theory', difficulty: 3.0 },
  { id: 8, name: 'Modal Logic', difficulty: 4.0 },
  { id: 9, name: 'Temporal Logic', difficulty: 4.0 },
  { id: 10, name: 'Epistemic Logic', difficulty: 4.5 },
  { id: 11, name: 'Deontic Logic', difficulty: 4.5 },
  { id: 12, name: 'Many-Valued Logic', difficulty: 4.0 },
  { id: 13, name: 'Intuitionistic Logic', difficulty: 4.5 },
  { id: 14, name: 'Paraconsistent Logic', difficulty: 5.0 },
  { id: 15, name: 'Higher-Order Logic', difficulty: 5.0 },
  { id: 16, name: 'Metalogic', difficulty: 5.0 },
  { id: 17, name: 'Computability', difficulty: 4.5 },
  { id: 18, name: 'Applications', difficulty: 3.5 },
]

// ============================================================================
// Generator
// ============================================================================

async function generateLogicBatch(
  batchNum: number,
  count: number,
  targetUnit?: number
): Promise<LogicProblemGenerated[]> {
  // If no unit specified, distribute across units 1-8 (most common)
  const unit = targetUnit || ((batchNum % 8) + 1)
  const unitInfo = LOGIC_UNITS.find(u => u.id === unit) || LOGIC_UNITS[0]

  const prompt = getLogicBatchPrompt(count, unit)
  const fullPrompt = `${LOGIC_PROMPT}\n\n${prompt}`

  const response = await callAnthropicWithRetry(fullPrompt, SYSTEM_PROMPT, 1100)
  
  let problems = extractJSON<LogicProblemGenerated>(response.content)

  // Post-process: ensure IDs are unique and fields are set
  problems = problems.map((p, i) => {
    // Convert string options to LogicOption objects if needed
    let options = p.options
    if (options && Array.isArray(options) && options.length > 0) {
      // Check if first element is a string (wrong format)
      if (typeof options[0] === 'string') {
        const labels = ['A', 'B', 'C', 'D', 'E', 'F']
        options = (options as string[]).map((text, idx) => ({
          label: labels[idx] || String.fromCharCode(65 + idx),
          text: text,
        }))
      }
    }
    
    return {
      ...p,
      id: p.id || generateTimestampId(`gen-logic-u${unit}`),
      unit,
      unitName: p.unitName || unitInfo.name,
      difficulty: p.difficulty || unitInfo.difficulty + (i * 0.1),
      topic: p.topic || unitInfo.name,
      options: options as LogicOption[] | undefined,
      timeEstimate: p.timeEstimate || (60 + unit * 10),
    }
  })

  return problems
}

async function generateLogicProblems(options: GeneratorOptions): Promise<GenerationResult<LogicProblemGenerated>> {
  const { count, unit, dryRun } = options

  console.log('\n=== Logic Problem Generator ===')
  console.log(`  Target count: ${count}`)
  console.log(`  Unit: ${unit || 'varied (1-8)'}`)
  console.log(`  Dry run: ${dryRun}`)

  // Show cost estimate
  const costEstimate = estimateCost('logic', count)
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

  const result = await processBatches<LogicProblemGenerated>({
    subject: 'logic',
    totalCount: count,
    batchSize: 5, // Generate 5 problems per API call
    generateBatch: (batchNum, batchCount) => 
      generateLogicBatch(batchNum, batchCount, unit),
    dryRun,
  })

  // Validate generated problems
  console.log('\n  Validating generated problems...')
  const { valid, invalid, duplicates } = validateBatch(result.problems, 'logic')
  printValidationReport('logic', valid.length, invalid, duplicates)

  // Write valid problems to file
  if (valid.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(
      process.cwd(),
      'src/data/basics/logic/generated',
      `batch-${timestamp}.ts`
    )

    writeGeneratedFile(
      outputPath,
      "import type { LogicProblem } from '../types'",
      `GENERATED_LOGIC_${timestamp.replace(/-/g, '_')}`,
      'LogicProblem',
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
      case '--unit':
      case '-u':
        options.unit = parseInt(args[++i], 10)
        break
      case '--dry-run':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
Logic Problem Generator

Usage:
  npx ts-node scripts/generators/generate-logic.ts [options]

Options:
  --count, -c <n>     Number of problems to generate (default: 50)
  --unit, -u <n>      Target unit 1-18 (default: varied 1-8)
  --dry-run           Show cost estimate without generating
  --help, -h          Show this help message

Units:
${LOGIC_UNITS.map(u => `  ${u.id}: ${u.name} (difficulty: ${u.difficulty})`).join('\n')}

Examples:
  npx ts-node scripts/generators/generate-logic.ts --count 100
  npx ts-node scripts/generators/generate-logic.ts --unit 4 --count 20
  npx ts-node scripts/generators/generate-logic.ts --dry-run
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
    const result = await generateLogicProblems(options)

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

export { generateLogicProblems, GeneratorOptions }
