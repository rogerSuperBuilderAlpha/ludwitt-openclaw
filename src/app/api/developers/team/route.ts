/**
 * API Route: GET /api/developers/team
 * 
 * Returns team member stats for the developer dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin, DEVELOPER_EMAILS, ADMIN_EMAILS } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface TeamMember {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'developer'
  
  // Stats
  activeDocuments: number
  completedThisWeek: number
  completedAllTime: number
  totalRevenue: number
  
  // Status
  isOnline?: boolean
  lastActive?: string
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { decodedToken } = authResult
    
    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    // Team stats are admin-only
    if (!isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied - admin only' },
        { status: 403 }
      )
    }

    // Get all developer emails from config
    const developerEmails = [...DEVELOPER_EMAILS, ...ADMIN_EMAILS]
    
    // Fetch all documents
    const docsSnapshot = await db.collection('customerDocuments').get()
    
    // Calculate stats per developer
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const devStats: Record<string, { 
      active: number
      completedWeek: number
      completedAll: number
      revenue: number
    }> = {}
    
    docsSnapshot.docs.forEach((doc) => {
      const data = doc.data()
      const assignedTo = data.assignedTo
      if (!assignedTo) return
      
      if (!devStats[assignedTo]) {
        devStats[assignedTo] = { active: 0, completedWeek: 0, completedAll: 0, revenue: 0 }
      }
      
      const status = data.status || 'pending'
      
      if (status === 'in-progress' || (data.assignedTo && status !== 'completed' && status !== 'archived')) {
        devStats[assignedTo].active++
      }
      
      if (status === 'completed') {
        devStats[assignedTo].completedAll++
        
        const costCents = data.customerCharge || (data.actualCostCents || 0) * 3
        devStats[assignedTo].revenue += costCents
        
        const completedAt = data.approvedAt?.seconds 
          ? new Date(data.approvedAt.seconds * 1000)
          : data.completedAt?.seconds
            ? new Date(data.completedAt.seconds * 1000)
            : null
            
        if (completedAt && completedAt >= weekAgo) {
          devStats[assignedTo].completedWeek++
        }
      }
    })
    
    // Fetch user documents to get display names and photos
    const userDocs: Record<string, { displayName?: string; photoURL?: string; email?: string }> = {}
    
    // Get unique user IDs from devStats
    const userIds = Object.keys(devStats)
    
    if (userIds.length > 0) {
      // Batch in chunks of 10
      for (let i = 0; i < userIds.length; i += 10) {
        const chunk = userIds.slice(i, i + 10)
        try {
          const usersSnapshot = await db.collection('users')
            .where('__name__', 'in', chunk)
            .get()
          
          usersSnapshot.docs.forEach((doc) => {
            userDocs[doc.id] = {
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              email: doc.data().email,
            }
          })
        } catch {
          // Ignore errors
        }
      }
    }
    
    // Build team member list
    const teamMembers: TeamMember[] = []
    
    // Add known developers
    for (const devEmail of developerEmails) {
      // Find userId for this email
      let userId: string | null = null
      let userData = { displayName: devEmail.split('@')[0], photoURL: undefined as string | undefined }
      
      // Check if we have stats for any user with this email
      for (const [uid, data] of Object.entries(userDocs)) {
        if (data.email === devEmail) {
          userId = uid
          userData = { displayName: data.displayName || devEmail.split('@')[0], photoURL: data.photoURL }
          break
        }
      }
      
      const stats = userId ? devStats[userId] : { active: 0, completedWeek: 0, completedAll: 0, revenue: 0 }
      
      teamMembers.push({
        id: userId || devEmail,
        email: devEmail,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        role: (ADMIN_EMAILS as readonly string[]).includes(devEmail) ? 'admin' : 'developer',
        activeDocuments: stats.active,
        completedThisWeek: stats.completedWeek,
        completedAllTime: stats.completedAll,
        totalRevenue: stats.revenue,
      })
    }
    
    // Sort by completed all time (desc)
    teamMembers.sort((a, b) => b.completedAllTime - a.completedAllTime)
    
    apiLogger.success('developers/team', 'Fetched team data', { 
      count: teamMembers.length,
    })

    return successResponse({
      members: teamMembers,
      total: teamMembers.length,
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.apiError('developers/team', 'Failed to fetch team', error)
    return serverError(error, errorMessage)
  }
}
