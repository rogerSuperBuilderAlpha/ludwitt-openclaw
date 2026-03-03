'use client'

import { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Warning,
  Star,
  Calendar,
} from '@phosphor-icons/react'
import { TranslationFeedback } from '@/lib/types/basics'
import { ReviewScheduleMessage as ReviewScheduleMessageType } from '@/lib/types/spaced-repetition'
import { ReviewScheduleMessage } from './spaced-repetition'

interface TranslationFeedbackDisplayProps {
  feedback: TranslationFeedback
  userTranslation?: string // What the user submitted
  onNext: () => void
  // Spaced repetition visibility
  reviewScheduleMessage?: ReviewScheduleMessageType
  onViewSchedule?: () => void
}

export function TranslationFeedbackDisplay({
  feedback,
  userTranslation,
  onNext,
  reviewScheduleMessage,
  onViewSchedule,
}: TranslationFeedbackDisplayProps) {
  const [showScheduleMessage, setShowScheduleMessage] = useState(
    !!reviewScheduleMessage
  )
  // Identify categories where points were lost
  const categoryScores = feedback.categoryScores || {
    meaning: 25,
    grammar: 25,
    vocabulary: 25,
    english: 25,
  }
  const lostPoints = {
    meaning: 25 - (categoryScores.meaning ?? 25),
    grammar: 25 - (categoryScores.grammar ?? 25),
    vocabulary: 25 - (categoryScores.vocabulary ?? 25),
    english: 25 - (categoryScores.english ?? 25),
  }
  const hasLostPoints = Object.values(lostPoints).some((v) => v > 0)
  const isPerfect = (feedback.overallScore || 0) >= 90
  const isGood = (feedback.overallScore || 0) >= 70

  return (
    <div className="flex flex-col gap-4">
      {/* ============ XP AWARD - TOP AND PROMINENT ============ */}
      <div
        className="b-rounded-xl b-p-lg"
        style={{
          background: isPerfect
            ? 'linear-gradient(135deg, var(--b-reading-light), var(--b-writing-light))'
            : isGood
              ? 'var(--b-reading-light)'
              : 'var(--b-latin-light)',
          border: `2px solid ${isPerfect ? 'var(--b-reading)' : isGood ? 'var(--b-reading-border)' : 'var(--b-latin-border)'}`,
        }}
      >
        {/* Main Score and XP */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {isPerfect ? (
              <Star size={32} weight="fill" className="b-text-writing" />
            ) : isGood ? (
              <CheckCircle size={32} weight="fill" className="b-text-reading" />
            ) : (
              <XCircle size={32} weight="fill" className="b-text-latin" />
            )}
            <div>
              <div
                className="b-text-2xl b-font-bold"
                style={{
                  color: isPerfect
                    ? 'var(--b-writing)'
                    : isGood
                      ? 'var(--b-reading)'
                      : 'var(--b-latin)',
                }}
              >
                {feedback.overallScore || 0}%
              </div>
              <div className="b-text-sm b-text-secondary">
                {feedback.qualityTier
                  ? feedback.qualityTier.charAt(0).toUpperCase() +
                    feedback.qualityTier.slice(1)
                  : 'Attempted'}
              </div>
            </div>
          </div>

          {/* Total XP Badge */}
          <div
            className="b-px-lg b-py-md b-rounded-xl b-font-bold b-text-xl"
            style={{
              backgroundColor:
                (feedback.netXp ?? 0) >= 0
                  ? 'var(--b-reading)'
                  : 'var(--b-latin)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {(feedback.netXp ?? 0) >= 0 ? '+' : ''}
            {feedback.netXp ?? 0} XP
          </div>
        </div>

        {/* XP Breakdown - Horizontal */}
        <div className="flex flex-wrap items-center gap-4 b-text-sm">
          <div className="flex items-center gap-1">
            <span className="b-text-muted">Translation:</span>
            <span className="b-font-semibold b-text-reading">
              +{feedback.xpEarned ?? 0}
            </span>
          </div>
          {feedback.parsingBonus?.bonusXp &&
            feedback.parsingBonus.bonusXp > 0 && (
              <div className="flex items-center gap-1">
                <span className="b-text-muted">Parsing:</span>
                <span className="b-font-semibold b-text-reading">
                  +{feedback.parsingBonus.bonusXp}
                </span>
              </div>
            )}
          {feedback.historicalContextBonus?.used &&
            feedback.historicalContextBonus?.xpEarned && (
              <div className="flex items-center gap-1">
                <span className="b-text-muted">Context:</span>
                <span className="b-font-semibold b-text-reading">
                  +{feedback.historicalContextBonus.xpEarned}
                </span>
              </div>
            )}
          {(feedback.xpSpentOnLookups ?? 0) > 0 && (
            <div className="flex items-center gap-1">
              <span className="b-text-muted">Lookups:</span>
              <span className="b-font-semibold b-text-latin">
                -{feedback.xpSpentOnLookups}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ============ SPACED REPETITION SCHEDULE MESSAGE ============ */}
      {showScheduleMessage && reviewScheduleMessage && (
        <ReviewScheduleMessage
          message={reviewScheduleMessage}
          onDismiss={() => setShowScheduleMessage(false)}
          onViewSchedule={onViewSchedule}
          variant="card"
        />
      )}

      {/* ============ NEXT BUTTON - PROMINENT ============ */}
      <button
        onClick={onNext}
        className="w-full b-btn b-btn-lg b-btn-latin flex items-center justify-center gap-2"
        style={{ minHeight: '56px' }}
      >
        <span className="b-text-lg">Next Sentence</span>
        <ArrowRight size={24} weight="bold" />
      </button>

      {/* ============ USER'S SUBMISSION ============ */}
      {userTranslation && (
        <div
          className="b-p-md b-rounded-lg"
          style={{
            backgroundColor: isGood
              ? 'var(--b-reading-light)'
              : 'var(--b-bg-muted)',
            border: `1px solid ${isGood ? 'var(--b-reading-border)' : 'var(--b-border)'}`,
          }}
        >
          <p className="b-text-xs b-text-muted b-mb-xs uppercase tracking-wide">
            Your Translation
          </p>
          <p
            className="b-text-primary b-font-medium"
            style={{ fontFamily: 'var(--b-font-serif, Georgia, serif)' }}
          >
            &ldquo;{userTranslation}&rdquo;
          </p>
        </div>
      )}

      {/* ============ DETAILED FEEDBACK SECTION ============ */}
      <div
        className="b-rounded-lg b-border b-p-lg"
        style={{ backgroundColor: 'var(--b-bg-card)' }}
      >
        {/* AI Feedback */}
        {feedback.feedback && (
          <p className="b-text-secondary b-mb-md">{feedback.feedback}</p>
        )}

        {/* Category Scores - 2x2 Grid */}
        {feedback.categoryScores && (
          <div className="grid grid-cols-2 gap-3 b-mb-md">
            {[
              {
                key: 'meaning',
                label: 'Meaning',
                score: categoryScores.meaning,
                lost: lostPoints.meaning,
              },
              {
                key: 'grammar',
                label: 'Grammar',
                score: categoryScores.grammar,
                lost: lostPoints.grammar,
              },
              {
                key: 'vocabulary',
                label: 'Vocabulary',
                score: categoryScores.vocabulary,
                lost: lostPoints.vocabulary,
              },
              {
                key: 'english',
                label: 'English',
                score: categoryScores.english,
                lost: lostPoints.english,
              },
            ].map(({ key, label, score, lost }) => (
              <div
                key={key}
                className="b-p-sm b-rounded-md flex items-center justify-between"
                style={{
                  backgroundColor:
                    lost > 0 ? 'var(--b-latin-light)' : 'var(--b-bg-muted)',
                  border:
                    lost > 0
                      ? '1px solid var(--b-latin-border)'
                      : '1px solid transparent',
                }}
              >
                <span
                  className={`b-text-sm ${lost > 0 ? 'b-font-medium' : 'b-text-muted'}`}
                >
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className={`b-font-semibold ${lost > 0 ? 'b-text-latin' : 'b-text-reading'}`}
                  >
                    {score}/25
                  </span>
                  {lost > 0 && (
                    <span className="b-text-xs b-text-latin">(-{lost})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Where You Lost Points */}
        {hasLostPoints &&
          feedback.improvements &&
          feedback.improvements.length > 0 && (
            <div
              className="b-rounded-lg b-p-md b-mb-md"
              style={{
                backgroundColor: 'var(--b-latin-light)',
                borderLeft: '4px solid var(--b-latin)',
              }}
            >
              <p
                className="b-text-sm b-font-semibold b-mb-sm flex items-center gap-2"
                style={{ color: 'var(--b-latin-dark)' }}
              >
                <Warning size={16} weight="fill" />
                Where you lost points:
              </p>
              <ul className="space-y-1">
                {feedback.improvements.map((improvement, i) => (
                  <li key={i} className="b-text-sm b-text-primary">
                    • {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Acceptable Translations */}
        {feedback.acceptableTranslations &&
          feedback.acceptableTranslations.length > 0 && (
            <div
              className="b-rounded-lg b-p-md"
              style={{
                backgroundColor: 'var(--b-reading-light)',
                borderLeft: '4px solid var(--b-reading)',
              }}
            >
              <p
                className="b-text-sm b-font-semibold b-mb-sm"
                style={{ color: 'var(--b-reading-dark)' }}
              >
                ✓ Accepted Translations:
              </p>
              <ul className="space-y-1">
                {feedback.acceptableTranslations.slice(0, 3).map((t, i) => (
                  <li
                    key={i}
                    className="b-text-sm b-text-primary"
                    style={{
                      fontFamily: 'var(--b-font-serif, Georgia, serif)',
                    }}
                  >
                    {i === 0 ? '→ ' : '• '}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  )
}
