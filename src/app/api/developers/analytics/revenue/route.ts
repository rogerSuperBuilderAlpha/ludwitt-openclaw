/**
 * API Route: GET /api/developers/analytics/revenue
 *
 * Returns revenue analytics data for the developer dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface DailyRevenue {
  date: string
  computeCost: number
  customerCharge: number
  count: number
}

interface CustomerRevenue {
  customerId: string
  customerName: string
  totalCharge: number
  documentCount: number
}

interface CategoryRevenue {
  category: string
  totalCharge: number
  count: number
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

    // Revenue data is admin-only
    if (!isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied - admin only' },
        { status: 403 }
      )
    }

    // Get period from query params (default: 30 days)
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30'
    const days = parseInt(period) || 30

    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    // Fetch completed documents
    const docsSnapshot = await db
      .collection('customerDocuments')
      .where('status', '==', 'completed')
      .get()

    const dailyMap: Record<string, DailyRevenue> = {}
    const customerMap: Record<string, CustomerRevenue> = {}
    const categoryMap: Record<string, CategoryRevenue> = {}

    let totalComputeCost = 0
    let totalCustomerCharge = 0
    let totalDocuments = 0

    // Initialize daily buckets
    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateKey = date.toISOString().split('T')[0]
      dailyMap[dateKey] = {
        date: dateKey,
        computeCost: 0,
        customerCharge: 0,
        count: 0,
      }
    }

    docsSnapshot.docs.forEach((doc) => {
      const data = doc.data()

      if (!data.actualCostCents || data.actualCostCents <= 0) return

      const completedAt = data.completedAt
      let completedDate: Date | null = null

      if (completedAt) {
        if (typeof completedAt === 'string') {
          completedDate = new Date(completedAt)
        } else if (completedAt.seconds) {
          completedDate = new Date(completedAt.seconds * 1000)
        } else if (completedAt._seconds) {
          completedDate = new Date(completedAt._seconds * 1000)
        }
      }

      if (!completedDate || completedDate < startDate) return

      const costCents = data.actualCostCents || 0
      const chargeCents = data.customerCharge || costCents * 3

      totalComputeCost += costCents
      totalCustomerCharge += chargeCents
      totalDocuments++

      // Daily aggregation
      const dateKey = completedDate.toISOString().split('T')[0]
      if (dailyMap[dateKey]) {
        dailyMap[dateKey].computeCost += costCents
        dailyMap[dateKey].customerCharge += chargeCents
        dailyMap[dateKey].count++
      }

      // Customer aggregation
      const customerId = data.customerId || 'unknown'
      const customerName = data.customerDisplayName || customerId
      if (!customerMap[customerId]) {
        customerMap[customerId] = {
          customerId,
          customerName,
          totalCharge: 0,
          documentCount: 0,
        }
      }
      customerMap[customerId].totalCharge += chargeCents
      customerMap[customerId].documentCount++

      // Category aggregation
      const category = data.category || 'Uncategorized'
      if (!categoryMap[category]) {
        categoryMap[category] = {
          category,
          totalCharge: 0,
          count: 0,
        }
      }
      categoryMap[category].totalCharge += chargeCents
      categoryMap[category].count++
    })

    // Convert to arrays and sort
    const dailyRevenue = Object.values(dailyMap)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({
        ...d,
        computeCost: d.computeCost / 100, // Convert to dollars
        customerCharge: d.customerCharge / 100,
      }))

    const byCustomer = Object.values(customerMap)
      .sort((a, b) => b.totalCharge - a.totalCharge)
      .slice(0, 10)
      .map((c) => ({
        ...c,
        totalCharge: c.totalCharge / 100,
      }))

    const byCategory = Object.values(categoryMap)
      .sort((a, b) => b.totalCharge - a.totalCharge)
      .map((c) => ({
        ...c,
        totalCharge: c.totalCharge / 100,
      }))

    const response = {
      period: days,
      summary: {
        totalComputeCost: totalComputeCost / 100,
        totalCustomerCharge: totalCustomerCharge / 100,
        totalDocuments,
        averagePerDocument:
          totalDocuments > 0 ? totalCustomerCharge / 100 / totalDocuments : 0,
      },
      dailyRevenue,
      byCustomer,
      byCategory,
    }

    apiLogger.success(
      'developers/analytics/revenue',
      'Revenue data retrieved',
      {
        period: days,
        totalDocuments,
      }
    )

    return successResponse(response)
  } catch (error: unknown) {
    apiLogger.apiError(
      'developers/analytics/revenue',
      'Failed to get revenue data',
      error
    )
    return serverError(error, 'Failed to retrieve revenue data')
  }
}
