/**
 * Independent Study CRUD API
 * 
 * POST - Create a new Independent Study (starts in discovery phase)
 * GET - List user's Independent Studies
 * PATCH - Update study status or phase
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import type { IndependentStudy, DiscoveryState, StudyPhase } from '@/lib/types/independent-study'

export const dynamic = 'force-dynamic'

/**
 * POST - Create a new Independent Study
 * Starts in discovery phase - no AI call needed yet
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Rate limit check
    const rateLimitResult = await checkRateLimit('api', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body = await request.json()
    const { initialTopic } = body

    if (!initialTopic || typeof initialTopic !== 'string') {
      return badRequestError('Missing initial topic')
    }

    if (initialTopic.length < 3) {
      return badRequestError('Topic too short (min 3 characters)')
    }

    if (initialTopic.length > 500) {
      return badRequestError('Topic too long (max 500 characters)')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    // Create the study document in discovery phase
    const studyId = `study_${userId}_${Date.now()}`
    const now = new Date().toISOString()

    const initialDiscovery: DiscoveryState = {
      messages: [],
      initialTopic: initialTopic.trim(),
      isComplete: false,
      readyToGenerate: false
    }

    const studyData: Omit<IndependentStudy, 'createdAt' | 'updatedAt'> & { 
      createdAt: FirebaseFirestore.FieldValue
      updatedAt: FirebaseFirestore.FieldValue 
    } = {
      id: studyId,
      userId,
      phase: 'discovery',
      status: 'active',
      discovery: initialDiscovery,
      currentUnitIndex: 0,
      currentLessonIndex: 0,
      totalXP: 0,
      totalMessages: 0,
      totalProblemsCompleted: 0,
      totalSessionsCompleted: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }

    await db.collection('independentStudies').doc(studyId).set(studyData)

    // Return display-friendly version
    return successResponseFlat({
      study: {
        id: studyId,
        userId,
        phase: 'discovery',
        status: 'active',
        discovery: initialDiscovery,
        currentUnitIndex: 0,
        currentLessonIndex: 0,
        totalXP: 0,
        totalMessages: 0,
        totalProblemsCompleted: 0,
        totalSessionsCompleted: 0,
        createdAt: now,
        updatedAt: now,
        // Display helpers
        title: initialTopic.trim(),
        description: `Exploring: ${initialTopic.trim()}`,
        progressPercent: 0
      }
    })

  } catch (error) {
    return serverError(error, 'Failed to create Independent Study')
  }
}

/**
 * GET - List user's Independent Studies
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    if (!db) {
      return successResponseFlat({ studies: [] })
    }

    // Get optional status filter
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')
    const phaseFilter = searchParams.get('phase')

    // Query user's studies
    let query = db.collection('independentStudies')
      .where('userId', '==', userId)
      .orderBy('updatedAt', 'desc')

    if (statusFilter && ['active', 'completed', 'archived'].includes(statusFilter)) {
      query = query.where('status', '==', statusFilter)
    }

    const snapshot = await query.limit(50).get()

    const studies = snapshot.docs.map(doc => {
      const data = doc.data()
      
      // Compute display title and description
      const title = data.coursePrompt?.curriculum?.title || 
                    data.discovery?.topicSummary || 
                    data.discovery?.initialTopic || 
                    'Untitled Study'
      
      const description = data.coursePrompt?.curriculum?.description ||
                          data.discovery?.topicSummary ||
                          `Exploring: ${data.discovery?.initialTopic || 'Unknown topic'}`
      
      // Compute progress percent
      let progressPercent = 0
      if (data.coursePrompt?.curriculum?.units) {
        const totalLessons = data.coursePrompt.curriculum.units.reduce(
          (sum: number, unit: { lessons: unknown[] }) => sum + (unit.lessons?.length || 0), 0
        )
        const completedLessons = data.coursePrompt.curriculum.units.reduce(
          (sum: number, unit: { lessons: { completedAt?: string }[] }) => 
            sum + (unit.lessons?.filter((l: { completedAt?: string }) => l.completedAt)?.length || 0), 0
        )
        progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      }

      return {
        id: data.id,
        userId: data.userId,
        phase: data.phase || 'discovery',
        status: data.status || 'active',
        discovery: data.discovery,
        coursePrompt: data.coursePrompt,
        currentUnitIndex: data.currentUnitIndex || 0,
        currentLessonIndex: data.currentLessonIndex || 0,
        project: data.project,
        aiReview: data.aiReview,
        professionalReview: data.professionalReview,
        totalXP: data.totalXP || 0,
        totalMessages: data.totalMessages || 0,
        totalProblemsCompleted: data.totalProblemsCompleted || 0,
        totalSessionsCompleted: data.totalSessionsCompleted || 0,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        completedAt: data.completedAt?.toDate?.()?.toISOString() || data.completedAt,
        // Display helpers
        title,
        description,
        progressPercent
      }
    })

    // Filter by phase if specified
    const filteredStudies = phaseFilter 
      ? studies.filter(s => s.phase === phaseFilter)
      : studies

    return successResponseFlat({ studies: filteredStudies })

  } catch (error) {
    return serverError(error, 'Failed to list Independent Studies')
  }
}

/**
 * PATCH - Update study status or advance phase
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { studyId, status, phase } = body

    if (!studyId || typeof studyId !== 'string') {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    // Verify ownership
    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return NextResponse.json({
        success: false,
        error: 'Study not found'
      }, { status: 404 })
    }

    if (studyDoc.data()?.userId !== userId) {
      return NextResponse.json({
        success: false,
        error: 'Not authorized to modify this study'
      }, { status: 403 })
    }

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp()
    }

    // Update status if provided
    if (status && ['active', 'completed', 'archived'].includes(status)) {
      updates.status = status
      if (status === 'completed') {
        updates.completedAt = FieldValue.serverTimestamp()
      }
    }

    // Update phase if provided and valid transition
    const validPhases: StudyPhase[] = [
      'discovery', 'curriculum_preview', 'learning', 
      'building', 'ai_review', 'professional_review', 'completed'
    ]
    if (phase && validPhases.includes(phase)) {
      const currentPhase = studyDoc.data()?.phase
      
      // Validate phase transitions
      const phaseOrder = validPhases
      const currentIndex = phaseOrder.indexOf(currentPhase)
      const newIndex = phaseOrder.indexOf(phase)
      
      // Allow moving forward or staying same (for re-attempts)
      if (newIndex >= currentIndex || phase === 'building') {
        updates.phase = phase
      } else {
        return badRequestError(`Cannot transition from ${currentPhase} to ${phase}`)
      }
    }

    await studyRef.update(updates)

    return successResponseFlat({
      studyId,
      ...updates,
      updatedAt: new Date().toISOString()
    })

  } catch (error) {
    return serverError(error, 'Failed to update study')
  }
}
