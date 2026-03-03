import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { Timestamp } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

function toISO(ts: Timestamp | string | undefined): string {
  if (!ts) return new Date().toISOString()
  if (typeof ts === 'string') return ts
  return (ts as Timestamp).toDate?.()?.toISOString() || new Date().toISOString()
}

interface IdeaRow {
  id: string
  collection: 'business' | 'thesis'
  title: string
  description?: string
  status: string
  documents: { title: string; url: string | null }[]
  userId: string
  userName: string
  userEmail: string
  createdAt: string
  updatedAt: string
  commentCount: number
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    // 1. Fetch all business ideas and thesis ideas
    const [businessSnap, thesisSnap] = await Promise.all([
      db.collection('universityBusinessIdeas').orderBy('createdAt', 'desc').get(),
      db.collection('universityThesisIdeas').orderBy('createdAt', 'desc').get(),
    ])

    // 2. Collect user IDs
    const userIds = new Set<string>()
    const ideaIds: string[] = []

    for (const doc of businessSnap.docs) {
      userIds.add(doc.data().userId as string)
      ideaIds.push(doc.id)
    }
    for (const doc of thesisSnap.docs) {
      userIds.add(doc.data().userId as string)
      ideaIds.push(doc.id)
    }

    // 3. Batch-fetch user info
    const userMap = new Map<string, { displayName: string; email: string }>()
    const uidArray = Array.from(userIds)
    for (let i = 0; i < uidArray.length; i += 100) {
      const chunk = uidArray.slice(i, i + 100)
      const result = await auth.getUsers(chunk.map(uid => ({ uid })))
      for (const userRecord of result.users) {
        userMap.set(userRecord.uid, {
          displayName: userRecord.displayName || userRecord.email?.split('@')[0] || 'Unknown',
          email: userRecord.email || '',
        })
      }
    }

    // 4. Fetch comment counts per idea
    const commentCountMap = new Map<string, number>()
    if (ideaIds.length > 0) {
      // Fetch all comments and count per ideaId
      const commentsSnap = await db.collection('ideaComments').get()
      for (const doc of commentsSnap.docs) {
        const ideaId = doc.data().ideaId as string
        commentCountMap.set(ideaId, (commentCountMap.get(ideaId) || 0) + 1)
      }
    }

    // 5. Assemble rows
    const businessIdeas: IdeaRow[] = businessSnap.docs.map(doc => {
      const data = doc.data()
      const userInfo = userMap.get(data.userId as string) || { displayName: 'Unknown', email: '' }
      return {
        id: doc.id,
        collection: 'business' as const,
        title: data.concept as string,
        description: data.description as string | undefined,
        status: data.status as string,
        documents: (data.documents as { title: string; url: string | null }[]) || [],
        userId: data.userId as string,
        userName: userInfo.displayName,
        userEmail: userInfo.email,
        createdAt: toISO(data.createdAt),
        updatedAt: toISO(data.updatedAt),
        commentCount: commentCountMap.get(doc.id) || 0,
      }
    })

    const thesisIdeas: IdeaRow[] = thesisSnap.docs.map(doc => {
      const data = doc.data()
      const userInfo = userMap.get(data.userId as string) || { displayName: 'Unknown', email: '' }
      return {
        id: doc.id,
        collection: 'thesis' as const,
        title: data.topic as string,
        description: data.description as string | undefined,
        status: data.status as string,
        documents: (data.documents as { title: string; url: string | null }[]) || [],
        userId: data.userId as string,
        userName: userInfo.displayName,
        userEmail: userInfo.email,
        createdAt: toISO(data.createdAt),
        updatedAt: toISO(data.updatedAt),
        commentCount: commentCountMap.get(doc.id) || 0,
      }
    })

    return successResponse({ businessIdeas, thesisIdeas })
  } catch (error) {
    return serverError(error, 'Failed to fetch ideas')
  }
}
