'use client'

/**
 * useTransferChallenge Hook
 * 
 * Manages transfer challenge triggers to promote application of concepts
 * in novel contexts. Addresses learning science research showing 70-90%
 * of learning fails to transfer without explicit practice.
 * 
 * Research: Perkins & Salomon (1989) - Transfer requires:
 * 1. Explicit bridging instruction
 * 2. Practice in varied contexts
 * 3. Metacognitive reflection on similarities
 * 
 * Trigger Rules:
 * - After every 7 consecutive problems in a concept
 * - Random 20% chance after any correct answer (variety)
 * - Always before advancing to next difficulty level
 */

import { useState, useCallback, useRef } from 'react'
import { TransferChallengeData, TransferType } from '@/components/basics/transfer/TransferChallenge'

// How often to trigger transfer challenges
const PROBLEMS_BETWEEN_TRANSFERS = 7

// Session storage key for tracking
const SESSION_KEY = 'pitch-rise-transfer-challenge-count'

// Minimum time between transfer challenges (prevents loops)
const MIN_COOLDOWN_MS = 30000 // 30 seconds

interface TransferChallengeState {
  showChallenge: boolean
  currentChallenge: TransferChallengeData | null
  problemsSinceLastTransfer: number
  isLoading: boolean
  insufficientCredits: boolean
}

interface UseTransferChallengeReturn {
  state: TransferChallengeState
  checkForTransferTrigger: (problem: { topic: string; difficulty: number }, isCorrect: boolean, subject: 'math' | 'reading' | 'latin' | 'greek') => boolean
  showTransferChallenge: (challenge: TransferChallengeData) => void
  hideTransferChallenge: () => void
  handleChallengeComplete: (correct: boolean, xpEarned: number) => void
  generateTransferChallenge: (problem: { topic: string; difficulty: number; question: string; correctAnswer: string }, subject: 'math' | 'reading' | 'latin' | 'greek') => TransferChallengeData
}

export function useTransferChallenge(): UseTransferChallengeReturn {
  const [state, setState] = useState<TransferChallengeState>({
    showChallenge: false,
    currentChallenge: null,
    problemsSinceLastTransfer: 0,
    isLoading: false,
    insufficientCredits: false
  })
  
  // Track last trigger time to prevent loops
  const lastTriggerTimeRef = useRef<number>(0)
  // Track if we're currently processing a trigger
  const isProcessingRef = useRef<boolean>(false)

  // Check if we should trigger a transfer challenge
  const checkForTransferTrigger = useCallback((
    problem: { topic: string; difficulty: number },
    isCorrect: boolean,
    subject: 'math' | 'reading' | 'latin' | 'greek'
  ): boolean => {
    if (!isCorrect) {
      // Don't trigger on wrong answers
      return false
    }
    
    // Prevent re-triggering if already showing a challenge
    if (state.showChallenge) {
      return false
    }
    
    // Prevent loops with cooldown
    const now = Date.now()
    if (now - lastTriggerTimeRef.current < MIN_COOLDOWN_MS) {
      return false
    }
    
    // Prevent concurrent triggers
    if (isProcessingRef.current) {
      return false
    }

    // Get current count from session
    const stored = parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10)
    const newCount = stored + 1
    sessionStorage.setItem(SESSION_KEY, String(newCount))

    setState(prev => ({
      ...prev,
      problemsSinceLastTransfer: newCount
    }))

    // Trigger every N problems
    if (newCount >= PROBLEMS_BETWEEN_TRANSFERS) {
      sessionStorage.setItem(SESSION_KEY, '0')
      lastTriggerTimeRef.current = now
      return true
    }

    // Random 10% chance for variety (but not if recently triggered)
    if (newCount >= 3 && Math.random() < 0.1) {
      sessionStorage.setItem(SESSION_KEY, '0')
      lastTriggerTimeRef.current = now
      return true
    }

    return false
  }, [state.showChallenge])

  // Generate a transfer challenge based on the current problem
  const generateTransferChallenge = useCallback((
    problem: { topic: string; difficulty: number; question: string; correctAnswer: string },
    subject: 'math' | 'reading' | 'latin' | 'greek'
  ): TransferChallengeData => {
    // Select transfer type based on subject
    const transferTypes: Record<string, TransferType[]> = {
      math: ['word_problem', 'real_world', 'diagram'],
      reading: ['genre_shift'],
      latin: ['etymology', 'reverse'],
      greek: ['etymology', 'reverse']
    }

    const availableTypes = transferTypes[subject] || ['word_problem']
    const transferType = availableTypes[Math.floor(Math.random() * availableTypes.length)]

    // Generate challenge based on type and subject
    const challenge = generateChallengeByType(problem, subject, transferType)

    return challenge
  }, [])

  const showTransferChallenge = useCallback((challenge: TransferChallengeData) => {
    // Prevent showing if already showing
    if (isProcessingRef.current) {
      return
    }
    isProcessingRef.current = true
    
    setState(prev => {
      // Double-check we're not already showing
      if (prev.showChallenge) {
        isProcessingRef.current = false
        return prev
      }
      return {
        ...prev,
        showChallenge: true,
        currentChallenge: challenge
      }
    })
  }, [])

  const hideTransferChallenge = useCallback(() => {
    isProcessingRef.current = false
    setState(prev => ({
      ...prev,
      showChallenge: false,
      currentChallenge: null
    }))
  }, [])

  const handleChallengeComplete = useCallback((correct: boolean, xpEarned: number) => {
    hideTransferChallenge()
  }, [hideTransferChallenge])

  return {
    state,
    checkForTransferTrigger,
    showTransferChallenge,
    hideTransferChallenge,
    handleChallengeComplete,
    generateTransferChallenge
  }
}

// Helper to generate challenge content by type
function generateChallengeByType(
  problem: { topic: string; difficulty: number; question: string; correctAnswer: string },
  subject: 'math' | 'reading' | 'latin' | 'greek',
  transferType: TransferType
): TransferChallengeData {
  const baseChallenge: TransferChallengeData = {
    id: `transfer-${Date.now()}`,
    originalSkill: problem.topic,
    originalContext: problem.question,
    transferType,
    subject,
    prompt: '',
    question: '',
    correctAnswer: problem.correctAnswer,
    connectionExplanation: '',
    bonusXP: 15
  }

  // Math word problems
  if (subject === 'math' && transferType === 'word_problem') {
    const scenarios = [
      {
        prompt: '🎯 Transfer Challenge: Apply your math skills to a real scenario!',
        template: (topic: string) => 
          topic.includes('equation') || topic.includes('algebra')
            ? `A store sells notebooks for $${problem.correctAnswer} each. If you have $20, write an equation to find how many notebooks you can buy.`
            : topic.includes('geometry') || topic.includes('area')
            ? `A rectangular garden has the same area as your answer (${problem.correctAnswer} square units). If one side is 4 units, how long is the other side?`
            : `In a classroom, the answer to your problem (${problem.correctAnswer}) represents the number of students in one row. If there are 3 rows with equal students, how many total students?`,
        explanation: 'You just applied abstract math to a real-world context. This "transfer" is how math becomes useful in life!'
      }
    ]
    const scenario = scenarios[0]
    baseChallenge.prompt = scenario.prompt
    baseChallenge.question = scenario.template(problem.topic)
    baseChallenge.connectionExplanation = scenario.explanation
  }
  
  // Math real-world applications
  else if (subject === 'math' && transferType === 'real_world') {
    baseChallenge.prompt = '🌍 Real-World Challenge: See how this concept appears in everyday life!'
    baseChallenge.question = `A recipe needs to be scaled. If the original makes ${problem.correctAnswer} servings, how would you calculate ingredients for half that amount?`
    baseChallenge.correctAnswer = String(Number(problem.correctAnswer) / 2)
    baseChallenge.connectionExplanation = 'Fractions and division from math class help with cooking, building, and countless real tasks!'
  }

  // Language etymology connections
  else if ((subject === 'latin' || subject === 'greek') && transferType === 'etymology') {
    const commonRoots: Record<string, { english: string; meaning: string }[]> = {
      default: [
        { english: 'aquarium, aquatic', meaning: 'water' },
        { english: 'annual, anniversary', meaning: 'year' },
        { english: 'video, vision', meaning: 'see' },
        { english: 'script, scripture', meaning: 'write' },
        { english: 'portable, transport', meaning: 'carry' }
      ]
    }
    
    const root = commonRoots.default[Math.floor(Math.random() * commonRoots.default.length)]
    baseChallenge.prompt = `📚 Etymology Challenge: Connect ${subject === 'latin' ? 'Latin' : 'Greek'} to English!`
    baseChallenge.question = `The English words "${root.english}" share a root meaning "${root.meaning}". Can you think of another English word with this same root?`
    baseChallenge.correctAnswer = root.english.split(',')[0].trim()
    baseChallenge.acceptableAnswers = root.english.split(',').map(w => w.trim())
    baseChallenge.connectionExplanation = `These connections show how ${subject === 'latin' ? 'Latin' : 'Greek'} lives on in modern English. Knowing roots helps you decode unfamiliar words!`
  }

  // Reading genre shift
  else if (subject === 'reading' && transferType === 'genre_shift') {
    baseChallenge.prompt = '📖 Transfer Challenge: Apply your reading skills to a different context!'
    baseChallenge.question = `You just practiced ${problem.topic}. Now try it with a science text: "Photosynthesis is the process by which plants convert sunlight into energy." What is the main idea of this sentence?`
    baseChallenge.correctAnswer = 'Plants convert sunlight into energy through photosynthesis'
    baseChallenge.acceptableAnswers = ['photosynthesis converts sunlight to energy', 'plants make energy from sunlight', 'sunlight becomes plant energy']
    baseChallenge.connectionExplanation = 'Reading skills transfer across genres! The same strategies work for stories, science, and news.'
  }

  // Default fallback
  else {
    baseChallenge.prompt = '🎯 Transfer Challenge: Test your understanding in a new way!'
    baseChallenge.question = `Explain in your own words: What was the key concept you just practiced?`
    baseChallenge.correctAnswer = problem.topic
    baseChallenge.connectionExplanation = 'Explaining concepts in your own words strengthens understanding and helps transfer learning to new situations.'
  }

  return baseChallenge
}