import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

interface UpdateProjectRequest {
  projectId: string
  status?: string
  assignedDeveloperId?: string
  assignedDeveloperName?: string
  paymentStatus?: string
  paidAmount?: number
  notes?: string
  estimatedCompletionDate?: string
  actualCompletionDate?: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const body: UpdateProjectRequest = await request.json()

    if (!body.projectId) {
      return badRequestError('Missing projectId')
    }

    const projectRef = db.collection('projects').doc(body.projectId)
    const projectDoc = await projectRef.get()

    if (!projectDoc.exists) {
      return notFoundError('Project not found')
    }

    const projectData = projectDoc.data()

    // Check permissions: only customer, assigned developer, or admin can update
    const isCustomer = projectData?.customerId === decodedToken.uid
    const isAssignedDeveloper = projectData?.assignedDeveloperId === decodedToken.uid

    // Admin role check will use a dedicated roles collection — planned feature
    const isAdmin = false

    if (!isCustomer && !isAssignedDeveloper && !isAdmin) {
      return forbiddenError('Permission denied')
    }

    // Build update object
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    }

    if (body.status !== undefined) updateData.status = body.status
    if (body.assignedDeveloperId !== undefined) {
      updateData.assignedDeveloperId = body.assignedDeveloperId
      updateData.assignedDeveloperName = body.assignedDeveloperName || null
      updateData.assignedAt = new Date().toISOString()
    }
    if (body.paymentStatus !== undefined) updateData.paymentStatus = body.paymentStatus
    if (body.paidAmount !== undefined) updateData.paidAmount = body.paidAmount
    if (body.notes !== undefined) updateData.notes = body.notes
    if (body.estimatedCompletionDate !== undefined) updateData.estimatedCompletionDate = body.estimatedCompletionDate
    if (body.actualCompletionDate !== undefined) updateData.actualCompletionDate = body.actualCompletionDate

    // If status changes to 'in-progress' and startedAt doesn't exist, set it
    if (body.status === 'in-progress' && !projectData?.startedAt) {
      updateData.startedAt = new Date().toISOString()
    }

    await projectRef.update(updateData)

    apiLogger.success('projects/update', `Project updated: ${body.projectId}`)

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
    })
  } catch (error) {
    apiLogger.apiError('projects/update', 'Failed to update project', error)
    return serverError(error, 'Failed to update project')
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to update project' },
    { status: 405 }
  )
}
