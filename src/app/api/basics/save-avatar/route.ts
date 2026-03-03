import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields, validateStringLength } from '@/lib/api/validators'
import { formatDisplayName } from '@/lib/utils/user-helpers'
import { truncate } from '@/lib/utils/string-helpers'
import { Collections } from '@/lib/basics/collections'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { apiLogger } from '@/lib/logger'
import { auth, db } from '@/lib/firebase/admin'

/**
 * API Route: POST /api/basics/save-avatar
 * Saves user's avatar selection for leaderboard participation
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    // Get request body
    const body = await request.json()
    const { birthDate, isOver18, country, region, avatarType, characterId, nickname } = body

    // Validation
    const requiredFieldsError = validateRequiredFields(body, ['birthDate', 'region'])
    if (requiredFieldsError) return requiredFieldsError
    
    // Country is optional for backwards compatibility but we prefer it
    const countryValidation = country ? null : null // Accept empty for backwards compat
    if (requiredFieldsError) return requiredFieldsError

    // Validation for under-18 users
    if (!isOver18) {
      if (!characterId) {
        return badRequestError('Avatar selection is required for users under 18')
      }
      if (nickname) {
        const nicknameError = validateStringLength(nickname, 1, 20, 'nickname')
        if (nicknameError) return nicknameError
      } else {
        return badRequestError('Nickname is required for users under 18')
      }
    }

    // Validation for over-18 users
    if (isOver18) {
      // Over-18 users must either use photo OR select a character
      if (avatarType !== 'photo' && !characterId) {
        return badRequestError('Please select either your photo or a character avatar')
      }
    }

    // Prepare avatar data
    const avatarData: Record<string, unknown> = {
      type: avatarType || (isOver18 && !characterId ? 'photo' : 'character'),
      createdAt: createISOTimestamp(),
      isCompleted: true
    }

    if (isOver18 && avatarType === 'photo') {
      // Over 18 using real photo - we'll use their existing photoURL and displayName from auth
      avatarData.photoURL = decodedToken.picture || null
      avatarData.displayName = formatDisplayName(
        { displayName: decodedToken.name, email: decodedToken.email },
        userId
      )
    } else {
      // Using avatar character (for both under-18 and over-18 who chose character)
      if (!characterId) {
        return badRequestError('Character ID is required when using character avatar')
      }
      avatarData.characterId = characterId
      if (nickname && nickname.trim()) {
        avatarData.nickname = truncate(nickname.trim(), 20) // Enforce max length
      } else if (!isOver18) {
        // Under-18 must have nickname
        return badRequestError('Nickname is required for users under 18')
      }
    }

    // Save to user document
    const userRef = db.collection(Collections.USERS).doc(userId)
    const saveData: Record<string, any> = {
      avatar: avatarData,
      region: region, // Save region for leaderboard filtering
      ageVerification: {
        birthDate,
        isOver18,
        verifiedAt: createISOTimestamp()
      },
      updatedAt: createISOTimestamp()
    }
    
    // Add country if provided
    if (country) {
      saveData.country = country
    }
    
    // Use set with merge to ensure all fields are saved
    await userRef.set(saveData, { merge: true })

    // Verify the save was successful with retry logic
    let verifyDoc = await userRef.get()
    let retries = 0
    const maxRetries = 3
    
    while (retries < maxRetries && (!verifyDoc.exists || !verifyDoc.data()?.avatar?.isCompleted)) {
      if (retries > 0) {
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 200 * retries))
      }
      verifyDoc = await userRef.get()
      retries++
    }
    
    if (!verifyDoc.exists) {
      apiLogger.apiError('save-avatar', 'User document does not exist after save', { userId })
      throw new Error('Failed to verify avatar save - user document not found')
    }
    
    const savedData = verifyDoc.data()
    if (!savedData?.avatar?.isCompleted) {
      apiLogger.apiError('save-avatar', 'Avatar isCompleted flag not set', { 
        userId, 
        savedData: savedData?.avatar 
      })
      throw new Error('Avatar save verification failed - isCompleted flag not set')
    }

    apiLogger.success('save-avatar', 'Avatar saved successfully', { data: { userId, avatarData } })

    return successResponse({
      avatar: avatarData
    })

  } catch (error) {
    return serverError(error, 'Failed to save avatar')
  }
}

