import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { getReferenceUnit } from '@/data/basics/references'
import { apiLogger } from '@/lib/logger'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { sectionId, unitId } = body

    if (!sectionId || !unitId) {
      apiLogger.validationError('unlock-content', 'Missing required params')
      return NextResponse.json(
        { success: false, error: 'sectionId and unitId are required' },
        { status: 400 }
      )
    }

    // Verify the unit exists
    const unit = getReferenceUnit(sectionId, unitId)
    if (!unit) {
      apiLogger.validationError('unlock-content', 'Unit not found', {
        sectionId,
        unitId,
      })
      return NextResponse.json(
        {
          success: false,
          error: `Reference unit not found: ${sectionId}/${unitId}`,
        },
        { status: 404 }
      )
    }

    // Server-determine cost from reference data (never trust client-supplied cost)
    const xpCost = unit.xpCost ?? 5

    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Check if already unlocked
    const unlockedContentRef = db
      .collection('users')
      .doc(userId)
      .collection('unlockedContent')
      .doc('units')

    const existingDoc = await unlockedContentRef.get()

    if (existingDoc.exists) {
      const docData = existingDoc.data()
      if (docData?.unlockedUnits?.includes(unitId)) {
        // Already unlocked - return success without charging
        return NextResponse.json({
          success: true,
          data: {
            alreadyUnlocked: true,
            xpCharged: 0,
            message: 'Content already unlocked',
          },
        })
      }
    }

    // Skip prerequisites check - all units are now accessible
    // Check user's XP balance from userBasicsProgress (where problem-solving XP is stored)
    const progressRef = db.collection('userBasicsProgress').doc(userId)
    const progressDoc = await progressRef.get()

    // Get total XP from both math and reading progress
    let currentXp = 0
    if (progressDoc.exists) {
      const progressData = progressDoc.data()
      const mathXP = progressData?.math?.totalXP || 0
      const readingXP = progressData?.reading?.totalXP || 0
      currentXp = mathXP + readingXP
    }

    // If xpCost is 0, allow free unlock (for intro units)
    if (xpCost > 0 && currentXp < xpCost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Insufficient XP',
          data: {
            required: xpCost,
            available: currentXp,
          },
        },
        { status: 400 }
      )
    }

    // Record the unlock and deduct XP from totalXP in progress
    const now = new Date()

    try {
      // Deduct XP from user's progress (split between math and reading, prioritize the one with more)
      if (xpCost > 0 && progressDoc.exists) {
        const progressData = progressDoc.data()
        const mathXP = progressData?.math?.totalXP || 0
        const readingXP = progressData?.reading?.totalXP || 0

        // Deduct from the subject with more XP, or split if needed
        if (mathXP >= xpCost) {
          await progressRef.update({
            'math.totalXP': FieldValue.increment(-xpCost),
            totalXpSpentOnUnlocks: FieldValue.increment(xpCost),
          })
        } else if (readingXP >= xpCost) {
          await progressRef.update({
            'reading.totalXP': FieldValue.increment(-xpCost),
            totalXpSpentOnUnlocks: FieldValue.increment(xpCost),
          })
        } else {
          // Split the cost between both subjects
          const fromMath = Math.min(mathXP, xpCost)
          const fromReading = xpCost - fromMath
          await progressRef.update({
            'math.totalXP': FieldValue.increment(-fromMath),
            'reading.totalXP': FieldValue.increment(-fromReading),
            totalXpSpentOnUnlocks: FieldValue.increment(xpCost),
          })
        }
      }

      // Record the unlock
      if (existingDoc.exists) {
        await unlockedContentRef.update({
          unlockedUnits: FieldValue.arrayUnion(unitId),
          [`unlockedAt.${unitId}`]: now,
          totalXpSpent: FieldValue.increment(xpCost),
        })
      } else {
        await unlockedContentRef.set({
          unlockedUnits: [unitId],
          unlockedAt: { [unitId]: now },
          totalXpSpent: xpCost,
        })
      }
    } catch (dbError) {
      apiLogger.apiError('unlock-content', 'Database error', dbError)
      throw dbError
    }

    return NextResponse.json({
      success: true,
      data: {
        alreadyUnlocked: false,
        xpCharged: xpCost,
        newXpBalance: Math.max(0, currentXp - xpCost),
        message: 'Content unlocked successfully',
        unit: {
          id: unit.id,
          title: unit.title,
        },
      },
    })
  } catch (error) {
    return serverError(error, 'Failed to unlock content')
  }
}

// GET endpoint to fetch unlocked units
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('sectionId')

    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const unlockedContentRef = db
      .collection('users')
      .doc(userId)
      .collection('unlockedContent')
      .doc('units')

    const doc = await unlockedContentRef.get()

    if (!doc.exists) {
      return NextResponse.json({
        success: true,
        data: {
          unlockedUnits: [],
          totalXpSpent: 0,
        },
      })
    }

    const docData = doc.data()
    let unlockedUnits = docData?.unlockedUnits || []

    // If sectionId provided, filter to just units from that section
    if (sectionId) {
      unlockedUnits = unlockedUnits.filter((unitId: string) =>
        unitId.startsWith(`${sectionId}-`)
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        unlockedUnits,
        unlockedAt: docData?.unlockedAt || {},
        totalXpSpent: docData?.totalXpSpent || 0,
      },
    })
  } catch (error) {
    return serverError(error, 'Failed to fetch unlocked content')
  }
}
