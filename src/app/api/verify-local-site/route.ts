import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const body = await request.json()
    const { userId, verificationCode, timestamp } = body

    // Validate required fields
    if (!userId || !verificationCode || !timestamp) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure the authenticated user matches the userId being verified
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Cannot verify another user' },
        { status: 403 }
      )
    }

    // Verify the verification code matches the expected format
    const expectedCode = `PITCH-LOCAL-${userId.slice(0, 8).toUpperCase()}`
    if (verificationCode !== expectedCode) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Check if timestamp is recent (within last 5 minutes)
    const now = Date.now()
    const timeDiff = now - timestamp
    if (timeDiff > 300000 || timeDiff < 0) {
      return NextResponse.json(
        { success: false, error: 'Timestamp expired or invalid' },
        { status: 400 }
      )
    }

    // Update user's verification status in Firestore
    await db.collection('localSiteVerifications').doc(userId).set({
      verified: true,
      verificationCode,
      timestamp,
      verifiedAt: new Date().toISOString(),
    })

    // Also update their personal website progress to mark verification steps as complete
    const progressRef = db.collection('personalWebsiteProgress').doc(userId)
    const progressDoc = await progressRef.get()
    const currentProgress = progressDoc.exists ? progressDoc.data()?.checkedSteps || {} : {}

    // Mark steps 1-14 as complete (up through verification)
    const updatedProgress = { ...currentProgress }
    for (let i = 1; i <= 14; i++) {
      updatedProgress[`step${i}`] = true
    }

    await progressRef.set({
      checkedSteps: updatedProgress,
      localSiteVerified: true,
      updatedAt: new Date().toISOString(),
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Local site verified successfully!',
      verified: true,
    })
  } catch (error) {
    apiLogger.apiError('verify-local-site', 'Failed to verify local site', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to verify local site' },
    { status: 405 }
  )
}

