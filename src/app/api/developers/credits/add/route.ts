/**
 * Manual Credit Addition API
 * 
 * Allows admins to manually add credits to a customer's account.
 * Use case: Customer paid via check, cash, or other non-Stripe method.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { successResponse } from '@/lib/api/response-helpers'
import { serverError } from '@/lib/api/error-responses'
import { isAdmin } from '@/config/developers'
import { addCredits } from '@/lib/credits/balance'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

interface AddCreditsRequest {
  customerId: string
  amountDollars: number
  reason: string
  paymentMethod?: string
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    // Only admins can manually add credits
    if (!isAdmin(decodedToken.email)) {
      return NextResponse.json(
        { success: false, error: 'Only admins can manually add credits' },
        { status: 403 }
      )
    }

    // Parse request
    const body: AddCreditsRequest = await request.json()
    const { customerId, amountDollars, reason, paymentMethod } = body

    // Validate
    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'Customer ID is required' },
        { status: 400 }
      )
    }

    if (!amountDollars || amountDollars <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    if (amountDollars > 10000) {
      return NextResponse.json(
        { success: false, error: 'Amount cannot exceed $10,000' },
        { status: 400 }
      )
    }

    if (!reason || reason.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Reason is required (min 3 characters)' },
        { status: 400 }
      )
    }

    // Verify customer exists
    const customerDoc = await db.collection('users').doc(customerId).get()
    if (!customerDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Convert to cents
    const amountCents = Math.round(amountDollars * 100)

    // Add credits
    const { newBalance, transaction } = await addCredits(customerId, amountCents, {
      stripePaymentIntentId: `manual_${Date.now()}_${userId.slice(0, 8)}`,
      stripeCustomerId: undefined,
      source: 'manual_admin',
      addedBy: userId,
      addedByEmail: decodedToken.email || 'unknown',
      reason: reason.trim(),
      paymentMethod: paymentMethod || 'other',
    } as any)

    // Get customer info for response
    const customerData = customerDoc.data()

    return successResponse({
      customerId,
      customerEmail: customerData?.email,
      customerName: customerData?.displayName || customerData?.email,
      amountAdded: amountCents,
      newBalance,
      transactionId: transaction.id,
    })
  } catch (error) {
    return serverError(error, 'Failed to add credits')
  }
}
