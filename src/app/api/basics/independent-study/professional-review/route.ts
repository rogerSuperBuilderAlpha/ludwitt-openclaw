/**
 * Independent Study Professional Review API
 * 
 * POST - Submit professional review info and proof
 * PATCH - Update review status (admin/AI verification)
 * GET - Get professional review status
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import type { ProfessionalReview } from '@/lib/types/independent-study'

export const dynamic = 'force-dynamic'

/**
 * GET - Get professional review status
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const studyId = searchParams.get('studyId')

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    const studyDoc = await db.collection('independentStudies').doc(studyId).get()

    if (!studyDoc.exists) {
      return NextResponse.json({ success: false, error: 'Study not found' }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 403 })
    }

    return successResponseFlat({
      review: studyData.professionalReview || null,
      phase: studyData.phase
    })

  } catch (error) {
    return serverError(error, 'Failed to get professional review')
  }
}

/**
 * POST - Submit professional review information
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { 
      studyId,
      professionalName,
      professionalTitle,
      professionalOrganization,
      professionalEmail,
      professionalLinkedIn,
      howConnected,
      feedback,
      proofUrl,
      proofType
    } = body

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!professionalName || typeof professionalName !== 'string') {
      return badRequestError('Professional name is required')
    }

    if (!professionalTitle || typeof professionalTitle !== 'string') {
      return badRequestError('Professional title is required')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return NextResponse.json({ success: false, error: 'Study not found' }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 403 })
    }

    // Verify study is in professional_review phase
    if (studyData.phase !== 'professional_review') {
      return badRequestError('Study is not ready for professional review')
    }

    // Verify AI review passed
    if (!studyData.aiReview || studyData.aiReview.status !== 'passed') {
      return badRequestError('Project must pass AI review first')
    }

    // Create the professional review
    const professionalReview: ProfessionalReview = {
      professionalName: professionalName.trim(),
      professionalTitle: professionalTitle.trim(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
      ...(professionalOrganization?.trim() && { professionalOrganization: professionalOrganization.trim() }),
      ...(professionalEmail?.trim() && { professionalEmail: professionalEmail.trim() }),
      ...(professionalLinkedIn?.trim() && { professionalLinkedIn: professionalLinkedIn.trim() }),
      ...(howConnected?.trim() && { howConnected: howConnected.trim() }),
      ...(feedback?.trim() && { feedback: feedback.trim() }),
      ...(proofUrl?.trim() && { proofUrl: proofUrl.trim() }),
      ...(proofType && { proofType }),
    }

    // Update the study
    await studyRef.update({
      professionalReview,
      updatedAt: FieldValue.serverTimestamp()
    })

    return successResponseFlat({
      review: professionalReview
    })

  } catch (error) {
    return serverError(error, 'Failed to submit professional review')
  }
}

/**
 * PATCH - Update professional review status
 * Called after admin/AI verification or to mark as approved
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { studyId, status, verificationNotes, proofUrl, proofType, feedback } = body

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return NextResponse.json({ success: false, error: 'Study not found' }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 403 })
    }

    if (!studyData.professionalReview) {
      return badRequestError('No professional review submitted')
    }

    // Build updated review
    const currentReview = studyData.professionalReview as ProfessionalReview
    const updatedReview: ProfessionalReview = { ...currentReview }

    // Update fields
    if (proofUrl !== undefined) {
      updatedReview.proofUrl = proofUrl
    }
    if (proofType !== undefined) {
      updatedReview.proofType = proofType
    }
    if (feedback !== undefined) {
      updatedReview.feedback = feedback
    }
    if (verificationNotes !== undefined) {
      updatedReview.verificationNotes = verificationNotes
    }

    // Update status if provided
    if (status && ['pending', 'approved', 'needs_revision', 'rejected'].includes(status)) {
      updatedReview.status = status
      if (status === 'approved') {
        updatedReview.verifiedAt = new Date().toISOString()
      }
    }

    // Calculate XP if approved
    let xpEarned = 0
    const updateData: Record<string, unknown> = {
      professionalReview: updatedReview,
      updatedAt: FieldValue.serverTimestamp()
    }

    if (status === 'approved') {
      xpEarned = 500 // PROFESSIONAL_SIGN_OFF XP
      updateData.phase = 'completed'
      updateData.completedAt = FieldValue.serverTimestamp()
      updateData.status = 'completed'
      updateData.totalXP = FieldValue.increment(xpEarned)
    } else if (status === 'needs_revision') {
      // Send back to building phase
      updateData.phase = 'building'
    }

    await studyRef.update(updateData)

    return successResponseFlat({
      review: updatedReview,
      xpEarned,
      studyCompleted: status === 'approved'
    })

  } catch (error) {
    return serverError(error, 'Failed to update professional review')
  }
}
