import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { unauthorizedError, badRequestError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return unauthorizedError('Unauthorized')
    }
    const decodedToken = authResult.decodedToken

    const body = await request.json()
    const { vercelUrl } = body
    const userId = decodedToken.uid

    // Validate Vercel URL
    if (!vercelUrl || typeof vercelUrl !== 'string') {
      return badRequestError('Vercel URL is required')
    }

    // Normalize the URL
    let normalizedUrl = vercelUrl.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    // Validate URL format
    try {
      const url = new URL(normalizedUrl)
      // Must be vercel.app domain or custom domain
      const isVercelDomain = url.hostname.endsWith('.vercel.app')
      const isCustomDomain = !url.hostname.includes('localhost') &&
                             !url.hostname.includes('127.0.0.1') &&
                             url.hostname.includes('.')

      if (!isVercelDomain && !isCustomDomain) {
        return badRequestError('Please provide a valid Vercel deployment URL (e.g., yoursite.vercel.app)')
      }
    } catch {
      return badRequestError('Invalid URL format')
    }

    // Try to fetch the Vercel site to verify it's live
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(normalizedUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'PitchRise-Verifier/1.0'
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return badRequestError(`Site returned status ${response.status}. Please make sure your site is deployed and accessible.`)
      }
    } catch (error) {
      return badRequestError(`Could not reach your Vercel site: ${getErrorMessage(error, 'Unknown error')}. Please verify the URL is correct and the site is deployed.`)
    }

    // Mark Vercel deployment as complete
    await db.collection('vercelDeploymentProgress').doc(userId).set(
      {
        completed: true,
        vercelUrl: normalizedUrl,
        verifiedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    // Also update users collection
    await db.collection('users').doc(userId).set(
      {
        vercelDeploymentComplete: true,
        vercelUrl: normalizedUrl,
        vercelVerifiedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Vercel deployment verified successfully!',
      vercelUrl: normalizedUrl,
    })
  } catch (error) {
    apiLogger.apiError('verify-vercel', 'Failed to verify Vercel deployment', error)
    return serverError(error, 'Failed to verify Vercel deployment')
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to verify Vercel deployment' },
    { status: 405 }
  )
}
