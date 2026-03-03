/**
 * Generator Core Infrastructure
 * 
 * Provides shared utilities for AI-powered content generation:
 * - Anthropic client wrapper with rate limiting
 * - Cost tracking and estimation
 * - Batch processing with retries
 * - TypeScript file writer with proper formatting
 * - Dry-run mode for preview
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// ============================================================================
// Types
// ============================================================================

export type SubjectType = 'math' | 'reading' | 'latin' | 'greek' | 'logic'

export interface GenerationConfig {
  subject: SubjectType
  count: number
  gradeLevel?: number
  topic?: string
  subTopic?: string
  dryRun?: boolean
}

export interface GenerationResult<T> {
  success: boolean
  problems: T[]
  errors: string[]
  tokensUsed: {
    input: number
    output: number
  }
  estimatedCost: number
}

export interface CostEstimate {
  inputTokens: number
  outputTokens: number
  inputCost: number
  outputCost: number
  totalCost: number
}

// ============================================================================
// Cost Constants (Claude 3.5 Sonnet pricing)
// ============================================================================

const PRICING = {
  'claude-3-5-sonnet-20241022': {
    inputPerMillion: 3.0,
    outputPerMillion: 15.0,
  },
  'claude-sonnet-4-20250514': {
    inputPerMillion: 3.0,
    outputPerMillion: 15.0,
  },
} as const

const DEFAULT_MODEL = 'claude-sonnet-4-20250514'

// Estimated tokens per problem (for cost estimation)
export const TOKENS_PER_PROBLEM = {
  math: { input: 800, output: 400 },
  reading: { input: 1000, output: 600 },
  latin: { input: 900, output: 500 },
  greek: { input: 900, output: 500 },
  logic: { input: 700, output: 350 },
} as const

// ============================================================================
// Anthropic Client
// ============================================================================

let anthropicClient: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not found in environment variables')
    }
    anthropicClient = new Anthropic({ apiKey })
  }
  return anthropicClient
}

// ============================================================================
// Rate Limiting
// ============================================================================

const RATE_LIMIT = {
  requestsPerMinute: 50,
  tokensPerMinute: 40000,
}

let requestCount = 0
let tokenCount = 0
let windowStart = Date.now()

async function waitForRateLimit(estimatedTokens: number): Promise<void> {
  const now = Date.now()
  const elapsed = now - windowStart

  // Reset window every minute
  if (elapsed >= 60000) {
    requestCount = 0
    tokenCount = 0
    windowStart = now
    return
  }

  // Check if we need to wait
  if (requestCount >= RATE_LIMIT.requestsPerMinute || 
      tokenCount + estimatedTokens > RATE_LIMIT.tokensPerMinute) {
    const waitTime = 60000 - elapsed + 100 // Wait until next minute + buffer
    console.log(`  Rate limit reached, waiting ${Math.ceil(waitTime / 1000)}s...`)
    await sleep(waitTime)
    requestCount = 0
    tokenCount = 0
    windowStart = Date.now()
  }
}

function recordRequest(tokens: number): void {
  requestCount++
  tokenCount += tokens
}

// ============================================================================
// Cost Estimation
// ============================================================================

export function estimateCost(
  subject: SubjectType,
  count: number,
  model: string = DEFAULT_MODEL
): CostEstimate {
  const tokensPerProblem = TOKENS_PER_PROBLEM[subject]
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING[DEFAULT_MODEL]

  const inputTokens = tokensPerProblem.input * count
  const outputTokens = tokensPerProblem.output * count

  const inputCost = (inputTokens / 1_000_000) * pricing.inputPerMillion
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillion

  return {
    inputTokens,
    outputTokens,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  }
}

export function formatCost(cost: CostEstimate): string {
  return `
  Estimated Cost:
    Input:  ${cost.inputTokens.toLocaleString()} tokens = $${cost.inputCost.toFixed(4)}
    Output: ${cost.outputTokens.toLocaleString()} tokens = $${cost.outputCost.toFixed(4)}
    Total:  $${cost.totalCost.toFixed(4)}
  `
}

// ============================================================================
// API Call with Retry
// ============================================================================

const MAX_RETRIES = 5
const RETRY_DELAY = 3000

// Track consecutive failures for adaptive delays
let consecutiveFailures = 0

export async function callAnthropicWithRetry(
  prompt: string,
  systemPrompt: string,
  estimatedTokens: number = 1000
): Promise<{ content: string; usage: { input_tokens: number; output_tokens: number } }> {
  const client = getAnthropicClient()

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await waitForRateLimit(estimatedTokens)
      
      // Add extra delay if we've had recent failures (API may be overloaded)
      if (consecutiveFailures > 0) {
        const extraDelay = Math.min(consecutiveFailures * 5000, 30000)
        console.log(`  (Cooling down ${extraDelay/1000}s due to recent failures...)`)
        await sleep(extraDelay)
      }

      const response = await client.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      })

      // Success - reset failure counter
      consecutiveFailures = 0

      const usage = response.usage
      recordRequest(usage.input_tokens + usage.output_tokens)

      const textContent = response.content.find(block => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response')
      }

      return {
        content: textContent.text,
        usage: {
          input_tokens: usage.input_tokens,
          output_tokens: usage.output_tokens,
        },
      }
    } catch (error) {
      consecutiveFailures++
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      // Check for specific error types
      const isConnectionError = errorMessage.toLowerCase().includes('connect') ||
                                errorMessage.toLowerCase().includes('econnreset') ||
                                errorMessage.toLowerCase().includes('socket') ||
                                errorMessage.toLowerCase().includes('timeout') ||
                                errorMessage.toLowerCase().includes('network')
      
      const isRateLimit = errorMessage.toLowerCase().includes('rate') ||
                          errorMessage.toLowerCase().includes('429') ||
                          errorMessage.toLowerCase().includes('overloaded')
      
      console.error(`  Attempt ${attempt}/${MAX_RETRIES} failed: ${errorMessage}`)

      if (attempt < MAX_RETRIES) {
        // Exponential backoff with longer delays for connection/rate errors
        let delay = RETRY_DELAY * Math.pow(2, attempt - 1)
        if (isConnectionError || isRateLimit) {
          delay = Math.min(delay * 2, 60000) // Up to 60s for connection issues
        }
        console.log(`  Retrying in ${delay / 1000}s...`)
        await sleep(delay)
      } else {
        throw error
      }
    }
  }

  throw new Error('Max retries exceeded')
}

// ============================================================================
// JSON Parsing
// ============================================================================

export function extractJSON<T>(text: string): T[] {
  // Strip markdown code blocks if present
  const cleaned = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()

  // Try to find JSON array in the response
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/)
  if (!jsonMatch) {
    // Try to find individual JSON objects and wrap them in an array
    const objectMatches = cleaned.match(/\{[\s\S]*?\}/g)
    if (objectMatches && objectMatches.length > 0) {
      try {
        // Try parsing each object and collecting successful ones
        const parsed: T[] = []
        for (const obj of objectMatches) {
          try {
            parsed.push(JSON.parse(obj) as T)
          } catch {
            // Skip malformed objects
          }
        }
        if (parsed.length > 0) return parsed
      } catch {
        throw new Error('Failed to parse individual JSON objects')
      }
    }
    throw new Error('No JSON array found in response')
  }

  try {
    return JSON.parse(jsonMatch[0]) as T[]
  } catch {
    // Try to fix common JSON issues
    const fixed = jsonMatch[0]
      // Remove trailing commas before ] or }
      .replace(/,(\s*[\]}])/g, '$1')
      // Handle unescaped newlines in strings (common AI error)
      .replace(/([^\\])\\n(?!")/g, '$1\\\\n')
      // Replace single quotes with double quotes (but not inside strings)
      // This is risky so we do it carefully
      .replace(/:\s*'([^']*)'/g, ': "$1"')
      // Handle undefined values (replace with null)
      .replace(/:\s*undefined/g, ': null')
      // Handle NaN values
      .replace(/:\s*NaN/g, ': null')
      // Remove BOM if present
      .replace(/^\uFEFF/, '')

    try {
      return JSON.parse(fixed) as T[]
    } catch (parseError) {
      // Last resort: try to extract just the first complete object
      const firstObject = fixed.match(/\{[^{}]*\}/)
      if (firstObject) {
        try {
          return [JSON.parse(firstObject[0]) as T]
        } catch {
          // Give up
        }
      }
      throw new Error('Failed to parse JSON from response')
    }
  }
}

// ============================================================================
// File Writer
// ============================================================================

export function writeGeneratedFile(
  outputPath: string,
  importStatements: string,
  exportName: string,
  typeName: string,
  problems: unknown[],
  dryRun: boolean = false
): void {
  // Convert to JSON with proper formatting
  let jsonContent = JSON.stringify(problems, null, 2)
  
  // Remove quotes from object keys (but keep them for strings)
  jsonContent = jsonContent.replace(/"(\w+)":/g, '$1:')
  
  // Handle string quotes - keep double quotes to handle apostrophes in content
  // This is safer than trying to escape apostrophes in single-quoted strings
  
  const content = `/**
 * Auto-generated content
 * Generated: ${new Date().toISOString()}
 * Count: ${problems.length} problems
 * 
 * DO NOT EDIT MANUALLY - This file was generated by the content generator.
 * To regenerate, run: npm run generate:content
 */

${importStatements}

export const ${exportName}: ${typeName}[] = ${jsonContent}
`

  if (dryRun) {
    console.log(`\n[DRY RUN] Would write to: ${outputPath}`)
    console.log(`[DRY RUN] Content preview (first 500 chars):`)
    console.log(content.substring(0, 500) + '...')
    return
  }

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, content, 'utf-8')
  console.log(`\nWrote ${problems.length} problems to: ${outputPath}`)
}

// ============================================================================
// Batch Processing
// ============================================================================

export interface BatchConfig<T> {
  subject: SubjectType
  totalCount: number
  batchSize: number
  generateBatch: (batchNum: number, count: number) => Promise<T[]>
  dryRun: boolean
}

export async function processBatches<T>(config: BatchConfig<T>): Promise<GenerationResult<T>> {
  const { subject, totalCount, batchSize, generateBatch, dryRun } = config

  const result: GenerationResult<T> = {
    success: true,
    problems: [],
    errors: [],
    tokensUsed: { input: 0, output: 0 },
    estimatedCost: 0,
  }

  const numBatches = Math.ceil(totalCount / batchSize)
  console.log(`\nGenerating ${totalCount} ${subject} problems in ${numBatches} batches...`)

  if (dryRun) {
    console.log('[DRY RUN] Skipping actual API calls')
    const estimate = estimateCost(subject, totalCount)
    result.estimatedCost = estimate.totalCost
    result.tokensUsed = {
      input: estimate.inputTokens,
      output: estimate.outputTokens,
    }
    return result
  }

  // Delay between batches to prevent API overload
  const BATCH_DELAY = 2000 // 2 seconds between batches

  for (let batch = 0; batch < numBatches; batch++) {
    const remaining = totalCount - result.problems.length
    const currentBatchSize = Math.min(batchSize, remaining)

    console.log(`\n  Batch ${batch + 1}/${numBatches} (${currentBatchSize} problems)...`)

    try {
      const problems = await generateBatch(batch, currentBatchSize)
      result.problems.push(...problems)
      console.log(`    Generated ${problems.length} problems`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      result.errors.push(`Batch ${batch + 1}: ${errorMessage}`)
      console.error(`    Error: ${errorMessage}`)
      
      // If we hit 3 consecutive errors, add a longer cooldown
      const recentErrors = result.errors.slice(-3)
      if (recentErrors.length === 3 && recentErrors.every(e => e.includes('Connection') || e.includes('error'))) {
        console.log(`    Multiple errors detected, cooling down for 30s...`)
        await sleep(30000)
      }
    }

    // Progress update
    const progress = Math.round((result.problems.length / totalCount) * 100)
    console.log(`    Progress: ${result.problems.length}/${totalCount} (${progress}%)`)
    
    // Delay between batches
    if (batch < numBatches - 1) {
      await sleep(BATCH_DELAY)
    }
  }

  result.success = result.errors.length === 0

  // Calculate actual cost
  const estimate = estimateCost(subject, result.problems.length)
  result.estimatedCost = estimate.totalCost
  result.tokensUsed = {
    input: estimate.inputTokens,
    output: estimate.outputTokens,
  }

  return result
}

// ============================================================================
// ID Generation
// ============================================================================

export function generateId(prefix: string, grade: number, sequence: number): string {
  const seq = sequence.toString().padStart(3, '0')
  return `${prefix}-g${grade}-${seq}`
}

export function generateTimestampId(prefix: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return `${prefix}-${timestamp}-${random}`
}

// ============================================================================
// Utilities
// ============================================================================

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}

export function printSummary(results: Map<SubjectType, GenerationResult<unknown>>): void {
  console.log('\n' + '='.repeat(60))
  console.log('GENERATION SUMMARY')
  console.log('='.repeat(60))

  let totalProblems = 0
  let totalCost = 0
  let totalErrors = 0

  for (const [subject, result] of results) {
    console.log(`\n${subject.toUpperCase()}:`)
    console.log(`  Generated: ${result.problems.length}`)
    console.log(`  Errors: ${result.errors.length}`)
    console.log(`  Cost: $${result.estimatedCost.toFixed(4)}`)

    totalProblems += result.problems.length
    totalCost += result.estimatedCost
    totalErrors += result.errors.length
  }

  console.log('\n' + '-'.repeat(60))
  console.log(`TOTAL: ${totalProblems} problems, $${totalCost.toFixed(4)}, ${totalErrors} errors`)
  console.log('='.repeat(60))
}
