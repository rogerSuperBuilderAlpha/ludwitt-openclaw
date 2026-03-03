/**
 * API Route: GET /api/developers/customers
 * 
 * Returns all customers with their stats for the developer dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

interface CustomerData {
  id: string
  email: string
  displayName: string
  photoURL?: string
  
  // Stats
  totalDocuments: number
  activeDocuments: number
  completedDocuments: number
  
  // Financial
  totalSpentCents: number
  creditBalanceCents: number
  
  // Activity
  lastActivityAt: string | null
  createdAt: string | null
  
  // Risk indicators
  hasOverdueDoc: boolean
  lowCreditBalance: boolean
  daysSinceActivity: number | null
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

    // Fetch customer documents — non-admins only see docs assigned to them
    const docsQuery = userIsAdmin
      ? db.collection('customerDocuments')
      : db.collection('customerDocuments').where('assignedTo', '==', userId)
    const docsSnapshot = await docsQuery.get()
    
    // Aggregate by customer
    const customerMap: Record<string, CustomerData> = {}
    const now = new Date()
    
    docsSnapshot.docs.forEach((doc) => {
      const data = doc.data()
      const customerId = data.customerId || data.userId
      if (!customerId) return
      
      // Initialize customer if not exists
      if (!customerMap[customerId]) {
        customerMap[customerId] = {
          id: customerId,
          email: data.customerEmail || data.customer?.email || '',
          displayName: data.customerDisplayName || data.customer?.displayName || 'Unknown',
          photoURL: data.customer?.photoURL,
          totalDocuments: 0,
          activeDocuments: 0,
          completedDocuments: 0,
          totalSpentCents: 0,
          creditBalanceCents: 0,
          lastActivityAt: null,
          createdAt: null,
          hasOverdueDoc: false,
          lowCreditBalance: false,
          daysSinceActivity: null,
        }
      }
      
      const customer = customerMap[customerId]
      customer.totalDocuments++
      
      const status = data.status || 'pending'
      if (status === 'completed') {
        customer.completedDocuments++
        if (data.customerCharge) {
          customer.totalSpentCents += data.customerCharge
        } else if (data.actualCostCents) {
          customer.totalSpentCents += data.actualCostCents * 3
        }
      } else if (status !== 'archived') {
        customer.activeDocuments++
        
        // Check for overdue
        if (data.dueDate) {
          const dueDate = data.dueDate.seconds 
            ? new Date(data.dueDate.seconds * 1000)
            : new Date(data.dueDate)
          if (dueDate < now) {
            customer.hasOverdueDoc = true
          }
        }
      }
      
      // Track last activity
      const updatedAt = data.updatedAt?.seconds 
        ? new Date(data.updatedAt.seconds * 1000).toISOString()
        : data.updatedAt
      
      if (updatedAt && (!customer.lastActivityAt || updatedAt > customer.lastActivityAt)) {
        customer.lastActivityAt = updatedAt
      }
      
      const createdAt = data.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000).toISOString()
        : data.createdAt
        
      if (createdAt && (!customer.createdAt || createdAt < customer.createdAt)) {
        customer.createdAt = createdAt
      }
    })
    
    // Fetch credit balances from users collection
    const customerIds = Object.keys(customerMap)
    if (customerIds.length > 0) {
      // Batch fetch in chunks of 10 (Firestore limit for 'in' queries)
      const chunks = []
      for (let i = 0; i < customerIds.length; i += 10) {
        chunks.push(customerIds.slice(i, i + 10))
      }
      
      for (const chunk of chunks) {
        try {
          const usersSnapshot = await db.collection('users')
            .where('__name__', 'in', chunk)
            .get()
          
          usersSnapshot.docs.forEach((doc) => {
            const userData = doc.data()
            if (customerMap[doc.id]) {
              customerMap[doc.id].creditBalanceCents = userData.creditBalanceCents || 0
              customerMap[doc.id].lowCreditBalance = (userData.creditBalanceCents || 0) < 500 // Less than $5
              
              // Update name/email if available
              if (userData.displayName) {
                customerMap[doc.id].displayName = userData.displayName
              }
              if (userData.email) {
                customerMap[doc.id].email = userData.email
              }
              if (userData.photoURL) {
                customerMap[doc.id].photoURL = userData.photoURL
              }
            }
          })
        } catch {
          // Ignore errors fetching user data
        }
      }
    }
    
    // Calculate days since activity
    const customers = Object.values(customerMap).map(c => {
      if (c.lastActivityAt) {
        const lastActivity = new Date(c.lastActivityAt)
        c.daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      }
      return c
    })
    
    // Sort by total documents desc
    customers.sort((a, b) => b.totalDocuments - a.totalDocuments)
    
    apiLogger.success('developers/customers', 'Fetched customer list', { 
      count: customers.length,
    })

    return successResponse({
      customers,
      total: customers.length,
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    apiLogger.apiError('developers/customers', 'Failed to fetch customers', error)
    return serverError(error, errorMessage)
  }
}
