/**
 * AI Dictionary Lookup API
 * 
 * POST /api/basics/dictionary/ai-lookup
 * 
 * Uses AI to look up a word that isn't in the dictionary,
 * given the word and the sentence context where it was found.
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

interface LookupRequest {
  word: string
  sentence: string
  language: 'latin' | 'greek'
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body: LookupRequest = await request.json()
    const { word, sentence, language } = body

    if (!word || !sentence || !language) {
      return badRequestError('word, sentence, and language are required')
    }

    // Check credits
    const creditCheck = await checkBasicsBalance(userId)
    if (!creditCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        found: false
      }, { status: 402 })
    }

    if (!anthropic) {
      return NextResponse.json({
        error: 'AI service unavailable',
        found: false
      }, { status: 503 })
    }

    // Get user's preferred model
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')

    const languageName = language === 'latin' ? 'Latin' : 'Ancient Greek'

    const prompt = `You are a classical languages expert. Analyze this ${languageName} word in context and provide a dictionary entry.

Word: "${word}"
Sentence context: "${sentence}"

Provide the following information in JSON format:
{
  "word": "the dictionary/lemma form of the word",
  "partOfSpeech": "noun|verb|adjective|adverb|preposition|conjunction|pronoun|participle|other",
  "definition": "English meaning(s)",
  "forms": "for nouns: nominative, genitive (e.g., 'aqua, -ae'); for verbs: principal parts",
  "declension": null or 1-5 for nouns,
  "conjugation": null or 1-4 for verbs,
  "gender": null or "m"|"f"|"n" for nouns,
  "grammaticalInfo": "how this specific form is being used in the sentence (case, number, tense, etc.)",
  "frequency": "very-common|common|uncommon|rare"
}

Return ONLY valid JSON, no explanation.`

    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI')
    }

    let entry
    try {
      // Try to extract JSON from response
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      entry = JSON.parse(jsonMatch[0])
    } catch {
      apiLogger.apiError('dictionary/ai-lookup', 'Failed to parse AI response')
      return NextResponse.json({
        error: 'Failed to parse word information',
        found: false
      }, { status: 500 })
    }

    // Track credits based on actual token usage
    await trackCreditsAfterCall(
      userId,
      'dictionary-ai-lookup',
      model,
      response.usage
    )

    return successResponse({
      found: true,
      entry: {
        word: entry.word || word,
        partOfSpeech: entry.partOfSpeech || 'unknown',
        definition: entry.definition || 'Definition not found',
        forms: entry.forms || null,
        declension: entry.declension || null,
        conjugation: entry.conjugation || null,
        gender: entry.gender || null,
        frequency: entry.frequency || 'common',
        principalParts: entry.forms || null,
        examples: []
      }
    })

  } catch (error) {
    apiLogger.apiError('dictionary/ai-lookup', 'Error looking up word', error)
    return serverError(error, 'Failed to lookup word')
  }
}


