import { useState, useRef, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  StudyMessageDisplay,
  IndependentStudyDisplay,
  CoursePrompt,
} from '@/lib/types/independent-study'

interface UseStudySessionOptions {
  study: IndependentStudyDisplay
  onLessonComplete?: (unitIndex: number, lessonIndex: number) => void
  onAllUnitsComplete?: () => void
}

export function useStudySession({
  study,
  onLessonComplete,
  onAllUnitsComplete,
}: UseStudySessionOptions) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<StudyMessageDisplay[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionXP, setSessionXP] = useState(0)
  const [sessionStartTime] = useState(Date.now())
  const [error, setError] = useState<string | null>(null)

  // Curriculum tracking
  const [currentUnitIndex, setCurrentUnitIndex] = useState(
    study.currentUnitIndex || 0
  )
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    study.currentLessonIndex || 0
  )

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasInitialized = useRef(false)

  const coursePrompt = study.coursePrompt as CoursePrompt | undefined
  const hasCurriculum = !!coursePrompt?.curriculum?.units?.length

  const currentUnit = coursePrompt?.curriculum?.units?.[currentUnitIndex]
  const currentLesson = currentUnit?.lessons?.[currentLessonIndex]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getSessionDuration = () => {
    const seconds = Math.floor((Date.now() - sessionStartTime) / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const sendMessage = useCallback(
    async (
      content: string,
      answerToProblem?: { problemId: string; answer: string }
    ) => {
      if (!user || !content.trim()) return

      setError(null)
      setIsLoading(true)

      const userMessage: StudyMessageDisplay = {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
        unitId: currentUnit?.id,
        lessonId: currentLesson?.id,
      }
      setMessages((prev) => [...prev, userMessage])
      setInputValue('')

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/basics/independent-study/chat', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyId: study.id,
            sessionId,
            message: content.trim(),
            unitId: currentUnit?.id,
            lessonId: currentLesson?.id,
            answerToProblem,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to send message')
        }

        setIsStreaming(true)

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        let assistantContent = ''
        let currentProblem: StudyMessageDisplay['embeddedProblem'] | undefined

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))

                  if (data.type === 'session') {
                    setSessionId(data.sessionId)
                  }

                  if (data.type === 'content') {
                    assistantContent += data.content
                    setMessages((prev) => {
                      const existing = prev.find((m) => m.id === 'streaming')
                      if (existing) {
                        return prev.map((m) =>
                          m.id === 'streaming'
                            ? { ...m, content: assistantContent }
                            : m
                        )
                      } else {
                        return [
                          ...prev,
                          {
                            id: 'streaming',
                            role: 'assistant' as const,
                            content: assistantContent,
                            timestamp: new Date().toISOString(),
                            unitId: currentUnit?.id,
                            lessonId: currentLesson?.id,
                          },
                        ]
                      }
                    })
                  }

                  if (data.type === 'problem') {
                    currentProblem = {
                      id: data.problem.id,
                      question: data.problem.question,
                      type: data.problem.problemType,
                      options: data.problem.options,
                    }
                  }

                  if (data.type === 'lesson_complete') {
                    onLessonComplete?.(currentUnitIndex, currentLessonIndex)

                    if (currentLesson && currentUnit) {
                      if (currentLessonIndex < currentUnit.lessons.length - 1) {
                        setCurrentLessonIndex((prev) => prev + 1)
                      } else if (
                        currentUnitIndex <
                        (coursePrompt?.curriculum.units.length || 0) - 1
                      ) {
                        setCurrentUnitIndex((prev) => prev + 1)
                        setCurrentLessonIndex(0)
                      } else {
                        onAllUnitsComplete?.()
                      }
                    }
                  }

                  if (data.type === 'done') {
                    if (data.xpEarned) {
                      setSessionXP((prev) => prev + data.xpEarned)
                    }

                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === 'streaming'
                          ? {
                              ...m,
                              id: `msg_${Date.now()}`,
                              embeddedProblem: currentProblem,
                            }
                          : m
                      )
                    )
                  }

                  if (data.type === 'error') {
                    throw new Error(data.error)
                  }
                } catch {
                  // Ignore JSON parse errors for incomplete chunks
                }
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message')
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
      } finally {
        setIsLoading(false)
        setIsStreaming(false)
      }
    },
    [
      user,
      study.id,
      sessionId,
      currentUnit,
      currentLesson,
      currentUnitIndex,
      currentLessonIndex,
      coursePrompt,
      onLessonComplete,
      onAllUnitsComplete,
    ]
  )

  // Send initial message when session starts
  useEffect(() => {
    if (messages.length === 0 && user && !hasInitialized.current) {
      hasInitialized.current = true

      let initialMessage = "Let's begin! I'm excited to learn about this topic."
      if (hasCurriculum && currentUnit && currentLesson) {
        initialMessage = `I'm ready to start Unit ${currentUnitIndex + 1}: ${currentUnit.title}, Lesson ${currentLessonIndex + 1}: ${currentLesson.title}. Let's go!`
      }

      sendMessage(initialMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, messages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleAnswerProblem = (problemId: string, answer: string) => {
    sendMessage(`My answer is: ${answer}`, { problemId, answer })
  }

  const handleSelectLesson = (unitIndex: number, lessonIndex: number) => {
    setCurrentUnitIndex(unitIndex)
    setCurrentLessonIndex(lessonIndex)
    setMessages([])
    hasInitialized.current = false
  }

  return {
    // State
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isStreaming,
    sessionXP,
    error,
    setError,

    // Curriculum
    currentUnitIndex,
    currentLessonIndex,
    hasCurriculum,
    coursePrompt,
    currentUnit,
    currentLesson,

    // Refs
    messagesEndRef,
    inputRef,

    // Actions
    handleSubmit,
    handleKeyDown,
    handleAnswerProblem,
    handleSelectLesson,
    getSessionDuration,
  }
}
