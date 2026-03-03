import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { SKILL_TAXONOMY, SKILL_CATEGORIES } from '@/data/university/skill-taxonomy'
import type { SkillCategory, SkillNode, SkillStatus } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const TYPE_TO_SKILLS: Record<string, string[]> = {
  'application': ['html-css', 'javascript', 'react', 'api-design', 'deployment'],
  'data-visualization': ['data-modeling', 'data-visualization', 'javascript', 'ui-design'],
  'research-tool': ['api-design', 'databases', 'data-modeling', 'literature-review', 'research-methodology'],
  'simulation': ['javascript', 'data-modeling', 'statistical-analysis', 'server-architecture'],
  'interactive-content': ['html-css', 'javascript', 'react', 'ui-design', 'responsive-design'],
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    // Fetch all user's courses
    const coursesSnap = await db.collection('universityCourses').where('userId', '==', userId).get()

    // Count approved deliverables per skill
    const skillCounts: Record<string, number> = {}
    const skillDeliverables: Record<string, string[]> = {}

    for (const doc of coursesSnap.docs) {
      const course = doc.data()
      const deliverables = (course.deliverables || []) as Array<Record<string, unknown>>

      // Check for custom skill mappings
      const mappingsSnap = await db.collection('skillMappings')
        .where('courseId', '==', doc.id)
        .get()
      const customMappings: Record<string, string[]> = {}
      for (const m of mappingsSnap.docs) {
        const data = m.data()
        customMappings[data.deliverableId as string] = data.skills as string[]
      }

      for (const d of deliverables) {
        if (d.status !== 'approved') continue
        const delType = d.type as string
        const delId = d.id as string

        // Use custom mapping if available, otherwise default
        const skills = customMappings[delId] || TYPE_TO_SKILLS[delType] || []
        for (const skill of skills) {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1
          if (!skillDeliverables[skill]) skillDeliverables[skill] = []
          skillDeliverables[skill].push(delId)
        }
      }
    }

    // Build skill nodes
    const mastered = new Set<string>()
    const inProgress = new Set<string>()

    for (const [id, count] of Object.entries(skillCounts)) {
      if (count >= 3) mastered.add(id)
      else inProgress.add(id)
    }

    const categories: SkillCategory[] = SKILL_CATEGORIES.map(cat => {
      const skills: SkillNode[] = SKILL_TAXONOMY
        .filter(s => s.category === cat.id)
        .map(s => {
          let status: SkillStatus = 'locked'
          const count = skillCounts[s.id] || 0
          const prereqsMet = s.prerequisites.length === 0 || s.prerequisites.every(p => mastered.has(p) || inProgress.has(p))

          if (count >= 3) status = 'mastered'
          else if (count > 0) status = 'in-progress'
          else if (prereqsMet) status = 'recommended'
          else status = 'locked'

          return {
            id: s.id,
            name: s.name,
            category: s.category,
            status,
            level: Math.min(5, count),
            deliverableIds: skillDeliverables[s.id] || [],
            prerequisites: s.prerequisites,
          }
        })
      return { id: cat.id, name: cat.name, color: cat.color, skills }
    })

    return successResponse({ categories })
  } catch (error) {
    return serverError(error, 'Failed to compute skill graph')
  }
}
