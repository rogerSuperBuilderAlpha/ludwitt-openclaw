/**
 * Generate Parsing Elements via AI
 * 
 * When a translation exercise doesn't have parsing elements,
 * this endpoint generates them using AI.
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface ParsingElement {
  word: string
  expectedParsing: {
    partOfSpeech: string
    grammaticalFunction: string
    morphology: string
  }
  options: string[]
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body = await request.json()
    const { originalText, language } = body

    if (!originalText || !language) {
      return badRequestError('Missing originalText or language')
    }

    // Check credits
    const creditCheck = await checkBasicsBalance(userId)
    if (!creditCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        available: creditCheck.currentBalance,
        shortfall: creditCheck.shortfall
      }, { status: 402 })
    }

    if (!anthropic) {
      return NextResponse.json({
        error: 'AI service unavailable',
        parsingElements: []
      }, { status: 503 })
    }

    const languageName = language === 'latin' ? 'Latin' : 'Ancient Greek'

    const prompt = `Analyze this ${languageName} sentence and provide grammatical parsing for each significant word.

Sentence: "${originalText}"

For each word that has grammatical significance (skip articles, particles, and simple conjunctions unless they have case/number), provide:
1. The word itself
2. Part of speech (noun, verb, adjective, adverb, preposition, pronoun, participle, infinitive, etc.)
3. Grammatical function in the sentence (subject, direct object, indirect object, predicate nominative, genitive of possession, ablative of means, dative of interest, etc.)
4. Full morphological parsing:
   - For nouns/adjectives: case, number, gender (e.g., "nominative singular masculine")
   - For verbs: person, number, tense, mood, voice (e.g., "3rd person singular present active indicative")
   - For participles: case, number, gender, tense, voice (e.g., "nominative singular masculine present active")

Also provide 4 plausible but incorrect parsing options for each word (to create multiple choice).

Respond with ONLY valid JSON in this exact format:
{
  "parsingElements": [
    {
      "word": "the word",
      "expectedParsing": {
        "partOfSpeech": "noun",
        "grammaticalFunction": "subject",
        "morphology": "nominative singular masculine"
      },
      "options": [
        "nominative singular masculine (CORRECT)",
        "accusative singular masculine",
        "genitive singular masculine",
        "dative singular masculine",
        "ablative singular masculine"
      ]
    }
  ]
}

Important:
- Include the correct answer in the options array with "(CORRECT)" appended
- Shuffle the correct answer's position in the array
- Focus on 3-6 of the most important words for parsing
- Be accurate with ${languageName} grammar`

    // Get user's preferred model for generation tasks
    const model = await getModelForTask(userId, 'generation')
    const taskConfig = getTaskConfig('generation')

    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI')
    }

    // Parse the JSON response
    let parsingElements: ParsingElement[] = []
    try {
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        parsingElements = parsed.parsingElements || []
        
        // Clean up the options - remove "(CORRECT)" marker for display
        parsingElements = parsingElements.map(elem => ({
          ...elem,
          options: elem.options.map(opt => opt.replace(' (CORRECT)', ''))
        }))
      }
    } catch (e) {
      apiLogger.apiError('translation/generate-parsing', 'Failed to parse AI response', e)
      // Return empty array instead of failing
      parsingElements = []
    }

    // Track credits based on actual token usage
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'translation-generate-parsing',
      model,
      response.usage
    )

    return successResponse({ parsingElements, creditsUsed: costCharged })
  } catch (error) {
    apiLogger.apiError('translation/generate-parsing', 'Error generating parsing', error)
    return serverError(error, 'Failed to generate parsing')
  }
}
