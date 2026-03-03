/**
 * Project Assignment API
 * Assign or unassign developers to projects
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    // Parse request body first to get projectId
    const { projectId, developerId, action = 'assign' } = await request.json()

    if (!projectId) {
      return badRequestError('projectId is required')
    }

    if ((action === 'assign' || action === 'remove') && !developerId) {
      return badRequestError('developerId is required for assignment or removal')
    }

    // Parallelize: check user permissions and get project at the same time
    const projectRef = db.collection('projects').doc(projectId)
    const [userDoc, projectDoc] = await Promise.all([
      db.collection('users').doc(decodedToken.uid).get(),
      projectRef.get()
    ])
    
    const userData = userDoc.data()
    if (!userData || (userData.role !== 'admin' && userData.role !== 'developer')) {
      return forbiddenError('Only admins and developers can assign projects')
    }

    if (!projectDoc.exists) {
      return notFoundError('Project not found')
    }

    const project = projectDoc.data()!

    if (action === 'assign') {
      // Get developer info
      const developerDoc = await db.collection('users').doc(developerId).get()

      if (!developerDoc.exists) {
        return notFoundError('Developer not found')
      }

      const developer = developerDoc.data()!

      if (developer.role !== 'developer' && developer.role !== 'admin') {
        return badRequestError('User is not a developer')
      }

      // Get current assigned developers
      const currentDeveloperIds = project.assignedDeveloperIds || []
      const currentDevelopers = project.assignedDevelopers || []

      // Check if developer is already assigned
      if (currentDeveloperIds.includes(developerId)) {
        return badRequestError('Developer is already assigned to this project')
      }

      // Add developer to arrays
      const newDeveloperIds = [...currentDeveloperIds, developerId]
      const newDevelopers = [
        ...currentDevelopers,
        {
          id: developerId,
          name: developer.displayName || developer.email,
          email: developer.email || '',
        }
      ]

      // Update project with new developer
      // Keep legacy fields for backward compatibility (set to first developer)
      const updateData: any = {
        assignedDeveloperIds: newDeveloperIds,
        assignedDevelopers: newDevelopers,
        assignedAt: new Date().toISOString(),
        status: project.status === 'intake' ? 'discovery' : project.status,
        updatedAt: new Date().toISOString(),
      }

      // Set legacy fields for backward compatibility (use first developer)
      if (newDeveloperIds.length === 1) {
        updateData.assignedDeveloperId = developerId
        updateData.assignedDeveloperName = developer.displayName || developer.email
      }

      await projectRef.update(updateData)

      // Create notification for developer
      await db.collection('notifications').add({
        recipientId: developerId,
        recipientRole: 'developer',
        projectId,
        type: 'project_completed',
        title: 'New Project Assigned',
        message: `You have been assigned to project: ${project.title}`,
        entityType: 'project',
        entityId: projectId,
        read: false,
        createdAt: new Date().toISOString(),
      })

      // Create notification for customer
      await db.collection('notifications').add({
        recipientId: project.customerId,
        recipientRole: 'customer',
        projectId,
        type: 'status_changed',
        title: 'Developer Assigned',
        message: `${developer.displayName || developer.email} has been assigned to your project`,
        entityType: 'project',
        entityId: projectId,
        read: false,
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Developer assigned successfully',
        project: {
          ...project,
          assignedDeveloperIds: newDeveloperIds,
          assignedDevelopers: newDevelopers,
        },
      })
    } else if (action === 'remove') {
      // Remove a specific developer from the project
      const currentDeveloperIds = project.assignedDeveloperIds || []
      const currentDevelopers = project.assignedDevelopers || []

      // Check if developer is assigned
      if (!currentDeveloperIds.includes(developerId)) {
        return badRequestError('Developer is not assigned to this project')
      }

      // Remove developer from arrays
      const newDeveloperIds = currentDeveloperIds.filter((id: string) => id !== developerId)
      const newDevelopers = currentDevelopers.filter((dev: any) => dev.id !== developerId)

      // Update project
      const updateData: any = {
        assignedDeveloperIds: newDeveloperIds,
        assignedDevelopers: newDevelopers,
        updatedAt: new Date().toISOString(),
      }

      // Update legacy fields
      if (newDeveloperIds.length === 0) {
        // No developers left
        updateData.assignedDeveloperId = null
        updateData.assignedDeveloperName = null
        updateData.assignedAt = null
      } else if (newDeveloperIds.length === 1) {
        // One developer left, update legacy fields
        updateData.assignedDeveloperId = newDevelopers[0].id
        updateData.assignedDeveloperName = newDevelopers[0].name
      }

      await projectRef.update(updateData)

      // Get developer name for notification
      let developerName = 'Developer'
      const removedDev = currentDevelopers.find((dev: any) => dev.id === developerId)
      if (removedDev) {
        developerName = removedDev.name
      }

      // Notify customer
      await db.collection('notifications').add({
        recipientId: project.customerId,
        recipientRole: 'customer',
        projectId,
        type: 'status_changed',
        title: 'Developer Removed',
        message: `${developerName} has been removed from your project`,
        entityType: 'project',
        entityId: projectId,
        read: false,
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Developer removed successfully',
        project: {
          ...project,
          assignedDeveloperIds: newDeveloperIds,
          assignedDevelopers: newDevelopers,
        },
      })
    } else if (action === 'unassign') {
      // Unassign ALL developers from project
      await projectRef.update({
        assignedDeveloperId: null,
        assignedDeveloperName: null,
        assignedDeveloperIds: [],
        assignedDevelopers: [],
        assignedAt: null,
        updatedAt: new Date().toISOString(),
      })

      // Notify customer
      await db.collection('notifications').add({
        recipientId: project.customerId,
        recipientRole: 'customer',
        projectId,
        type: 'status_changed',
        title: 'All Developers Unassigned',
        message: `All developers have been unassigned from your project`,
        entityType: 'project',
        entityId: projectId,
        read: false,
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'All developers unassigned successfully',
      })
    } else {
      return badRequestError('Invalid action. Use "assign", "remove", or "unassign"')
    }
  } catch (error) {
    apiLogger.apiError('projects/assign', 'Failed to assign project', error)
    return serverError(error, 'Failed to assign project')
  }
}
