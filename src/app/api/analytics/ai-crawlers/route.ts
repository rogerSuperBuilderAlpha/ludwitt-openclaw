/**
 * AI Crawler Analytics API
 * 
 * Tracks visits from AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
 * to understand how AI agents are discovering and indexing the site.
 * 
 * This endpoint:
 * 1. GET - Returns aggregated AI crawler statistics
 * 2. POST - Logs an AI crawler visit (called from middleware)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

// Internal secret for middleware-to-API communication
// This prevents external actors from polluting analytics
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET || process.env.CRON_SECRET

// Known AI crawler user agents
const AI_CRAWLERS = {
  'GPTBot': { name: 'OpenAI GPTBot', company: 'OpenAI' },
  'ChatGPT-User': { name: 'ChatGPT User', company: 'OpenAI' },
  'OAI-SearchBot': { name: 'OpenAI Search', company: 'OpenAI' },
  'ClaudeBot': { name: 'Anthropic Claude', company: 'Anthropic' },
  'Claude-Web': { name: 'Claude Web', company: 'Anthropic' },
  'anthropic-ai': { name: 'Anthropic AI', company: 'Anthropic' },
  'PerplexityBot': { name: 'Perplexity AI', company: 'Perplexity' },
  'Google-Extended': { name: 'Google Gemini', company: 'Google' },
  'Bingbot': { name: 'Bing/Microsoft', company: 'Microsoft' },
  'Amazonbot': { name: 'Amazon Alexa', company: 'Amazon' },
  'Applebot': { name: 'Apple Siri', company: 'Apple' },
  'FacebookBot': { name: 'Meta AI', company: 'Meta' },
  'meta-externalagent': { name: 'Meta External', company: 'Meta' },
  'YouBot': { name: 'You.com', company: 'You.com' },
  'CCBot': { name: 'Common Crawl', company: 'Common Crawl' },
  'cohere-ai': { name: 'Cohere AI', company: 'Cohere' },
  'Bytespider': { name: 'ByteDance', company: 'ByteDance' },
  'AI2Bot': { name: 'Allen Institute', company: 'AI2' },
  'DuckDuckBot': { name: 'DuckDuckGo', company: 'DuckDuckGo' },
  'BraveBot': { name: 'Brave Search', company: 'Brave' },
} as const

interface CrawlerVisit {
  crawler: string
  company: string
  path: string
  timestamp: Date
  userAgent: string
}

/**
 * Detect AI crawler from user agent string
 */
function detectAICrawler(userAgent: string): { crawler: string; company: string } | null {
  for (const [pattern, info] of Object.entries(AI_CRAWLERS)) {
    if (userAgent.includes(pattern)) {
      return { crawler: info.name, company: info.company }
    }
  }
  return null
}

/**
 * GET /api/analytics/ai-crawlers
 * Returns aggregated AI crawler statistics
 * Requires authentication (admin users only)
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication to view analytics data
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    // Note: For stricter security, could also check if user has admin role
    // Get crawler visits from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const visitsSnapshot = await db
      .collection('ai_crawler_visits')
      .where('timestamp', '>=', thirtyDaysAgo)
      .orderBy('timestamp', 'desc')
      .limit(1000)
      .get()

    const visits = visitsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Aggregate by crawler
    const byCrawler: Record<string, number> = {}
    const byPath: Record<string, number> = {}
    const byDay: Record<string, number> = {}

    visits.forEach((visit: any) => {
      // By crawler
      byCrawler[visit.crawler] = (byCrawler[visit.crawler] || 0) + 1
      
      // By path
      byPath[visit.path] = (byPath[visit.path] || 0) + 1
      
      // By day
      const day = new Date(visit.timestamp.toDate()).toISOString().split('T')[0]
      byDay[day] = (byDay[day] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      period: '30 days',
      totalVisits: visits.length,
      byCrawler: Object.entries(byCrawler)
        .sort(([, a], [, b]) => b - a)
        .map(([crawler, count]) => ({ crawler, count })),
      topPages: Object.entries(byPath)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20)
        .map(([path, count]) => ({ path, count })),
      byDay: Object.entries(byDay)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([day, count]) => ({ day, count })),
    })
  } catch (error) {
    apiLogger.apiError('analytics/ai-crawlers', 'AI crawler analytics error', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/analytics/ai-crawlers
 * Logs an AI crawler visit
 * Protected by internal secret (called from middleware only)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify internal secret to prevent external data pollution
    const authHeader = request.headers.get('x-internal-secret')
    if (!INTERNAL_API_SECRET || authHeader !== INTERNAL_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const { crawler, company, path, userAgent } = body

    if (!crawler || !path) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const visit: CrawlerVisit = {
      crawler,
      company: company || 'Unknown',
      path,
      timestamp: new Date(),
      userAgent: userAgent || '',
    }

    await db.collection('ai_crawler_visits').add({
      ...visit,
      timestamp: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    apiLogger.apiError('analytics/ai-crawlers', 'AI crawler logging error', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log visit' },
      { status: 500 }
    )
  }
}
