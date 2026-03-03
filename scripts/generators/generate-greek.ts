#!/usr/bin/env npx ts-node
/**
 * Greek Exercise Generator
 * 
 * Generates TranslationExercise format Ancient Greek exercises using AI.
 * 
 * Usage:
 *   npx ts-node scripts/generators/generate-greek.ts --count 50
 *   npx ts-node scripts/generators/generate-greek.ts --count 10 --grade 6
 *   npx ts-node scripts/generators/generate-greek.ts --dry-run
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
import { SYSTEM_PROMPT, GREEK_PROMPT, getGreekBatchPrompt } from './generation-prompts'
import { validateBatch, printValidationReport } from './problem-validator'

// ============================================================================
// Types
// ============================================================================

interface TranslationWord {
  word: string
  romanization?: string
  lemma: string
  partOfSpeech: string
  meaning: string
  grammaticalInfo: string
  functionInSentence: string
  derivatives?: string[]
}

interface GreekExerciseGenerated {
  id: string
  language: 'greek'
  difficulty: number
  sourceText: string
  romanization: string
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
  1: ['Greek Alphabet', 'Present Tense', 'The Article'],
  2: ['Nominative Case', 'Accusative Case', 'Basic Vocabulary'],
  3: ['Genitive Case', 'Dative Case', 'Second Declension'],
  4: ['Contract Verbs', 'Adjectives', 'Prepositions'],
  5: ['Imperfect Tense', 'Aorist Tense', 'Third Declension'],
  6: ['Middle Voice', 'Passive Voice', 'Participles'],
  7: ['Subjunctive Mood', 'Optative Mood', 'Purpose Clauses'],
  8: ['Indirect Discourse', 'μι-Verbs', 'Result Clauses'],
  9: ['Attic Prose', 'Xenophon', 'Plato Introductory'],
  10: ['Complex Prose', 'Lysias', 'Demosthenes'],
  11: ['Homer', 'Epic Poetry', 'Homeric Dialect'],
  12: ['Tragedy', 'New Testament Koine', 'Advanced Constructions'],
}

// ============================================================================
// Generator
// ============================================================================

async function generateGreekBatch(
  batchNum: number,
  count: number,
  gradeLevel?: number
): Promise<GreekExerciseGenerated[]> {
  // If no grade specified, distribute across grades
  const grade = gradeLevel || (batchNum % 12) + 1

  const prompt = getGreekBatchPrompt(count, grade)
  const fullPrompt = `${GREEK_PROMPT}\n\n${prompt}`

  const response = await callAnthropicWithRetry(fullPrompt, SYSTEM_PROMPT, 1400)
  
  let exercises = extractJSON<GreekExerciseGenerated>(response.content)

  // Get grammar topic for this grade
  const grammarTopics = GRAMMAR_TOPICS[grade] || GRAMMAR_TOPICS[1]
  const topic = grammarTopics[batchNum % grammarTopics.length]

  // Post-process: ensure IDs are unique and fields are set
  exercises = exercises.map((e, i) => ({
    ...e,
    id: e.id || generateTimestampId('gen-grk'),
    language: 'greek' as const,
    difficulty: e.difficulty || grade + (i * 0.1),
    grammarTopic: e.grammarTopic || topic,
    romanization: e.romanization || '',
    parsingElements: e.parsingElements || [],
    timeEstimate: e.timeEstimate || (60 + grade * 10),
  }))

  return exercises
}

async function generateGreekExercises(options: GeneratorOptions): Promise<GenerationResult<GreekExerciseGenerated>> {
  const { count, gradeLevel, dryRun } = options

  console.log('\n=== Greek Exercise Generator ===')
  console.log(`  Target count: ${count}`)
  console.log(`  Grade level: ${gradeLevel || 'all grades (1-12)'}`)
  console.log(`  Dry run: ${dryRun}`)

  // Show cost estimate
  const costEstimate = estimateCost('greek', count)
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

  const result = await processBatches<GreekExerciseGenerated>({
    subject: 'greek',
    totalCount: count,
    batchSize: 5, // Generate 5 exercises per API call
    generateBatch: (batchNum, batchCount) => 
      generateGreekBatch(batchNum, batchCount, gradeLevel),
    dryRun,
  })

  // Validate generated exercises
  console.log('\n  Validating generated exercises...')
  const { valid, invalid, duplicates } = validateBatch(result.problems, 'greek')
  printValidationReport('greek', valid.length, invalid, duplicates)

  // Write valid exercises to file
  if (valid.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0]
    const outputPath = path.join(
      process.cwd(),
      'src/data/basics/greek/exercises/generated',
      `batch-${timestamp}.ts`
    )

    writeGeneratedFile(
      outputPath,
      "import type { TranslationExercise } from '@/lib/types/basics'",
      `GENERATED_GREEK_${timestamp.replace(/-/g, '_')}`,
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
Greek Exercise Generator

Usage:
  npx ts-node scripts/generators/generate-greek.ts [options]

Options:
  --count, -c <n>     Number of exercises to generate (default: 50)
  --grade, -g <n>     Target grade level 1-12 (default: all grades)
  --dry-run           Show cost estimate without generating
  --help, -h          Show this help message

Examples:
  npx ts-node scripts/generators/generate-greek.ts --count 141
  npx ts-node scripts/generators/generate-greek.ts --grade 8 --count 20
  npx ts-node scripts/generators/generate-greek.ts --dry-run
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
    const result = await generateGreekExercises(options)

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

export { generateGreekExercises, GeneratorOptions }
