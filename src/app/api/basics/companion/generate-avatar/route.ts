/**
 * Companion Avatar Generation API
 * 
 * POST /api/basics/companion/generate-avatar
 * 
 * Generates a unique avatar image for the user's companion using AI (Replicate FLUX)
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { checkBasicsBalance, deductCredits, trackCreditsAfterCall } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { getModelForTask } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

// Cost in cents for image generation via Replicate (approximately 3 cents per image)
const IMAGE_GENERATION_COST = 3

interface GenerateAvatarRequest {
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  companionName: string
  companionEmoji: string
  companionDescription: string
  companionPersonality: string
  element: string
  style: string
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const body: GenerateAvatarRequest = await request.json()
    const { subject, companionName, companionEmoji, companionDescription, companionPersonality, element, style } = body

    if (!companionName || !companionDescription) {
      return badRequestError('Missing required companion details')
    }

    // Check if user has enough credits
    const balanceCheck = await checkBasicsBalance(authResult.userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits',
        currentBalance: balanceCheck.currentBalance,
        shortfall: balanceCheck.shortfall
      }, { status: 402 })
    }

    // Generate a detailed prompt for the avatar using Claude
    const { prompt: imagePrompt, usage: promptUsage, model: promptModel } = await generateImagePrompt(
      companionName,
      companionEmoji,
      companionDescription,
      companionPersonality,
      element,
      style,
      subject
    )

    // Track credits for the prompt generation LLM call
    let promptCost = 0
    if (promptUsage && promptModel) {
      const { costCharged } = await trackCreditsAfterCall(
        authResult.userId,
        'companion-generate-avatar-prompt',
        promptModel,
        promptUsage
      )
      promptCost = costCharged
    }

    let avatarUrl: string
    let generationMethod: 'replicate' | 'dicebear' = 'dicebear'

    // Try Replicate FLUX for real AI image generation
    if (process.env.REPLICATE_API_TOKEN) {
      try {
        avatarUrl = await generateWithReplicate(imagePrompt)
        generationMethod = 'replicate'
      } catch (replicateError) {
        apiLogger.apiError('companion/generate-avatar', 'Replicate failed, falling back to DiceBear', replicateError)
        avatarUrl = generateDiceBearFallback(authResult.userId, subject, companionName, style, element)
      }
    } else {
      // Fallback to DiceBear if no Replicate API key
      avatarUrl = generateDiceBearFallback(authResult.userId, subject, companionName, style, element)
    }

    // Track credits for image generation (fixed cost for Replicate, 0 for fallback)
    let imageCost = 0
    if (generationMethod === 'replicate') {
      // For Replicate image generation, use a fixed cost (not token-based)
      await deductCredits(authResult.userId, IMAGE_GENERATION_COST, {
        endpoint: '/api/basics/companion/generate-avatar',
        model: 'flux-schnell',
        inputTokens: 0,
        outputTokens: 0,
        rawCostCents: 1, // ~$0.003 for FLUX
        chargedCostCents: IMAGE_GENERATION_COST
      })
      imageCost = IMAGE_GENERATION_COST
    }
    
    const totalCost = promptCost + imageCost

    // Save the avatar to Firestore
    if (db) {
      try {
        const userRef = db.collection('users').doc(authResult.userId)
        await userRef.set({
          companionAvatar: {
            url: avatarUrl,
            subject,
            companionName,
            generatedAt: new Date().toISOString(),
            prompt: imagePrompt,
            method: generationMethod
          }
        }, { merge: true })
      } catch (e) {
        apiLogger.apiError('companion/generate-avatar', 'Failed to save avatar to user profile', e)
      }
    }

    return successResponse({
      avatarUrl,
      prompt: imagePrompt,
      creditsUsed: totalCost,
      method: generationMethod,
      message: `Avatar generated for ${companionName}!`
    })

  } catch (error) {
    apiLogger.apiError('companion/generate-avatar', 'Error generating avatar', error)
    return serverError(error, 'Failed to generate avatar')
  }
}

/**
 * Generate image using Replicate's FLUX Schnell model
 * This creates a high-quality AI-generated avatar
 */
async function generateWithReplicate(prompt: string): Promise<string> {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
  if (!REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN not configured')
  }

  // Use FLUX Schnell - fast and high quality for avatars
  const response = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Prefer': 'wait' // Wait for result instead of polling
    },
    body: JSON.stringify({
      input: {
        prompt: prompt,
        aspect_ratio: '1:1', // Square for avatar
        output_format: 'webp',
        output_quality: 90,
        num_outputs: 1
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    apiLogger.apiError('companion/generate-avatar', `Replicate API error: ${response.status} ${errorText}`)
    throw new Error(`Replicate API error: ${response.status}`)
  }

  const result = await response.json()
  
  // Handle async prediction (if 'wait' header didn't work)
  if (result.status === 'starting' || result.status === 'processing') {
    // Poll for result
    const pollUrl = result.urls?.get || `https://api.replicate.com/v1/predictions/${result.id}`
    const imageUrl = await pollForResult(pollUrl, REPLICATE_API_TOKEN)
    return imageUrl
  }
  
  // Direct result
  if (result.output && Array.isArray(result.output) && result.output.length > 0) {
    return result.output[0]
  }
  
  if (result.output && typeof result.output === 'string') {
    return result.output
  }
  
  throw new Error('No image URL in Replicate response')
}

/**
 * Poll Replicate for prediction result
 */
async function pollForResult(pollUrl: string, apiToken: string, maxAttempts = 30): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
    
    const response = await fetch(pollUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Poll failed: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.status === 'succeeded') {
      if (Array.isArray(result.output) && result.output.length > 0) {
        return result.output[0]
      }
      if (typeof result.output === 'string') {
        return result.output
      }
      throw new Error('No image in successful result')
    }
    
    if (result.status === 'failed') {
      throw new Error(result.error || 'Prediction failed')
    }
  }
  
  throw new Error('Polling timed out')
}

/**
 * Fallback to DiceBear for stylized avatars
 */
function generateDiceBearFallback(
  userId: string,
  subject: string,
  companionName: string,
  style: string,
  element: string
): string {
  const seed = hashString(`${userId}-${subject}-${companionName}-${Date.now()}`)
  
  const avatarStyles: Record<string, string> = {
    mythical: 'adventurer',
    cute: 'bottts',
    majestic: 'personas',
    mysterious: 'avataaars',
    ancient: 'micah',
    cosmic: 'fun-emoji'
  }
  
  const elementColors: Record<string, string> = {
    fire: 'f97316',
    water: '3b82f6',
    earth: '22c55e',
    air: '0ea5e9',
    light: 'fbbf24',
    shadow: '8b5cf6'
  }
  
  const avatarStyle = avatarStyles[style.toLowerCase()] || 'adventurer'
  const bgColor = elementColors[element.toLowerCase()] || 'a855f7'
  
  return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}&backgroundColor=${bgColor}&size=256`
}

/**
 * Generate a detailed image prompt using Claude
 * Returns both the prompt and the usage info for credit tracking
 */
async function generateImagePrompt(
  name: string,
  emoji: string,
  description: string,
  personality: string,
  element: string,
  style: string,
  subject: string
): Promise<{ prompt: string; usage: { input_tokens: number; output_tokens: number } | null; model: string | null }> {
  // Create a basic prompt if no AI available
  const basePrompt = `Cute ${style} ${element}-themed mascot character for learning ${subject}. ${description}. Friendly, approachable, colorful 2D illustration, suitable as profile avatar, centered composition, simple clean background with gradient.`
  
  if (!anthropic) {
    return { prompt: basePrompt, usage: null, model: null }
  }

  try {
    // Use a fast model for simple prompt generation
    const model = await getModelForTask(undefined, 'generation')
    
    const response = await anthropic.messages.create({
      model,
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Create a short image generation prompt (under 100 words) for a learning companion avatar:

Name: ${name}
Description: ${description}  
Personality: ${personality}
Element: ${element}
Style: ${style}
Subject: ${subject}

Requirements:
- Cute, friendly mascot character
- ${style} aesthetic with ${element} theme
- 2D illustration, not photorealistic
- Centered, avatar-ready composition
- Colorful and appealing
- Simple gradient background

Return ONLY the prompt, no explanation.`
      }]
    })

    const content = response.content[0]
    if (content.type === 'text') {
      return { 
        prompt: content.text.trim(), 
        usage: response.usage, 
        model 
      }
    }
  } catch (e) {
    apiLogger.apiError('companion/generate-avatar', 'Failed to generate prompt with Claude', e)
  }

  return { prompt: basePrompt, usage: null, model: null }
}

function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

