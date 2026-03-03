import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import crypto from 'crypto'
import type {
  CredentialType,
  CredentialEvidence,
  DigitalCredential,
  UniversityCourse,
  UniversityLearningPath,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

// GET - List all credentials for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const snapshot = await db
      .collection('digitalCredentials')
      .where('userId', '==', userId)
      .orderBy('issuedAt', 'desc')
      .get()

    const credentials: DigitalCredential[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DigitalCredential[]

    return successResponse({ credentials })
  } catch (error) {
    return serverError(error, 'Failed to fetch credentials')
  }
}

// POST - Issue a new credential
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { type, pathId } = body as { type: CredentialType; pathId?: string }

    if (!type) {
      return badRequestError('type is required')
    }

    const validTypes: CredentialType[] = [
      'path-completion',
      'year-milestone',
      'skill-certification',
      'degree',
    ]
    if (!validTypes.includes(type)) {
      return badRequestError('Invalid credential type')
    }

    // Fetch the user's display name
    const userDoc = await db.collection('users').doc(userId).get()
    const userName = userDoc.exists
      ? (userDoc.data()?.displayName as string) || 'Student'
      : 'Student'

    // Fetch student profile
    const profileDoc = await db
      .collection('universityStudentProfiles')
      .doc(userId)
      .get()
    if (!profileDoc.exists) {
      return badRequestError('Student profile not found')
    }
    const profile = profileDoc.data()!

    const credentialId = crypto.randomUUID()
    const now = new Date().toISOString()
    const verificationUrl = `/university/credentials/${credentialId}`

    let title = ''
    let description = ''
    let skills: string[] = []
    const evidence: CredentialEvidence[] = []
    const metadata: DigitalCredential['metadata'] = {}

    if (type === 'path-completion') {
      if (!pathId) {
        return badRequestError(
          'pathId is required for path-completion credentials'
        )
      }

      // Verify path exists and belongs to user
      const pathDoc = await db
        .collection('universityLearningPaths')
        .doc(pathId)
        .get()
      if (!pathDoc.exists) {
        return badRequestError('Learning path not found')
      }
      const path = pathDoc.data() as UniversityLearningPath
      if (path.userId !== userId) {
        return badRequestError('You do not own this learning path')
      }

      // Fetch all courses for this path
      const coursesSnap = await db
        .collection('universityCourses')
        .where('learningPathId', '==', pathId)
        .where('userId', '==', userId)
        .get()
      const courses = coursesSnap.docs.map((d) => d.data() as UniversityCourse)

      // Verify all courses are completed
      const allCompleted = courses.every((c) => c.status === 'completed')
      if (!allCompleted) {
        return badRequestError('Not all courses in this path are completed')
      }

      // Check for existing credential
      const existingSnap = await db
        .collection('digitalCredentials')
        .where('userId', '==', userId)
        .where('type', '==', 'path-completion')
        .where('metadata.pathId', '==', pathId)
        .get()
      if (!existingSnap.empty) {
        return badRequestError(
          'A credential for this path has already been issued'
        )
      }

      title = `Path Completion: ${path.targetTopic}`
      description = `Successfully completed the "${path.targetTopic}" learning path consisting of ${courses.length} courses with all deliverables approved.`
      metadata.pathId = pathId
      metadata.pathTopic = path.targetTopic

      // Gather skills from all course subjects and topics
      const skillSet = new Set<string>()
      for (const c of courses) {
        if (c.subject) skillSet.add(c.subject)
        if (c.topic) skillSet.add(c.topic)
      }
      skills = [...skillSet]

      // Build evidence from approved deliverables
      for (const c of courses) {
        for (const d of c.deliverables) {
          if (d.status === 'approved') {
            evidence.push({
              type: 'deliverable',
              title: `${c.title}: ${d.title}`,
              url: d.deployedUrl || d.githubUrl,
              date: d.reviewedAt || d.submittedAt || now,
            })
          }
        }
      }
    } else if (type === 'year-milestone') {
      const totalXP = (profile.totalXP as number) || 0
      const completedPaths =
        (profile.completedCourses as unknown[])?.length || 0

      // Determine year level based on completed paths
      let yearLevel = 0
      if (completedPaths >= 40) yearLevel = 4
      else if (completedPaths >= 30) yearLevel = 3
      else if (completedPaths >= 20) yearLevel = 2
      else if (completedPaths >= 10) yearLevel = 1

      if (yearLevel === 0) {
        return badRequestError('You have not reached any year milestone yet')
      }

      // Check for existing credential at this year level
      const existingSnap = await db
        .collection('digitalCredentials')
        .where('userId', '==', userId)
        .where('type', '==', 'year-milestone')
        .where('metadata.yearLevel', '==', yearLevel)
        .get()
      if (!existingSnap.empty) {
        return badRequestError(
          `A Year ${yearLevel} milestone credential has already been issued`
        )
      }

      title = `Year ${yearLevel} Milestone`
      description = `Achieved Year ${yearLevel} standing with ${totalXP} total XP and ${completedPaths} completed courses.`
      metadata.yearLevel = yearLevel
      metadata.totalXP = totalXP
    } else if (type === 'skill-certification') {
      // Based on completed courses, gather mastered skills
      const completedCourses =
        (profile.completedCourses as { subject: string; topic: string }[]) || []
      if (completedCourses.length === 0) {
        return badRequestError('No completed courses to certify skills from')
      }

      const skillSet = new Set<string>()
      for (const c of completedCourses) {
        if (c.subject) skillSet.add(c.subject)
        if (c.topic) skillSet.add(c.topic)
      }
      skills = [...skillSet]

      title = 'Skill Certification'
      description = `Demonstrated mastery across ${skills.length} skill areas through completing ${completedCourses.length} courses.`
    } else if (type === 'degree') {
      const totalXP = (profile.totalXP as number) || 0
      const completedCourses =
        (profile.completedCourses as unknown[])?.length || 0

      if (completedCourses < 40) {
        return badRequestError('Degree requires at least 40 completed courses')
      }

      // Check for existing degree credential
      const existingSnap = await db
        .collection('digitalCredentials')
        .where('userId', '==', userId)
        .where('type', '==', 'degree')
        .get()
      if (!existingSnap.empty) {
        return badRequestError('A degree credential has already been issued')
      }

      title = 'Degree Completion'
      description = `Completed all degree requirements with ${completedCourses} courses and ${totalXP} total XP.`
      metadata.totalXP = totalXP
    }

    const credential: DigitalCredential = {
      id: credentialId,
      userId,
      userName,
      type,
      title,
      description,
      issuedAt: now,
      skills,
      evidence,
      professorSignatures: [],
      verificationUrl,
      metadata,
    }

    await db.collection('digitalCredentials').doc(credentialId).set(credential)

    return successResponse({ credential })
  } catch (error) {
    return serverError(error, 'Failed to issue credential')
  }
}
