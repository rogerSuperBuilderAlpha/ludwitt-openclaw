/**
 * Seed Basics Dashboard with Initial Problems
 *
 * Generates 10 math problems and 10 reading exercises for each grade level (1-12)
 * Total: 120 math problems + 120 reading exercises
 */

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  })
})

const db = getFirestore(app)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

// Helper functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function selectMathType(difficulty: number): string {
  if (difficulty < 4) return 'arithmetic'
  if (difficulty < 7) return 'pre-algebra'
  if (difficulty < 10) return 'algebra'
  if (difficulty < 11) return 'geometry'
  return 'algebra'
}

function selectReadingType(difficulty: number): string {
  if (difficulty < 4) return 'vocabulary'
  if (difficulty < 7) return 'comprehension'
  if (difficulty < 10) return 'grammar'
  return 'critical-analysis'
}

function getPassageLengthForGrade(grade: number): string {
  if (grade <= 3) return '100-150'
  if (grade <= 6) return '200-300'
  if (grade <= 9) return '300-500'
  return '500-700'
}

function estimateTimeForDifficulty(difficulty: number): number {
  return Math.round(30 + (difficulty * 10))
}

function estimateReadingTime(passage: string, questionCount: number): number {
  const words = passage.split(/\s+/).length
  const readingTime = (words / 200) * 60
  const questionTime = questionCount * 30
  return Math.round(readingTime + questionTime)
}

function cleanUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = cleanUndefined(value)
      }
      return acc
    }, {} as any)
  }
  return obj
}

async function generateMathProblem(difficulty: number): Promise<any> {
  const gradeLevel = Math.floor(difficulty)
  const problemType = selectMathType(difficulty)

  const prompt = `Generate a grade ${gradeLevel} ${problemType} math problem.

Requirements:
- Appropriate for grade ${gradeLevel} level (difficulty ${difficulty.toFixed(1)})
- Clear and concise problem statement
- Single correct answer
- Include a helpful explanation of how to solve it
- Include a hint if the problem is complex
- Make it practical and relatable when possible

Return a JSON object with this exact structure:
{
  "question": "The problem statement",
  "correctAnswer": "The correct answer (as a string)",
  "acceptableAnswers": ["alternative correct formats if applicable"],
  "explanation": "Step-by-step explanation of the solution",
  "hint": "Helpful hint (optional, can be null)",
  "topic": "Main topic (e.g., 'Fractions', 'Linear Equations', 'Area')",
  "subTopic": "Specific concept (optional, can be null)"
}

Generate ONLY the JSON object, no additional text before or after.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type')
  }

  // Parse JSON (strip markdown code blocks if present)
  let jsonText = content.text.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  const problemData = JSON.parse(jsonText)

  return {
    id: generateId(),
    type: problemType,
    difficulty,
    question: problemData.question,
    correctAnswer: problemData.correctAnswer,
    acceptableAnswers: problemData.acceptableAnswers || [],
    hint: problemData.hint,
    explanation: problemData.explanation,
    topic: problemData.topic,
    subTopic: problemData.subTopic,
    timeEstimate: estimateTimeForDifficulty(difficulty)
  }
}

async function generateReadingExercise(difficulty: number): Promise<any> {
  const gradeLevel = Math.floor(difficulty)
  const exerciseType = selectReadingType(difficulty)
  const passageLength = getPassageLengthForGrade(gradeLevel)

  const prompt = `Generate a grade ${gradeLevel} reading comprehension exercise.

Requirements:
- Passage should be ${passageLength} words
- Appropriate reading level for grade ${gradeLevel}
- Engaging topic suitable for students
- Include 3-5 comprehension questions
- Questions should test: main idea, inference, vocabulary, and details
- Mix question types: multiple-choice and short-answer

Return a JSON object with this exact structure:
{
  "passage": "The complete reading passage text",
  "lexileScore": estimated Lexile score as a number (e.g., 650),
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice" or "short-answer",
      "options": ["A", "B", "C", "D"] (only for multiple-choice, null otherwise),
      "correctAnswer": "The correct answer",
      "explanation": "Why this answer is correct",
      "skill": "main-idea" or "inference" or "vocabulary" or "detail"
    }
  ]
}

Generate ONLY the JSON object, no additional text before or after.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2500,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type')
  }

  // Parse JSON (strip markdown code blocks if present)
  let jsonText = content.text.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  const exerciseData = JSON.parse(jsonText)

  return {
    id: generateId(),
    type: exerciseType,
    difficulty,
    passage: exerciseData.passage,
    lexileScore: exerciseData.lexileScore,
    questions: exerciseData.questions.map((q: any) => ({
      id: generateId(),
      question: q.question,
      type: q.type,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      skill: q.skill
    })),
    timeEstimate: estimateReadingTime(exerciseData.passage, exerciseData.questions.length)
  }
}

async function seedProblems() {
  console.log('🌱 Starting Basics Dashboard seeding...\n')

  const difficulties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const problemsPerLevel = 10

  let totalMath = 0
  let totalReading = 0

  for (const difficulty of difficulties) {
    console.log(`\n📚 Grade ${difficulty}:`)

    // Generate math problems
    console.log(`  Generating ${problemsPerLevel} math problems...`)
    for (let i = 0; i < problemsPerLevel; i++) {
      try {
        const problem = await generateMathProblem(difficulty)
        const cleaned = cleanUndefined({
          ...problem,
          usageCount: 0,
          totalAttempts: 0,
          correctAttempts: 0,
          averageTimeSpent: 0,
          generatedBy: 'seed',
          createdAt: new Date(),
          lastUsed: new Date()
        })

        await db.collection('mathProblemsCache').doc(problem.id).set(cleaned)
        totalMath++
        process.stdout.write('.')
      } catch (error) {
        console.error(`\n    Error generating math problem: ${error}`)
      }
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    console.log(` ✓ ${problemsPerLevel} math problems`)

    // Generate reading exercises
    console.log(`  Generating ${problemsPerLevel} reading exercises...`)
    for (let i = 0; i < problemsPerLevel; i++) {
      try {
        const exercise = await generateReadingExercise(difficulty)
        const cleaned = cleanUndefined({
          ...exercise,
          usageCount: 0,
          totalAttempts: 0,
          correctAttempts: 0,
          averageTimeSpent: 0,
          generatedBy: 'seed',
          createdAt: new Date(),
          lastUsed: new Date()
        })

        await db.collection('readingExercisesCache').doc(exercise.id).set(cleaned)
        totalReading++
        process.stdout.write('.')
      } catch (error) {
        console.error(`\n    Error generating reading exercise: ${error}`)
      }
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    console.log(` ✓ ${problemsPerLevel} reading exercises`)
  }

  console.log(`\n\n✅ Seeding complete!`)
  console.log(`   Math problems: ${totalMath}`)
  console.log(`   Reading exercises: ${totalReading}`)
  console.log(`   Total: ${totalMath + totalReading}\n`)
}

// Run seeding
seedProblems()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
