/**
 * Metacognitive Support System for Ludwitt Basics
 * 
 * Implements strategy instruction, self-regulation scaffolding, and reciprocal teaching
 * to develop students' metacognitive awareness and self-regulated learning.
 */

import { METACOGNITIVE_THRESHOLDS } from './constants'

export interface MetacognitivePrompt {
  id: string
  phase: 'pre-activity' | 'during-activity' | 'post-activity'
  prompt: string
  purpose: string
  expectedResponse: string
  followUpQuestions?: string[]
  adaptiveConditions?: string[]  // When to show this prompt
}

export interface ReciprocalTeachingActivity {
  activityType: 'questioning' | 'summarizing' | 'clarifying' | 'predicting'
  prompt: string
  scaffolds: string[]
  modelResponse?: string
  evaluationCriteria: string[]
}

export interface MetacognitiveSession {
  userId: string
  problemId: string
  subject: 'math' | 'reading'
  preActivityResponses: Record<string, string>
  duringActivityActions: Array<{
    timestamp: Date
    action: string
    response?: string
  }>
  postActivityReflection: Record<string, string>
  strategiesUsed: string[]
  selfAssessment: {
    difficultyRating: number      // 1-5 scale
    confidenceLevel: number       // 1-5 scale
    strategyEffectiveness: Record<string, number>
    wouldDoAgain: string[]
  }
  metacognitiveGrowth: {
    planningQuality: number       // 0-1 scale
    monitoringFrequency: number   // 0-1 scale
    reflectionDepth: number       // 0-1 scale
  }
}

/**
 * Generate metacognitive prompts based on problem type and student level
 */
export function generateMetacognitivePrompts(
  subject: 'math' | 'reading',
  problemType: string,
  difficultyLevel: number,
  studentMetacognitiveLevel: number
): {
  preActivity: MetacognitivePrompt[]
  duringActivity: MetacognitivePrompt[]
  postActivity: MetacognitivePrompt[]
} {
  const preActivity: MetacognitivePrompt[] = []
  const duringActivity: MetacognitivePrompt[] = []
  const postActivity: MetacognitivePrompt[] = []

  // Base prompts for all students
  preActivity.push({
    id: 'activate-prior-knowledge',
    phase: 'pre-activity',
    prompt: 'What do you already know about this type of problem?',
    purpose: 'Activate prior knowledge and make connections',
    expectedResponse: 'Student reflects on relevant prior knowledge',
    followUpQuestions: ['How is this similar to problems you\'ve solved before?']
  })

  preActivity.push({
    id: 'predict-difficulty',
    phase: 'pre-activity',
    prompt: 'How challenging do you think this problem will be for you? (1=very easy, 5=very hard)',
    purpose: 'Develop self-awareness of task difficulty',
    expectedResponse: 'Numeric rating with brief explanation'
  })

  preActivity.push({
    id: 'plan-approach',
    phase: 'pre-activity',
    prompt: 'What strategy or approach will you try first?',
    purpose: 'Encourage strategic planning',
    expectedResponse: 'Named strategy with brief rationale'
  })

  // During-activity prompts
  duringActivity.push({
    id: 'monitor-progress',
    phase: 'during-activity',
    prompt: 'How is your current approach working?',
    purpose: 'Encourage self-monitoring',
    expectedResponse: 'Assessment of strategy effectiveness',
    adaptiveConditions: ['Show after 2 minutes of work', 'Show after first error']
  })

  duringActivity.push({
    id: 'strategy-check',
    phase: 'during-activity',
    prompt: 'Should you continue with this strategy or try something different?',
    purpose: 'Promote strategic flexibility',
    expectedResponse: 'Decision about strategy continuation',
    adaptiveConditions: ['Show if student seems stuck', 'Show after multiple errors']
  })

  // Post-activity prompts
  postActivity.push({
    id: 'reflect-difficulty',
    phase: 'post-activity',
    prompt: 'How difficult was this problem compared to what you predicted?',
    purpose: 'Develop calibration skills',
    expectedResponse: 'Comparison of predicted vs actual difficulty'
  })

  postActivity.push({
    id: 'identify-challenges',
    phase: 'post-activity',
    prompt: 'What was the most challenging part of this problem?',
    purpose: 'Identify specific learning challenges',
    expectedResponse: 'Specific aspect that was difficult'
  })

  postActivity.push({
    id: 'strategy-effectiveness',
    phase: 'post-activity',
    prompt: 'Which strategy or approach worked best for you?',
    purpose: 'Reflect on strategy effectiveness',
    expectedResponse: 'Strategy identification with evaluation'
  })

  // Advanced prompts for higher metacognitive levels
  if (studentMetacognitiveLevel > METACOGNITIVE_THRESHOLDS.ADVANCED) {
    postActivity.push({
      id: 'transfer-thinking',
      phase: 'post-activity',
      prompt: 'How could you use what you learned here on other similar problems?',
      purpose: 'Promote transfer and generalization',
      expectedResponse: 'Connection to other problem types or contexts'
    })

    postActivity.push({
      id: 'alternative-approaches',
      phase: 'post-activity',
      prompt: 'Can you think of a different way you could have solved this problem?',
      purpose: 'Encourage flexible thinking',
      expectedResponse: 'Alternative solution strategy'
    })
  }

  // Subject-specific prompts
  if (subject === 'math') {
    duringActivity.push({
      id: 'math-sense-check',
      phase: 'during-activity',
      prompt: 'Does your answer so far make sense? Why or why not?',
      purpose: 'Develop number sense and reasonableness checking',
      expectedResponse: 'Evaluation of answer reasonableness'
    })

    postActivity.push({
      id: 'math-check-work',
      phase: 'post-activity',
      prompt: 'How can you check if your answer is correct?',
      purpose: 'Develop self-checking strategies',
      expectedResponse: 'Strategy for verifying the answer'
    })
  } else if (subject === 'reading') {
    duringActivity.push({
      id: 'reading-comprehension-check',
      phase: 'during-activity',
      prompt: 'Do you understand what you just read? If not, what can you do?',
      purpose: 'Monitor comprehension',
      expectedResponse: 'Comprehension status and fix-up strategy if needed'
    })

    postActivity.push({
      id: 'reading-connection',
      phase: 'post-activity',
      prompt: 'How does this text connect to your own life or other things you\'ve read?',
      purpose: 'Make personal connections',
      expectedResponse: 'Personal or intertextual connection'
    })
  }

  return {
    preActivity,
    duringActivity,
    postActivity
  }
}














