/**
 * AI Deliverable Pre-Review
 *
 * Analyzes student submissions against deliverable requirements and provides
 * structured feedback (strengths, improvements, rubric estimates).
 * Uses Claude Haiku for fast, cost-efficient analysis.
 */

import Anthropic from '@anthropic-ai/sdk'
import { trackCreditsAfterCall } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { notifyAIReviewComplete } from '@/lib/university/notifications'
import type { AIReviewFeedback } from '@/lib/types/university'
import { logger } from '@/lib/logger'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-haiku-4-5'
const TEMPERATURE = 0.3

function buildReviewPrompt(
  courseTitle: string,
  deliverableTitle: string,
  deliverableDescription: string,
  deliverableType: string,
  requirements: string[],
  deployedUrl?: string,
  githubUrl?: string,
  loomUrl?: string,
  submissionNotes?: string
): string {
  const links = [
    deployedUrl && `- Deployed URL: ${deployedUrl}`,
    githubUrl && `- GitHub Repo: ${githubUrl}`,
    loomUrl && `- Loom Video: ${loomUrl}`,
  ].filter(Boolean).join('\n')

  const reqList = requirements.length > 0
    ? requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')
    : 'No specific requirements listed.'

  return `You are a teaching assistant performing a preliminary review of a student submission.

## Course
${courseTitle}

## Deliverable
**Title:** ${deliverableTitle}
**Type:** ${deliverableType}
**Description:** ${deliverableDescription}

## Requirements
${reqList}

## Submission
${links}
${submissionNotes ? `\nStudent notes: ${submissionNotes}` : ''}

## Task
Analyze this submission against the requirements and provide structured feedback. You cannot access the URLs directly, so evaluate based on what was submitted (which URLs are present, the type of project, and any student notes). Focus on:
1. Whether all required links are present for this type of deliverable
2. Whether the submission appears to address the requirements based on available info
3. Constructive feedback on what looks good and what could be improved

## Output Format
Return ONLY a JSON object:
\`\`\`json
{
  "summary": "2-3 sentence overall assessment of the submission",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "rubricEstimate": {
    "clarity": 3,
    "completeness": 3,
    "technicalQuality": 3
  },
  "meetsRequirements": true
}
\`\`\`

Rules:
- "strengths" and "improvements" should each have 1-4 items
- Rubric scores are 1-5 (1=poor, 5=excellent)
- "meetsRequirements" is true if the submission appears to address most requirements
- Be encouraging but honest
- Return ONLY the JSON object`
}

function parseAIReviewResponse(text: string): AIReviewFeedback | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null
    const parsed = JSON.parse(jsonMatch[0])
    return {
      summary: parsed.summary || 'Review could not be completed.',
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      rubricEstimate: {
        clarity: Math.min(5, Math.max(1, Number(parsed.rubricEstimate?.clarity) || 3)),
        completeness: Math.min(5, Math.max(1, Number(parsed.rubricEstimate?.completeness) || 3)),
        technicalQuality: Math.min(5, Math.max(1, Number(parsed.rubricEstimate?.technicalQuality) || 3)),
      },
      meetsRequirements: !!parsed.meetsRequirements,
      generatedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

/**
 * Generate an AI pre-review for a submitted deliverable.
 * Saves the result to Firestore and notifies the student.
 */
export async function generateAIReview(params: {
  userId: string
  courseId: string
  deliverableId: string
  courseTitle: string
  deliverableTitle: string
  deliverableDescription: string
  deliverableType: string
  requirements: string[]
  deployedUrl?: string
  githubUrl?: string
  loomUrl?: string
  submissionNotes?: string
}): Promise<AIReviewFeedback | null> {
  if (!anthropic) {
    logger.error('AiReview', 'ANTHROPIC_API_KEY not set')
    return null
  }

  const prompt = buildReviewPrompt(
    params.courseTitle,
    params.deliverableTitle,
    params.deliverableDescription,
    params.deliverableType,
    params.requirements,
    params.deployedUrl,
    params.githubUrl,
    params.loomUrl,
    params.submissionNotes
  )

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    temperature: TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const review = parseAIReviewResponse(text)

  if (!review) {
    logger.error('AiReview', 'Failed to parse response')
    return null
  }

  // Track credits
  await trackCreditsAfterCall(params.userId, 'university-ai-review', MODEL, response.usage)

  // Save review to Firestore on the deliverable
  const courseRef = db.collection('universityCourses').doc(params.courseId)
  const courseDoc = await courseRef.get()
  if (courseDoc.exists) {
    const deliverables = courseDoc.data()!.deliverables as Array<Record<string, unknown>>
    const idx = deliverables.findIndex(d => d.id === params.deliverableId)
    if (idx !== -1) {
      deliverables[idx] = { ...deliverables[idx], aiReview: review }
      await courseRef.update({ deliverables })
    }
  }

  // Notify the student
  notifyAIReviewComplete(params.userId, params.deliverableTitle, review.meetsRequirements)

  return review
}
