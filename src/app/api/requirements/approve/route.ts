/**
 * Approve/Reject Requirement API
 * Customers approve or reject project requirements
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    // Parse request body
    const { requirementId, action, feedback } = await request.json()

    if (!requirementId || !action) {
      return NextResponse.json(
        { error: 'requirementId and action are required' },
        { status: 400 }
      )
    }

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json(
        { error: 'action must be "approve" or "reject"' },
        { status: 400 }
      )
    }

    // Get requirement
    const requirementRef = db.collection('requirements').doc(requirementId)
    const requirementDoc = await requirementRef.get()

    if (!requirementDoc.exists) {
      return NextResponse.json(
        { error: 'Requirement not found' },
        { status: 404 }
      )
    }

    const requirement = requirementDoc.data()!

    // Get project to verify customer
    const projectDoc = await db.collection('projects').doc(requirement.projectId).get()

    if (!projectDoc.exists) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const project = projectDoc.data()!

    // Verify user is the customer
    if (project.customerId !== decodedToken.uid) {
      return NextResponse.json(
        { error: 'Forbidden: Only the project customer can approve/reject requirements' },
        { status: 403 }
      )
    }

    // Update requirement
    const updateData: any = {
      customerApprovalStatus: action === 'approve' ? 'approved' : 'rejected',
      customerFeedback: feedback || null,
      approvedAt: action === 'approve' ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    }

    // If approved, mark as completed
    if (action === 'approve') {
      updateData.status = 'approved'
    }

    await requirementRef.update(updateData)

    // Create notification for developer
    if (project.assignedDeveloperId) {
      await db.collection('notifications').add({
        recipientId: project.assignedDeveloperId,
        recipientRole: 'developer',
        projectId: requirement.projectId,
        type: 'requirement_completed',
        title: action === 'approve' ? 'Requirement Approved' : 'Requirement Rejected',
        message: `Customer ${action === 'approve' ? 'approved' : 'rejected'} requirement: ${requirement.title}`,
        entityType: 'requirement',
        entityId: requirementId,
        read: false,
        createdAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: `Requirement ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      requirement: {
        ...requirement,
        ...updateData,
      },
    })
  } catch (error) {
    apiLogger.apiError('requirements/approve', 'Failed to process requirement', error)
    return NextResponse.json(
      { error: 'Failed to process requirement', details: getErrorMessage(error, 'Unknown error') },
      { status: 500 }
    )
  }
}
