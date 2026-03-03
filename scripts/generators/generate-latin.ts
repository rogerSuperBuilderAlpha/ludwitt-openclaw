#!/usr/bin/env npx ts-node
/**
 * Latin Exercise Generator
 * 
 * Generates TranslationExercise format Latin exercises using AI.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-latin.ts --count 50
 *   npx ts-node scripts/generators/generate-latin.ts --count 10 --grade 6
 *   npx ts-node scripts/generators/generate-latin.ts --dry-run
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
import { SYSTEM_PROMPT, LATIN_PROMPT, getLatinBatchPrompt } from './generation-prompts'
import { validateBatch, printValidationReport } from './problem-validator'

// ============================================================================
// Types
// ============================================================================

interface TranslationWord {
  word: string
  lemma: string
  partOfSpeech: string
  meaning: string
  grammaticalInfo: string
  functionInSentence: string
  derivatives?: string[]
  romanization?: string
}

interface LatinExerciseGenerated {
  id: string
  language: 'latin'
  difficulty: number
  sourceText: string
  words: TranslationWord[]
  grammarTopic: string
  grammarSubtopic?: string
  acceptableTranslations: string[]
  parsingElements: {
    word: string
    expectedParsing: {
      partOfSpeech: string
      grammaticalFunction: string
      morphology: string
    }
    options: string[]
  }[]
  timeEstimate: number
}

interface GeneratorOptions {
  count: number
  gradeLevel?: number
  dryRun: boolean
}

// ============================================================================
// Grammar Topics by Grade
// ============================================================================

const GRAMMAR_TOPICS: Record<number, string[]> = {
  1: ['Present Tense', 'Nominative Case', 'Basic Vocabulary'],
  2: ['Accusative Case', 'First Declension', 'Second Declension'],
  3: ['Genitive Case', 'Dative Case', 'Third Declension'],
  4: ['Ablative Case', 'Adjectives', 'Compound Sentences'],
  5: ['Imperfect Tense', 'Perfect Tense', 'Participles'],
  6: ['Passive Voice', 'Relative Clauses', 'Pronouns'],
  7: ['Subjunctive Present', 'Purpose Clauses', 'Result Clauses'],
  8: ['Subjunctive Imperfect', 'Indirect Statement', 'Ablative Absolute'],
  9: ['Literary Prose', 'Periodic Sentences', 'Caesar'],
  10: ['Complex Subordination', 'Cicero', 'Oratory'],
  11: ['Virgil', 'Epic Poetry', 'Dactylic Hexameter'],
  12: ['Horace', 'Lyric Poetry', 'Advanced Constructions'],
}

// ============================================================================
// Generator
// ============================================================================

async function generateLatinBatch(
  batchNum: number,
  count: number,
  gradeLevel?: number
): Promise<LatinExerciseGenerated[]> {
  // If no grade specified, distribute across grades
  const grade = gradeLevel || (batchNum % 12) + 1

  const prompt = getLatinBatchPrompt(count, grade)
  const fullPrompt = `${LATIN_PROMPT}\n\n${prompt}`

  const response = await callAnthropicWithRetry(fullPrompt, SYSTEM_PROMPT, 1400)
  
  let exercises = extractJSON<LatinExerciseGenerated>(response.content)

  // Get grammar topic for this grade
  const grammarTopics = GRAMMAR_TOPICS[grade] || GRAMMAR_TOPICS[1]
  const topic = grammarTopics[batchNum % grammarTopics.length]

  // Post-process: ensure IDs are unique and fields are set
  exercises = exercises.map((e, i) => ({
    ...e,
    id: e.id || generateTimestampId('gen-lat'),
    language: 'latin' as const,
    difficulty: e.difficulty || grade + (i * 0.1),
    grammarTopic: e.grammarTopic || topic,
    parsingElements: e.parsingElements || [],
    timeEstimate: e.timeEstimate || (60 + grade * 10),
  }))

  return exercises
}

async function generateLatinExercises(options: GeneratorOptions): Promise<GenerationResult<LatinExerciseGenerated>> {
  const { count, gradeLevel, dryRun } = options

  console.log('\n=== Latin Exercise Generator ===')
  console.log(`  Target count: ${count}`)
  console.log(`  Grade level: ${gradeLevel || 'all grades (1-12)'}`)
  console.log(`  Dry run: ${dryRun}`)

  // Show cost estimate
  const costEstimate = estimateCost('latin', count)
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

  const result = await processBatches<LatinExerciseGenerated>({
    subject: 'latin',
    totalCount: count,
    batchSize: 5, // Generate 5 exercises per API call
    generateBatch: (batchNum, batchCount) => 
      generateLatinBatch(batchNum, batchCount, gradeLevel),
    dryRun,
  })

  // Validate generated exercises
  console.log('\n  Validating generated exercises...')
  const { valid, invalid, duplicates } = validateBatch(result.problems, 'latin')
  printValidationReport('latin', valid.length, invalid, duplicates)

  // Write valid exercises to file
  if (valid.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(
      process.cwd(),
      'src/data/basics/latin/exercises/generated',
      `batch-${timestamp}.ts`
    )

    writeGeneratedFile(
      outputPath,
      "import type { TranslationExercise } from '@/lib/types/basics'",
      `GENERATED_LATIN_${timestamp.replace(/-/g, '_')}`,
      'TranslationExercise',
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
      case '--dry-run':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
Latin Exercise Generator

Usage:
  npx ts-node scripts/generators/generate-latin.ts [options]

Options:
  --count, -c <n>     Number of exercises to generate (default: 50)
  --grade, -g <n>     Target grade level 1-12 (default: all grades)
  --dry-run           Show cost estimate without generating
  --help, -h          Show this help message

Examples:
  npx ts-node scripts/generators/generate-latin.ts --count 130
  npx ts-node scripts/generators/generate-latin.ts --grade 8 --count 20
  npx ts-node scripts/generators/generate-latin.ts --dry-run
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
    const result = await generateLatinExercises(options)

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

export { generateLatinExercises, GeneratorOptions }
