import { useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  WritingCompetition,
  WritingDraft,
  WritingSubmission,
  CompetitionWinner,
  LeaderboardEntry,
  WRITING_COMPETITION_CONSTANTS as CONSTANTS
} from '@/lib/types/writing-competition'
import {
  FamousAuthor,
  AuthorRecommendation,
  ReadingProgress,
  QuizQuestion,
  AuthorPublication,
  AuthorCategory
} from '../types'
import { logger } from '@/lib/logger'

export interface UseWritingCompetitionReturn {
  // Auth & API
  user: ReturnType<typeof useAuth>['user']
  fetchApi: ReturnType<typeof useApiFetch>

  // Competition State
  isLoading: boolean
  isSubmitting: boolean
  isSaving: boolean
  error: string | null
  competition: WritingCompetition | null
  userDraft: WritingDraft | null
  userSubmission: WritingSubmission | null
  timeRemaining: number
  userGradeLevel: number

  // Essay State
  essay: string
  setEssay: (essay: string) => void
  typingTime: number
  setTypingTime: (time: number | ((prev: number) => number)) => void
  wordCount: number
  isValidWordCount: boolean
  canSubmit: boolean

  // Leaderboard State
  pastWinners: CompetitionWinner[]
  totalParticipants: number
  currentUserSubmission: LeaderboardEntry | null
  submissionResult: { success: boolean; feedback: string } | null

  // AI Support State
  tipsMode: 'sw' | 'ai'
  setTipsMode: (mode: 'sw' | 'ai') => void
  selectedAuthor: FamousAuthor | null
  setSelectedAuthor: (author: FamousAuthor | null) => void
  essayDescription: string
  setEssayDescription: (desc: string) => void
  authorRecommendations: AuthorRecommendation[]
  setAuthorRecommendations: (recs: AuthorRecommendation[]) => void
  aiTips: string | null
  setAiTips: (tips: string | null | ((prev: string | null) => string | null)) => void
  isLoadingAI: boolean
  setIsLoadingAI: (loading: boolean) => void
  aiError: string | null
  setAiError: (error: string | null) => void

  // Reading Progress State
  authorCategory: AuthorCategory
  setAuthorCategory: (category: AuthorCategory) => void
  viewMode: 'authors' | 'publications' | 'quiz' | 'tips'
  setViewMode: (mode: 'authors' | 'publications' | 'quiz' | 'tips') => void
  selectedBook: AuthorPublication | null
  setSelectedBook: (book: AuthorPublication | null) => void
  readingProgress: Record<string, ReadingProgress>
  quizQuestions: QuizQuestion[]
  setQuizQuestions: (questions: QuizQuestion[]) => void
  quizAnswers: Record<number, number>
  setQuizAnswers: (answers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => void
  quizScore: number | null
  setQuizScore: (score: number | null) => void
  isLoadingQuiz: boolean
  setIsLoadingQuiz: (loading: boolean) => void
  specificQuestion: string
  setSpecificQuestion: (question: string) => void

  // Actions
  loadCompetition: () => Promise<void>
  loadLeaderboard: () => Promise<void>
  handleSubmit: () => Promise<void>
  saveReadingProgress: (progress: Record<string, ReadingProgress>) => void
  getBookProgress: (authorId: string, bookId: string) => ReadingProgress | undefined
  isOnCooldown: (authorId: string, bookId: string) => boolean
  getDaysUntilRetry: (authorId: string, bookId: string) => number
  isAuthorUnlocked: (author: FamousAuthor) => boolean
  getAuthorProgress: (author: FamousAuthor) => { completed: number; total: number }

  // UI State
  showAvatarSettings: boolean
  setShowAvatarSettings: (show: boolean) => void
  activeTab: 'write' | 'leaderboard'
  setActiveTab: (tab: 'write' | 'leaderboard') => void
}

const STORAGE_KEY = 'writing_reading_progress'
const COOLDOWN_DAYS = 30

export function useWritingCompetition(): UseWritingCompetitionReturn {
  const { user } = useAuth()
  const fetchApi = useApiFetch()

  // Competition State
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [competition, setCompetition] = useState<WritingCompetition | null>(null)
  const [userDraft, setUserDraft] = useState<WritingDraft | null>(null)
  const [userSubmission, setUserSubmission] = useState<WritingSubmission | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [userGradeLevel, setUserGradeLevel] = useState(5)

  // Essay State
  const [essay, setEssay] = useState('')
  const [typingTime, setTypingTime] = useState(0)
  const lastSaveRef = useRef<string>('')

  // Leaderboard State
  const [pastWinners, setPastWinners] = useState<CompetitionWinner[]>([])
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; feedback: string } | null>(null)
  const [currentUserSubmission, setCurrentUserSubmission] = useState<LeaderboardEntry | null>(null)

  // UI State
  const [showAvatarSettings, setShowAvatarSettings] = useState(false)
  const [activeTab, setActiveTab] = useState<'write' | 'leaderboard'>('write')

  // AI Support State
  const [tipsMode, setTipsMode] = useState<'sw' | 'ai'>('sw')
  const [selectedAuthor, setSelectedAuthor] = useState<FamousAuthor | null>(null)
  const [essayDescription, setEssayDescription] = useState('')
  const [authorRecommendations, setAuthorRecommendations] = useState<AuthorRecommendation[]>([])
  const [aiTips, setAiTips] = useState<string | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  // Reading List & Quiz State
  const [authorCategory, setAuthorCategory] = useState<AuthorCategory>('necessary')
  const [viewMode, setViewMode] = useState<'authors' | 'publications' | 'quiz' | 'tips'>('authors')
  const [selectedBook, setSelectedBook] = useState<AuthorPublication | null>(null)
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>({})
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false)
  const [specificQuestion, setSpecificQuestion] = useState('')

  // Load competition data
  const loadCompetition = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchApi<{
        competition: WritingCompetition
        userDraft: WritingDraft | null
        userSubmission: WritingSubmission | null
        timeRemaining: number
        userGradeLevel: number
      }>('/api/basics/writing-competition/current')

      if (data?.competition) {
        setCompetition(data.competition)
        setUserDraft(data.userDraft)
        setUserSubmission(data.userSubmission)
        setTimeRemaining(data.timeRemaining)
        setUserGradeLevel(data.userGradeLevel)
        if (data.userSubmission) setEssay(data.userSubmission.essay)
        else if (data.userDraft) {
          setEssay(data.userDraft.essay)
          setTypingTime(data.userDraft.totalTypingTime)
        }
      } else {
        setError('Failed to load competition data')
      }
    } catch (err) {
      logger.error('useWritingCompetition', 'Load error', { error: err })
      setError('Failed to load competition')
    } finally {
      setIsLoading(false)
    }
  }, [user, fetchApi])

  // Load leaderboard
  const loadLeaderboard = useCallback(async () => {
    if (!user) return
    try {
      const data = await fetchApi<{
        pastWinners: CompetitionWinner[]
        totalParticipants: number
        currentUserSubmission?: LeaderboardEntry | null
      }>(`/api/basics/writing-competition/leaderboard?gradeLevel=${userGradeLevel}`)
      if (data) {
        setPastWinners(data.pastWinners || [])
        setTotalParticipants(data.totalParticipants || 0)
        setCurrentUserSubmission(data.currentUserSubmission || null)
      }
    } catch {
      // Ignore leaderboard errors
    }
  }, [user, fetchApi, userGradeLevel])

  // Submit essay
  const handleSubmit = useCallback(async () => {
    if (!competition || !essay.trim()) return
    setIsSubmitting(true)
    setError(null)
    try {
      const data = await fetchApi<{ submission: WritingSubmission; aiFeedback?: string }>(
        '/api/basics/writing-competition/submit',
        {
          method: 'POST',
          body: JSON.stringify({ competitionId: competition.id, essay: essay.trim() })
        }
      )
      if (data?.submission) {
        setUserSubmission(data.submission)
        setSubmissionResult({
          success: true,
          feedback: data.aiFeedback || 'Your essay has been submitted!'
        })
        loadLeaderboard()
      } else {
        setError('Failed to submit essay')
      }
    } catch (err) {
      logger.error('useWritingCompetition', 'Submit error', { error: err })
      setError('Failed to submit essay')
    } finally {
      setIsSubmitting(false)
    }
  }, [competition, essay, fetchApi, loadLeaderboard])

  // Auto-save draft
  useEffect(() => {
    if (!competition || userSubmission || !essay || essay === lastSaveRef.current) return
    const timeout = setTimeout(async () => {
      if (essay === lastSaveRef.current) return
      setIsSaving(true)
      try {
        await fetchApi('/api/basics/writing-competition/save-draft', {
          method: 'POST',
          body: JSON.stringify({
            competitionId: competition.id,
            essay,
            typingTimeIncrement: typingTime
          })
        })
        lastSaveRef.current = essay
        setTypingTime(0)
      } catch {
        // Ignore save errors
      } finally {
        setIsSaving(false)
      }
    }, CONSTANTS.AUTO_SAVE_INTERVAL_MS)
    return () => clearTimeout(timeout)
  }, [essay, competition, userSubmission, fetchApi, typingTime])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) return
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [timeRemaining])

  // Load reading progress from localStorage
  useEffect(() => {
    if (!user) return
    const saved = localStorage.getItem(`${STORAGE_KEY}_${user.uid}`)
    if (saved) {
      try {
        setReadingProgress(JSON.parse(saved))
      } catch {
        // Ignore parse errors
      }
    }
  }, [user])

  // Reading progress helpers
  const saveReadingProgress = useCallback(
    (progress: Record<string, ReadingProgress>) => {
      if (!user) return
      localStorage.setItem(`${STORAGE_KEY}_${user.uid}`, JSON.stringify(progress))
      setReadingProgress(progress)
    },
    [user]
  )

  const getBookProgress = useCallback(
    (authorId: string, bookId: string): ReadingProgress | undefined => {
      return readingProgress[`${authorId}_${bookId}`]
    },
    [readingProgress]
  )

  const isOnCooldown = useCallback(
    (authorId: string, bookId: string): boolean => {
      const progress = getBookProgress(authorId, bookId)
      if (!progress?.lastAttempt) return false
      const daysSinceAttempt = (Date.now() - progress.lastAttempt) / (1000 * 60 * 60 * 24)
      return daysSinceAttempt < COOLDOWN_DAYS && !progress.quizPassed
    },
    [getBookProgress]
  )

  const getDaysUntilRetry = useCallback(
    (authorId: string, bookId: string): number => {
      const progress = getBookProgress(authorId, bookId)
      if (!progress?.lastAttempt) return 0
      const daysSinceAttempt = (Date.now() - progress.lastAttempt) / (1000 * 60 * 60 * 24)
      return Math.ceil(COOLDOWN_DAYS - daysSinceAttempt)
    },
    [getBookProgress]
  )

  // Check if all books for an author have been completed (unlocks chat with author)
  const isAuthorUnlocked = useCallback(
    (author: FamousAuthor): boolean => {
      return author.publications.every((book) =>
        getBookProgress(author.id, book.id)?.quizPassed
      )
    },
    [getBookProgress]
  )

  // Get completion progress for an author's books
  const getAuthorProgress = useCallback(
    (author: FamousAuthor): { completed: number; total: number } => {
      const completed = author.publications.filter((book) =>
        getBookProgress(author.id, book.id)?.quizPassed
      ).length
      return { completed, total: author.publications.length }
    },
    [getBookProgress]
  )

  // Computed values
  const wordCount = essay.trim().split(/\s+/).filter((w) => w.length > 0).length
  const isValidWordCount =
    wordCount >= CONSTANTS.MIN_WORD_COUNT && wordCount <= CONSTANTS.MAX_WORD_COUNT
  const canSubmit = isValidWordCount && timeRemaining > 0 && !userSubmission && !isSubmitting

  return {
    // Auth & API
    user,
    fetchApi,

    // Competition State
    isLoading,
    isSubmitting,
    isSaving,
    error,
    competition,
    userDraft,
    userSubmission,
    timeRemaining,
    userGradeLevel,

    // Essay State
    essay,
    setEssay,
    typingTime,
    setTypingTime,
    wordCount,
    isValidWordCount,
    canSubmit,

    // Leaderboard State
    pastWinners,
    totalParticipants,
    currentUserSubmission,
    submissionResult,

    // AI Support State
    tipsMode,
    setTipsMode,
    selectedAuthor,
    setSelectedAuthor,
    essayDescription,
    setEssayDescription,
    authorRecommendations,
    setAuthorRecommendations,
    aiTips,
    setAiTips,
    isLoadingAI,
    setIsLoadingAI,
    aiError,
    setAiError,

    // Reading Progress State
    authorCategory,
    setAuthorCategory,
    viewMode,
    setViewMode,
    selectedBook,
    setSelectedBook,
    readingProgress,
    quizQuestions,
    setQuizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizScore,
    setQuizScore,
    isLoadingQuiz,
    setIsLoadingQuiz,
    specificQuestion,
    setSpecificQuestion,

    // Actions
    loadCompetition,
    loadLeaderboard,
    handleSubmit,
    saveReadingProgress,
    getBookProgress,
    isOnCooldown,
    getDaysUntilRetry,
    isAuthorUnlocked,
    getAuthorProgress,

    // UI State
    showAvatarSettings,
    setShowAvatarSettings,
    activeTab,
    setActiveTab,
  }
}
