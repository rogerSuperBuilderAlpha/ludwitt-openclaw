'use client'

import { BookOpen, Robot, Coins, SpinnerGap } from '@phosphor-icons/react'
import type { FamousAuthor, AuthorPublication, AuthorCategory } from './types'
import { UseWritingCompetitionReturn } from './hooks/useWritingCompetition'

// Extracted components
import { SWRulesMode } from './SWRulesMode'
import { AuthorsListView } from './AuthorsListView'
import { PublicationsView } from './PublicationsView'
import { QuizView } from './QuizView'
import { TipsView } from './TipsView'

interface WritingTipsPanelProps {
  tipsMode: 'sw' | 'ai'
  setTipsMode: (mode: 'sw' | 'ai') => void
  essay: string
  authorCategory: AuthorCategory
  setAuthorCategory: (category: AuthorCategory) => void
  aiTips: string | null
  isLoadingAI: boolean
  aiError: string | null
  viewMode: UseWritingCompetitionReturn['viewMode']
  setViewMode: UseWritingCompetitionReturn['setViewMode']
  selectedAuthor: FamousAuthor | null
  setSelectedAuthor: (author: FamousAuthor | null) => void
  selectedBook: AuthorPublication | null
  setSelectedBook: (book: AuthorPublication | null) => void
  quizQuestions: UseWritingCompetitionReturn['quizQuestions']
  quizAnswers: UseWritingCompetitionReturn['quizAnswers']
  setQuizAnswers: UseWritingCompetitionReturn['setQuizAnswers']
  quizScore: number | null
  isLoadingQuiz: boolean
  specificQuestion: string
  setSpecificQuestion: (question: string) => void
  onSelectAuthor: (author: FamousAuthor) => void
  onSelectBook: (book: AuthorPublication) => void
  onSubmitQuiz: () => void
  onGetAuthorTips: (author: FamousAuthor) => void
  onBackToAuthors: () => void
  onBackToPublications: () => void
  getBookProgress: (authorId: string, bookId: string) => any
  isOnCooldown: (authorId: string, bookId: string) => boolean
  getDaysUntilRetry: (authorId: string, bookId: string) => number
  isAuthorUnlocked: (author: FamousAuthor) => boolean
  getAuthorProgress: (author: FamousAuthor) => {
    completed: number
    total: number
  }
}

export function WritingTipsPanel({
  tipsMode,
  setTipsMode,
  authorCategory,
  setAuthorCategory,
  aiTips,
  isLoadingAI,
  aiError,
  viewMode,
  selectedAuthor,
  selectedBook,
  quizQuestions,
  quizAnswers,
  setQuizAnswers,
  quizScore,
  isLoadingQuiz,
  specificQuestion,
  setSpecificQuestion,
  onSelectAuthor,
  onSelectBook,
  onSubmitQuiz,
  onGetAuthorTips,
  onBackToAuthors,
  onBackToPublications,
  getBookProgress,
  isOnCooldown,
  getDaysUntilRetry,
  isAuthorUnlocked,
  getAuthorProgress,
}: WritingTipsPanelProps) {
  return (
    <div
      className="w-[400px] flex-shrink-0 b-border-l flex flex-col b-bg-card"
      style={{ backgroundColor: 'var(--b-bg-card)' }}
    >
      {/* Tips Header with Mode Toggle */}
      <div
        className="flex-shrink-0 b-p-lg b-border-b"
        style={{
          backgroundColor:
            tipsMode === 'sw'
              ? 'var(--b-writing-light)'
              : 'var(--b-logic-light)',
        }}
      >
        <div className="flex items-center justify-between b-mb-md">
          <div className="flex items-center gap-3">
            <div
              className="p-2 b-rounded-lg"
              style={{
                backgroundColor:
                  tipsMode === 'sw' ? 'var(--b-writing)' : 'var(--b-logic)',
              }}
            >
              {tipsMode === 'sw' ? (
                <BookOpen size={20} weight="fill" className="b-text-inverse" />
              ) : (
                <Robot size={20} weight="fill" className="b-text-inverse" />
              )}
            </div>
            <div>
              <h3
                className="b-font-bold"
                style={{
                  color:
                    tipsMode === 'sw'
                      ? 'var(--b-writing-dark)'
                      : 'var(--b-logic-dark)',
                }}
              >
                {tipsMode === 'sw' ? 'S&W Rules' : 'AI Support'}
              </h3>
              <p
                className="b-text-xs"
                style={{
                  color:
                    tipsMode === 'sw'
                      ? 'var(--b-writing-text)'
                      : 'var(--b-logic-text)',
                }}
              >
                {tipsMode === 'sw'
                  ? "Strunk & White's Elements of Style"
                  : 'Tips from famous authors'}
              </p>
            </div>
          </div>
        </div>
        {/* Mode Toggle */}
        <div
          className="flex b-rounded-lg p-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
        >
          <button
            onClick={() => setTipsMode('sw')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 b-rounded-md b-text-sm b-font-medium transition-all cursor-pointer ${
              tipsMode === 'sw' ? 'b-bg-card shadow-sm' : 'hover:bg-white/30'
            }`}
            style={
              tipsMode === 'sw'
                ? { color: 'var(--b-writing-dark)' }
                : { color: 'var(--b-text-primary)' }
            }
          >
            <BookOpen
              size={16}
              weight={tipsMode === 'sw' ? 'fill' : 'regular'}
            />
            S&W Rules
          </button>
          <button
            onClick={() => setTipsMode('ai')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 b-rounded-md b-text-sm b-font-medium transition-all cursor-pointer ${
              tipsMode === 'ai' ? 'b-bg-card shadow-sm' : 'hover:bg-white/30'
            }`}
            style={
              tipsMode === 'ai'
                ? { color: 'var(--b-logic-dark)' }
                : { color: 'var(--b-text-primary)' }
            }
          >
            <Robot size={16} weight={tipsMode === 'ai' ? 'fill' : 'regular'} />
            AI Support
            <Coins size={12} className="b-text-writing" />
          </button>
        </div>
      </div>

      {/* S&W Rules Mode */}
      {tipsMode === 'sw' && <SWRulesMode />}

      {/* AI Support Mode */}
      {tipsMode === 'ai' && (
        <>
          <div className="flex-1 flex flex-col min-h-0 b-p-md">
            {/* Error State */}
            {aiError && (
              <div className="flex-shrink-0 b-mb-md b-p-sm b-bg-latin-light b-border b-border-latin b-rounded-lg">
                <p className="b-text-xs b-text-latin-dark">{aiError}</p>
              </div>
            )}

            {/* Loading State */}
            {(isLoadingAI || isLoadingQuiz) && !aiTips && (
              <div className="flex flex-col items-center justify-center py-8">
                <SpinnerGap
                  size={28}
                  className="b-text-logic b-animate-spin b-mb-sm"
                />
                <p className="b-text-xs b-text-secondary">
                  {isLoadingQuiz ? 'Generating quiz...' : 'Generating tips...'}
                </p>
              </div>
            )}

            {/* Authors List View */}
            {viewMode === 'authors' && !isLoadingAI && (
              <AuthorsListView
                authorCategory={authorCategory}
                setAuthorCategory={setAuthorCategory}
                isAuthorUnlocked={isAuthorUnlocked}
                getAuthorProgress={getAuthorProgress}
                onSelectAuthor={onSelectAuthor}
                onGetAuthorTips={onGetAuthorTips}
              />
            )}

            {/* Publications View */}
            {viewMode === 'publications' &&
              selectedAuthor &&
              !isLoadingQuiz && (
                <PublicationsView
                  selectedAuthor={selectedAuthor}
                  isAuthorUnlocked={isAuthorUnlocked}
                  getAuthorProgress={getAuthorProgress}
                  getBookProgress={getBookProgress}
                  isOnCooldown={isOnCooldown}
                  getDaysUntilRetry={getDaysUntilRetry}
                  onSelectBook={onSelectBook}
                  onGetAuthorTips={onGetAuthorTips}
                  onBackToAuthors={onBackToAuthors}
                />
              )}

            {/* Quiz View */}
            {viewMode === 'quiz' &&
              selectedAuthor &&
              selectedBook &&
              quizQuestions.length > 0 && (
                <QuizView
                  selectedAuthor={selectedAuthor}
                  selectedBook={selectedBook}
                  quizQuestions={quizQuestions}
                  quizAnswers={quizAnswers}
                  setQuizAnswers={setQuizAnswers}
                  quizScore={quizScore}
                  onSubmitQuiz={onSubmitQuiz}
                  onBackToPublications={onBackToPublications}
                />
              )}

            {/* Tips View */}
            {viewMode === 'tips' &&
              selectedAuthor &&
              (aiTips || isLoadingAI) && (
                <TipsView
                  selectedAuthor={selectedAuthor}
                  aiTips={aiTips}
                  isLoadingAI={isLoadingAI}
                  specificQuestion={specificQuestion}
                  setSpecificQuestion={setSpecificQuestion}
                  onGetAuthorTips={onGetAuthorTips}
                  onBackToPublications={onBackToPublications}
                />
              )}
          </div>

          {/* AI Footer - Compact */}
          <div className="flex-shrink-0 b-p-sm b-border-t b-bg-muted">
            <p className="b-text-xs b-text-muted text-center">
              AI tips use credits • Verify reading to unlock authors
            </p>
          </div>
        </>
      )}
    </div>
  )
}
