import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    const integrationDoc = await db.collection('calendarIntegrations').doc(userId).get()

    if (!integrationDoc.exists) {
      return NextResponse.json({ connected: false })
    }

    const integration = integrationDoc.data()!

    return NextResponse.json({
      connected: true,
      email: integration.email,
    })
  } catch (error) {
    return serverError(error, 'Failed to check calendar status')
  }
}
