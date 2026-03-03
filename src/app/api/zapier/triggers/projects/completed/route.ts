import { NextRequest } from 'next/server'
import { db } from '@/lib/firebase/config'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import {
  authenticateRequest,
  createSuccessResponse,
  logRequest,
} from '@/app/api/v1/middleware'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/zapier/triggers/projects/completed
 * Zapier polling trigger for completed projects
 */
export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request, ['read:projects'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth

  try {
    // Get recently completed projects
    const projectsRef = collection(db, 'projects')
    const q = query(
      projectsRef,
      where('userId', '==', apiKey.userId),
      where('status', '==', 'completed'),
      orderBy('completedAt', 'desc'),
      limit(100)
    )

    const snapshot = await getDocs(q)
    const projects = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        githubRepo: data.githubRepo || '',
        liveUrl: data.liveUrl || '',
        techStack: data.techStack || [],
        completedAt: data.completedAt || data.updatedAt,
      }
    })

    await logRequest(request, apiKey.id, 200)

    // Zapier expects an array
    return createSuccessResponse(projects)
  } catch (error) {
    apiLogger.apiError('zapier/triggers/projects/completed', 'Failed to get completed projects for Zapier', error)
    await logRequest(request, apiKey.id, 500)
    return createSuccessResponse([]) // Return empty array on error for Zapier
  }
}
