import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError, notFoundError } from '@/lib/api/error-responses'
import { successResponseWithMessage } from '@/lib/api/response-helpers'
import { validateRequiredFields, validateSubject } from '@/lib/api/validators'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { selectProblemWithFallback } from '@/lib/basics/problem-selection-utils'
import { formatProblemForClient } from '@/lib/basics/subject-helpers'
import { MathProblem } from '@/lib/types/basics'

/**
 * Get a similar problem based on subject, difficulty, type, and topic
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { subject, difficulty, type, topic, excludeId } = body

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['subject', 'difficulty', 'excludeId'])
    if (requiredFieldsError) return requiredFieldsError

    // Validate subject
    const subjectError = validateSubject(subject)
    if (subjectError) return subjectError

    // Use progressive fallback selection
    let similarProblem = await selectProblemWithFallback(subject as 'math' | 'reading', {
      targetDifficulty: difficulty,
      excludeIds: [excludeId],
      allowGeneration: isAIGenerationAvailable()
    })

    // If type preference specified, try to match it (for math problems)
    // Use parallel attempts instead of sequential for better performance
    if (similarProblem && subject === 'math' && type) {
      const mathProblem = similarProblem as MathProblem
      if (mathProblem.type !== type) {
        // Try up to 5 times in parallel to find matching type
        const candidates = await Promise.allSettled(
          Array.from({ length: 5 }, () => 
            selectProblemWithFallback('math', {
              targetDifficulty: difficulty,
              excludeIds: [excludeId, mathProblem.id],
              allowGeneration: false // Don't generate for type matching
            })
          )
        )
        
        // Find first candidate with matching type
        for (const result of candidates) {
          if (result.status === 'fulfilled' && result.value) {
            const candidate = result.value as MathProblem
            if (candidate.type === type) {
              similarProblem = candidate
              break
            }
          }
        }
      }
    }

    if (!similarProblem) {
      return notFoundError('No similar problems available at this difficulty level')
    }

    // Format for client (removes correct answers)
    const formattedProblem = formatProblemForClient(similarProblem, subject)

    if (!formattedProblem) {
      return notFoundError('Failed to format problem')
    }

    return successResponseWithMessage(
      { problem: formattedProblem },
      'Similar problem found'
    )

  } catch (error) {
    return serverError(error, 'Failed to find similar problem')
  }
}
