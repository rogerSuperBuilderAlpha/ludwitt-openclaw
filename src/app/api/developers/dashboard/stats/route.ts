/**
 * API Route: GET /api/developers/dashboard/stats
 *
 * Returns aggregate statistics for the developer dashboard including:
 * - Document counts by status
 * - Total compute costs
 * - Customer billing totals
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { AggregateField } from '@google-cloud/firestore'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface DashboardStats {
  // Document counts
  totalDocuments: number
  availableCount: number
  inProgressCount: number
  completedCount: number
  archivedCount: number

  // Compute costs (in cents)
  totalComputeCostCents: number
  totalCustomerChargeCents: number

  // Formatted for display
  totalComputeCost: string
  totalCustomerCharge: string

  // Weekly stats
  completedThisWeek: number

  // Per-document breakdown of costs
  documentCosts: {
    id: string
    title: string
    customer: string
    computeCostCents: number
    customerChargeCents: number
    completedAt?: string
  }[]
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    // Check if user is a developer or admin
    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied - developers only' },
        { status: 403 }
      )
    }

    const userIsAdmin = isAdmin(email)
    const documentsRef = db.collection('customerDocuments')
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneWeekAgoISO = oneWeekAgo.toISOString()

    // For non-admins, scope all queries to their assigned documents
    const scopedRef = userIsAdmin
      ? documentsRef
      : documentsRef.where('assignedTo', '==', userId)
    const completedRef = scopedRef.where('status', '==', 'completed')

    // Run ALL count/aggregation queries in a single parallel batch
    const [
      totalCountResult,
      completedCountResult,
      archivedCountResult,
      costSumResult,
      inProgressCountResult,
      assignedApprovedResult,
      assignedPendingResult,
      totalApprovedResult,
      totalPendingResult,
      completedThisWeekResult,
    ] = await Promise.all([
      scopedRef.count().get(),
      completedRef.count().get(),
      scopedRef.where('status', '==', 'archived').count().get(),
      completedRef
        .aggregate({
          totalCost: AggregateField.sum('actualCostCents'),
          totalCharge: AggregateField.sum('customerCharge'),
        })
        .get(),
      scopedRef.where('status', '==', 'in-progress').count().get(),
      // Assigned approved/pending count as in-progress
      scopedRef
        .where('status', '==', 'approved')
        .where('assignedDeveloperId', '!=', '')
        .count()
        .get(),
      scopedRef
        .where('status', '==', 'pending')
        .where('assignedDeveloperId', '!=', '')
        .count()
        .get(),
      // Total approved/pending — available = total - assigned (handles absent field)
      scopedRef.where('status', '==', 'approved').count().get(),
      scopedRef.where('status', '==', 'pending').count().get(),
      // Server-side count for weekly completions (avoids scanning 200 docs)
      completedRef.where('completedAt', '>=', oneWeekAgoISO).count().get(),
    ])

    const totalDocuments = totalCountResult.data().count
    const completedCount = completedCountResult.data().count
    const archivedCount = archivedCountResult.data().count
    const costAgg = costSumResult.data()
    const totalComputeCostCents = costAgg.totalCost ?? 0
    let totalCustomerChargeCents = costAgg.totalCharge ?? 0

    const totalApproved = totalApprovedResult.data().count
    const totalPending = totalPendingResult.data().count
    const assignedApproved = assignedApprovedResult.data().count
    const assignedPending = assignedPendingResult.data().count

    const availableCount =
      totalApproved - assignedApproved + (totalPending - assignedPending)
    const inProgressCount =
      inProgressCountResult.data().count + assignedApproved + assignedPending
    const completedThisWeek = completedThisWeekResult.data().count

    // Fetch recent completed documents ONLY for the cost detail list (bounded to 50).
    // Counts and totals come from aggregation above — no need for a large doc scan.
    const completedSnapshot = await completedRef
      .orderBy('completedAt', 'desc')
      .limit(50)
      .get()

    const documentCosts: DashboardStats['documentCosts'] = []
    let detailChargeCents = 0

    completedSnapshot.docs.forEach((doc) => {
      const data = doc.data()

      if (data.actualCostCents && data.actualCostCents > 0) {
        const customerCharge = data.customerCharge || data.actualCostCents * 3
        detailChargeCents += customerCharge

        documentCosts.push({
          id: doc.id,
          title: data.googleDocTitle || 'Untitled',
          customer: data.customerDisplayName || data.customerId || 'Unknown',
          computeCostCents: data.actualCostCents,
          customerChargeCents: customerCharge,
          completedAt: data.completedAt,
        })
      }
    })

    // If the aggregation returned 0 for customerCharge (field may not exist on all docs),
    // fall back to the computed value from the detail list
    if (totalCustomerChargeCents === 0 && detailChargeCents > 0) {
      totalCustomerChargeCents = detailChargeCents
    }

    const stats: DashboardStats = {
      totalDocuments,
      availableCount,
      inProgressCount,
      completedCount,
      archivedCount,
      totalComputeCostCents,
      totalCustomerChargeCents,
      totalComputeCost: `$${(totalComputeCostCents / 100).toFixed(2)}`,
      totalCustomerCharge: `$${(totalCustomerChargeCents / 100).toFixed(2)}`,
      completedThisWeek,
      documentCosts,
    }

    apiLogger.success(
      'developers/dashboard/stats',
      'Dashboard stats retrieved',
      {
        totalDocuments: stats.totalDocuments,
        totalComputeCost: stats.totalComputeCost,
      }
    )

    return successResponse(stats)
  } catch (error: unknown) {
    apiLogger.apiError(
      'developers/dashboard/stats',
      'Failed to get dashboard stats',
      error
    )
    return serverError(error, 'Failed to retrieve dashboard statistics')
  }
}
