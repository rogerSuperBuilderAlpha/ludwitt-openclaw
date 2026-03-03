/**
 * Learning Modules API
 * Manage learning modules for cohorts
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

// GET - List modules for a cohort
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const { searchParams } = new URL(request.url)
    const cohortId = searchParams.get('cohortId')

    if (!cohortId) {
      return badRequestError('cohortId is required')
    }

    // Check if user has access to cohort - run in parallel
    const [membershipDoc, mentorDoc] = await Promise.all([
      db.collection('cohortMembers')
        .where('cohortId', '==', cohortId)
        .where('userId', '==', decodedToken.uid)
        .limit(1)
        .get(),
      db.collection('cohortMentorAssignments')
        .where('cohortId', '==', cohortId)
        .where('mentorId', '==', decodedToken.uid)
        .limit(1)
        .get()
    ])

    if (membershipDoc.empty && mentorDoc.empty) {
      return forbiddenError('Access denied')
    }

    // Get modules
    const modulesSnapshot = await db
      .collection('learningModules')
      .where('cohortId', '==', cohortId)
      .orderBy('order', 'asc')
      .get()

    const modules = modulesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isCompleted: (doc.data().completedBy || []).includes(decodedToken.uid),
    }))

    return NextResponse.json({ modules })
  } catch (error) {
    apiLogger.apiError('cohorts/learning/modules', 'Failed to list modules', error)
    return serverError(error, 'Failed to list modules')
  }
}

// POST - Mark module as completed
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const { moduleId } = await request.json()

    if (!moduleId) {
      return NextResponse.json(
        { error: 'moduleId is required' },
        { status: 400 }
      )
    }

    // Get module
    const moduleDoc = await db.collection('learningModules').doc(moduleId).get()

    if (!moduleDoc.exists) {
      return notFoundError('Module not found')
    }

    const moduleData = moduleDoc.data()!

    // Check if user has access
    const membershipDoc = await db
      .collection('cohortMembers')
      .where('cohortId', '==', moduleData.cohortId)
      .where('userId', '==', decodedToken.uid)
      .limit(1)
      .get()

    if (membershipDoc.empty) {
      return NextResponse.json(
        { error: 'Forbidden: Access denied' },
        { status: 403 }
      )
    }

    // Add user to completedBy array
    const completedBy = moduleData.completedBy || []
    if (!completedBy.includes(decodedToken.uid)) {
      await db.collection('learningModules').doc(moduleId).update({
        completedBy: [...completedBy, decodedToken.uid],
        updatedAt: new Date().toISOString(),
      })

      // Update student progress
      const progressDocId = `${moduleData.cohortId}_${decodedToken.uid}`
      const progressRef = db.collection('studentProgress').doc(progressDocId)
      const progressDoc = await progressRef.get()

      if (progressDoc.exists) {
        const progressData = progressDoc.data()!
        await progressRef.update({
          completedModules: [...(progressData.completedModules || []), moduleId],
          totalModulesCompleted: (progressData.totalModulesCompleted || 0) + 1,
          lastUpdated: new Date().toISOString(),
        })
      }

    }

    return successResponseFlat({}, 'Module marked as completed')
  } catch (error) {
    apiLogger.apiError('cohorts/learning/modules', 'Failed to complete module', error)
    return serverError(error, 'Failed to complete module')
  }
}
