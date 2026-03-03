/**
 * Companion Evolution API
 * 
 * POST /api/basics/companion/evolve
 * 
 * Takes user's selected attributes and generates a unique companion using AI
 * Costs 25 credits (cents) per evolution
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { trackCreditsAfterCall } from '@/lib/credits'
import { checkBasicsBalance } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

// Cost in cents for evolution
const EVOLUTION_COST = 25

interface EvolveRequest {
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  currentLevel: number
  currentName: string
  selectedAttributes: {
    personality: string // e.g., "Wise", "Fierce", "Playful"
    element: string // e.g., "Fire", "Water", "Earth", "Air", "Light", "Shadow"
    style: string // e.g., "Mythical", "Cute", "Majestic", "Mysterious"
    specialty: string // Subject-specific specialty
  }
  previousEvolutions: string[] // Names of previous forms for continuity
}

interface GeneratedCompanion {
  name: string
  emoji: string // 1-3 emoji combination
  description: string
  personality: string
  specialAbility: string
  catchphrase: string
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const body: EvolveRequest = await request.json()
    const { subject, currentLevel, currentName, selectedAttributes, previousEvolutions } = body

    if (!subject || currentLevel === undefined || !selectedAttributes) {
      return badRequestError('Missing required fields')
    }

    // Check if user has enough credits for AI generation
    const balanceCheck = await checkBasicsBalance(authResult.userId)
    if (!balanceCheck.allowed || balanceCheck.currentBalance < EVOLUTION_COST) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits',
        requiredCredits: EVOLUTION_COST,
        currentBalance: balanceCheck.currentBalance
      }, { status: 402 })
    }

    // Subject-specific context
    const subjectContext: Record<string, string> = {
      math: 'mathematics, numbers, equations, geometry, and logical problem-solving',
      reading: 'literature, stories, vocabulary, comprehension, and language arts',
      latin: 'ancient Rome, Latin language, classical civilization, and Roman mythology',
      greek: 'ancient Greece, Greek language, philosophy, and Greek mythology',
      logic: 'logical reasoning, puzzles, deduction, proofs, and critical thinking'
    }

    // Level descriptions
    const levelNames = ['Hatchling', 'Youngling', 'Apprentice', 'Adept', 'Master', 'Legendary']
    const levelName = levelNames[currentLevel] || 'Evolved'

    const prompt = `Generate a unique learning companion for a student studying ${subjectContext[subject]}.

Current companion: "${currentName}"
Evolution level: ${currentLevel + 1}/5 (${levelName})
Previous forms: ${previousEvolutions.length > 0 ? previousEvolutions.join(' → ') : 'None (first evolution)'}

User's selected attributes:
- Personality: ${selectedAttributes.personality}
- Element: ${selectedAttributes.element}  
- Style: ${selectedAttributes.style}
- Specialty: ${selectedAttributes.specialty}

Generate a UNIQUE companion that:
1. Embodies the selected attributes
2. Relates to ${subject} learning
3. Has a creative, memorable name (not generic)
4. Uses 1-3 emojis that represent the companion visually
5. Has a distinct personality and catchphrase

Return ONLY valid JSON in this exact format:
{
  "name": "Creative unique name",
  "emoji": "🔥🦊" (1-3 emojis that visually represent the companion),
  "description": "One sentence describing the companion",
  "personality": "2-3 words describing personality traits",
  "specialAbility": "What they help with in ${subject}",
  "catchphrase": "A short memorable phrase they might say"
}`

    // If no AI available, generate a deterministic fallback
    if (!anthropic) {
      const fallback = generateFallbackCompanion(subject, currentLevel, selectedAttributes)
      return successResponse({ companion: fallback, aiGenerated: false })
    }

    // Get user's preferred model for generation tasks
    const model = await getModelForTask(authResult.userId, 'generation')
    const taskConfig = getTaskConfig('generation')
    
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    // Track and deduct credits for the AI usage
    await trackCreditsAfterCall(
      authResult.userId,
      'companion-evolution',
      model,
      response.usage
    )

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let jsonText = content.text.trim()
    // Clean up markdown if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const companion: GeneratedCompanion = JSON.parse(jsonText)

    return successResponse({ companion, aiGenerated: true, creditsCharged: true })

  } catch (error) {
    apiLogger.apiError('companion/evolve', 'Error evolving companion', error)
    return serverError(error, 'Failed to evolve companion')
  }
}

function generateFallbackCompanion(
  subject: string,
  level: number,
  attrs: EvolveRequest['selectedAttributes']
): GeneratedCompanion {
  // Fallback names based on attributes
  const prefixes: Record<string, string[]> = {
    Wise: ['Sage', 'Oracle', 'Scholar'],
    Fierce: ['Storm', 'Blaze', 'Thunder'],
    Playful: ['Spark', 'Bounce', 'Twinkle'],
    Calm: ['Zen', 'Serene', 'Peace'],
    Curious: ['Quest', 'Wonder', 'Seeker']
  }

  const suffixes: Record<string, string[]> = {
    math: ['Calculator', 'Numerix', 'Mathis'],
    reading: ['Lexicon', 'Pageus', 'Wordsworth'],
    latin: ['Romulus', 'Aquila', 'Caesaris'],
    greek: ['Athenos', 'Helios', 'Olympus'],
    logic: ['Logix', 'Deduce', 'Reason']
  }

  const elementEmojis: Record<string, string> = {
    Fire: '🔥',
    Water: '💧',
    Earth: '🌿',
    Air: '💨',
    Light: '✨',
    Shadow: '🌙'
  }

  const styleEmojis: Record<string, string> = {
    Mythical: '🐉',
    Cute: '🐾',
    Majestic: '👑',
    Mysterious: '🔮',
    Ancient: '🏛️',
    Cosmic: '🌟'
  }

  const prefix = prefixes[attrs.personality]?.[level % 3] || 'Nova'
  const suffix = suffixes[subject]?.[level % 3] || 'Pal'
  const name = `${prefix} ${suffix}`

  const emoji1 = elementEmojis[attrs.element] || '⭐'
  const emoji2 = styleEmojis[attrs.style] || '🌟'

  return {
    name,
    emoji: `${emoji1}${emoji2}`,
    description: `A ${attrs.personality.toLowerCase()} ${attrs.style.toLowerCase()} companion born of ${attrs.element.toLowerCase()}.`,
    personality: `${attrs.personality}, ${attrs.style}`,
    specialAbility: `Helps with ${attrs.specialty}`,
    catchphrase: `"Let's master ${subject} together!"`
  }
}

