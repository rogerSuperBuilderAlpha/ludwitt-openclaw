import { NextRequest, NextResponse } from 'next/server'
import { db, auth } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

interface CreatePortfolioItemRequest {
  projectId: string
  projectTitle: string
  brainliftUrl: string
  loomUrl: string
  githubUrl?: string
  liveUrl: string
  description: string
  technologies: string[]
  checklistCompletion: {[key: string]: boolean}
  completionPercentage: number
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const body: CreatePortfolioItemRequest = await request.json()
    const {
      projectId,
      projectTitle,
      brainliftUrl,
      loomUrl,
      githubUrl,
      liveUrl,
      description,
      technologies,
      checklistCompletion,
      completionPercentage,
    } = body

    if (!projectId || !projectTitle || !brainliftUrl || !loomUrl || !liveUrl || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!brainliftUrl.includes('workflowy.com')) {
      return NextResponse.json(
        { success: false, error: 'Brainlift URL must be a WorkFlowy link' },
        { status: 400 }
      )
    }

    if (!loomUrl.includes('loom.com')) {
      return NextResponse.json(
        { success: false, error: 'Video URL must be a Loom link' },
        { status: 400 }
      )
    }

    const userRecord = await auth.getUser(decodedToken.uid)
    const userName = userRecord.displayName || userRecord.email || 'Anonymous'

    const portfolioItemRef = await db.collection('portfolioItems').add({
      userId: decodedToken.uid,
      userName,
      projectId,
      projectTitle,
      brainliftUrl,
      loomUrl,
      githubUrl: githubUrl || null,
      liveUrl,
      description,
      technologies,
      checklistCompletion,
      completionPercentage,
      featured: false,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const portfolioRef = db.collection('userPortfolios').doc(decodedToken.uid)
    const portfolioDoc = await portfolioRef.get()

    if (portfolioDoc.exists) {
      await portfolioRef.update({
        itemCount: (portfolioDoc.data()?.itemCount || 0) + 1,
        updatedAt: new Date().toISOString(),
      })
    } else {
      await portfolioRef.set({
        userId: decodedToken.uid,
        userName,
        userEmail: userRecord.email || '',
        itemCount: 1,
        totalViews: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    apiLogger.success('portfolio/create', `Portfolio item created for ${userName} (${decodedToken.uid}): ${projectTitle}`)

    return NextResponse.json({
      success: true,
      portfolioItemId: portfolioItemRef.id,
      message: 'Portfolio item created successfully',
    })

  } catch (error) {
    apiLogger.apiError('portfolio/create', 'Failed to create portfolio item', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to create portfolio item' },
    { status: 405 }
  )
}
