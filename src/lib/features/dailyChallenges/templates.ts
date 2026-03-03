/**
 * Daily Challenge Templates
 * Defines the types of challenges that can be generated
 */

import { ChallengeTemplate } from './types'

export const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  // Basics Challenges
  {
    type: 'basics_math',
    title: 'Math Practice',
    description: 'Solve {target} math problems',
    getTarget: (level) => Math.max(3, Math.min(10, Math.floor(level / 2) + 3)),
    xpReward: 50,
    icon: '🔢',
  },
  {
    type: 'basics_reading',
    title: 'Reading Comprehension',
    description: 'Complete {target} reading exercises',
    getTarget: (level) => Math.max(2, Math.min(5, Math.floor(level / 3) + 2)),
    xpReward: 50,
    icon: '📚',
  },
  
  // ALC Challenges (only if Vercel complete)
  {
    type: 'alc_project',
    title: 'Project Progress',
    description: 'Spend {target} minutes working on your project',
    getTarget: () => 30,
    xpReward: 75,
    icon: '💻',
    requiredProgress: {
      vercelDeploymentComplete: true,
    },
  },
  
  // Profile & Social Challenges
  {
    type: 'profile',
    title: 'Build Your Brand',
    description: 'Add {target} new skill(s) to your profile',
    getTarget: () => 1,
    xpReward: 25,
    icon: '⭐',
  },
  {
    type: 'social',
    title: 'Help Others',
    description: 'Help {target} cohort member(s)',
    getTarget: () => 1,
    xpReward: 40,
    icon: '🤝',
    requiredProgress: {
      vercelDeploymentComplete: true,
    },
  },
  
  // Learning Time Challenge (always available)
  {
    type: 'learning_time',
    title: 'Consistent Learning',
    description: 'Spend {target} minutes learning today',
    getTarget: () => 20,
    xpReward: 30,
    icon: '⏰',
  },
]

/**
 * Get challenges applicable to a user based on their progress
 */
export function getApplicableChallenges(
  cursorSetupComplete: boolean,
  vercelDeploymentComplete: boolean
): ChallengeTemplate[] {
  return CHALLENGE_TEMPLATES.filter(template => {
    // If no requirements, always include
    if (!template.requiredProgress) return true
    
    // Check each requirement
    if (template.requiredProgress.cursorSetupComplete && !cursorSetupComplete) {
      return false
    }
    if (template.requiredProgress.vercelDeploymentComplete && !vercelDeploymentComplete) {
      return false
    }
    
    return true
  })
}

/**
 * Select 3-5 random challenges from applicable ones
 */
export function generateDailyChallenges(
  userLevel: number,
  cursorSetupComplete: boolean,
  vercelDeploymentComplete: boolean
): ChallengeTemplate[] {
  const applicable = getApplicableChallenges(cursorSetupComplete, vercelDeploymentComplete)
  
  // Always include at least one Basics challenge
  const basicsTemplates = applicable.filter(t => 
    t.type === 'basics_math' || t.type === 'basics_reading'
  )
  
  // Other templates
  const otherTemplates = applicable.filter(t => 
    t.type !== 'basics_math' && t.type !== 'basics_reading'
  )
  
  const selected: ChallengeTemplate[] = []
  
  // Add 1-2 Basics challenges
  if (basicsTemplates.length > 0) {
    selected.push(basicsTemplates[Math.floor(Math.random() * basicsTemplates.length)])
    if (basicsTemplates.length > 1 && Math.random() > 0.5) {
      const second = basicsTemplates.find(t => !selected.includes(t))
      if (second) selected.push(second)
    }
  }
  
  // Add 2-3 other challenges
  const shuffled = otherTemplates.sort(() => Math.random() - 0.5)
  selected.push(...shuffled.slice(0, Math.min(3, shuffled.length)))
  
  return selected.slice(0, 5) // Max 5 challenges per day
}

