/**
 * Companion CRUD API
 * 
 * GET /api/basics/companion - Load all companions for user
 * POST /api/basics/companion - Save all companions for user
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'

type Subject = 'math' | 'reading' | 'latin' | 'greek' | 'logic'

interface SubjectCompanion {
  subject: Subject
  name: string
  currentEmoji: string
  description: string
  personality: string
  specialAbility: string
  catchphrase: string
  evolutionHistory: Array<{ stage: string; achievedAt: string; xpThreshold: number }>
  level: number
  xp: number
  xpToNextLevel: number
  hunger: number
  happiness: number
  energy: number
  totalFed: number
  totalPlayed: number
  lastCaredAt: number
  adoptedAt: number
  freeHints: number
  freeExplanations: number
  hasStreakShield: boolean
  hasSkipProtection: boolean
  pendingEvolution: boolean
  avatarUrl?: string
  selectedElement?: string
  selectedStyle?: string
}

// GET - Load companions
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    if (!db) {
      return successResponse({ companions: null, source: 'no-db' })
    }

    const docRef = db.collection('userCompanions').doc(authResult.userId)
    const doc = await docRef.get()

    if (!doc.exists) {
      return successResponse({ companions: null, source: 'not-found' })
    }

    const data = doc.data()
    return successResponse({ 
      companions: data?.companions || null,
      source: 'firestore'
    })

  } catch (error) {
    apiLogger.apiError('companion', 'GET Error', error)
    return serverError(error, 'Failed to load companions')
  }
}

// POST - Save companions
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const { companions } = body

    if (!companions) {
      return successResponse({ saved: false, reason: 'no-companions' })
    }

    if (!db) {
      return successResponse({ saved: false, reason: 'no-db' })
    }

    const docRef = db.collection('userCompanions').doc(authResult.userId)
    
    await docRef.set({
      userId: authResult.userId,
      companions,
      updatedAt: new Date().toISOString()
    }, { merge: true })

    return successResponse({ saved: true })

  } catch (error) {
    apiLogger.apiError('companion', 'POST Error', error)
    return serverError(error, 'Failed to save companions')
  }
}




