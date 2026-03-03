/**
 * Independent Study Project API
 * 
 * GET - Get project details
 * POST - Initialize project from curriculum
 * PATCH - Update project (milestones, URLs, notes)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import type { ProjectDefinition, ProjectMilestone } from '@/lib/types/independent-study'

export const dynamic = 'force-dynamic'

/**
 * GET - Get project details for a study
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
      project: studyData.project || null,
      projectRequirement: studyData.coursePrompt?.curriculum?.projectRequirement || null
    })

  } catch (error) {
    return serverError(error, 'Failed to get project')
  }
}

/**
 * POST - Initialize project from curriculum
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { studyId } = body

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

    // Get project requirement from course prompt
    const projectReq = studyData.coursePrompt?.curriculum?.projectRequirement
    if (!projectReq) {
      return badRequestError('No project requirement found in curriculum')
    }

    // Create milestones from deliverables
    const milestones: ProjectMilestone[] = projectReq.deliverables.map((d: string, i: number) => ({
      id: `milestone_${i + 1}`,
      title: d,
      description: '',
      isRequired: true
    }))

    // Add standard milestones
    milestones.push(
      {
        id: 'milestone_deploy',
        title: 'Deploy Application',
        description: 'Deploy your project to a live URL',
        isRequired: true
      },
      {
        id: 'milestone_docs',
        title: 'Write Documentation',
        description: 'Create documentation explaining your project',
        isRequired: true
      }
    )

    const project: ProjectDefinition = {
      title: projectReq.title,
      description: projectReq.description,
      milestones,
      startedAt: new Date().toISOString()
    }

    // Update study with project and phase
    await studyRef.update({
      project,
      phase: 'building',
      updatedAt: FieldValue.serverTimestamp()
    })

    return successResponseFlat({
      project
    })

  } catch (error) {
    return serverError(error, 'Failed to initialize project')
  }
}

/**
 * PATCH - Update project details
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { studyId, updates } = body

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!updates || typeof updates !== 'object') {
      return badRequestError('Missing updates')
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

    if (!studyData.project) {
      return badRequestError('Project not initialized')
    }

    // Build updated project
    const currentProject = studyData.project as ProjectDefinition
    const updatedProject: ProjectDefinition = { ...currentProject }

    // Update simple fields
    if (updates.repositoryUrl !== undefined) {
      updatedProject.repositoryUrl = updates.repositoryUrl
    }
    if (updates.liveUrl !== undefined) {
      updatedProject.liveUrl = updates.liveUrl
    }
    if (updates.notes !== undefined) {
      updatedProject.notes = updates.notes
    }

    // Handle milestone updates
    if (updates.completeMilestone) {
      const milestoneId = updates.completeMilestone
      updatedProject.milestones = currentProject.milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, completedAt: new Date().toISOString() }
          : m
      )
    }

    if (updates.uncompleteMilestone) {
      const milestoneId = updates.uncompleteMilestone
      updatedProject.milestones = currentProject.milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, completedAt: undefined }
          : m
      )
    }

    if (updates.milestoneEvidence) {
      const { milestoneId, evidence } = updates.milestoneEvidence
      updatedProject.milestones = currentProject.milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, evidence }
          : m
      )
    }

    // Check if ready to submit
    const allMilestonesComplete = updatedProject.milestones
      .filter(m => m.isRequired)
      .every(m => m.completedAt)
    const hasLiveUrl = !!updatedProject.liveUrl

    // Calculate XP for completed milestones
    const newlyCompleted = updates.completeMilestone
    let xpEarned = 0
    if (newlyCompleted) {
      xpEarned = 50 // PROJECT_MILESTONE XP
    }

    // Update the study
    const updateData: Record<string, unknown> = {
      project: updatedProject,
      updatedAt: FieldValue.serverTimestamp()
    }

    if (xpEarned > 0) {
      updateData.totalXP = FieldValue.increment(xpEarned)
    }

    await studyRef.update(updateData)

    return successResponseFlat({
      project: updatedProject,
      xpEarned,
      canSubmitForReview: allMilestonesComplete && hasLiveUrl
    })

  } catch (error) {
    return serverError(error, 'Failed to update project')
  }
}
