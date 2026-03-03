import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { apiLogger } from '@/lib/logger'

const VALID_LANGUAGES = ['latin', 'greek'] as const
type Language = typeof VALID_LANGUAGES[number]

/**
 * API Route: POST /api/basics/intro-video/complete
 * 
 * Marks the intro video for a classical language as watched.
 * This must be completed before a user can access Latin/Greek content.
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Parse request body
    const body = await request.json()
    const { language } = body

    // Validate language
    if (!language || !VALID_LANGUAGES.includes(language)) {
      return badRequestError(`Invalid language. Must be one of: ${VALID_LANGUAGES.join(', ')}`)
    }

    // Update user progress to mark intro video as watched
    const progressRef = db.collection('userBasicsProgress').doc(userId)
    
    await progressRef.set({
      introVideosWatched: {
        [language]: {
          watchedAt: Timestamp.now(),
          completed: true
        }
      },
      updatedAt: Timestamp.now()
    }, { merge: true })

    apiLogger.success('intro-video-complete', `Marked ${language} intro video as complete`, { 
      data: { userId, language } 
    })

    return successResponse({
      language,
      completed: true,
      message: `${language.charAt(0).toUpperCase() + language.slice(1)} intro video marked as complete`
    })

  } catch (error) {
    return serverError(error, 'Failed to mark intro video as complete')
  }
}

/**
 * API Route: GET /api/basics/intro-video/complete
 * 
 * Checks if the user has watched the intro videos for Latin/Greek.
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get optional language filter from query params
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') as Language | null

    // Get user progress
    const progressRef = db.collection('userBasicsProgress').doc(userId)
    const progressDoc = await progressRef.get()
    
    const introVideosWatched = progressDoc.exists 
      ? progressDoc.data()?.introVideosWatched || {}
      : {}

    // If specific language requested, return just that status
    if (language && VALID_LANGUAGES.includes(language)) {
      return successResponse({
        language,
        watched: !!introVideosWatched[language]?.completed
      })
    }

    // Return status for all languages
    return successResponse({
      latin: !!introVideosWatched.latin?.completed,
      greek: !!introVideosWatched.greek?.completed
    })

  } catch (error) {
    return serverError(error, 'Failed to check intro video status')
  }
}
