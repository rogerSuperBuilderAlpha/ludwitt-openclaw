/**
 * API Route: POST /api/basics/generate-logic-problems
 * 
 * Generates new logic problems using Claude API when a user completes
 * all static problems in a unit. Problems are tailored to the unit's
 * topic and difficulty level.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { withCreditTracking } from '@/lib/credits'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import Anthropic from '@anthropic-ai/sdk'
import { LOGIC_UNITS, LOGIC_SYMBOLS, LogicProblem, LogicProblemType } from '@/data/basics/logic/types'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface GenerateLogicProblemsRequest {
  unitId: number
  count?: number
  difficulty?: number
  excludeIds?: string[]
  completedTopics?: string[] // Topics user has already mastered
}

/**
 * Get relevant symbols for a unit
 */
function getSymbolsForUnit(unitId: number): string[] {
  // Map units to their relevant symbols
  const unitSymbolMap: Record<number, string[]> = {
    1: ['⊢', '⊨'], // Intro
    2: ['¬', '∧', '∨', '→', '↔'], // Propositional
    3: ['¬', '∧', '∨', '→', '↔', '≡', '⊥', '⊤'], // Truth Tables
    4: ['¬', '∧', '∨', '→', '↔', '⊢'], // Proofs
    5: ['∀', '∃', '∃!', '¬', '∧', '∨', '→'], // Predicate
    6: ['∀', '∃', '∃!', '⊢', '¬', '∧', '∨', '→'], // FOL Proofs
    7: ['∈', '∉', '⊆', '∩', '∪', '∅'], // Set Theory
    8: ['□', '◇', '¬', '∧', '∨', '→'], // Modal
    9: ['G', 'F', 'X', 'U', '¬', '∧', '∨'], // Temporal
    10: ['K', 'B', '¬', '∧', '∨', '→'], // Epistemic
    11: ['O', 'P', 'F', '¬', '∧', '∨', '→'], // Deontic
    12: ['¬', '∧', '∨', '→'], // Many-Valued
    13: ['¬', '∧', '∨', '→', '⊢'], // Intuitionistic
    14: ['¬', '∧', '∨', '→', '⊥'], // Paraconsistent
    15: ['∀', '∃', '∃!', '⊢', '⊨'], // Higher-Order
    16: ['⊢', '⊨', '≡', '⊥', '⊤'], // Metalogic
    17: ['⊢', '⊨', '≡'], // Computability
    18: ['∀', '∃', '→', '∧', '∨', '□', '◇'], // Applications
  }
  return unitSymbolMap[unitId] || ['¬', '∧', '∨', '→']
}

/**
 * Get problem types appropriate for a unit
 */
function getProblemTypesForUnit(unitId: number): LogicProblemType[] {
  const unitTypesMap: Record<number, LogicProblemType[]> = {
    1: ['multiple-choice', 'free-response'],
    2: ['multiple-choice', 'translation', 'free-response'],
    3: ['truth-table', 'equivalence', 'multiple-choice'],
    4: ['proof', 'multiple-choice', 'free-response'],
    5: ['translation', 'multiple-choice', 'free-response'],
    6: ['proof', 'multiple-choice', 'free-response'],
    7: ['multiple-choice', 'free-response', 'proof'],
    8: ['model', 'validity', 'multiple-choice', 'translation'],
    9: ['model', 'validity', 'multiple-choice', 'translation'],
    10: ['model', 'validity', 'multiple-choice', 'translation'],
    11: ['translation', 'validity', 'multiple-choice'],
    12: ['truth-table', 'multiple-choice', 'free-response'],
    13: ['proof', 'multiple-choice', 'free-response'],
    14: ['validity', 'multiple-choice', 'free-response'],
    15: ['translation', 'multiple-choice', 'free-response'],
    16: ['proof', 'multiple-choice', 'free-response'],
    17: ['multiple-choice', 'free-response'],
    18: ['multiple-choice', 'translation', 'free-response'],
  }
  return unitTypesMap[unitId] || ['multiple-choice', 'free-response']
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { 
      unitId, 
      count = 5, 
      difficulty,
      excludeIds = [],
      completedTopics = []
    } = body as GenerateLogicProblemsRequest

    // Validate unit ID
    if (!unitId || unitId < 1 || unitId > 18) {
      return badRequestError('Valid unit ID (1-18) is required')
    }

    if (!isAIGenerationAvailable() || !anthropic) {
      return serverError(new Error('AI not available'), 'AI service not available')
    }

    // Get unit information
    const unit = LOGIC_UNITS.find(u => u.id === unitId)
    if (!unit) {
      return badRequestError('Unit not found')
    }

    const targetDifficulty = difficulty ?? unit.difficulty
    const relevantSymbols = getSymbolsForUnit(unitId)
    const problemTypes = getProblemTypesForUnit(unitId)
    
    // Get symbol descriptions for the prompt
    const symbolDescriptions = LOGIC_SYMBOLS
      .filter(s => relevantSymbols.includes(s.symbol))
      .map(s => `${s.symbol} (${s.name}): ${s.description}`)
      .join('\n')

    const prompt = `You are an expert symbolic logic professor creating practice problems for a college-level logic course.

## Unit Information
- Unit ${unitId}: ${unit.name}
- Description: ${unit.description}
- Topics covered: ${unit.topics.join(', ')}
- Difficulty level: ${targetDifficulty} out of 5 (1=intro college, 5=graduate level)

## Available Logic Symbols
${symbolDescriptions}

## Problem Types to Generate
Mix of: ${problemTypes.join(', ')}

## User Context
${completedTopics.length > 0 ? `Topics already mastered: ${completedTopics.join(', ')}` : 'New to this unit'}

## Task
Generate ${count} unique logic problems for Unit ${unitId}: ${unit.name}

Requirements:
1. Each problem must be clearly stated and solvable
2. Problems should progress in difficulty within the unit's range
3. Include a variety of problem types
4. Every problem MUST have a hint and detailed explanation
5. Use proper logic notation with the symbols listed above
6. For multiple-choice questions, provide exactly 4 options (A-D) with one correct answer
7. For proofs, provide clear step-by-step solution in proofSteps array
8. For truth tables, provide the complete table data

## Output Format
Return a JSON array with exactly ${count} problems in this structure:
[
  {
    "unit": ${unitId},
    "unitName": "${unit.name}",
    "topic": "One of: ${unit.topics.join(', ')}",
    "subTopic": "Specific concept being tested",
    "difficulty": ${targetDifficulty},
    "problemType": "one of: ${problemTypes.join(', ')}",
    "question": "The problem statement using proper notation",
    "description": "Additional context or instructions if needed",
    "options": [
      {"label": "A", "text": "First option"},
      {"label": "B", "text": "Second option"},
      {"label": "C", "text": "Third option"},
      {"label": "D", "text": "Fourth option"}
    ],
    "correctAnswer": "The correct answer (letter for MC, or full answer)",
    "acceptableAnswers": ["Alternative acceptable answers if any"],
    "hint": "A helpful hint that guides without revealing the answer (REQUIRED)",
    "explanation": "Detailed step-by-step explanation of the solution (REQUIRED)",
    "symbols": ["Symbols used in this problem"],
    "latex": "LaTeX version if complex formulas",
    "proofSteps": ["Step 1", "Step 2", ...] (for proof problems only),
    "tags": ["concept-tag-1", "concept-tag-2"]
  }
]

Notes:
- For non-multiple-choice problems, omit the "options" field or set to null
- For proof problems, include proofSteps with the complete solution
- All problems must test understanding, not just memorization
- Make problems interesting and varied, not repetitive

Generate ONLY the JSON array, no additional text.`

    // Get user's preferred model for content generation
    const model = await getModelForTask(userId, 'generation')
    const taskConfig = getTaskConfig('generation')

    // Execute AI call with credit tracking
    const creditResult = await withCreditTracking(userId, 'generate-logic-problems', async () => {
      const response = await anthropic!.messages.create({
        model,
        max_tokens: 8000, // Logic problems can be lengthy
        temperature: taskConfig.defaultTemperature,
        messages: [{ role: 'user', content: prompt }]
      })

      return {
        response,
        usage: response.usage,
        model
      }
    })

    if (creditResult instanceof NextResponse) {
      return creditResult // Credit error
    }

    const content = creditResult.result.content[0]
    if (content.type !== 'text') {
      return serverError(new Error('Unexpected response'), 'Failed to generate problems')
    }

    // Parse the JSON response
    let problems: LogicProblem[]
    try {
      // Clean up the response - remove markdown code blocks if present
      let jsonText = content.text.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7)
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3)
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3)
      }
      problems = JSON.parse(jsonText.trim())
    } catch (parseError) {
      apiLogger.apiError('generate-logic-problems', 'Failed to parse AI response')
      return serverError(new Error('Parse error'), 'Failed to parse generated problems')
    }

    // Validate and add IDs
    const generatedProblems: LogicProblem[] = problems.map((p, index) => ({
      id: `logic-gen-${unitId}-${Date.now()}-${index}`,
      unit: unitId,
      unitName: unit.name,
      topic: p.topic || unit.topics[0],
      subTopic: p.subTopic,
      difficulty: p.difficulty || targetDifficulty,
      problemType: p.problemType || 'multiple-choice',
      question: p.question,
      description: p.description,
      options: p.options?.map(opt => ({
        label: opt.label,
        text: opt.text,
        isCorrect: opt.label === p.correctAnswer
      })),
      correctAnswer: String(p.correctAnswer),
      acceptableAnswers: p.acceptableAnswers,
      hint: p.hint || 'Think carefully about the logical structure.',
      explanation: p.explanation || 'Review the unit material for this concept.',
      symbols: p.symbols || relevantSymbols,
      latex: p.latex,
      proofSteps: p.proofSteps,
      tags: p.tags || [unit.shortName.toLowerCase()]
    }))

    return successResponse({
      problems: generatedProblems,
      unit: {
        id: unitId,
        name: unit.name,
        topics: unit.topics
      },
      meta: {
        generated: generatedProblems.length,
        difficulty: targetDifficulty,
        costCharged: creditResult.costCharged,
        newBalance: creditResult.newBalance
      }
    })

  } catch (error) {
    apiLogger.apiError('generate-logic-problems', 'Failed to generate logic problems', error)
    return serverError(error, 'Failed to generate logic problems')
  }
}





