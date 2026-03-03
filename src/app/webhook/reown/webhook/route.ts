/**
 * Reown/WalletConnect Webhook Handler
 * 
 * Receives webhook events from WalletConnect Cloud for:
 * - Wallet connection events
 * - Session updates
 * - Push notification delivery status
 * 
 * Webhook Secret: Configure in environment variables
 */

import { NextRequest, NextResponse } from 'next/server'
import { apiLogger } from '@/lib/logger'
import { REOWN_CONFIG } from '@/lib/web3/config'

export const dynamic = 'force-dynamic'

// Webhook secret for verification
const REOWN_WEBHOOK_SECRET = REOWN_CONFIG.WEBHOOK_SECRET

interface ReownWebhookEvent {
  id: string
  type: string
  timestamp: number
  data: {
    topic?: string
    pairingTopic?: string
    relay?: { protocol: string }
    expiry?: number
    requiredNamespaces?: Record<string, unknown>
    optionalNamespaces?: Record<string, unknown>
    sessionProperties?: Record<string, unknown>
    [key: string]: unknown
  }
}

/**
 * Verify webhook signature from Reown
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) {
    // For now, accept webhooks without signature during development
    // In production, you should require signature verification
    return true
  }
  
  // Reown uses HMAC-SHA256 for webhook signatures
  // The signature header format may vary - check Reown docs for exact format
  try {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('x-webhook-signature') || 
                      request.headers.get('x-reown-signature')
    
    // Verify signature (optional during development)
    const isValid = verifyWebhookSignature(payload, signature, REOWN_WEBHOOK_SECRET)
    
    if (!isValid) {
      apiLogger.apiError('reown/webhook', 'Invalid webhook signature', null)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    // Parse the event
    let event: ReownWebhookEvent
    try {
      event = JSON.parse(payload)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    // Log the event for monitoring
    apiLogger.success('reown/webhook', `Received event: ${event.type}`, {
      data: {
        eventId: event.id,
        eventType: event.type,
        timestamp: event.timestamp,
      },
    })
    
    // Handle different event types
    switch (event.type) {
      case 'session_proposal':
      case 'session_created':
      case 'session_updated':
      case 'session_deleted':
      case 'session_ping':
      case 'push_message_sent':
        break

      case 'push_message_failed':
        apiLogger.apiError('reown/webhook', `Push message failed for event ${event.id}`, null)
        break

      default:
        apiLogger.apiError('reown/webhook', `Unhandled event type: ${event.type}`, null)
    }
    
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ 
      received: true,
      eventId: event.id,
      eventType: event.type,
    })
    
  } catch (error) {
    apiLogger.apiError('reown/webhook', 'Webhook handler error', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * HEAD request for webhook verification
 * Some webhook providers ping this endpoint to verify it exists
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}

/**
 * GET request for health check
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    webhook: 'reown',
    timestamp: new Date().toISOString(),
  })
}

