/**
 * Next.js Middleware
 *
 * This middleware runs on every request to:
 * 1. Enforce CORS on API routes
 * 2. Detect AI crawler visits and log them for analytics
 * 3. Protect authenticated routes
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// AI crawler patterns to detect
const AI_CRAWLER_PATTERNS: Record<string, { name: string; company: string }> = {
  GPTBot: { name: 'OpenAI GPTBot', company: 'OpenAI' },
  'ChatGPT-User': { name: 'ChatGPT User', company: 'OpenAI' },
  'OAI-SearchBot': { name: 'OpenAI Search', company: 'OpenAI' },
  ClaudeBot: { name: 'Anthropic Claude', company: 'Anthropic' },
  'Claude-Web': { name: 'Claude Web', company: 'Anthropic' },
  'anthropic-ai': { name: 'Anthropic AI', company: 'Anthropic' },
  PerplexityBot: { name: 'Perplexity AI', company: 'Perplexity' },
  'Google-Extended': { name: 'Google Gemini', company: 'Google' },
  Amazonbot: { name: 'Amazon Alexa', company: 'Amazon' },
  Applebot: { name: 'Apple Siri', company: 'Apple' },
  'meta-externalagent': { name: 'Meta External', company: 'Meta' },
  YouBot: { name: 'You.com', company: 'You.com' },
  'cohere-ai': { name: 'Cohere AI', company: 'Cohere' },
  BraveBot: { name: 'Brave Search', company: 'Brave' },
}

/**
 * Detect AI crawler from user agent
 */
function detectAICrawler(
  userAgent: string
): { name: string; company: string } | null {
  for (const [pattern, info] of Object.entries(AI_CRAWLER_PATTERNS)) {
    if (userAgent.includes(pattern)) {
      return info
    }
  }
  return null
}

// Allowed CORS origin — same-origin by default, configurable via env
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || ''

function corsHeaders(origin: string | null): Record<string, string> {
  // Only allow the configured app origin (no wildcards)
  const allowedOrigin =
    origin && ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : ''

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  }
}

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const path = request.nextUrl.pathname
  const origin = request.headers.get('origin')

  // CORS: Handle preflight OPTIONS requests for API routes
  if (path.startsWith('/api/') && request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
  }

  // Only track AI crawlers on public pages (not API routes, not static assets)
  const shouldTrack =
    !path.startsWith('/api/') &&
    !path.startsWith('/_next/') &&
    !path.includes('.') // Skip static files

  if (shouldTrack) {
    const crawler = detectAICrawler(userAgent)

    if (crawler) {
      // Log AI crawler visit asynchronously (fire and forget)
      // We don't await this to avoid slowing down the request
      const baseUrl = request.nextUrl.origin

      const internalSecret =
        process.env.INTERNAL_API_SECRET || process.env.CRON_SECRET
      fetch(`${baseUrl}/api/analytics/ai-crawlers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(internalSecret && { 'x-internal-secret': internalSecret }),
        },
        body: JSON.stringify({
          crawler: crawler.name,
          company: crawler.company,
          path,
          userAgent,
        }),
      }).catch(() => {
        // Silently fail - we don't want to break the site if logging fails
      })
    }
  }

  // Server-side route protection: redirect unauthenticated users to login
  const protectedPrefixes = [
    '/account',
    '/basics',
    '/developers',
    '/customers',
    '/university',
    '/professors',
  ]
  const isProtected = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  )

  if (isProtected) {
    const sessionCookie = request.cookies.get('__session')?.value
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Add CORS headers to API responses
  const response = NextResponse.next()
  if (path.startsWith('/api/')) {
    const headers = corsHeaders(origin)
    for (const [key, value] of Object.entries(headers)) {
      response.headers.set(key, value)
    }
  }

  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|logos|icons|.*\\..*$).*)',
  ],
}
