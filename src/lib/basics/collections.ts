/**
 * Firestore Collection Names
 * 
 * Centralized collection name constants to prevent typos and enable easy refactoring
 */

export const Collections = {
  USER_BASICS_PROGRESS: 'userBasicsProgress',
  BASICS_ENGAGEMENT: 'basicsEngagement',
  BASICS_READING_ALOUD_ATTEMPTS: 'basics-reading-aloud-attempts',
  BASICS_WORD_LEARNING_ATTEMPTS: 'basics-word-learning-attempts',
  VIDEO_EXPLANATIONS: 'videoExplanations',
  CLAIMED_REWARDS: 'claimedRewards',
  NOTIFICATIONS: 'notifications',
  REWARD_FULFILLMENT_TASKS: 'rewardFulfillment',
  CHALLENGE_PARTICIPANTS: 'challengeParticipants',
  VIRAL_CHALLENGES: 'viralChallenges',
  ENGAGEMENT_SESSIONS: 'engagementSessions',
  PARENT_REPORTS: 'parentReports',
  USERS: 'users',
} as const

