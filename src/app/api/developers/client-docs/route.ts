import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { db } from '@/lib/firebase/admin'
import { isDeveloper, isAdmin } from '@/config/developers'

export const dynamic = 'force-dynamic'

/**
 * GET /api/developers/client-docs?clientId=xxx&status=completed
 * 
 * Fetches documents for a specific client and status.
 * Used for lazy loading completed/archived docs by client.
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { userId, decodedToken } = authResult

    // Check developer access
    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    const userIsAdmin = isAdmin(email)

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const status = searchParams.get('status')

    if (!clientId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing clientId or status parameter' },
        { status: 400 }
      )
    }

    if (!['completed', 'archived'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status must be completed or archived' },
        { status: 400 }
      )
    }

    // Fetch documents for this client and status
    // Non-admins only see docs assigned to them
    let docsQuery = db
      .collection('customerDocuments')
      .where('customerId', '==', clientId)
      .where('status', '==', status)

    if (!userIsAdmin) {
      docsQuery = docsQuery.where('assignedTo', '==', userId)
    }

    const docsSnapshot = await docsQuery
      .orderBy('approvedAt', 'desc')
      .limit(100) // Safety limit
      .get()

    // Get customer details once
    let customerData: any = null
    if (docsSnapshot.docs.length > 0) {
      const customerSnapshot = await db.collection('customers').doc(clientId).get()
      customerData = customerSnapshot.data()
      
      // Get credit balance from users collection
      const userSnapshot = await db.collection('users').doc(clientId).get()
      const userData = userSnapshot.data()
      if (customerData) {
        customerData.creditBalance = userData?.credits?.balance
      }
    }

    const documents = docsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        googleDocTitle: data.googleDocTitle || 'Untitled',
        googleDocUrl: data.googleDocUrl,
        status: data.status,
        approvedAt: data.approvedAt?.toDate?.() || data.approvedAt,
        completedAt: data.completedAt?.toDate?.() || data.completedAt,
        category: data.category,
        progressPercentage: data.progressPercentage,
        assignedTo: data.assignedTo,
        assignedToName: data.assignedToName,
        costCents: data.costCents || data.cost || 0, // Document cost in cents
        customer: customerData ? {
          uid: clientId,
          displayName: customerData.displayName || customerData.email,
          email: customerData.email,
          creditBalance: customerData.creditBalance
        } : null
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        clientId,
        documents
      }
    })

  } catch (error) {
    return serverError(error, 'Failed to fetch client documents')
  }
}
