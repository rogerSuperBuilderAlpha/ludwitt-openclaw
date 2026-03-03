/**
 * Independent Study AI Review API
 * 
 * POST - Submit project for AI review
 * GET - Get review status/results
 * 
 * The AI agent evaluates the project against the curriculum's
 * assessment criteria and provides detailed feedback.
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
import type { AIReview } from '@/lib/types/independent-study'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-sonnet-4-20250514'
const ENDPOINT = '/api/basics/independent-study/ai-review'

const AI_REVIEWER_PROMPT = `You are a professional project reviewer evaluating an Independent Study final project. The student has completed a personalized curriculum and built a project to demonstrate their mastery.

Your role is to provide constructive, thorough feedback as a mentor would. Be encouraging but honest about areas for improvement.

Evaluate the project against:
1. The learning objectives and mastery definition
2. The specific assessment criteria provided
3. Real-world value and practicality
4. Quality of implementation

OUTPUT FORMAT (JSON):
{
  "overallScore": 85,  // 0-100
  "status": "passed",  // "passed" if score >= 70, "needs_revision" otherwise
  "feedback": "Overall assessment paragraph",
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "improvements": [
    "Improvement suggestion 1",
    "Improvement suggestion 2"
  ],
  "criteriaResults": [
    {
      "criterion": "Assessment criterion text",
      "met": true,
      "feedback": "Specific feedback for this criterion"
    }
  ]
}

Be specific in your feedback. Reference the actual project deliverables and how they meet or don't meet the criteria.

IMPORTANT: Return ONLY the JSON, no markdown code blocks.`

/**
 * GET - Get AI review status for a study
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const studyId = searchParams.get('studyId')

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    const studyDoc = await db.collection('independentStudies').doc(studyId).get()

    if (!studyDoc.exists) {
      return NextResponse.json({ success: false, error: 'Study not found' }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 403 })
    }

    return successResponseFlat({
      review: studyData.aiReview || null,
      phase: studyData.phase
    })

  } catch (error) {
    return serverError(error, 'Failed to get AI review')
  }
}

/**
 * POST - Submit project for AI review
 */
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

    if (!studyId) {
      return badRequestError('Missing studyId')
    }

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    if (!anthropic) {
      return NextResponse.json({ success: false, error: 'AI service unavailable' }, { status: 503 })
    }

    // Check credits
    const creditError = await checkCreditsBeforeCall(userId, ENDPOINT)
    if (creditError) {
      return creditError
    }

    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return NextResponse.json({ success: false, error: 'Study not found' }, { status: 404 })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 403 })
    }

    // Verify study is in building phase with complete project
    if (studyData.phase !== 'building' && studyData.phase !== 'ai_review') {
      return badRequestError('Study is not ready for AI review')
    }

    const project = studyData.project
    if (!project || !project.liveUrl) {
      return badRequestError('Project must have a live URL to submit for review')
    }

    const coursePrompt = studyData.coursePrompt
    if (!coursePrompt) {
      return badRequestError('No curriculum found for this study')
    }

    // Build review context
    const projectReq = coursePrompt.curriculum.projectRequirement
    const assessmentCriteria = projectReq.assessmentCriteria || []

    const reviewContext = `
INDEPENDENT STUDY: ${coursePrompt.curriculum.title}

TOPIC: ${coursePrompt.topic}

MASTERY DEFINITION:
${coursePrompt.masteryDefinition}

PROJECT REQUIREMENT:
Title: ${projectReq.title}
Description: ${projectReq.description}

REQUIRED DELIVERABLES:
${projectReq.deliverables.map((d: string) => `- ${d}`).join('\n')}

ASSESSMENT CRITERIA:
${assessmentCriteria.map((c: string) => `- ${c}`).join('\n')}

STUDENT'S PROJECT:
- Live URL: ${project.liveUrl}
${project.repositoryUrl ? `- Repository: ${project.repositoryUrl}` : ''}

MILESTONES COMPLETED:
${project.milestones
  .filter((m: { completedAt?: string }) => m.completedAt)
  .map((m: { title: string }) => `✓ ${m.title}`)
  .join('\n')}

${project.notes ? `STUDENT'S NOTES:\n${project.notes}` : ''}
`

    // Generate AI review
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: AI_REVIEWER_PROMPT,
      messages: [{
        role: 'user',
        content: `Please review this Independent Study project:\n\n${reviewContext}`
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
    let reviewData: {
      overallScore: number
      status: 'passed' | 'needs_revision'
      feedback: string
      strengths: string[]
      improvements: string[]
      criteriaResults: { criterion: string; met: boolean; feedback: string }[]
    }

    try {
      let jsonText = responseText.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      reviewData = JSON.parse(jsonText)
    } catch {
      // Fallback if parsing fails
      reviewData = {
        overallScore: 70,
        status: 'passed',
        feedback: responseText,
        strengths: [],
        improvements: [],
        criteriaResults: []
      }
    }

    // Create the review object
    const aiReview: AIReview = {
      id: `review_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: reviewData.overallScore >= 70 ? 'passed' : 'needs_revision',
      overallScore: reviewData.overallScore,
      feedback: reviewData.feedback,
      strengths: reviewData.strengths,
      improvements: reviewData.improvements,
      criteriaResults: reviewData.criteriaResults
    }

    // Calculate XP if passed
    let xpEarned = 0
    if (aiReview.status === 'passed') {
      xpEarned = 200 // AI_REVIEW_PASS XP
    }

    // Update the study
    const updateData: Record<string, unknown> = {
      aiReview,
      phase: aiReview.status === 'passed' ? 'professional_review' : 'building',
      updatedAt: FieldValue.serverTimestamp()
    }

    if (xpEarned > 0) {
      updateData.totalXP = FieldValue.increment(xpEarned)
    }

    // Mark project as submitted
    updateData['project.submittedAt'] = new Date().toISOString()

    await studyRef.update(updateData)

    return successResponseFlat({
      review: aiReview,
      xpEarned,
      creditsCharged,
      nextPhase: aiReview.status === 'passed' ? 'professional_review' : 'building'
    })

  } catch (error) {
    apiLogger.apiError('ai-review', 'Failed to process AI review', error)
    return serverError(error, 'Failed to process AI review')
  }
}
