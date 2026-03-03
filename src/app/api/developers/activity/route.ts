/**
 * API Route: GET /api/developers/activity
 * 
 * Returns recent activity across all documents
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface ActivityItem {
  id: string
  type: 'document_created' | 'document_claimed' | 'document_completed' | 'document_approved' | 'comment_added'
  documentId: string
  documentTitle: string
  actorName: string
  actorEmail?: string
  timestamp: string
  details?: string
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    const userIsAdmin = isAdmin(email)

    // Get limit from query params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    // Fetch recent documents — non-admins only see docs assigned to them
    let docsQuery = db.collection('customerDocuments') as FirebaseFirestore.Query
    if (!userIsAdmin) {
      docsQuery = docsQuery.where('assignedTo', '==', userId)
    }
    const docsSnapshot = await docsQuery
      .orderBy('updatedAt', 'desc')
      .limit(100) // Fetch more to filter
      .get()
    
    const activities: ActivityItem[] = []
    
    docsSnapshot.docs.forEach((doc) => {
      const data = doc.data()
      const documentId = doc.id
      const documentTitle = data.googleDocTitle || data.title || 'Untitled'
      
      // Document created
      if (data.createdAt) {
        const timestamp = data.createdAt?.seconds 
          ? new Date(data.createdAt.seconds * 1000).toISOString()
          : typeof data.createdAt === 'string' ? data.createdAt : null
          
        if (timestamp) {
          activities.push({
            id: `${documentId}-created`,
            type: 'document_created',
            documentId,
            documentTitle,
            actorName: data.customerDisplayName || data.customer?.displayName || 'A customer',
            actorEmail: data.customerEmail || data.customer?.email,
            timestamp,
            details: 'submitted a new document',
          })
        }
      }
      
      // Document claimed/assigned
      if (data.claimedAt || data.assignedAt) {
        const claimTime = data.claimedAt || data.assignedAt
        const timestamp = claimTime?.seconds 
          ? new Date(claimTime.seconds * 1000).toISOString()
          : typeof claimTime === 'string' ? claimTime : null
          
        if (timestamp) {
          activities.push({
            id: `${documentId}-claimed`,
            type: 'document_claimed',
            documentId,
            documentTitle,
            actorName: data.assignedToName || 'A developer',
            actorEmail: data.assignedToEmail,
            timestamp,
            details: 'claimed',
          })
        }
      }
      
      // Document completed
      if (data.status === 'completed' && (data.completedAt || data.approvedAt)) {
        const completeTime = data.completedAt || data.approvedAt
        const timestamp = completeTime?.seconds 
          ? new Date(completeTime.seconds * 1000).toISOString()
          : typeof completeTime === 'string' ? completeTime : null
          
        if (timestamp) {
          activities.push({
            id: `${documentId}-completed`,
            type: 'document_completed',
            documentId,
            documentTitle,
            actorName: data.assignedToName || 'A developer',
            actorEmail: data.assignedToEmail,
            timestamp,
            details: 'completed',
          })
        }
      }
      
      // Document approved (by customer)
      if (data.status === 'approved' && data.approvedAt) {
        const timestamp = data.approvedAt?.seconds 
          ? new Date(data.approvedAt.seconds * 1000).toISOString()
          : typeof data.approvedAt === 'string' ? data.approvedAt : null
          
        if (timestamp) {
          activities.push({
            id: `${documentId}-approved`,
            type: 'document_approved',
            documentId,
            documentTitle,
            actorName: data.customerDisplayName || data.customer?.displayName || 'A customer',
            actorEmail: data.customerEmail || data.customer?.email,
            timestamp,
            details: 'approved for work',
          })
        }
      }
    })
    
    // Sort by timestamp descending and limit
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    const limitedActivities = activities.slice(0, limit)
    
    apiLogger.success('developers/activity', 'Fetched activity feed', { 
      count: limitedActivities.length,
    })

    return successResponse({
      activities: limitedActivities,
      total: limitedActivities.length,
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.apiError('developers/activity', 'Failed to fetch activity', error)
    return serverError(error, errorMessage)
  }
}
