'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AvatarOnboarding } from '../AvatarOnboarding'
import { useWritingCompetition } from './hooks/useWritingCompetition'
import { useCompetitionHandlers } from './hooks/useCompetitionHandlers'
import { WritingTipsPanel } from './WritingTipsPanel'
import { CompetitionHeader } from './CompetitionHeader'
import { CompetitionContent } from './CompetitionContent'
import { CompetitionFooter } from './CompetitionFooter'

interface WritingCompetitionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WritingCompetitionModal({
  isOpen,
  onClose,
}: WritingCompetitionModalProps) {
  const [mounted, setMounted] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const {
    user,
    fetchApi,
    isLoading,
    isSubmitting,
    isSaving,
    error,
    competition,
    userDraft,
    userSubmission,
    timeRemaining,
    userGradeLevel,
    essay,
    setEssay,
    setTypingTime,
    canSubmit,
    pastWinners,
    totalParticipants,
    currentUserSubmission,
    submissionResult,
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
    loadCompetition,
    loadLeaderboard,
    handleSubmit,
    saveReadingProgress,
    getBookProgress,
    isOnCooldown,
    getDaysUntilRetry,
    isAuthorUnlocked,
    getAuthorProgress,
    showAvatarSettings,
    setShowAvatarSettings,
    activeTab,
    setActiveTab,
  } = useWritingCompetition()

  const {
    handleGetAuthorTips,
    handleSelectAuthor,
    handleSelectBook,
    handleSubmitQuiz,
    handleBackToAuthors,
    handleBackToPublications,
  } = useCompetitionHandlers({
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
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && user) loadCompetition()
  }, [isOpen, user, loadCompetition])

  useEffect(() => {
    if (isOpen && user) loadLeaderboard()
  }, [isOpen, user, loadLeaderboard])

  if (!mounted || !isOpen) return null

  return (
    <>
      {[
        createPortal(
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
              role="button"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClose()
              }}
            />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Writing competition"
              className={`relative b-bg-card b-rounded-2xl shadow-2xl overflow-hidden flex transition-all duration-300 ${
                showTips ? 'w-[90vw] h-[85vh]' : 'w-full max-w-3xl max-h-[90vh]'
              }`}
              style={{ backgroundColor: 'var(--b-bg-card)' }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {/* Main Content Column */}
              <div className="flex-1 flex flex-col min-w-0">
                <CompetitionHeader
                  userGradeLevel={userGradeLevel}
                  showTips={showTips}
                  onToggleTips={() => setShowTips(!showTips)}
                  onClose={onClose}
                  activeTab={activeTab}
                  onSetActiveTab={setActiveTab}
                  totalParticipants={totalParticipants}
                />

                <CompetitionContent
                  isLoading={isLoading}
                  error={error}
                  activeTab={activeTab}
                  competition={competition}
                  userSubmission={userSubmission}
                  essay={essay}
                  setEssay={setEssay}
                  timeRemaining={timeRemaining}
                  setTypingTime={setTypingTime}
                  submissionResult={submissionResult}
                  currentUserSubmission={currentUserSubmission}
                  userGradeLevel={userGradeLevel}
                  totalParticipants={totalParticipants}
                  pastWinners={pastWinners}
                  onUpdateAvatar={() => setShowAvatarSettings(true)}
                  onRetry={loadCompetition}
                />

                <CompetitionFooter
                  competition={competition}
                  timeRemaining={timeRemaining}
                  isSaving={isSaving}
                  userDraft={userDraft}
                  userSubmission={userSubmission}
                  activeTab={activeTab}
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />
              </div>

              {/* Writing Tips Panel */}
              {showTips && (
                <WritingTipsPanel
                  tipsMode={tipsMode}
                  setTipsMode={setTipsMode}
                  essay={essay}
                  authorCategory={authorCategory}
                  setAuthorCategory={setAuthorCategory}
                  aiTips={aiTips}
                  isLoadingAI={isLoadingAI}
                  aiError={aiError}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  selectedAuthor={selectedAuthor}
                  setSelectedAuthor={setSelectedAuthor}
                  selectedBook={selectedBook}
                  setSelectedBook={setSelectedBook}
                  quizQuestions={quizQuestions}
                  quizAnswers={quizAnswers}
                  setQuizAnswers={setQuizAnswers}
                  quizScore={quizScore}
                  isLoadingQuiz={isLoadingQuiz}
                  specificQuestion={specificQuestion}
                  setSpecificQuestion={setSpecificQuestion}
                  onSelectAuthor={handleSelectAuthor}
                  onSelectBook={handleSelectBook}
                  onSubmitQuiz={handleSubmitQuiz}
                  onGetAuthorTips={handleGetAuthorTips}
                  onBackToAuthors={handleBackToAuthors}
                  onBackToPublications={handleBackToPublications}
                  getBookProgress={getBookProgress}
                  isOnCooldown={isOnCooldown}
                  getDaysUntilRetry={getDaysUntilRetry}
                  isAuthorUnlocked={isAuthorUnlocked}
                  getAuthorProgress={getAuthorProgress}
                />
              )}
            </div>
          </div>,
          document.body
        ),

        // Avatar Settings Modal
        showAvatarSettings &&
          user &&
          createPortal(
            <AvatarOnboarding
              userId={user.uid}
              onComplete={() => {
                setShowAvatarSettings(false)
                loadLeaderboard()
              }}
              onSkip={() => setShowAvatarSettings(false)}
            />,
            document.body
          ),
      ]}
    </>
  )
}
