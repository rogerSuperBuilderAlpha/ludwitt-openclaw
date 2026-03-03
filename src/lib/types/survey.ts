export type QuestionType = 'multiple-choice' | 'text' | 'rating' | 'yes-no'

export interface SurveyQuestion {
  id: string
  question: string
  type: QuestionType
  required?: boolean
  options?: string[] // For multiple-choice
  maxRating?: number // For rating (default 5)
}

export interface Survey {
  id: string
  title: string
  description?: string
  questions: SurveyQuestion[]
}

export interface SurveyResponse {
  surveyId: string
  userId: string
  responses: {
    [questionId: string]: string | number
  }
  completedAt: string
}

// Survey IDs for the learning journey
export const SURVEY_IDS = {
  POST_GITHUB: 'post-github-login',
  POST_CURSOR: 'post-cursor-setup',
  POST_WEBSITE: 'post-personal-website',
  POST_VERCEL: 'post-vercel-deployment',
  PRE_CUSTOM_PROJECT: 'pre-custom-project',
  TT_ACADEMIC_LIFE: 'tt-academic-life',
  // Claude Code path
  POST_CLAUDE_CODE: 'post-claude-code-setup',
  POST_TWEET_FUNCTION: 'post-tweet-function',
  // OpenClaw path
  POST_OPENCLAW: 'post-openclaw-setup',
  POST_OPENCLAW_WEBSITE: 'post-openclaw-website',
  // Open source PR
  POST_OPENSOURCE_PR: 'post-opensource-pr',
} as const
