/**
 * Logic Progress API
 * 
 * GET - Load logic progress from Firebase
 * POST - Save logic progress to Firebase
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { awardXP } from '@/lib/basics/xp-service'
import { apiLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    if (!db) {
      return successResponse({ progress: null })
    }

    const progressDoc = await db.collection('users').doc(userId)
      .collection('logic_progress').doc('progress').get()

    if (!progressDoc.exists) {
      return successResponse({ progress: null })
    }

    return successResponse({ progress: progressDoc.data() })
  } catch (error) {
    apiLogger.apiError('logic/progress', 'GET Error', error)
    return serverError(error, 'Failed to load logic progress')
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { 
      streak, 
      totalCompleted, 
      totalXP, 
      currentUnit, 
      completedIds, 
      unitProgress,
      xpDelta, // XP earned in this session to add
      problemId,
      problemDifficulty
    } = body

    if (!db) {
      return successResponse({ success: true, message: 'No database available' })
    }

    const progressRef = db.collection('users').doc(userId)
      .collection('logic_progress').doc('progress')

    const progressDoc = await progressRef.get()

    if (progressDoc.exists) {
      // Update existing progress
      const updateData: Record<string, any> = {
        lastUpdated: FieldValue.serverTimestamp()
      }

      // If xpDelta is provided, increment XP
      if (xpDelta && xpDelta > 0) {
        updateData.totalXP = FieldValue.increment(xpDelta)
        updateData.totalCompleted = FieldValue.increment(1)
      }
      
      // Always update streak and unit info
      if (streak !== undefined) updateData.streak = streak
      if (currentUnit !== undefined) updateData.currentUnit = currentUnit
      if (completedIds !== undefined) {
        // Merge completed IDs, keep last 500
        const existing = progressDoc.data()?.completedIds || []
        const merged = [...new Set([...existing, ...completedIds])].slice(-500)
        updateData.completedIds = merged
      }
      if (unitProgress !== undefined) updateData.unitProgress = unitProgress

      await progressRef.update(updateData)
      
      // Award XP atomically — awardXP handles totalXP, dailyXP, xpHistory,
      // subject XP, and the transaction record in a single Firestore transaction.
      if (xpDelta && xpDelta > 0) {
        await awardXP({
          userId,
          source: 'logic',
          baseXP: xpDelta,
          costsIncurred: 0,
          problemId,
          details: {
            isCorrect: true
          }
        })
      }
    } else {
      // Create new progress document
      await progressRef.set({
        streak: streak || 0,
        totalCompleted: totalCompleted || 0,
        totalXP: totalXP || 0,
        currentUnit: currentUnit || 1,
        completedIds: completedIds || [],
        unitProgress: unitProgress || {},
        createdAt: FieldValue.serverTimestamp(),
        lastUpdated: FieldValue.serverTimestamp()
      })
      
      // Award XP atomically (same as existing-progress path above)
      if (xpDelta && xpDelta > 0) {
        await awardXP({
          userId,
          source: 'logic',
          baseXP: xpDelta,
          costsIncurred: 0,
          problemId,
          details: {
            isCorrect: true
          }
        })
      }
    }

    return successResponse({ success: true })
  } catch (error) {
    apiLogger.apiError('logic/progress', 'POST Error', error)
    return serverError(error, 'Failed to save logic progress')
  }
}

