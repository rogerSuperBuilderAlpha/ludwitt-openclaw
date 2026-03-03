/**
 * Assignment API
 * POST - Assign or reassign work to a developer (admin only)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { isAdminEmail } from '@/config/auth'
import { assignWork } from '@/lib/api/developers/assignment'
import { AssignmentRequest } from '@/lib/types/assignment'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

/**
 * POST /api/developers/assign
 * Assign or reassign work to a developer
 * Admin only
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await authenticateRequest(req)
    if (authResult instanceof NextResponse) return authResult

    // Require admin role
    if (!isAdminEmail(authResult.decodedToken.email)) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body: AssignmentRequest = await req.json()

    // Validate request
    if (!body.itemType || !body.itemId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: itemType, itemId' },
        { status: 400 }
      )
    }

    if (!['project', 'document'].includes(body.itemType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid itemType. Must be "project" or "document"' },
        { status: 400 }
      )
    }

    // Perform assignment
    const result = await assignWork({
      itemType: body.itemType,
      itemId: body.itemId,
      developerId: body.developerId,
      assignedBy: authResult.userId,
      reason: body.reason
    })

    return NextResponse.json({
      success: true,
      assignment: result
    })
  } catch (error) {
    apiLogger.apiError('developers/assign', 'Failed to assign work', error)
    return NextResponse.json(
      { success: false, error: getErrorMessage(error, 'Failed to assign work') },
      { status: 500 }
    )
  }
}

