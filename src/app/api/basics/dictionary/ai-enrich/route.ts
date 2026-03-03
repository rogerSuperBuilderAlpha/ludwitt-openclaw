/**
 * AI Word Enrichment API
 * 
 * POST /api/basics/dictionary/ai-enrich
 * 
 * Provides AI-powered deep analysis of a Latin/Greek word including:
 * - Complete morphological forms (full paradigm tables)
 * - Historical context and famous uses in literature
 * - Etymology and word family connections
 * - Cultural significance in Roman/Greek society
 * 
 * Costs 15 cents per lookup.
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

interface EnrichmentRequest {
  word: string
  lemma?: string
  language: 'latin' | 'greek'
  partOfSpeech: string
  definition?: string
}

interface MorphologyTable {
  title: string
  headers: string[]
  rows: { label: string; forms: string[] }[]
}

interface HistoricalUse {
  source: string
  author: string
  date: string
  originalText: string
  translation: string
  significance: string
}

interface EnrichmentResponse {
  word: string
  language: 'latin' | 'greek'
  etymology: {
    origin: string
    rootMeaning: string
    cognates: string[]
    derivatives: { word: string; meaning: string }[]
  }
  morphology: {
    summary: string
    tables: MorphologyTable[]
  }
  historicalUses: HistoricalUse[]
  culturalContext: string
  memoryTip: string
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

    const body: EnrichmentRequest = await request.json()
    const { word, lemma, language, partOfSpeech, definition } = body

    if (!word || !language || !partOfSpeech) {
      return badRequestError('word, language, and partOfSpeech are required')
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
        enrichment: null
      }, { status: 503 })
    }

    // Get user's preferred model for explanation tasks
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')

    // Build the prompt
    const languageName = language === 'latin' ? 'Latin' : 'Ancient Greek'
    const civilization = language === 'latin' ? 'Roman' : 'Greek'
    const lookupWord = lemma || word

    const systemPrompt = `You are a classical philologist and historian specializing in ${languageName}. 
You provide detailed, scholarly yet accessible information about classical vocabulary.
Always be accurate with grammatical forms and historical references.
Format your response as valid JSON matching the requested structure exactly.`

    const userPrompt = `Provide a deep analysis of the ${languageName} ${partOfSpeech} "${lookupWord}" (form: "${word}"${definition ? `, meaning: "${definition}"` : ''}).

Return a JSON object with this exact structure:
{
  "etymology": {
    "origin": "Brief explanation of the word's Proto-Indo-European or earlier origin",
    "rootMeaning": "The original root meaning",
    "cognates": ["List of related words in other ancient or modern languages"],
    "derivatives": [
      { "word": "English derivative", "meaning": "its meaning" }
    ]
  },
  "morphology": {
    "summary": "Brief description of the word's grammatical category and patterns",
    "tables": [
      {
        "title": "Table name (e.g., 'Present Active Indicative' for verbs, 'Singular/Plural' for nouns)",
        "headers": ["Column headers like 'Person', '1st', '2nd', '3rd' or 'Case', 'Singular', 'Plural'"],
        "rows": [
          { "label": "Row label", "forms": ["form1", "form2", "..."] }
        ]
      }
    ]
  },
  "historicalUses": [
    {
      "source": "Work title (e.g., 'Aeneid Book I')",
      "author": "Author name",
      "date": "Approximate date or period",
      "originalText": "The ${languageName} quote containing this word (keep it brief, 5-15 words)",
      "translation": "English translation of the quote",
      "significance": "Why this usage is notable or memorable"
    }
  ],
  "culturalContext": "2-3 sentences about how this word/concept functioned in ${civilization} society, culture, or thought",
  "memoryTip": "A helpful mnemonic or memory tip connecting this word to English or to a memorable image"
}

Guidelines:
- For verbs: include at least present indicative paradigm and one other tense
- For nouns: include full declension table (all cases, both numbers)
- For adjectives: include masculine/feminine/neuter forms
- Include 2-3 famous historical uses with real citations from classical authors
- Make historicalUses memorable - choose passages from famous speeches, poems, or philosophical works
- Keep ${languageName} text accurate with proper diacritics/macrons`

    const message = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    })

    const responseContent = message.content[0]
    if (responseContent.type !== 'text') {
      throw new Error('Unexpected response type from AI')
    }
    const responseText = responseContent.text

    let enrichment: Omit<EnrichmentResponse, 'word' | 'language'>
    try {
      enrichment = JSON.parse(responseText)
    } catch {
      apiLogger.apiError('dictionary/ai-enrich', 'Failed to parse AI response')
      throw new Error('Failed to parse AI response')
    }

    const result: EnrichmentResponse = {
      word: lookupWord,
      language,
      ...enrichment
    }

    // Track credits based on actual token usage
    const { costCharged, newBalance } = await trackCreditsAfterCall(
      userId,
      'dictionary-ai-enrich',
      model,
      message.usage
    )

    return successResponse({
      enrichment: result,
      creditsUsed: costCharged,
      creditsRemaining: newBalance
    })

  } catch (error) {
    apiLogger.apiError('dictionary/ai-enrich', 'Error enriching word', error)
    return serverError(error, 'Failed to enrich word')
  }
}

