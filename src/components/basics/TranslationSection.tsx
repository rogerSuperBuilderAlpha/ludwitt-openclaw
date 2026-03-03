'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useTelemetryCollector } from '@/lib/telemetry/collector'
import { useStruggleDetection } from '@/lib/hooks/useStruggleDetection'
import { useTransferChallenge } from '@/lib/hooks/useTransferChallenge'
import { useTranslationSubmission } from '@/lib/hooks/useTranslationSubmission'
import { useWordLookup } from '@/lib/hooks/useWordLookup'
import { StruggleIntervention } from './StruggleIntervention'
import { TransferChallenge } from './transfer/TransferChallenge'
import { TranslationInputArea } from './TranslationInputArea'
import {
  TranslationExercise,
  ClassicalLanguage,
  SubjectProgressDisplay,
} from '@/lib/types/basics'
import { SingleProgressChip } from './SingleProgressChip'
import { Clock, Book, BookBookmark, Video } from '@phosphor-icons/react'
import { AIExplanation } from './AIExplanation'
import { IntroVideosModal } from './IntroVideosModal'
import { DictionaryModal } from './DictionaryModal'
import { GrammarReferenceModal } from './GrammarReferenceModal'
import { GreekAlphabetPanel, GreekAlphabetButton } from './GreekAlphabetHelper'
import {
  WordLookupConfirmModal,
  WordDetailModal,
  LookedUpWordsDisplay,
} from './WordLookupModal'
import { FREE_LOOKUPS_PER_EXERCISE } from '@/lib/basics/xp-config'
import { TranslationHelpToolbar } from './TranslationHelpToolbar'
import { TranslationFeedbackDisplay } from './TranslationFeedbackDisplay'
import { ClickableSourceText } from './ClickableSourceText'
import { HistoricalContextSection } from './HistoricalContextSection'

interface TranslationSectionProps {
  language: ClassicalLanguage
  exercise: TranslationExercise | null
  progress: SubjectProgressDisplay | null
  onExerciseComplete: (
    nextExercise: TranslationExercise,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  onSkip: () => void
  userXp: number
  onXpChange: (delta: number) => void
  dailyXP?: number
  dailyGoal?: number
}

function getDifficultyConfig(difficulty: number) {
  if (difficulty <= 2)
    return {
      label: 'Easy',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      icon: '🌱',
    }
  if (difficulty <= 4)
    return {
      label: 'Medium',
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      icon: '🌿',
    }
  if (difficulty <= 7)
    return {
      label: 'Hard',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      icon: '🌳',
    }
  return {
    label: 'Challenge',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '🔥',
  }
}

export function TranslationSection({
  language,
  exercise,
  progress,
  onExerciseComplete,
  onSkip,
  userXp,
  onXpChange,
  dailyXP = 0,
  dailyGoal = 1000,
}: TranslationSectionProps) {
  const { user } = useAuth()
  const dailyXPMet = dailyXP >= dailyGoal

  // Refs
  const sessionStartRef = useRef<number>(Date.now())
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Local state
  const [translation, setTranslation] = useState('')
  const [showParsing, setShowParsing] = useState(false)
  const [parsing, setParsing] = useState<Record<string, string>>({})
  const [startTime] = useState(Date.now())

  // Modal state
  const [showAIExplanation, setShowAIExplanation] = useState(false)
  const [aiTutorUsed, setAiTutorUsed] = useState(false)
  const [showGrammarReference, setShowGrammarReference] = useState(false)
  const [showDictionary, setShowDictionary] = useState(false)
  const [showIntroVideos, setShowIntroVideos] = useState(false)
  const [showGreekAlphabet, setShowGreekAlphabet] = useState(false)

  // Telemetry
  const telemetry = useTelemetryCollector({
    problemId: exercise?.id || 'unknown',
    userId: user?.uid || 'anonymous',
    subject: language,
    difficulty: exercise?.difficulty || 5,
    skills: exercise?.grammarTopic ? [exercise.grammarTopic] : [],
    getToken: user ? () => user.getIdToken() : undefined,
  })

  // Transfer Challenges
  const transferChallenge = useTransferChallenge()

  // Word Lookup hook
  const wordLookup = useWordLookup({
    userXp,
    onXpChange,
    trackDictionaryLookup: telemetry.trackDictionaryLookup,
  })

  // Submission hook
  const submission = useTranslationSubmission({
    userId: user?.uid,
    language,
    exercise,
    translation,
    showParsing,
    parsing,
    wordsLookedUp: wordLookup.wordsLookedUp,
    xpSpentOnLookups: wordLookup.xpSpentOnLookups,
    startTime,
    onExerciseComplete,
    onXpChange,
    flushTelemetry: telemetry.flush,
    sessionStartRef,
    transferChallenge,
  })

  // Struggle Detection (must come after submission to reference feedback)
  const struggleDetection = useStruggleDetection({
    problemId: exercise?.id || 'unknown',
    subject: language,
    difficulty: exercise?.difficulty || 5,
    problemType: exercise?.grammarTopic,
    problemText: exercise?.sourceText,
    getCurrentSignals: telemetry.getCurrentSignals,
    pollIntervalMs: 10000,
    enabled: !!exercise && !submission.feedback,
  })

  // Reset state when exercise changes
  useEffect(() => {
    setTranslation('')
    submission.setFeedback(null)
    setShowParsing(false)
    setParsing({})
    wordLookup.setWordsLookedUp({})
    wordLookup.setShowWordModal(false)
    wordLookup.setConfirmLookup(null)
    wordLookup.setFreeLookupsRemaining(FREE_LOOKUPS_PER_EXERCISE)
    setShowAIExplanation(false)
    setAiTutorUsed(false)
    submission.setAttemptCount(0)
    telemetry.start()
    sessionStartRef.current = Date.now()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?.id])

  if (!exercise) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-b-border rounded w-1/3" />
        <div className="h-32 bg-b-border rounded" />
        <div className="h-24 bg-b-border rounded" />
      </div>
    )
  }

  const languageName = language === 'latin' ? 'Latin' : 'Greek'
  const difficultyConfig = getDifficultyConfig(exercise.difficulty)
  const { feedback, attemptCount } = submission

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{'🏛️'}</span>
          <h2 className="text-xl font-bold b-text-primary">{languageName}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIntroVideos(true)}
            className="p-2 rounded-lg b-bg-reading-light b-text-reading hover:opacity-90 transition-colors"
            title="Watch Intro Videos"
          >
            <Video size={20} weight="fill" />
          </button>
          <button
            onClick={() => setShowDictionary(true)}
            className="p-2 rounded-lg b-bg-logic-light b-text-logic hover:opacity-90 transition-colors"
            title="Dictionary"
          >
            <Book size={20} weight="fill" />
          </button>
          <button
            onClick={() => setShowGrammarReference(true)}
            className="p-2 rounded-lg b-bg-math-light b-text-math hover:opacity-90 transition-colors"
            title="Grammar Reference"
          >
            <BookBookmark size={20} weight="fill" />
          </button>
          {language === 'greek' && (
            <GreekAlphabetButton onOpen={() => setShowGreekAlphabet(true)} />
          )}
          {progress && (
            <SingleProgressChip
              subject={languageName}
              progress={progress}
              dailyXPMet={dailyXPMet}
            />
          )}
        </div>
      </div>

      {/* Exercise Card */}
      <div
        className="b-border b-rounded-lg b-p-xl"
        style={{
          backgroundColor:
            language === 'latin'
              ? 'var(--b-latin-light)'
              : 'var(--b-logic-light)',
          borderColor:
            language === 'latin'
              ? 'var(--b-latin-border)'
              : 'var(--b-logic-border)',
          color: 'var(--b-text-primary)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--b-space-lg)',
          }}
        >
          {/* Exercise Header */}
          <div
            className="flex items-center justify-between b-pb-lg"
            style={{ borderBottom: '1px solid var(--b-border-default)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="b-text-sm b-font-medium"
                style={{ color: 'var(--b-text-secondary)' }}
              >
                {exercise.grammarTopic}
                {exercise.grammarSubtopic && ` - ${exercise.grammarSubtopic}`}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyConfig.bgColor} ${difficultyConfig.color}`}
              >
                {difficultyConfig.icon} {difficultyConfig.label}
              </span>
            </div>
            <span
              className="b-text-xs flex items-center gap-1"
              style={{ color: 'var(--b-text-muted)' }}
            >
              <Clock size={14} /> Est. {exercise.timeEstimate ?? 120}s
            </span>
          </div>

          <ClickableSourceText
            words={exercise.words || []}
            language={language}
            romanization={exercise.romanization}
            wordsLookedUp={wordLookup.wordsLookedUp}
            xpSpentOnLookups={wordLookup.xpSpentOnLookups}
            onWordClick={wordLookup.handleWordClick}
            freeLookupsRemaining={wordLookup.freeLookupsRemaining}
          />

          {!feedback && (
            <HistoricalContextSection
              exercise={exercise}
              language={language}
              onXpChange={onXpChange}
            />
          )}
          <LookedUpWordsDisplay
            words={exercise.words || []}
            lookedUpWords={wordLookup.wordsLookedUp}
          />

          {struggleDetection.shouldIntervene &&
            struggleDetection.intervention && (
              <StruggleIntervention
                intervention={struggleDetection.intervention}
                onDismiss={(accepted) =>
                  struggleDetection.dismissIntervention(accepted)
                }
                subject={language}
              />
            )}

          {!feedback && (
            <TranslationInputArea
              language={language}
              exercise={exercise}
              translation={translation}
              onTranslationChange={setTranslation}
              textareaRef={textareaRef}
              showParsing={showParsing}
              onToggleParsing={() => setShowParsing(!showParsing)}
              parsing={parsing}
              onParsingChange={(word, value) =>
                setParsing((prev) => ({ ...prev, [word]: value }))
              }
              isSubmitting={submission.isSubmitting}
              gradingStage={submission.gradingStage}
              onSubmit={submission.handleSubmit}
              onSkip={onSkip}
            />
          )}

          {attemptCount >= 1 &&
            feedback &&
            feedback.qualityTier !== 'perfect' &&
            feedback.qualityTier !== 'excellent' && (
              <div
                className="p-3 rounded-lg border"
                style={{
                  backgroundColor: 'var(--b-writing-light, #fef3c7)',
                  borderColor: 'var(--b-writing-border, #fcd34d)',
                }}
              >
                <p
                  className="font-medium text-sm"
                  style={{ color: 'var(--b-writing, #d97706)' }}
                >
                  {'💡 Multiple translations are accepted'}
                </p>
                <p className="text-sm mt-1 b-text-secondary">
                  Try different word orders or synonyms. {languageName} word
                  order is flexible, so &ldquo;The man sees the woman&rdquo; and
                  &ldquo;The woman, the man sees&rdquo; can both be correct.
                </p>
                {exercise.acceptableTranslations &&
                  exercise.acceptableTranslations.length > 1 && (
                    <p className="text-xs mt-2 b-text-muted">
                      Hint: There are {exercise.acceptableTranslations.length}{' '}
                      accepted translations for this sentence.
                    </p>
                  )}
              </div>
            )}

          {feedback && (
            <TranslationFeedbackDisplay
              feedback={feedback}
              userTranslation={translation}
              onNext={submission.handleNext}
            />
          )}
        </div>
      </div>

      {!feedback && (
        <TranslationHelpToolbar
          exercise={exercise}
          language={language}
          onXpChange={onXpChange}
          onShowAIExplanation={() => setShowAIExplanation(true)}
          aiTutorUsed={aiTutorUsed}
        />
      )}

      {showAIExplanation && exercise && (
        <AIExplanation
          problemId={exercise.id}
          problemText={`Translate from ${languageName}: "${exercise.sourceText}"`}
          subject={exercise.grammarTopic || `${languageName} Translation`}
          difficulty={exercise.difficulty}
          currentAnswer={translation}
          onClose={() => {
            setShowAIExplanation(false)
            setAiTutorUsed(true)
          }}
          onCreditsUsed={() => {}}
        />
      )}

      {wordLookup.confirmLookup && (
        <WordLookupConfirmModal
          word={wordLookup.confirmLookup}
          userXp={userXp}
          skipConfirmation={wordLookup.skipConfirmation}
          onConfirm={() => wordLookup.doLookup(wordLookup.confirmLookup!)}
          onCancel={() => wordLookup.setConfirmLookup(null)}
          onSkipConfirmationChange={wordLookup.setSkipConfirmation}
          freeLookupsRemaining={wordLookup.freeLookupsRemaining}
        />
      )}
      {wordLookup.showWordModal && wordLookup.selectedWord && (
        <WordDetailModal
          word={wordLookup.selectedWord}
          onClose={() => wordLookup.setShowWordModal(false)}
        />
      )}

      <GrammarReferenceModal
        isOpen={showGrammarReference}
        onClose={() => setShowGrammarReference(false)}
        language={language}
      />
      <DictionaryModal
        isOpen={showDictionary}
        onClose={() => setShowDictionary(false)}
        language={language}
        onXpChange={onXpChange}
        userXp={userXp}
      />
      {language === 'greek' && (
        <GreekAlphabetPanel
          isOpen={showGreekAlphabet}
          onClose={() => setShowGreekAlphabet(false)}
        />
      )}
      <IntroVideosModal
        isOpen={showIntroVideos}
        onClose={() => setShowIntroVideos(false)}
        language={language}
      />

      {transferChallenge.state.currentChallenge && (
        <TransferChallenge
          challenge={transferChallenge.state.currentChallenge}
          isOpen={transferChallenge.state.showChallenge}
          onClose={() => transferChallenge.hideTransferChallenge()}
          onComplete={transferChallenge.handleChallengeComplete}
        />
      )}
    </div>
  )
}
