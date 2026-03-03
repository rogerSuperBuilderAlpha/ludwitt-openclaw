import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ProfessorListItem } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    // 1. Fetch all professor profiles
    const profilesSnap = await db.collection('professorProfiles').get()
    if (profilesSnap.empty) {
      return successResponse({ professors: [] })
    }

    // 2. Fetch all professor assignments to map professors → paths
    const assignmentsSnap = await db.collection('professorAssignments').get()
    const professorPathIds = new Map<string, Set<string>>()
    for (const doc of assignmentsSnap.docs) {
      const data = doc.data()
      const pid = data.professorId as string
      const pathId = data.sourcePathId as string
      if (!professorPathIds.has(pid)) {
        professorPathIds.set(pid, new Set())
      }
      professorPathIds.get(pid)!.add(pathId)
    }

    // 3. Collect unique path IDs and look up their topics
    const allPathIds = new Set<string>()
    for (const ids of professorPathIds.values()) {
      for (const id of ids) allPathIds.add(id)
    }

    const pathTopicMap = new Map<string, string>()
    const pathIdArray = [...allPathIds]
    for (let i = 0; i < pathIdArray.length; i += 30) {
      const chunk = pathIdArray.slice(i, i + 30)
      const snap = await db
        .collection('universityLearningPaths')
        .where('__name__', 'in', chunk)
        .get()
      for (const doc of snap.docs) {
        pathTopicMap.set(doc.id, doc.data().targetTopic as string)
      }
    }

    // 4. Build the response (skip incomplete profiles without a displayName)
    const professors: ProfessorListItem[] = profilesSnap.docs.filter(doc => doc.data().displayName).map(doc => {
      const data = doc.data()
      const pid = doc.id
      const assignedPathIds = professorPathIds.get(pid) || new Set()
      const pathTopics = [...assignedPathIds]
        .map(id => pathTopicMap.get(id))
        .filter((t): t is string => !!t)

      return {
        professorId: pid,
        displayName: data.displayName,
        title: data.title || undefined,
        bio: data.bio || undefined,
        specialties: data.specialties || [],
        pathTopics,
        headline: data.headline || undefined,
        photoURL: data.photoURL || undefined,
        institution: data.institution || undefined,
        position: data.position || undefined,
        availability: data.availability || undefined,
      }
    })

    return successResponse({ professors })
  } catch (error) {
    return serverError(error, 'Failed to fetch professors')
  }
}
