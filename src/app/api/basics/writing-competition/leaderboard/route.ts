import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { getQueryParam } from '@/lib/api/request-helpers'
import { getCurrentCompetition, getSubmissionsByGrade, getPastWinners, getUserGradeLevel } from '@/lib/basics/writing-competition-service'
import { GetLeaderboardResponse, LeaderboardEntry } from '@/lib/types/writing-competition'
import { batchFetchUserProfiles } from '@/lib/utils/firestore-helpers'
import { getAvatarById } from '@/data/avatars'

export async function GET(request: NextRequest) {
  apiLogger.routeCall('writing-competition/leaderboard')
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult
    
    const gradeLevelParam = getQueryParam(request, 'gradeLevel')
    const competitionIdParam = getQueryParam(request, 'competitionId')
    const gradeLevel = gradeLevelParam ? parseInt(gradeLevelParam, 10) : await getUserGradeLevel(userId)
    
    const competition = await getCurrentCompetition()
    let currentStandings: LeaderboardEntry[] = []
    let currentUserSubmission: LeaderboardEntry | null = null
    
    if (competition) {
      const targetCompetitionId = competitionIdParam || competition.id
      const submissions = await getSubmissionsByGrade(targetCompetitionId, gradeLevel)
      
      // Fetch user profiles to get avatar info
      const userIds = submissions.map(s => s.userId)
      const profileMap = userIds.length > 0 ? await batchFetchUserProfiles(userIds) : new Map()
      
      currentStandings = submissions.map((sub, index) => {
        const profile = profileMap.get(sub.userId)
        const avatar = profile?.avatar
        let avatarEmoji: string | undefined
        let characterId: string | undefined
        let photoURL: string | undefined
        
        if (avatar?.type === 'character' && avatar.characterId) {
          characterId = avatar.characterId
          const avatarData = getAvatarById(avatar.characterId)
          avatarEmoji = avatarData?.emoji
        } else if (avatar?.type === 'photo' && avatar.photoURL) {
          photoURL = avatar.photoURL
        }
        
        const entry: LeaderboardEntry = {
          rank: index + 1,
          userId: sub.userId,
          displayName: sub.userDisplayName,
          gradeLevel: sub.gradeLevel,
          submittedAt: sub.submittedAt,
          isWinner: sub.isWinner,
          avatarEmoji,
          characterId,
          photoURL,
        }
        
        // Track current user's submission
        if (sub.userId === userId) {
          currentUserSubmission = entry
        }
        
        return entry
      })
    }
    
    const pastWinners = await getPastWinners(gradeLevel, 10)
    
    const response: GetLeaderboardResponse = { 
      success: true, 
      data: { 
        currentStandings, 
        pastWinners, 
        totalParticipants: currentStandings.length,
        currentUserSubmission 
      } 
    }
    return NextResponse.json(response)
  } catch (error) {
    apiLogger.apiError('writing-competition/leaderboard', 'Failed to fetch leaderboard', { error })
    return NextResponse.json({ success: false, error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}

