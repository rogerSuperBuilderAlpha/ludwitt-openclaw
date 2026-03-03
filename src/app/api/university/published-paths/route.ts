import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  PublishedPathSummary,
  PublishedPathProfessor,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    const snapshot = await db
      .collection('universityLearningPaths')
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    // Filter out copies and explicitly unpublished paths (isPublished defaults to true if absent)
    const originalDocs = snapshot.docs.filter((doc) => {
      const data = doc.data()
      if (data.sourcePathId) return false
      if (data.isPublished === false) return false
      return true
    })

    // Collect all course IDs to fetch titles
    const allCourseIds: string[] = []
    for (const doc of originalDocs) {
      const courses = (doc.data().courses as string[]) || []
      allCourseIds.push(...courses)
    }

    // Fetch course data in chunks of 30 (Firestore 'in' limit)
    const courseDataMap = new Map<string, { title: string; order: number }>()
    for (let i = 0; i < allCourseIds.length; i += 30) {
      const chunk = allCourseIds.slice(i, i + 30)
      const coursesSnap = await db
        .collection('universityCourses')
        .where('__name__', 'in', chunk)
        .get()
      for (const courseDoc of coursesSnap.docs) {
        const d = courseDoc.data()
        courseDataMap.set(courseDoc.id, { title: d.title, order: d.order })
      }
    }

    // Fetch professor assignments for published paths
    const originalPathIds = originalDocs.map((doc) => doc.id)
    const assignmentMap = new Map<string, Set<string>>() // pathId → Set<professorId>
    const assignmentNameMap = new Map<string, string>() // professorId → name from assignment
    for (let i = 0; i < originalPathIds.length; i += 30) {
      const chunk = originalPathIds.slice(i, i + 30)
      const assignSnap = await db
        .collection('professorAssignments')
        .where('sourcePathId', 'in', chunk)
        .get()
      for (const aDoc of assignSnap.docs) {
        const d = aDoc.data()
        const pathId = d.sourcePathId as string
        const profId = d.professorId as string
        if (!assignmentMap.has(pathId)) assignmentMap.set(pathId, new Set())
        assignmentMap.get(pathId)!.add(profId)
        if (d.professorName && !assignmentNameMap.has(profId)) {
          assignmentNameMap.set(profId, d.professorName as string)
        }
      }
    }

    // Fetch professor profiles for display names
    const allProfessorIds = new Set<string>()
    for (const ids of assignmentMap.values()) {
      for (const id of ids) allProfessorIds.add(id)
    }
    const professorNameMap = new Map<string, string>()
    const profIdArray = [...allProfessorIds]
    for (let i = 0; i < profIdArray.length; i += 30) {
      const chunk = profIdArray.slice(i, i + 30)
      const profSnap = await db
        .collection('professorProfiles')
        .where('__name__', 'in', chunk)
        .get()
      for (const pDoc of profSnap.docs) {
        professorNameMap.set(pDoc.id, pDoc.data().displayName as string)
      }
    }

    const paths: PublishedPathSummary[] = originalDocs.map((doc) => {
      const data = doc.data()
      const courseIds = (data.courses as string[]) || []
      const courseEntries = courseIds
        .map((id) => courseDataMap.get(id))
        .filter((c): c is { title: string; order: number } => !!c)
        .sort((a, b) => a.order - b.order)
      const courseTitles = courseEntries.map((c) => c.title)

      // Build structured professor list from assignments
      const profIds = assignmentMap.get(doc.id) || new Set()
      const professors: PublishedPathProfessor[] = [...profIds].map((pid) => ({
        id: pid,
        name:
          professorNameMap.get(pid) ||
          assignmentNameMap.get(pid) ||
          'Professor',
      }))

      const isAnonymous =
        data.creatorAnonymous ?? data.creatorName === 'Anonymous'

      return {
        id: doc.id,
        targetTopic: data.targetTopic,
        creatorName: isAnonymous
          ? 'Anonymous'
          : data.creatorName || 'Anonymous',
        creatorAnonymous: !!isAnonymous,
        courseCount: courseIds.length,
        courseTitles,
        publishedAt: data.publishedAt || data.createdAt,
        subjects: data.subjects || [],
        tags: data.tags || [],
        ...(data.targetDescription && {
          targetDescription: data.targetDescription,
        }),
        ...(data.profession && { profession: data.profession }),
        ...(data.levelRange && { levelRange: data.levelRange }),
        professors,
        isOwner: data.userId === userId,
      }
    })

    return successResponse({ paths })
  } catch (error) {
    return serverError(error, 'Failed to fetch published paths')
  }
}
