import { NextRequest, NextResponse } from 'next/server'
import { db, auth } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

interface CreateProjectRequest {
  title: string
  description: string
  type: 'website' | 'app' | 'design' | 'consulting' | 'custom'
  totalCost: number
  estimatedCompletionDate?: string
  developerId?: string  // MULTI-DEVELOPER: Optional developer assignment
  milestones?: {
    title: string
    description: string
    dueDate: string
  }[]
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    // Get user info
    const userRecord = await auth!.getUser(decodedToken.uid)
    const body: CreateProjectRequest = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.type || !body.totalCost) {
      return badRequestError('Missing required fields')
    }

    // MULTI-DEVELOPER: Validate developer if provided
    let developerProfile: any = null
    if (body.developerId) {
      const devDoc = await db.collection('developerProfiles').doc(body.developerId).get()
      if (!devDoc.exists) {
        return notFoundError('Developer not found')
      }
      developerProfile = devDoc.data()
      if (!developerProfile?.isActive) {
        return badRequestError('Developer is not active')
      }
    }

    // Create project
    const projectRef = db.collection('projects').doc()
    const now = new Date().toISOString()

    const project: any = {
      id: projectRef.id,
      customerId: decodedToken.uid,
      customerName: userRecord.displayName || userRecord.email || 'Unknown',
      customerEmail: userRecord.email || '',

      title: body.title,
      description: body.description,
      type: body.type,
      status: 'intake',

      totalCost: body.totalCost,
      currency: 'usd',
      paymentStatus: 'pending',
      paidAmount: 0,

      estimatedCompletionDate: body.estimatedCompletionDate || null,
      createdAt: now,
      updatedAt: now,

      milestones: body.milestones?.map((m, index) => ({
        id: `${projectRef.id}_milestone_${index}`,
        title: m.title,
        description: m.description,
        dueDate: m.dueDate,
        status: 'pending',
        order: index,
      })) || [],

      tags: [],

      // MULTI-DEVELOPER: Assignment fields
      assignedDeveloperId: body.developerId || null,
      assignedDeveloperEmail: developerProfile?.email || null,
      assignedDeveloperName: developerProfile?.displayName || null,
      assignedBy: body.developerId ? 'auto' : null,
      assignedAt: body.developerId ? now : null,
      assignedByUserId: null,
      assignedByUserEmail: null,
      submittedVia: body.developerId ? 'developer-specific' : 'general',
      submittedViaDeveloperId: body.developerId || null,
      submittedViaDeveloperName: developerProfile?.displayName || null,
      isVisibleToDeveloper: !!body.developerId,
      assignmentHistory: [],
    }

    await projectRef.set(project)

    // Add customer to customers collection if not exists
    const customerRef = db.collection('customers').doc(decodedToken.uid)
    const customerDoc = await customerRef.get()

    if (!customerDoc.exists) {
      await customerRef.set({
        id: decodedToken.uid,
        name: userRecord.displayName || userRecord.email || 'Unknown',
        email: userRecord.email || '',
        createdAt: now,
        updatedAt: now,
      })
    }

    apiLogger.success('projects/create', `Project created: ${projectRef.id} for customer ${decodedToken.uid}`)

    // MULTI-DEVELOPER: Create notification if auto-assigned
    if (body.developerId && developerProfile) {
      try {
        await db.collection('developerNotifications').add({
          developerId: body.developerId,
          type: 'new_assignment',
          title: 'New project assigned',
          message: `A new project has been submitted directly to you: ${body.title}`,
          relatedItemType: 'project',
          relatedItemId: projectRef.id,
          isRead: false,
          createdAt: now,
          actionUrl: `/dashboard?tab=developer&project=${projectRef.id}`,
          metadata: {
            customerName: userRecord.displayName || userRecord.email,
            submittedVia: 'developer-specific',
            projectType: body.type,
            totalCost: body.totalCost
          }
        })
        apiLogger.success('projects/create', `Developer notification created for ${body.developerId}`)
      } catch (notifError) {
        apiLogger.apiError('projects/create', 'Failed to create developer notification', notifError)
        // Don't fail the creation if notification fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        project,
        message: body.developerId
          ? 'Project created and assigned to developer successfully'
          : 'Project created successfully'
      }
    })
  } catch (error) {
    apiLogger.apiError('projects/create', 'Failed to create project', error)
    return serverError(error, 'Failed to create project')
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to create project' },
    { status: 405 }
  )
}
