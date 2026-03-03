// Achievement definitions for Ludwitt gamification

export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  points: number
  category: 'builder' | 'social' | 'mentor' | 'milestone'
  requirement: {
    type: 'count' | 'streak' | 'milestone'
    target: number
    metric: string
  }
}

export const ACHIEVEMENTS: Achievement[] = [
  // Builder Achievements
  {
    id: 'first_project',
    title: 'First Steps',
    description: 'Complete your first project',
    emoji: '🎯',
    points: 100,
    category: 'builder',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'projects_completed',
    },
  },
  {
    id: 'project_master',
    title: 'Project Master',
    description: 'Complete 10 projects',
    emoji: '🏆',
    points: 500,
    category: 'builder',
    requirement: {
      type: 'count',
      target: 10,
      metric: 'projects_completed',
    },
  },
  {
    id: 'portfolio_creator',
    title: 'Portfolio Creator',
    description: 'Create your first portfolio item',
    emoji: '📁',
    points: 150,
    category: 'builder',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'portfolio_items',
    },
  },
  {
    id: 'portfolio_master',
    title: 'Portfolio Master',
    description: 'Add 5 items to your portfolio',
    emoji: '🎨',
    points: 400,
    category: 'builder',
    requirement: {
      type: 'count',
      target: 5,
      metric: 'portfolio_items',
    },
  },
  {
    id: 'week_streak',
    title: 'Week Warrior',
    description: 'Log in for 7 consecutive days',
    emoji: '🔥',
    points: 300,
    category: 'milestone',
    requirement: {
      type: 'streak',
      target: 7,
      metric: 'login_streak',
    },
  },
  {
    id: 'month_streak',
    title: 'Consistency King',
    description: 'Log in for 30 consecutive days',
    emoji: '👑',
    points: 1000,
    category: 'milestone',
    requirement: {
      type: 'streak',
      target: 30,
      metric: 'login_streak',
    },
  },

  // Social Achievements
  {
    id: 'first_follower',
    title: 'First Fan',
    description: 'Get your first follower',
    emoji: '👋',
    points: 50,
    category: 'social',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'followers',
    },
  },
  {
    id: 'popular',
    title: 'Popular Builder',
    description: 'Reach 50 followers',
    emoji: '⭐',
    points: 500,
    category: 'social',
    requirement: {
      type: 'count',
      target: 50,
      metric: 'followers',
    },
  },
  {
    id: 'influencer',
    title: 'Influencer',
    description: 'Reach 100 followers',
    emoji: '🌟',
    points: 1000,
    category: 'social',
    requirement: {
      type: 'count',
      target: 100,
      metric: 'followers',
    },
  },
  {
    id: 'first_kudos',
    title: 'Appreciated',
    description: 'Receive your first kudos',
    emoji: '💖',
    points: 100,
    category: 'social',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'kudos_received',
    },
  },
  {
    id: 'reaction_giver',
    title: 'Supporter',
    description: 'Give 50 reactions to others',
    emoji: '🎉',
    points: 200,
    category: 'social',
    requirement: {
      type: 'count',
      target: 50,
      metric: 'reactions_given',
    },
  },

  // Mentor Achievements
  {
    id: 'first_service',
    title: 'Service Provider',
    description: 'List your first service in the marketplace',
    emoji: '💼',
    points: 200,
    category: 'mentor',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'services_listed',
    },
  },
  {
    id: 'first_sale',
    title: 'First Sale',
    description: 'Complete your first service sale',
    emoji: '💰',
    points: 500,
    category: 'mentor',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'services_sold',
    },
  },
  {
    id: 'helpful_mentor',
    title: 'Helpful Mentor',
    description: 'Receive 10 kudos for being helpful',
    emoji: '🤝',
    points: 400,
    category: 'mentor',
    requirement: {
      type: 'count',
      target: 10,
      metric: 'helpful_kudos',
    },
  },
  {
    id: 'top_earner',
    title: 'Top Earner',
    description: 'Earn $1,000 from services',
    emoji: '💎',
    points: 2000,
    category: 'mentor',
    requirement: {
      type: 'milestone',
      target: 1000,
      metric: 'total_earnings',
    },
  },

  // Milestone Achievements
  {
    id: 'joined_cohort',
    title: 'Team Player',
    description: 'Join your first cohort',
    emoji: '👥',
    points: 150,
    category: 'milestone',
    requirement: {
      type: 'count',
      target: 1,
      metric: 'cohorts_joined',
    },
  },
  {
    id: 'premium_member',
    title: 'Premium Member',
    description: 'Subscribe to a premium plan',
    emoji: '💎',
    points: 300,
    category: 'milestone',
    requirement: {
      type: 'milestone',
      target: 1,
      metric: 'premium_subscription',
    },
  },
  {
    id: 'early_adopter',
    title: 'Early Adopter',
    description: 'Join Ludwitt in the first month',
    emoji: '🚀',
    points: 1000,
    category: 'milestone',
    requirement: {
      type: 'milestone',
      target: 1,
      metric: 'early_adopter',
    },
  },
]

// Helper function to get achievement by ID
export function getAchievement(achievementId: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === achievementId)
}

// Helper function to get achievements by category
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.category === category)
}
