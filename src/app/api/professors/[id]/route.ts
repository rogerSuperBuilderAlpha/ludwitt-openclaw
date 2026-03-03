import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ProfessorPublicProfile } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const { id } = await params

    // Fetch professor profile
    const profileDoc = await db.collection('professorProfiles').doc(id).get()
    if (!profileDoc.exists) {
      return notFoundError('Professor not found')
    }
    const profileData = profileDoc.data()!

    // Compute platform stats
    const assignmentsSnap = await db
      .collection('professorAssignments')
      .where('professorId', '==', id)
      .get()

    const pathsCreated = assignmentsSnap.size
    const uniqueStudentIds = new Set<string>()
    const pathIds = new Set<string>()

    for (const doc of assignmentsSnap.docs) {
      const data = doc.data()
      if (data.sourcePathId) pathIds.add(data.sourcePathId)
      if (Array.isArray(data.studentIds)) {
        for (const sid of data.studentIds) uniqueStudentIds.add(sid)
      }
    }

    // Count reviewed deliverables
    let deliverablesReviewed = 0
    if (pathIds.size > 0) {
      const pathIdArray = [...pathIds]
      for (let i = 0; i < pathIdArray.length; i += 30) {
        const chunk = pathIdArray.slice(i, i + 30)
        const coursesSnap = await db
          .collection('universityCourses')
          .where('learningPathId', 'in', chunk)
          .get()

        for (const courseDoc of coursesSnap.docs) {
          const courseData = courseDoc.data()
          if (Array.isArray(courseData.deliverables)) {
            for (const d of courseData.deliverables) {
              if (d.reviewedBy === id && ['approved', 'revision-needed', 'failed'].includes(d.status)) {
                deliverablesReviewed++
              }
            }
          }
        }
      }
    }

    // Get memberSince from user doc
    const userDoc = await db.collection('users').doc(id).get()
    const memberSince = userDoc.exists
      ? (userDoc.data()?.createdAt?.toDate?.()?.toISOString() || userDoc.data()?.createdAt || new Date().toISOString())
      : new Date().toISOString()

    // Resolve path topics
    const pathTopicMap = new Map<string, string>()
    const pathIdArr = [...pathIds]
    for (let i = 0; i < pathIdArr.length; i += 30) {
      const chunk = pathIdArr.slice(i, i + 30)
      const snap = await db
        .collection('universityLearningPaths')
        .where('__name__', 'in', chunk)
        .get()
      for (const doc of snap.docs) {
        pathTopicMap.set(doc.id, doc.data().targetTopic as string)
      }
    }
    const pathTopics = [...pathIds]
      .map(pid => pathTopicMap.get(pid))
      .filter((t): t is string => !!t)

    const publicProfile: ProfessorPublicProfile = {
      professorId: profileData.professorId,
      displayName: profileData.displayName,
      title: profileData.title,
      bio: profileData.bio,
      specialties: profileData.specialties || [],
      photoURL: profileData.photoURL,
      headline: profileData.headline,
      teachingPhilosophy: profileData.teachingPhilosophy,
      whyITeach: profileData.whyITeach,
      degrees: profileData.degrees,
      certifications: profileData.certifications,
      institution: profileData.institution,
      position: profileData.position,
      department: profileData.department,
      yearsTeaching: profileData.yearsTeaching,
      subjectsWithGrades: profileData.subjectsWithGrades,
      languages: profileData.languages,
      location: profileData.location,
      timezone: profileData.timezone,
      availability: profileData.availability,
      officeHours: profileData.officeHours,
      socialLinks: profileData.socialLinks,
      publications: profileData.publications,
      timeSlots: profileData.timeSlots,
      pathTopics,
      stats: {
        pathsCreated,
        totalStudents: uniqueStudentIds.size,
        deliverablesReviewed,
        memberSince,
        lastActive: profileData.updatedAt || new Date().toISOString(),
      },
    }

    return successResponse({ profile: publicProfile })
  } catch (error) {
    return serverError(error, 'Failed to fetch professor profile')
  }
}
