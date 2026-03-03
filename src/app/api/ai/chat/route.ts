import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateBody, chatMessageSchema } from '@/lib/api/validation'
import Anthropic from '@anthropic-ai/sdk'
import {
  getDefaultModelForTier,
  getTaskConfig,
} from '@/lib/ai/providers/registry'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const ChatRequestSchema = z.object({
      messages: z
        .array(chatMessageSchema)
        .min(1, 'At least one message is required')
        .max(100, 'Too many messages'),
      context: z
        .object({
          userLevel: z.string().optional(),
          currentProject: z.string().optional(),
          recentActivity: z.array(z.string()).optional(),
        })
        .optional(),
    })

    const body = await request.json()
    const result = validateBody(ChatRequestSchema, body)
    if (!result.success) return result.error
    const { messages, context } = result.data

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 503 }
      )
    }

    const taskConfig = getTaskConfig('chat')
    const defaultModel = getDefaultModelForTier(taskConfig.recommendedTier)
    const model = defaultModel.id

    const systemPrompt = buildSystemPrompt(context)

    const formattedMessages = messages
      .filter((m: { role: string }) => m.role !== 'system')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      system: systemPrompt,
      messages: formattedMessages,
    })

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : ''

    return successResponse({ response: assistantMessage })
  } catch (error) {
    return serverError(error, 'Failed to process chat message')
  }
}

function buildSystemPrompt(context?: {
  userLevel?: string
  currentProject?: string
  recentActivity?: string[]
}): string {
  const basePrompt = `You are a helpful AI assistant for Ludwitt, a platform that helps builders learn and grow their skills.

Your role is to:
- Answer questions about building projects, coding, and entrepreneurship
- Provide encouragement and motivation
- Suggest next steps and learning resources
- Help troubleshoot technical issues
- Guide users through the platform features

Keep responses:
- Concise (2-3 paragraphs max)
- Friendly and encouraging
- Action-oriented with specific next steps
- Technical when needed but accessible

Do NOT:
- Provide financial or legal advice
- Make promises about outcomes
- Share personal information
- Recommend competing platforms`

  if (context) {
    let contextInfo = '\n\nUser Context:'
    if (context.userLevel) {
      contextInfo += `\n- Experience Level: ${context.userLevel}`
    }
    if (context.currentProject) {
      contextInfo += `\n- Current Project: ${context.currentProject}`
    }
    if (context.recentActivity && context.recentActivity.length > 0) {
      contextInfo += `\n- Recent Activity: ${context.recentActivity.join(', ')}`
    }
    return basePrompt + contextInfo
  }

  return basePrompt
}
