/**
 * Misconception Detection API
 * 
 * Analyzes a student error to detect possible misconceptions
 * and update their misconception profile.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { detectMisconceptions, DetectionInput } from '@/lib/misconceptions/detector'
import { 
  updateMisconceptionProfile, 
  FingerprintUpdate 
} from '@/lib/misconceptions/fingerprinter'
import { 
  getMisconceptionProfile, 
  storeMisconceptionProfile,
  storeErrorRecord,
  getRecentErrorRecords
} from '@/lib/misconceptions/storage'
import { ErrorRecord } from '@/lib/misconceptions/detector'

export const dynamic = 'force-dynamic'

interface DetectionRequestBody {
  problemId: string
  studentAnswer: string
  correctAnswer: string
  problemType: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  skills: string[]
  problemText?: string
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Parse body
    const body = await request.json() as DetectionRequestBody
    
    // Validate required fields
    if (!body.problemId || !body.studentAnswer || !body.correctAnswer || !body.subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Build detection input
    const detectionInput: DetectionInput = {
      userId,
      problemId: body.problemId,
      studentAnswer: body.studentAnswer,
      correctAnswer: body.correctAnswer,
      problemType: body.problemType || 'unknown',
      subject: body.subject,
      difficulty: body.difficulty || 5,
      skills: body.skills || [],
      problemText: body.problemText
    }
    
    // Get recent errors for context
    const recentErrorDocs = await getRecentErrorRecords(userId, 20)
    const recentErrors: ErrorRecord[] = recentErrorDocs.map(doc => ({
      problemId: doc.problemId,
      timestamp: doc.timestamp,
      studentAnswer: doc.studentAnswer,
      correctAnswer: doc.correctAnswer,
      errorFeatures: doc.errorFeatures as ErrorRecord['errorFeatures'],
      detectedMisconceptions: doc.detectedMisconceptions
    }))
    
    // Get existing profile
    const existingProfile = await getMisconceptionProfile(userId)
    
    // Detect misconceptions
    const detectionResult = detectMisconceptions(detectionInput, {
      recentErrors,
      userMisconceptions: existingProfile?.activeMisconceptions.map(m => m.misconceptionId) || []
    })
    
    // If misconceptions were detected, update the profile
    if (detectionResult.detected) {
      const update: FingerprintUpdate = {
        userId,
        detections: detectionResult.misconceptions,
        problemId: body.problemId,
        subject: body.subject
      }
      
      const updatedProfile = updateMisconceptionProfile(existingProfile, update)
      await storeMisconceptionProfile(updatedProfile)
      
      // Store the error record
      const errorFeatures = detectionResult.misconceptions[0]?.evidence
        ? {} // Would extract from analysis
        : {}
      
      await storeErrorRecord(
        detectionInput,
        errorFeatures,
        detectionResult.misconceptions.map(m => m.misconception.id)
      )
    }
    
    // Return detection results
    return successResponse({
      detected: detectionResult.detected,
      misconceptions: detectionResult.misconceptions.map(m => ({
        id: m.misconception.id,
        name: m.misconception.name,
        description: m.misconception.description,
        severity: m.misconception.severity,
        confidence: m.confidence,
        matchedPatterns: m.matchedPatterns
      })),
      suggestedRemediation: detectionResult.suggestedRemediation
    })
    
  } catch (error) {
    return serverError(error, 'Failed to detect misconceptions')
  }
}
