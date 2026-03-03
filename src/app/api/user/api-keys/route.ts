import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { validateRequiredFields } from '@/lib/api/validators'
import { getUserData, updateUserFields } from '@/lib/utils/user-helpers'
import { validateEncryptedKey } from '@/lib/utils/validation-helpers'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/user/api-keys
 * Retrieve user's encrypted API keys (keys are encrypted, only metadata returned)
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const userData = await getUserData(userId)
    
    if (!userData) {
      return successResponse({
        hasKeys: false,
        keys: {}
      })
    }

    const apiKeys = userData.apiKeys || {}

    // Return metadata only (not the encrypted keys themselves for security)
    return successResponse({
      hasKeys: Object.keys(apiKeys).length > 0,
      keys: Object.keys(apiKeys).reduce((acc, key) => {
        acc[key] = {
          hasKey: !!apiKeys[key]?.encrypted,
          lastUpdated: apiKeys[key]?.lastUpdated || null,
          keyHash: apiKeys[key]?.keyHash || null // For verification
        }
        return acc
      }, {} as Record<string, any>)
    })

  } catch (error) {
    return serverError(error, 'Failed to retrieve API keys')
  }
}

/**
 * POST /api/user/api-keys
 * Save encrypted API keys for a user
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body = await request.json()
    const { anthropicKey, didKey } = body

    // Validate that at least one key is provided
    if (!anthropicKey && !didKey) {
      return badRequestError('At least one API key must be provided')
    }

    // Validate key formats
    if (anthropicKey && typeof anthropicKey !== 'string') {
      return badRequestError('Anthropic API key must be a string')
    }
    if (didKey && typeof didKey !== 'string') {
      return badRequestError('D-ID API key must be a string')
    }

    // Note: Keys are already encrypted client-side, so we can't validate format here
    // Format validation happens client-side before encryption
    // We just validate that encrypted strings are provided and have reasonable length
    if (anthropicKey) {
      const validation = validateEncryptedKey(anthropicKey, 50, 'Anthropic API key')
      if (!validation.isValid) {
        return badRequestError(validation.error || 'Invalid encrypted Anthropic API key format')
      }
    }
    if (didKey) {
      const validation = validateEncryptedKey(didKey, 50, 'D-ID API key')
      if (!validation.isValid) {
        return badRequestError(validation.error || 'Invalid encrypted D-ID API key format')
      }
    }

    // Prepare update object
    const updateData: any = {
      updatedAt: createISOTimestamp()
    }

    if (anthropicKey) {
      updateData['apiKeys.anthropic'] = {
        encrypted: anthropicKey.trim(), // Client sends already encrypted
        lastUpdated: createISOTimestamp(),
        keyHash: body.anthropicKeyHash || null // For verification
      }
    }

    if (didKey) {
      updateData['apiKeys.did'] = {
        encrypted: didKey.trim(), // Client sends already encrypted
        lastUpdated: createISOTimestamp(),
        keyHash: body.didKeyHash || null // For verification
      }
    }

    // Save to user document using utility (update supports dot notation)
    await updateUserFields(userId, updateData)

    apiLogger.success('api-keys', 'API keys saved successfully', { 
      userId,
      keysSaved: {
        anthropic: !!anthropicKey,
        did: !!didKey
      }
    })

    return successResponse({
      message: 'API keys saved successfully'
    })

  } catch (error) {
    return serverError(error, 'Failed to save API keys')
  }
}

/**
 * DELETE /api/user/api-keys
 * Delete user's API keys
 */
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body = await request.json()
    const { keyType } = body // 'anthropic', 'did', or 'all'

    if (!keyType || !['anthropic', 'did', 'all'].includes(keyType)) {
      return badRequestError('Invalid keyType. Must be "anthropic", "did", or "all"')
    }

    if (keyType === 'all') {
      await updateUserFields(userId, { apiKeys: {} })
    } else {
      await updateUserFields(userId, { [`apiKeys.${keyType}`]: null })
    }

    apiLogger.success('api-keys', 'API keys deleted', { userId, keyType })

    return successResponse({
      message: 'API keys deleted successfully'
    })

  } catch (error) {
    return serverError(error, 'Failed to delete API keys')
  }
}

