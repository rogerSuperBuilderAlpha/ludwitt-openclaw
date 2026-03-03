import { useCallback } from 'react'
import type { User } from 'firebase/auth'
import {
  FamousAuthor,
  AuthorPublication,
  AuthorRecommendation,
  ReadingProgress,
  QuizQuestion,
} from '../types'
import { logger } from '@/lib/logger'

interface CompetitionHandlersDeps {
  user: User | null
  fetchApi: <T>(url: string, options?: RequestInit) => Promise<T | null>
  essay: string
  essayDescription: string
  specificQuestion: string
  selectedAuthor: FamousAuthor | null
  readingProgress: Record<string, ReadingProgress>
  quizQuestions: QuizQuestion[]
  quizAnswers: Record<number, number>
  selectedBook: AuthorPublication | null
  setSelectedAuthor: (author: FamousAuthor | null) => void
  setViewMode: (mode: 'authors' | 'publications' | 'quiz' | 'tips') => void
  setIsLoadingAI: (loading: boolean) => void
  setAiError: (error: string | null) => void
  setAiTips: (
    tips: string | null | ((prev: string | null) => string | null)
  ) => void
  setAuthorRecommendations: (recs: AuthorRecommendation[]) => void
  setSelectedBook: (book: AuthorPublication | null) => void
  setQuizQuestions: (questions: QuizQuestion[]) => void
  setQuizAnswers: (
    answers:
      | Record<number, number>
      | ((prev: Record<number, number>) => Record<number, number>)
  ) => void
  setQuizScore: (score: number | null) => void
  setIsLoadingQuiz: (loading: boolean) => void
  saveReadingProgress: (progress: Record<string, ReadingProgress>) => void
  isOnCooldown: (authorId: string, bookId: string) => boolean
  getDaysUntilRetry: (authorId: string, bookId: string) => number
}

export interface CompetitionHandlers {
  handleSuggestAuthors: () => Promise<void>
  handleGetAuthorTips: (author: FamousAuthor) => Promise<void>
  handleSelectAuthor: (author: FamousAuthor) => void
  handleSelectBook: (book: AuthorPublication) => Promise<void>
  handleSubmitQuiz: () => void
  handleBackToAuthors: () => void
  handleBackToPublications: () => void
}

export function useCompetitionHandlers(
  deps: CompetitionHandlersDeps
): CompetitionHandlers {
  const {
    user,
    fetchApi,
    essay,
    essayDescription,
    specificQuestion,
    selectedAuthor,
    readingProgress,
    quizQuestions,
    quizAnswers,
    selectedBook,
    setSelectedAuthor,
    setViewMode,
    setIsLoadingAI,
    setAiError,
    setAiTips,
    setAuthorRecommendations,
    setSelectedBook,
    setQuizQuestions,
    setQuizAnswers,
    setQuizScore,
    setIsLoadingQuiz,
    saveReadingProgress,
    isOnCooldown,
    getDaysUntilRetry,
  } = deps

  const handleSuggestAuthors = useCallback(async () => {
    if (!essayDescription.trim()) return
    setIsLoadingAI(true)
    setAiError(null)
    try {
      const data = await fetchApi<{
        recommendations: AuthorRecommendation[]
        creditsUsed: number
      }>('/api/basics/ai-writing-tips', {
        method: 'POST',
        body: JSON.stringify({
          action: 'suggest_authors',
          essayDescription: essayDescription.trim(),
        }),
      })
      if (data?.recommendations) {
        setAuthorRecommendations(data.recommendations)
      }
    } catch (err) {
      logger.error('WritingCompetitionModal', 'Suggest authors error', {
        error: err,
      })
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to get author suggestions'
      setAiError(
        errorMsg.includes('credits') ? 'Insufficient credits' : errorMsg
      )
    } finally {
      setIsLoadingAI(false)
    }
  }, [
    essayDescription,
    fetchApi,
    setIsLoadingAI,
    setAiError,
    setAuthorRecommendations,
  ])

  // IMPORTANT: This handler uses user.getIdToken() and Authorization: Bearer
  // for authenticated streaming requests. Do not remove or simplify.
  const handleGetAuthorTips = useCallback(
    async (author: FamousAuthor) => {
      if (!user) return

      setSelectedAuthor(author)
      setViewMode('tips')
      setIsLoadingAI(true)
      setAiError(null)
      setAiTips('')

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/basics/ai-writing-tips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            action: 'get_tips',
            authorId: author.id,
            currentEssay: essay || undefined,
            specificQuestion: specificQuestion.trim() || undefined,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setAiError(errorData.error || 'Failed to get writing tips')
          setIsLoadingAI(false)
          return
        }

        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          setAiError('Failed to read response')
          setIsLoadingAI(false)
          return
        }

        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              try {
                const parsed = JSON.parse(data)
                if (parsed.error) {
                  setAiError(parsed.error)
                  setIsLoadingAI(false)
                } else if (parsed.content) {
                  setAiTips((prev) => (prev || '') + parsed.content)
                } else if (parsed.done) {
                  setIsLoadingAI(false)
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        setIsLoadingAI(false)
      } catch (err) {
        logger.error('WritingCompetitionModal', 'Get tips error', {
          error: err,
        })
        const errorMsg =
          err instanceof Error ? err.message : 'Failed to get writing tips'
        setAiError(
          errorMsg.includes('credits') ? 'Insufficient credits' : errorMsg
        )
        setIsLoadingAI(false)
      }
    },
    [
      user,
      essay,
      specificQuestion,
      setSelectedAuthor,
      setViewMode,
      setIsLoadingAI,
      setAiError,
      setAiTips,
    ]
  )

  const handleSelectAuthor = useCallback(
    (author: FamousAuthor) => {
      setSelectedAuthor(author)
      setViewMode('publications')
      setAiTips(null)
      setQuizQuestions([])
      setQuizAnswers({})
      setQuizScore(null)
    },
    [
      setSelectedAuthor,
      setViewMode,
      setAiTips,
      setQuizQuestions,
      setQuizAnswers,
      setQuizScore,
    ]
  )

  // IMPORTANT: This handler uses user.getIdToken() and Authorization: Bearer
  // for authenticated quiz generation requests. Do not remove or simplify.
  const handleSelectBook = useCallback(
    async (book: AuthorPublication) => {
      if (!user || !selectedAuthor) return

      const key = `${selectedAuthor.id}_${book.id}`
      const progress = readingProgress[key]

      if (progress?.quizPassed) {
        setSelectedBook(book)
        setViewMode('tips')
        return
      }

      if (isOnCooldown(selectedAuthor.id, book.id)) {
        setAiError(
          `You can retry this quiz in ${getDaysUntilRetry(selectedAuthor.id, book.id)} days`
        )
        return
      }

      setSelectedBook(book)
      setQuizAnswers({})
      setQuizScore(null)
      setIsLoadingQuiz(true)
      setAiError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/basics/book-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            authorId: selectedAuthor.id,
            authorName: selectedAuthor.name,
            bookId: book.id,
            bookTitle: book.title,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to generate quiz')
        }

        const data = await response.json()
        setQuizQuestions(data.questions)
        setViewMode('quiz')
      } catch (err) {
        logger.error('WritingCompetitionModal', 'Quiz error', { error: err })
        setAiError(
          err instanceof Error ? err.message : 'Failed to generate quiz'
        )
      } finally {
        setIsLoadingQuiz(false)
      }
    },
    [
      user,
      selectedAuthor,
      readingProgress,
      isOnCooldown,
      getDaysUntilRetry,
      setSelectedBook,
      setViewMode,
      setAiError,
      setQuizAnswers,
      setQuizScore,
      setIsLoadingQuiz,
      setQuizQuestions,
    ]
  )

  const handleSubmitQuiz = useCallback(() => {
    if (!selectedAuthor || !selectedBook) return

    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++
    })

    const passed = correct === quizQuestions.length
    setQuizScore(correct)

    const key = `${selectedAuthor.id}_${selectedBook.id}`
    const newProgress: Record<string, ReadingProgress> = {
      ...readingProgress,
      [key]: {
        bookId: selectedBook.id,
        authorId: selectedAuthor.id,
        completed: passed,
        quizPassed: passed,
        lastAttempt: Date.now(),
        attempts: (readingProgress[key]?.attempts || 0) + 1,
      },
    }
    saveReadingProgress(newProgress)
  }, [
    selectedAuthor,
    selectedBook,
    quizQuestions,
    quizAnswers,
    readingProgress,
    setQuizScore,
    saveReadingProgress,
  ])

  const handleBackToAuthors = useCallback(() => {
    setSelectedAuthor(null)
    setViewMode('authors')
    setAiTips(null)
    setQuizQuestions([])
    setQuizAnswers({})
    setQuizScore(null)
    setSelectedBook(null)
  }, [
    setSelectedAuthor,
    setViewMode,
    setAiTips,
    setQuizQuestions,
    setQuizAnswers,
    setQuizScore,
    setSelectedBook,
  ])

  const handleBackToPublications = useCallback(() => {
    setViewMode('publications')
    setQuizQuestions([])
    setQuizAnswers({})
    setQuizScore(null)
    setSelectedBook(null)
  }, [
    setViewMode,
    setQuizQuestions,
    setQuizAnswers,
    setQuizScore,
    setSelectedBook,
  ])

  return {
    handleSuggestAuthors,
    handleGetAuthorTips,
    handleSelectAuthor,
    handleSelectBook,
    handleSubmitQuiz,
    handleBackToAuthors,
    handleBackToPublications,
  }
}
