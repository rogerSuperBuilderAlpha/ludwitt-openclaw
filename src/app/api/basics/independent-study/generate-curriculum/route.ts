/**
 * Independent Study Curriculum Generation API
 * 
 * POST - Generate a complete curriculum from discovery conversation
 * 
 * Takes the discovery conversation and generates:
 * - Structured curriculum with units and lessons
 * - Project requirement
 * - Tutor guidelines for the learning phase
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { checkCreditsBeforeCall, trackCreditsAfterCall } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import type { CoursePrompt, Curriculum } from '@/lib/types/independent-study'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-sonnet-4-20250514'
const ENDPOINT = '/api/basics/independent-study/generate-curriculum'

const CURRICULUM_GENERATION_PROMPT = `You are an expert curriculum designer creating a personalized Independent Study program. Based on the discovery conversation, create a comprehensive curriculum.

REQUIREMENTS:
1. The curriculum should have 3-5 units, each with 3-5 lessons
2. Each lesson should be completable in 15-30 minutes of study
3. Lessons should build progressively on each other
4. The final project should demonstrate mastery and provide real value to the field
5. Include clear learning objectives for each lesson

OUTPUT FORMAT (JSON):
{
  "topic": "Clear statement of the subject being studied",
  "scope": "What is and isn't covered in this curriculum",
  "masteryDefinition": "What mastery looks like - what the student will be able to do",
  "curriculum": {
    "title": "Short title for the study",
    "description": "2-3 sentence description of the learning journey",
    "units": [
      {
        "id": "unit_1",
        "title": "Unit Title",
        "description": "What this unit covers",
        "estimatedHours": 2,
        "lessons": [
          {
            "id": "lesson_1_1",
            "title": "Lesson Title",
            "description": "What this lesson teaches",
            "objectives": ["Objective 1", "Objective 2"],
            "estimatedMinutes": 20
          }
        ]
      }
    ],
    "estimatedTotalHours": 10,
    "projectRequirement": {
      "title": "Project title",
      "description": "What the student will build",
      "deliverables": ["Deployed application", "Documentation", "..."],
      "assessmentCriteria": ["Criterion 1", "Criterion 2", "..."]
    }
  },
  "tutorGuidelines": "Instructions for how the AI tutor should guide the student through this curriculum",
  "projectGuidelines": "Instructions for evaluating the final project"
}

IMPORTANT: Return ONLY the JSON, no markdown code blocks or additional text.`

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Rate limit check
    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body = await request.json()
    const { studyId } = body

    if (!studyId || typeof studyId !== 'string') {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    if (!anthropic) {
      return NextResponse.json({
        success: false,
        error: 'AI service unavailable'
      }, { status: 503 })
    }

    // Check credits before AI call
    const creditError = await checkCreditsBeforeCall(userId, ENDPOINT)
    if (creditError) {
      return creditError
    }

    // Get the study
    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return NextResponse.json({
        success: false,
        error: 'Study not found'
      }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({
        success: false,
        error: 'Not authorized'
      }, { status: 403 })
    }

    if (studyData.phase !== 'discovery' && studyData.phase !== 'curriculum_preview') {
      return badRequestError('Study is not ready for curriculum generation')
    }

    // Build context from discovery conversation
    const discovery = studyData.discovery
    if (!discovery || !discovery.messages || discovery.messages.length === 0) {
      return badRequestError('No discovery conversation found')
    }

    // Create conversation summary for curriculum generation
    let conversationContext = `Initial Topic: "${discovery.initialTopic}"\n\n`
    conversationContext += 'Discovery Conversation:\n'
    
    for (const msg of discovery.messages) {
      const role = msg.role === 'user' ? 'Student' : 'Advisor'
      conversationContext += `${role}: ${msg.content}\n\n`
    }

    if (discovery.topicSummary) {
      conversationContext += `\nTopic Summary: ${discovery.topicSummary}`
    }

    if (discovery.learningObjectives && discovery.learningObjectives.length > 0) {
      conversationContext += `\nLearning Objectives:\n${discovery.learningObjectives.map((o: string) => `- ${o}`).join('\n')}`
    }

    // Generate curriculum
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: CURRICULUM_GENERATION_PROMPT,
      messages: [{
        role: 'user',
        content: `Based on this discovery conversation, create a comprehensive curriculum:\n\n${conversationContext}`
      }]
    })

    // Track credits
    const usage = response.usage
    let creditsCharged = 0
    if (usage) {
      const result = await trackCreditsAfterCall(
        userId,
        ENDPOINT,
        MODEL,
        {
          input_tokens: usage.input_tokens,
          output_tokens: usage.output_tokens
        }
      )
      creditsCharged = result.costCharged
    }

    // Parse the response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
    let coursePrompt: CoursePrompt

    try {
      // Clean up the response if it has markdown code blocks
      let jsonText = responseText.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      const parsed = JSON.parse(jsonText)
      
      // Validate and structure the course prompt
      coursePrompt = {
        topic: parsed.topic || discovery.initialTopic,
        scope: parsed.scope || '',
        masteryDefinition: parsed.masteryDefinition || '',
        curriculum: {
          title: parsed.curriculum?.title || discovery.topicSummary || discovery.initialTopic,
          description: parsed.curriculum?.description || '',
          units: (parsed.curriculum?.units || []).map((unit: {
            id?: string
            title?: string
            description?: string
            estimatedHours?: number
            lessons?: {
              id?: string
              title?: string
              description?: string
              objectives?: string[]
              estimatedMinutes?: number
            }[]
          }, unitIndex: number) => ({
            id: unit.id || `unit_${unitIndex + 1}`,
            title: unit.title || `Unit ${unitIndex + 1}`,
            description: unit.description || '',
            estimatedHours: unit.estimatedHours || 2,
            lessons: (unit.lessons || []).map((lesson: {
              id?: string
              title?: string
              description?: string
              objectives?: string[]
              estimatedMinutes?: number
            }, lessonIndex: number) => ({
              id: lesson.id || `lesson_${unitIndex + 1}_${lessonIndex + 1}`,
              title: lesson.title || `Lesson ${lessonIndex + 1}`,
              description: lesson.description || '',
              objectives: lesson.objectives || [],
              estimatedMinutes: lesson.estimatedMinutes || 20
            }))
          })),
          estimatedTotalHours: parsed.curriculum?.estimatedTotalHours || 10,
          projectRequirement: {
            title: parsed.curriculum?.projectRequirement?.title || 'Final Project',
            description: parsed.curriculum?.projectRequirement?.description || '',
            deliverables: parsed.curriculum?.projectRequirement?.deliverables || [],
            assessmentCriteria: parsed.curriculum?.projectRequirement?.assessmentCriteria || []
          }
        },
        tutorGuidelines: parsed.tutorGuidelines || '',
        projectGuidelines: parsed.projectGuidelines || '',
        generatedAt: new Date().toISOString()
      }
    } catch (parseError) {
      apiLogger.apiError('generate-curriculum', 'Parse error', parseError)
      return serverError(new Error('Failed to parse curriculum'), 'Failed to generate curriculum structure')
    }

    // Update the study with the generated curriculum
    await studyRef.update({
      coursePrompt,
      phase: 'curriculum_preview',
      updatedAt: FieldValue.serverTimestamp()
    })

    return successResponseFlat({
      coursePrompt,
      creditsCharged
    })

  } catch (error) {
    apiLogger.apiError('generate-curriculum', 'Error generating curriculum', error)
    return serverError(error, 'Failed to generate curriculum')
  }
}
