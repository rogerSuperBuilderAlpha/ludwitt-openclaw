'use client'

/**
 * usePrerequisiteCheck Hook
 * 
 * Manages prerequisite checking before grade advancements.
 * Addresses learning science gap: learners lacking prerequisites fail confusingly.
 * 
 * Research: Zone of Proximal Development (Vygotsky) - optimal learning
 * happens when building on existing knowledge.
 * 
 * Trigger Points:
 * - When progress to next level >= 95%
 * - Before jumping more than 1 difficulty level
 * - When accuracy drops significantly on harder content
 */

import { useState, useCallback, useMemo } from 'react'
import { PrerequisiteCheckData, PrerequisiteSkill } from '@/components/basics/prerequisites/PrerequisiteCheck'

// Session key to avoid showing prerequisite check multiple times for same grade
const PREREQ_CHECK_KEY = 'pitch-rise-prerequisite-check-shown'

interface UsePrerequisiteCheckOptions {
  /** Callback when user chooses to review a specific skill */
  onReviewSkill?: (skillId: string, subject: string, skillName: string) => void
  /** Callback when user chooses to review all prerequisites */
  onReviewAll?: (skills: PrerequisiteSkill[]) => void
}

interface UsePrerequisiteCheckReturn {
  showCheck: boolean
  checkData: PrerequisiteCheckData | null
  triggerPrerequisiteCheck: (
    currentGrade: number,
    subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
    progressToNextLevel: number,
    accuracy?: number
  ) => boolean
  hidePrerequisiteCheck: () => void
  handleProceed: () => void
  handleReview: (skillId: string) => void
  handleReviewAll: () => void
  /** Get practice problem configuration for a skill */
  getPracticeConfig: (skillId: string) => { topic: string; grade: number; count: number } | null
}

// Prerequisites by grade and subject
const PREREQUISITES: Record<string, Record<number, PrerequisiteSkill[]>> = {
  math: {
    2: [
      { skillId: 'counting', skillName: 'Counting Numbers', subject: 'math', mastery: 0.9, status: 'mastered' },
      { skillId: 'addition-basic', skillName: 'Basic Addition', subject: 'math', mastery: 0.85, status: 'proficient' }
    ],
    3: [
      { skillId: 'addition', skillName: 'Addition & Subtraction', subject: 'math', mastery: 0.8, status: 'proficient' },
      { skillId: 'multiplication-intro', skillName: 'Intro to Multiplication', subject: 'math', mastery: 0.7, status: 'needs_review' }
    ],
    4: [
      { skillId: 'multiplication', skillName: 'Multiplication Tables', subject: 'math', mastery: 0.75, status: 'needs_review' },
      { skillId: 'division-basic', skillName: 'Basic Division', subject: 'math', mastery: 0.7, status: 'needs_review' }
    ],
    5: [
      { skillId: 'fractions-basic', skillName: 'Basic Fractions', subject: 'math', mastery: 0.8, status: 'proficient' },
      { skillId: 'decimals', skillName: 'Decimals', subject: 'math', mastery: 0.65, status: 'needs_review' }
    ],
    6: [
      { skillId: 'fractions-operations', skillName: 'Fraction Operations', subject: 'math', mastery: 0.7, status: 'needs_review' },
      { skillId: 'percentages', skillName: 'Percentages', subject: 'math', mastery: 0.6, status: 'needs_review' },
      { skillId: 'pre-algebra', skillName: 'Pre-Algebra Concepts', subject: 'math', mastery: 0.5, status: 'not_started' }
    ],
    7: [
      { skillId: 'algebra-basics', skillName: 'Basic Algebra', subject: 'math', mastery: 0.6, status: 'needs_review' },
      { skillId: 'ratios', skillName: 'Ratios & Proportions', subject: 'math', mastery: 0.55, status: 'needs_review' }
    ],
    8: [
      { skillId: 'linear-equations', skillName: 'Linear Equations', subject: 'math', mastery: 0.5, status: 'not_started' },
      { skillId: 'geometry-basics', skillName: 'Basic Geometry', subject: 'math', mastery: 0.6, status: 'needs_review' }
    ]
  },
  reading: {
    2: [
      { skillId: 'letter-recognition', skillName: 'Letter Recognition', subject: 'reading', mastery: 0.95, status: 'mastered' },
      { skillId: 'phonics-basic', skillName: 'Basic Phonics', subject: 'reading', mastery: 0.8, status: 'proficient' }
    ],
    3: [
      { skillId: 'sight-words', skillName: 'Sight Words', subject: 'reading', mastery: 0.85, status: 'proficient' },
      { skillId: 'fluency', skillName: 'Reading Fluency', subject: 'reading', mastery: 0.7, status: 'needs_review' }
    ],
    4: [
      { skillId: 'vocabulary', skillName: 'Vocabulary', subject: 'reading', mastery: 0.75, status: 'needs_review' },
      { skillId: 'comprehension-literal', skillName: 'Literal Comprehension', subject: 'reading', mastery: 0.8, status: 'proficient' }
    ],
    5: [
      { skillId: 'main-idea', skillName: 'Main Idea & Details', subject: 'reading', mastery: 0.7, status: 'needs_review' },
      { skillId: 'inference-basic', skillName: 'Basic Inference', subject: 'reading', mastery: 0.65, status: 'needs_review' }
    ],
    6: [
      { skillId: 'inference', skillName: 'Making Inferences', subject: 'reading', mastery: 0.6, status: 'needs_review' },
      { skillId: 'author-purpose', skillName: 'Author\'s Purpose', subject: 'reading', mastery: 0.55, status: 'needs_review' }
    ]
  },
  latin: {
    2: [
      { skillId: 'latin-alphabet', skillName: 'Latin Alphabet', subject: 'latin', mastery: 0.9, status: 'mastered' },
      { skillId: 'vocab-basic', skillName: 'Basic Vocabulary', subject: 'latin', mastery: 0.7, status: 'needs_review' }
    ],
    3: [
      { skillId: 'noun-declensions-1', skillName: '1st Declension Nouns', subject: 'latin', mastery: 0.6, status: 'needs_review' },
      { skillId: 'verb-present', skillName: 'Present Tense Verbs', subject: 'latin', mastery: 0.5, status: 'not_started' }
    ]
  },
  greek: {
    2: [
      { skillId: 'greek-alphabet', skillName: 'Greek Alphabet', subject: 'greek', mastery: 0.85, status: 'proficient' },
      { skillId: 'pronunciation', skillName: 'Pronunciation', subject: 'greek', mastery: 0.7, status: 'needs_review' }
    ],
    3: [
      { skillId: 'articles', skillName: 'Articles', subject: 'greek', mastery: 0.6, status: 'needs_review' },
      { skillId: 'noun-cases', skillName: 'Basic Noun Cases', subject: 'greek', mastery: 0.5, status: 'not_started' }
    ]
  },
  logic: {
    2: [
      { skillId: 'patterns', skillName: 'Pattern Recognition', subject: 'logic', mastery: 0.8, status: 'proficient' },
      { skillId: 'sequences', skillName: 'Sequences', subject: 'logic', mastery: 0.75, status: 'needs_review' }
    ]
  }
}

// Map skill IDs to practice configurations
const SKILL_PRACTICE_CONFIG: Record<string, { topic: string; grade: number; count: number }> = {
  // Math skills
  'counting': { topic: 'Counting', grade: 1, count: 5 },
  'addition-basic': { topic: 'Basic Addition', grade: 1, count: 5 },
  'addition': { topic: 'Addition & Subtraction', grade: 2, count: 5 },
  'multiplication-intro': { topic: 'Intro to Multiplication', grade: 2, count: 5 },
  'multiplication': { topic: 'Multiplication Tables', grade: 3, count: 5 },
  'division-basic': { topic: 'Basic Division', grade: 3, count: 5 },
  'fractions-basic': { topic: 'Basic Fractions', grade: 4, count: 5 },
  'decimals': { topic: 'Decimals', grade: 4, count: 5 },
  'fractions-operations': { topic: 'Fraction Operations', grade: 5, count: 5 },
  'percentages': { topic: 'Percentages', grade: 5, count: 5 },
  'pre-algebra': { topic: 'Pre-Algebra', grade: 5, count: 5 },
  'algebra-basics': { topic: 'Basic Algebra', grade: 6, count: 5 },
  'ratios': { topic: 'Ratios & Proportions', grade: 6, count: 5 },
  'linear-equations': { topic: 'Linear Equations', grade: 7, count: 5 },
  'geometry-basics': { topic: 'Basic Geometry', grade: 7, count: 5 },
  // Reading skills
  'letter-recognition': { topic: 'Letter Recognition', grade: 1, count: 5 },
  'phonics-basic': { topic: 'Basic Phonics', grade: 1, count: 5 },
  'sight-words': { topic: 'Sight Words', grade: 2, count: 5 },
  'fluency': { topic: 'Reading Fluency', grade: 2, count: 5 },
  'vocabulary': { topic: 'Vocabulary', grade: 3, count: 5 },
  'comprehension-literal': { topic: 'Literal Comprehension', grade: 3, count: 5 },
  'main-idea': { topic: 'Main Idea & Details', grade: 4, count: 5 },
  'inference-basic': { topic: 'Basic Inference', grade: 4, count: 5 },
  'inference': { topic: 'Making Inferences', grade: 5, count: 5 },
  'author-purpose': { topic: 'Author\'s Purpose', grade: 5, count: 5 },
  // Latin skills
  'latin-alphabet': { topic: 'Latin Alphabet', grade: 1, count: 5 },
  'vocab-basic': { topic: 'Basic Vocabulary', grade: 1, count: 5 },
  'noun-declensions-1': { topic: '1st Declension Nouns', grade: 2, count: 5 },
  'verb-present': { topic: 'Present Tense Verbs', grade: 2, count: 5 },
  // Greek skills  
  'greek-alphabet': { topic: 'Greek Alphabet', grade: 1, count: 5 },
  'pronunciation': { topic: 'Pronunciation', grade: 1, count: 5 },
  'articles': { topic: 'Articles', grade: 2, count: 5 },
  'noun-cases': { topic: 'Basic Noun Cases', grade: 2, count: 5 },
  // Logic skills
  'patterns': { topic: 'Pattern Recognition', grade: 1, count: 5 },
  'sequences': { topic: 'Sequences', grade: 1, count: 5 },
}

export function usePrerequisiteCheck(options: UsePrerequisiteCheckOptions = {}): UsePrerequisiteCheckReturn {
  const { onReviewSkill, onReviewAll } = options
  const [showCheck, setShowCheck] = useState(false)
  const [checkData, setCheckData] = useState<PrerequisiteCheckData | null>(null)

  // Check if we should trigger a prerequisite check
  const triggerPrerequisiteCheck = useCallback((
    currentGrade: number,
    subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
    progressToNextLevel: number,
    accuracy?: number
  ): boolean => {
    // Only trigger when close to advancing (>= 90%)
    if (progressToNextLevel < 90) return false

    // Check if we've already shown this check for this grade
    const checkKey = `${PREREQ_CHECK_KEY}-${subject}-${currentGrade + 1}`
    const alreadyShown = sessionStorage.getItem(checkKey)
    if (alreadyShown) return false

    // Get prerequisites for the next grade
    const nextGrade = Math.floor(currentGrade) + 1
    const subjectPrereqs = PREREQUISITES[subject]
    if (!subjectPrereqs || !subjectPrereqs[nextGrade]) {
      // No prerequisites defined for this grade, allow progression
      return false
    }

    const prerequisites = subjectPrereqs[nextGrade]

    // Check if any prerequisites need review
    const needsReview = prerequisites.some(p => 
      p.status === 'needs_review' || p.status === 'not_started'
    )
    const anyNotStarted = prerequisites.some(p => p.status === 'not_started')

    const recommendation: PrerequisiteCheckData['recommendation'] = 
      anyNotStarted ? 'review_required' :
      needsReview ? 'review_recommended' :
      'proceed'

    const data: PrerequisiteCheckData = {
      targetSkillId: `grade-${nextGrade}-${subject}`,
      targetSkillName: `Grade ${nextGrade} ${subject.charAt(0).toUpperCase() + subject.slice(1)}`,
      targetDifficulty: `Grade ${nextGrade}`,
      prerequisites,
      overallReady: !anyNotStarted,
      recommendation
    }

    setCheckData(data)
    setShowCheck(true)

    // Mark as shown
    sessionStorage.setItem(checkKey, 'true')

    return true
  }, [])

  const hidePrerequisiteCheck = useCallback(() => {
    setShowCheck(false)
  }, [])

  const handleProceed = useCallback(() => {
    hidePrerequisiteCheck()
  }, [hidePrerequisiteCheck])

  const handleReview = useCallback((skillId: string) => {
    // Find the skill from current checkData
    const skill = checkData?.prerequisites.find(p => p.skillId === skillId)
    if (skill) {
      // Call the callback if provided
      if (onReviewSkill) {
        onReviewSkill(skillId, skill.subject, skill.skillName)
      }
    }
    
    hidePrerequisiteCheck()
  }, [hidePrerequisiteCheck, checkData, onReviewSkill])

  const handleReviewAll = useCallback(() => {
    if (checkData && onReviewAll) {
      const skillsNeedingReview = checkData.prerequisites.filter(
        p => p.status === 'needs_review' || p.status === 'not_started'
      )
      onReviewAll(skillsNeedingReview)
    }
    
    hidePrerequisiteCheck()
  }, [hidePrerequisiteCheck, checkData, onReviewAll])

  const getPracticeConfig = useCallback((skillId: string) => {
    return SKILL_PRACTICE_CONFIG[skillId] || null
  }, [])

  return {
    showCheck,
    checkData,
    triggerPrerequisiteCheck,
    hidePrerequisiteCheck,
    handleProceed,
    handleReview,
    handleReviewAll,
    getPracticeConfig
  }
}
