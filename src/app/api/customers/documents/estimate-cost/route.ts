/**
 * API Route: POST /api/customers/documents/estimate-cost
 * 
 * Fetches the document from Google Drive, sends it to Claude to analyze
 * the requirements, and estimates compute cost to execute in Cursor.
 */

import { NextRequest, NextResponse } from 'next/server'
import { Timestamp } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { formatCentsAsDollars } from '@/lib/credits/pricing'
import { getUserCredits, isLowBalance, isAtDebtLimit, checkBalance } from '@/lib/credits/balance'
import { trackCreditsAfterCall } from '@/lib/credits'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { getAnthropicClient } from '@/lib/ai/providers/anthropic-client'
import { apiLogger } from '@/lib/logger'

/**
 * Customer markup multipliers
 */
const CUSTOMER_MARKUP_MULTIPLIER = CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER
const CUSTOMER_DEBT_MARKUP_MULTIPLIER = CREDIT_CONSTANTS.CUSTOMER_DEBT_MARKUP_MULTIPLIER

const GOOGLE_DRIVE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
}

/**
 * Cost per 1M tokens for Claude Sonnet (what Cursor uses)
 * Input: $3, Output: $15
 */
const SONNET_INPUT_COST_PER_MILLION = 300 // cents
const SONNET_OUTPUT_COST_PER_MILLION = 1500 // cents

/**
 * Minimum estimated cost in cents
 */
const MINIMUM_COST_CENTS = CREDIT_CONSTANTS.MINIMUM_DOCUMENT_COST_CENTS

/**
 * Default fallback cost if analysis fails
 */
const DEFAULT_FALLBACK_COST_CENTS = 500 // $5

interface EstimateRequest {
  documentUrl?: string
  documentSizeChars?: number
  title?: string
}

interface AIAnalysis {
  estimatedToolCalls: number
  estimatedCodeChanges: number
  estimatedFileReads: number
  estimatedInputTokens: number
  estimatedOutputTokens: number
  complexity: 'low' | 'medium' | 'high' | 'very_high'
  summary: string
}

interface CostEstimate {
  documentSizeChars: number
  estimatedInputTokens: number
  estimatedOutputTokens: number
  rawCostCents: number
  displayCostCents: number
  displayCostFormatted: string
  markup: number
  model: string
  willGoNegative: boolean
  analyzedDocument: boolean
  analysis?: {
    toolCalls: number
    codeChanges: number
    fileReads: number
    complexity: string
    summary: string
  }
  balance: {
    current: number
    currentFormatted: string
    sufficient: boolean
    shortfall: number | null
    shortfallFormatted: string | null
    isLowBalance: boolean
    isAtDebtLimit: boolean
  }
}

/**
 * Extract Google Doc ID from URL
 */
function extractDocId(url: string): string | null {
  const patterns = [
    /\/document\/d\/([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

/**
 * Refresh the access token using refresh token
 */
async function refreshAccessToken(userId: string, refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_DRIVE_OAUTH_CONFIG.clientId!,
        client_secret: GOOGLE_DRIVE_OAUTH_CONFIG.clientSecret!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })

    if (!response.ok) return null

    const tokens = await response.json()
    
    await db.collection('driveIntegrations').doc(userId).update({
      accessToken: tokens.access_token,
      expiresAt: Timestamp.fromMillis(Date.now() + ((tokens.expires_in || 3600) * 1000)),
      updatedAt: Timestamp.now()
    })

    return tokens.access_token
  } catch {
    return null
  }
}

/**
 * Get valid access token for user
 */
async function getAccessToken(userId: string): Promise<string | null> {
  const integrationDoc = await db.collection('driveIntegrations').doc(userId).get()
  
  if (!integrationDoc.exists) {
    return null
  }

  const integration = integrationDoc.data()
  let accessToken = integration?.accessToken

  const isExpired = integration?.expiresAt?.toMillis() < Date.now()
  
  if (isExpired && integration?.refreshToken) {
    accessToken = await refreshAccessToken(userId, integration.refreshToken)
  }

  return accessToken || null
}

/**
 * Fetch document content from Google Drive
 */
async function fetchDocumentContent(docId: string, accessToken: string): Promise<string | null> {
  try {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${docId}/export?mimeType=text/plain`
    
    const response = await fetch(exportUrl, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })

    if (!response.ok) {
      return null
    }

    return await response.text()
  } catch {
    return null
  }
}

/**
 * Send document to Claude to analyze required work
 * Returns both the analysis and the usage info for credit tracking
 */
async function analyzeDocumentWithAI(
  documentContent: string,
  userId: string
): Promise<{ analysis: AIAnalysis | null; costCharged: number }> {
  const client = getAnthropicClient()
  if (!client) {
    return { analysis: null, costCharged: 0 }
  }

  try {
    const model = 'claude-sonnet-4-20250514'
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are analyzing a requirements/feedback document to estimate how much AI compute (in Cursor) it would take to execute these requests.

Analyze this document and estimate:
1. How many tool calls (file reads, searches, terminal commands) would be needed
2. How many code changes/edits would be required
3. How many files would need to be read to understand context
4. Total input tokens (for reading files, code context, etc.)
5. Total output tokens (for generating code, explanations, etc.)
6. Complexity level: low, medium, high, or very_high

Consider:
- Each file read is ~500-2000 tokens input
- Each code edit generates ~200-1000 tokens output
- Complex refactors need multiple iterations
- Bug fixes often require reading many files to understand context
- UI changes often need reading related components

DOCUMENT:
${documentContent.slice(0, 50000)}

Respond in JSON format only:
{
  "estimatedToolCalls": <number>,
  "estimatedCodeChanges": <number>,
  "estimatedFileReads": <number>,
  "estimatedInputTokens": <number>,
  "estimatedOutputTokens": <number>,
  "complexity": "<low|medium|high|very_high>",
  "summary": "<brief 1-2 sentence summary of work required>"
}`
      }]
    })

    // Track credits for the AI analysis
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'customers-documents-estimate-cost',
      model,
      response.usage
    )

    // Parse the response
    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return { analysis: null, costCharged }
    }

    // Extract JSON from response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return { analysis: null, costCharged }
    }

    const analysis = JSON.parse(jsonMatch[0]) as AIAnalysis
    return { analysis, costCharged }
  } catch (error) {
    apiLogger.apiError('estimate-cost', 'AI analysis failed', error)
    return { analysis: null, costCharged: 0 }
  }
}

/**
 * Calculate cost from AI analysis
 */
function calculateCostFromAnalysis(analysis: AIAnalysis): number {
  // Cost = (input tokens * input rate) + (output tokens * output rate)
  const inputCost = (analysis.estimatedInputTokens / 1_000_000) * SONNET_INPUT_COST_PER_MILLION
  const outputCost = (analysis.estimatedOutputTokens / 1_000_000) * SONNET_OUTPUT_COST_PER_MILLION
  
  return Math.ceil(inputCost + outputCost)
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Parse request body
    const body: EstimateRequest = await request.json()
    const { documentUrl, title } = body

    if (!documentUrl) {
      return badRequestError('documentUrl is required')
    }

    // Get user's current balance
    const credits = await getUserCredits(userId)

    // Check credits before making AI call
    const balanceCheck = await checkBalance(userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        available: balanceCheck.currentBalance,
        shortfall: balanceCheck.shortfall
      }, { status: 402 })
    }

    let analysis: AIAnalysis | null = null
    let documentContent: string | null = null
    let analyzedDocument = false
    let analysisCost = 0

    // Try to fetch and analyze the document
    const docId = extractDocId(documentUrl)
    if (docId) {
      const accessToken = await getAccessToken(userId)
      if (accessToken) {
        documentContent = await fetchDocumentContent(docId, accessToken)
        if (documentContent) {
          const result = await analyzeDocumentWithAI(documentContent, userId)
          analysis = result.analysis
          analysisCost = result.costCharged
          if (analysis) {
            analyzedDocument = true
          }
        }
      }
    }

    // Calculate costs
    let rawCostCents: number
    let estimatedInputTokens: number
    let estimatedOutputTokens: number

    if (analysis) {
      rawCostCents = calculateCostFromAnalysis(analysis)
      estimatedInputTokens = analysis.estimatedInputTokens
      estimatedOutputTokens = analysis.estimatedOutputTokens
    } else {
      // Fallback if we couldn't analyze
      rawCostCents = DEFAULT_FALLBACK_COST_CENTS
      estimatedInputTokens = 50000
      estimatedOutputTokens = 20000
    }

    // Determine markup: 3x if balance positive, 5x if going into debt
    const willGoNegative = credits.balance < Math.ceil(rawCostCents * CUSTOMER_MARKUP_MULTIPLIER)
    const effectiveMarkup = willGoNegative ? CUSTOMER_DEBT_MARKUP_MULTIPLIER : CUSTOMER_MARKUP_MULTIPLIER

    // Apply markup
    const displayCostCents = Math.max(
      MINIMUM_COST_CENTS,
      Math.ceil(rawCostCents * effectiveMarkup)
    )

    const estimate: CostEstimate = {
      documentSizeChars: documentContent?.length || 0,
      estimatedInputTokens,
      estimatedOutputTokens,
      rawCostCents,
      displayCostCents,
      displayCostFormatted: formatCentsAsDollars(displayCostCents),
      markup: effectiveMarkup,
      model: 'claude-sonnet-4-20250514',
      willGoNegative,
      analyzedDocument,
      analysis: analysis ? {
        toolCalls: analysis.estimatedToolCalls,
        codeChanges: analysis.estimatedCodeChanges,
        fileReads: analysis.estimatedFileReads,
        complexity: analysis.complexity,
        summary: analysis.summary,
      } : undefined,
      balance: {
        current: credits.balance,
        currentFormatted: formatCentsAsDollars(credits.balance),
        sufficient: true, // Always allow (infinite debt)
        shortfall: null,
        shortfallFormatted: null,
        isLowBalance: isLowBalance(credits.balance),
        isAtDebtLimit: isAtDebtLimit(credits.balance),
      },
    }

    apiLogger.success('estimate-cost', 'Document cost estimated', {
      userId,
      documentUrl: documentUrl?.substring(0, 50),
      title,
      analyzedDocument,
      rawCostCents,
      displayCostCents,
      complexity: analysis?.complexity,
    })

    return successResponse(estimate)

  } catch (error) {
    apiLogger.apiError('estimate-cost', 'Failed to estimate cost', error)
    return serverError(error, 'Failed to estimate document cost')
  }
}
