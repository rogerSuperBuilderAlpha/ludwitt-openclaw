#!/usr/bin/env npx ts-node
/**
 * Problem Template Generator
 * 
 * Generates properly formatted problem stubs for math and reading exercises.
 * Ensures consistent ID formats and includes all required/recommended fields.
 * 
 * Usage:
 *   npx ts-node scripts/generate-problem-template.ts math --type algebra --grade 8 --count 5
 *   npx ts-node scripts/generate-problem-template.ts reading --grade 6 --count 3
 *   npx ts-node scripts/generate-problem-template.ts math --type geometry --grade 5 --topic "area" --count 10
 * 
 * Output: Prints TypeScript problem definitions to stdout (pipe to file)
 */

// ============================================================================
// Configuration
// ============================================================================

const MATH_TYPE_PREFIXES: Record<string, string> = {
  'arithmetic': 'arith',
  'pre-algebra': 'prealg',
  'algebra': 'alg',
  'geometry': 'geo',
  'word-problem': 'word',
  'statistics': 'stat',
  'trigonometry': 'trig',
  'precalculus': 'precalc',
  'calculus': 'calc',
  'linear-algebra': 'linalg',
  'discrete-math': 'discrete'
}

const READING_TYPE_PREFIXES: Record<string, string> = {
  'comprehension': 'comp',
  'vocabulary': 'vocab',
  'grammar': 'gram',
  'critical-analysis': 'crit'
}

const TOPICS_BY_TYPE: Record<string, string[]> = {
  'arithmetic': ['addition', 'subtraction', 'multiplication', 'division', 'order-of-ops'],
  'pre-algebra': ['fractions', 'decimals', 'percents', 'ratios', 'integers', 'expressions'],
  'algebra': ['equations', 'linear', 'systems', 'inequalities', 'polynomials', 'factoring', 'quadratics'],
  'geometry': ['shapes', 'angles', 'triangles', 'area', 'perimeter', 'volume', 'coordinates'],
  'word-problem': ['percent', 'rates', 'ratios', 'mixture', 'distance', 'work'],
  'statistics': ['mean', 'median', 'probability', 'distribution', 'correlation', 'hypothesis'],
  'trigonometry': ['ratios', 'unit-circle', 'identities', 'equations', 'applications'],
  'precalculus': ['functions', 'polynomials', 'rational', 'exponential', 'sequences', 'conics'],
  'calculus': ['limits', 'derivatives', 'integration', 'applications', 'multivariable'],
  'linear-algebra': ['vectors', 'matrices', 'systems', 'eigenvalues', 'transformations'],
  'discrete-math': ['logic', 'sets', 'counting', 'probability', 'graphs', 'number-theory']
}

// ============================================================================
// ID Generation
// ============================================================================

function generateMathId(type: string, grade: number, topic: string, sequence: number): string {
  const prefix = MATH_TYPE_PREFIXES[type] || type.substring(0, 4)
  const topicSlug = topic.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 8)
  const seq = sequence.toString().padStart(3, '0')
  return `${prefix}-g${grade}-${topicSlug}-${seq}`
}

function generateReadingId(type: string, grade: number, sequence: number): string {
  const prefix = READING_TYPE_PREFIXES[type] || 'read'
  const seq = sequence.toString().padStart(3, '0')
  return `${prefix}-g${grade}-${seq}`
}

// ============================================================================
// Template Generators
// ============================================================================

function generateMathTemplate(
  type: string,
  grade: number,
  topic: string,
  subTopic: string,
  startSeq: number,
  count: number
): string {
  const problems: string[] = []
  
  for (let i = 0; i < count; i++) {
    const id = generateMathId(type, grade, topic, startSeq + i)
    
    problems.push(`  {
    id: '${id}',
    type: '${type}',
    difficulty: ${grade}.0,
    question: 'TODO: Write the question',
    correctAnswer: 'TODO',
    acceptableAnswers: ['TODO'],
    hint: 'TODO: Write a helpful hint',
    explanation: 'TODO: Write step-by-step explanation',
    topic: '${topic}',
    subTopic: '${subTopic}',
    timeEstimate: ${Math.round(30 + grade * 5)},
    
    // Enhancement fields (recommended)
    skillIds: ['TODO_skill_id'],
    tags: ['${type}', '${topic.toLowerCase()}'],
    conceptsCovered: ['TODO_concept'],
    commonMistakes: ['TODO: Common error students make'],
    
    // Optional visual content
    // diagram: {
    //   type: 'geometry',
    //   width: 200,
    //   height: 200,
    //   svg: \`<svg viewBox="0 0 200 200">...</svg>\`,
    //   description: 'Alt text description'
    // },
    // latex: '\\\\frac{a}{b}'
  }`)
  }
  
  return problems.join(',\n')
}

function generateReadingTemplate(
  type: string,
  grade: number,
  startSeq: number,
  count: number
): string {
  const exercises: string[] = []
  
  for (let i = 0; i < count; i++) {
    const id = generateReadingId(type, grade, startSeq + i)
    
    exercises.push(`  {
    id: '${id}',
    type: '${type}',
    difficulty: ${grade}.0,
    passage: \`TODO: Write the passage text here.
    
    This should be appropriate for grade ${grade} reading level.
    Length recommendation: ${getPassageLengthRecommendation(grade)} words.\`,
    
    questions: [
      {
        id: '${id}-q1',
        type: 'multiple-choice',
        question: 'TODO: Write the question',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'TODO: Explain why this is correct'
      },
      {
        id: '${id}-q2',
        type: 'short-answer',
        question: 'TODO: Write the question',
        correctAnswer: 'TODO',
        acceptableAnswers: ['TODO'],
        explanation: 'TODO: Explain the answer'
      }
    ],
    
    topic: '${type}',
    timeEstimate: ${Math.round(120 + grade * 15)},
    
    // Enhancement fields
    tags: ['${type}', 'grade-${grade}'],
    skillIds: ['reading_comprehension']
  }`)
  }
  
  return exercises.join(',\n')
}

function getPassageLengthRecommendation(grade: number): string {
  if (grade <= 3) return '100-150'
  if (grade <= 6) return '200-300'
  if (grade <= 9) return '300-500'
  return '500-700'
}

// ============================================================================
// File Template
// ============================================================================

function generateFileTemplate(
  subject: 'math' | 'reading',
  type: string,
  problems: string
): string {
  if (subject === 'math') {
    return `import { MathProblem } from '@/lib/types/basics'

/**
 * ${type.charAt(0).toUpperCase() + type.slice(1)} Problems
 * 
 * Topics covered:
 * - TODO: List topics
 * 
 * Grade levels: TODO
 */

export const ${type.toUpperCase().replace(/-/g, '_')}_PROBLEMS: MathProblem[] = [
${problems}
]
`
  } else {
    return `import { ReadingExercise } from '@/lib/types/basics'

/**
 * ${type.charAt(0).toUpperCase() + type.slice(1)} Exercises
 * 
 * Grade levels: TODO
 */

export const ${type.toUpperCase().replace(/-/g, '_')}_EXERCISES: ReadingExercise[] = [
${problems}
]
`
  }
}

// ============================================================================
// CLI
// ============================================================================

function printUsage(): void {
  console.log(`
Problem Template Generator

Usage:
  npx ts-node scripts/generate-problem-template.ts <subject> [options]

Subjects:
  math      Generate math problem templates
  reading   Generate reading exercise templates

Options:
  --type <type>       Problem type (required for math)
  --grade <n>         Grade level 1-12 (required)
  --topic <topic>     Topic name (optional, uses default)
  --subtopic <sub>    Sub-topic name (optional)
  --count <n>         Number of templates (default: 5)
  --start-seq <n>     Starting sequence number (default: 1)
  --file              Output as complete file with imports

Math Types:
  arithmetic, pre-algebra, algebra, geometry, word-problem,
  statistics, trigonometry, precalculus, calculus,
  linear-algebra, discrete-math

Examples:
  npx ts-node scripts/generate-problem-template.ts math --type algebra --grade 8 --count 5
  npx ts-node scripts/generate-problem-template.ts math --type geometry --grade 5 --topic "area" --file > new-problems.ts
  npx ts-node scripts/generate-problem-template.ts reading --grade 6 --count 3
`)
}

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2)
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1]
        i++
      } else {
        result[key] = 'true'
      }
    } else if (!result.subject) {
      result.subject = args[i]
    }
  }
  
  return result
}

// ============================================================================
// Main
// ============================================================================

const args = parseArgs(process.argv.slice(2))

if (!args.subject || args.help) {
  printUsage()
  process.exit(args.help ? 0 : 1)
}

const subject = args.subject as 'math' | 'reading'
const type = args.type || (subject === 'reading' ? 'comprehension' : '')
const grade = parseInt(args.grade || '6', 10)
const topic = args.topic || TOPICS_BY_TYPE[type]?.[0] || 'general'
const subTopic = args.subtopic || topic
const count = parseInt(args.count || '5', 10)
const startSeq = parseInt(args['start-seq'] || '1', 10)
const outputFile = args.file === 'true'

if (subject === 'math' && !type) {
  console.error('Error: --type is required for math problems')
  console.error('Valid types:', Object.keys(MATH_TYPE_PREFIXES).join(', '))
  process.exit(1)
}

if (grade < 1 || grade > 12) {
  console.error('Error: --grade must be between 1 and 12')
  process.exit(1)
}

let output: string

if (subject === 'math') {
  const problems = generateMathTemplate(type, grade, topic, subTopic, startSeq, count)
  output = outputFile ? generateFileTemplate('math', type, problems) : problems
} else {
  const exercises = generateReadingTemplate(type, grade, startSeq, count)
  output = outputFile ? generateFileTemplate('reading', type, exercises) : exercises
}

console.log(output)


