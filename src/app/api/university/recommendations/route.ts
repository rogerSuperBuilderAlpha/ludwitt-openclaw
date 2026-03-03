/**
 * API Route: GET /api/university/recommendations
 *
 * AI-powered path recommendations. Fetches the student's history and
 * available published paths, then uses Claude to rank and recommend
 * the top 5 paths with reasoning.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import Anthropic from '@anthropic-ai/sdk'
import { checkCreditsBeforeCall, trackCreditsAfterCall } from '@/lib/credits'
import type { PathRecommendation, RecommendationsResponse } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-haiku-4-5'
const ENDPOINT_NAME = 'university-recommendations'

/**
 * Heuristic fallback: sort published paths by subject overlap with the
 * student's completed subjects, then return the top 5.
 */
function heuristicRecommendations(
  publishedPaths: { id: string; targetTopic: string; subjects: string[]; targetDescription?: string }[],
  completedSubjects: string[]
): PathRecommendation[] {
  const subjectSet = new Set(completedSubjects.map(s => s.toLowerCase()))

  const scored = publishedPaths.map(p => {
    const overlap = p.subjects.filter(s => subjectSet.has(s.toLowerCase())).length
    const total = p.subjects.length || 1
    const matchScore = Math.round((overlap / total) * 100)
    return { path: p, matchScore }
  })

  scored.sort((a, b) => b.matchScore - a.matchScore)

  return scored.slice(0, 5).map(({ path, matchScore }) => ({
    pathId: path.id,
    targetTopic: path.targetTopic,
    reason: matchScore > 0
      ? `Builds on your existing knowledge in ${path.subjects.filter(s => subjectSet.has(s.toLowerCase())).join(', ')}.`
      : 'Explore a new subject area to broaden your skills.',
    matchScore,
    skillsGained: path.subjects,
    difficulty: matchScore > 60 ? 'intermediate' as const : matchScore > 30 ? 'beginner' as const : 'advanced' as const,
  }))
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // 1. Fetch student profile
    const profileDoc = await db.collection('universityStudentProfiles').doc(userId).get()
    const profile = profileDoc.exists ? profileDoc.data() : null
    const completedCourses = profile?.completedCourses || []
    const totalXP = profile?.totalXP || 0
    const profession = profile?.profession || undefined

    // Derive completed subjects from completed courses
    const completedSubjects = [...new Set(completedCourses.map((c: { subject: string }) => c.subject))]
    const completedTopics = completedCourses.map((c: { topic: string }) => c.topic)

    // 2. Fetch user's active and completed paths
    const userPathsSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', userId)
      .get()

    const completedPathIds = new Set<string>()
    const activePathIds = new Set<string>()
    for (const doc of userPathsSnap.docs) {
      const data = doc.data()
      if (data.status === 'completed') completedPathIds.add(doc.id)
      else if (data.status === 'active') activePathIds.add(doc.id)
      // Also exclude any path the user has copied via sourcePathId
      if (data.sourcePathId) {
        completedPathIds.add(data.sourcePathId)
        activePathIds.add(data.sourcePathId)
      }
    }

    // 3. Fetch top 20 published paths (excluding user's own)
    const pubSnap = await db
      .collection('universityLearningPaths')
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()

    const publishedPaths = pubSnap.docs
      .filter(doc => {
        const data = doc.data()
        // Must be published (or default published)
        if (data.isPublished === false) return false
        // Must not be a copy
        if (data.sourcePathId) return false
        // Must not be the user's own path
        if (data.userId === userId) return false
        // Must not already be joined or completed
        if (completedPathIds.has(doc.id) || activePathIds.has(doc.id)) return false
        return true
      })
      .slice(0, 20)
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          targetTopic: data.targetTopic as string,
          targetDescription: (data.targetDescription as string) || undefined,
          subjects: (data.subjects as string[]) || [],
          profession: (data.profession as string) || undefined,
          tags: (data.tags as string[]) || [],
          levelRange: data.levelRange as { min: number; max: number } | undefined,
        }
      })

    // Build the basedOn summary
    const basedOn = {
      completedPaths: completedPathIds.size,
      topSkills: completedSubjects.slice(0, 5) as string[],
      profession: profession as string | undefined,
    }

    // If no published paths available, return empty
    if (publishedPaths.length === 0) {
      const response: RecommendationsResponse = { recommendations: [], basedOn }
      return successResponse(response)
    }

    // If AI is unavailable, use heuristic
    if (!anthropic) {
      const recommendations = heuristicRecommendations(publishedPaths, completedSubjects as string[])
      const response: RecommendationsResponse = { recommendations, basedOn }
      return successResponse(response)
    }

    // 4. Check credits
    const creditError = await checkCreditsBeforeCall(userId, ENDPOINT_NAME)
    if (creditError) return creditError

    // 5. Build AI prompt
    const studentContext = [
      `Student Profile:`,
      `- Total XP: ${totalXP}`,
      `- Completed courses: ${completedCourses.length}`,
      `- Subjects studied: ${completedSubjects.length > 0 ? completedSubjects.join(', ') : 'None yet'}`,
      `- Topics completed: ${completedTopics.length > 0 ? completedTopics.join(', ') : 'None yet'}`,
      profession ? `- Career/profession goal: ${profession}` : '',
    ].filter(Boolean).join('\n')

    const pathsContext = publishedPaths.map((p, i) => {
      const parts = [
        `Path ${i + 1}:`,
        `  ID: ${p.id}`,
        `  Topic: ${p.targetTopic}`,
        p.targetDescription ? `  Description: ${p.targetDescription}` : '',
        `  Subjects: ${p.subjects.length > 0 ? p.subjects.join(', ') : 'General'}`,
        p.profession ? `  Target Profession: ${p.profession}` : '',
        p.tags?.length ? `  Tags: ${p.tags.join(', ')}` : '',
        p.levelRange ? `  Level Range: ${p.levelRange.min}-${p.levelRange.max}` : '',
      ]
      return parts.filter(Boolean).join('\n')
    }).join('\n\n')

    const systemPrompt = `You are a learning path recommendation engine. Given a student's history and a list of available learning paths, you must pick the top 5 most suitable paths. Return your response as a JSON array.

Each recommendation must include:
- pathId: the ID of the recommended path
- targetTopic: the path's topic
- reason: a 1-2 sentence explanation of why this path suits the student
- matchScore: a number 0-100 representing how well the path matches the student
- skillsGained: an array of skills/subjects the student will gain
- difficulty: "beginner", "intermediate", or "advanced" based on the path relative to the student's level

Consider:
1. Subject overlap with student's existing knowledge
2. Natural progression from completed topics
3. Alignment with the student's profession goal if set
4. Diversity — don't recommend 5 paths in the same subject
5. If the student has no history, recommend beginner-friendly diverse paths

Return ONLY a valid JSON array of recommendation objects. No markdown, no explanation outside the JSON.`

    const userMessage = `${studentContext}\n\nAvailable Paths:\n${pathsContext}\n\nReturn your top 5 recommendations as a JSON array.`

    // 6. Call AI
    const aiResponse = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    // Track credits
    await trackCreditsAfterCall(userId, ENDPOINT_NAME, MODEL, aiResponse.usage)

    // 7. Parse AI response
    const responseText = aiResponse.content[0].type === 'text' ? aiResponse.content[0].text : ''

    let recommendations: PathRecommendation[]
    try {
      // Extract JSON array from response (handle potential markdown wrapping)
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      if (!jsonMatch) throw new Error('No JSON array found')

      const parsed = JSON.parse(jsonMatch[0]) as PathRecommendation[]

      // Validate and sanitize
      const validPathIds = new Set(publishedPaths.map(p => p.id))
      recommendations = parsed
        .filter(r => r.pathId && validPathIds.has(r.pathId))
        .slice(0, 5)
        .map(r => ({
          pathId: r.pathId,
          targetTopic: r.targetTopic || publishedPaths.find(p => p.id === r.pathId)?.targetTopic || '',
          reason: r.reason || '',
          matchScore: typeof r.matchScore === 'number' ? Math.min(100, Math.max(0, Math.round(r.matchScore))) : 50,
          skillsGained: Array.isArray(r.skillsGained) ? r.skillsGained : [],
          difficulty: ['beginner', 'intermediate', 'advanced'].includes(r.difficulty) ? r.difficulty : 'intermediate',
        }))
    } catch {
      // Fallback to heuristic if AI response parsing fails
      apiLogger.apiError('university/recommendations', 'Failed to parse AI response, using heuristic fallback')
      recommendations = heuristicRecommendations(publishedPaths, completedSubjects as string[])
    }

    const response: RecommendationsResponse = { recommendations, basedOn }
    return successResponse(response)
  } catch (error) {
    return serverError(error, 'Failed to generate recommendations')
  }
}
