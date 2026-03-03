/**
 * Word Lookup API
 * 
 * Fetches word definitions, phonetics, and pronunciation data
 * Uses Free Dictionary API (https://dictionaryapi.dev/)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields, validateStringLength } from '@/lib/api/validators'
import { getQueryParam } from '@/lib/api/request-helpers'

interface DictionaryResponse {
  word: string
  phonetic?: string
  phonetics: Array<{
    text?: string
    audio?: string
    sourceUrl?: string
    license?: {
      name: string
      url: string
    }
  }>
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
  }>
  license?: {
    name: string
    url: string
  }
  sourceUrls?: string[]
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    // Get word from query params
    const word = getQueryParam(request, 'word')

    // Validate required fields
    const requiredFieldsError = validateRequiredFields({ word }, ['word'])
    if (requiredFieldsError) return requiredFieldsError

    // Clean word (remove special characters, lowercase)
    const cleanWord = word!.toLowerCase().replace(/[^\w]/g, '')

    // Validate word length
    const lengthError = validateStringLength(cleanWord, 2, 50, 'word')
    if (lengthError) return lengthError

    // Fetch from Free Dictionary API
    const dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`
    const response = await fetch(dictionaryUrl)

    if (!response.ok) {
      if (response.status === 404) {
        return notFoundError('Word not found in dictionary')
      }
      throw new Error(`Dictionary API error: ${response.statusText}`)
    }

    const data: DictionaryResponse[] = await response.json()

    if (!data || data.length === 0) {
      return notFoundError('Word not found')
    }

    // Use the first entry (most common)
    const entry = data[0]

    // Format response
    const wordData = {
      word: entry.word,
      phonetic: entry.phonetic || entry.phonetics[0]?.text || '',
      phonetics: entry.phonetics || [],
      meanings: entry.meanings || []
    }

    return successResponse(wordData)
  } catch (error) {
    return serverError(error, 'Failed to look up word')
  }
}

