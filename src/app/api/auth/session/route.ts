import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { idToken } = body

    if (!idToken) {
      return NextResponse.json(
        { success: false, error: 'Missing idToken' },
        { status: 400 }
      )
    }

    // Verify the token before setting the session cookie
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Auth service unavailable' },
        { status: 503 }
      )
    }
    try {
      await auth.verifyIdToken(idToken)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('__session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to set session' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('__session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
