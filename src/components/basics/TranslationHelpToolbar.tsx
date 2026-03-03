'use client'

/**
 * Translation Help Toolbar
 * Provides grammar tips, hints, AI tutor, and historical context for translation exercises
 */

import { useState } from 'react'
import {
  BookBookmark,
  Lightbulb,
  Sparkle,
  Lock,
  Check,
} from '@phosphor-icons/react'
import { ClassicalLanguage, TranslationExercise } from '@/lib/types/basics'
import { useApiFetch } from '@/lib/hooks/useApiFetch'

interface TranslationHelpToolbarProps {
  exercise: TranslationExercise
  language: ClassicalLanguage
  onXpChange: (delta: number) => void
  onShowAIExplanation: () => void
  aiTutorUsed: boolean
}

export function TranslationHelpToolbar({
  exercise,
  language,
  onXpChange,
  onShowAIExplanation,
  aiTutorUsed,
}: TranslationHelpToolbarProps) {
  const fetchApi = useApiFetch()
  const languageName = language === 'latin' ? 'Latin' : 'Greek'

  // Grammar tip state
  const [grammarTipPurchased, setGrammarTipPurchased] = useState(false)
  const [grammarTip, setGrammarTip] = useState<string | null>(null)

  // Hint state
  const [hintPurchased, setHintPurchased] = useState(false)
  const [purchasedHint, setPurchasedHint] = useState<string | null>(null)
  const [loadingHint, setLoadingHint] = useState(false)

  const handleGrammarTip = () => {
    if (grammarTipPurchased) return

    const tips: Record<string, string> = {
      'Present Tense': `In ${languageName}, present tense verbs indicate ongoing or habitual action. Look for personal endings: -o/-m (I), -s (you), -t (he/she/it), -mus (we), -tis (you pl.), -nt (they).`,
      'Past Tense': `Past tense in ${languageName} uses perfect or imperfect forms. Perfect indicates completed action, imperfect indicates ongoing past action.`,
      'Noun Cases': `${languageName} nouns change endings based on their role: Nominative (subject), Accusative (direct object), Genitive (possession), Dative (indirect object), Ablative (various uses).`,
      default: `This sentence demonstrates ${exercise.grammarTopic || 'key grammatical structures'}. Pay attention to word endings - they tell you the function of each word in the sentence.`,
    }
    setGrammarTip(tips[exercise.grammarTopic || ''] || tips['default'])
    setGrammarTipPurchased(true)
    onXpChange(-5)
  }

  const handleHint = async () => {
    if (hintPurchased && purchasedHint) return

    setLoadingHint(true)
    try {
      const data = await fetchApi<{ hint: string }>(
        '/api/basics/purchase-hint',
        {
          method: 'POST',
          body: JSON.stringify({
            exerciseId: exercise.id,
            language,
            xpCost: 8,
          }),
        }
      )
      setPurchasedHint(
        data.hint ||
          `Focus on the ${exercise.grammarTopic} pattern. The main verb is key to understanding the sentence structure.`
      )
      setHintPurchased(true)
      onXpChange(-8)
    } catch (error) {
      setPurchasedHint(
        `Focus on the ${exercise.grammarTopic} pattern. Look for familiar word endings that indicate grammatical function.`
      )
      setHintPurchased(true)
    } finally {
      setLoadingHint(false)
    }
  }

  return (
    <div className="b-bg-muted border b-border rounded-lg p-4">
      <h3 className="text-sm font-semibold b-text-secondary mb-3 text-center">
        NEED HELP?
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {/* Grammar Button */}
        <button
          onClick={handleGrammarTip}
          className={`flex flex-col items-center gap-2 p-4 b-bg-card border rounded-lg transition-all group ${
            grammarTipPurchased
              ? 'b-border-reading b-bg-reading-light hover:b-bg-reading-light'
              : 'b-border hover:b-border-math hover:b-bg-math-light'
          }`}
        >
          <div className="relative">
            <BookBookmark
              size={28}
              weight={grammarTipPurchased ? 'fill' : 'duotone'}
              className={`group-hover:scale-110 transition-transform ${
                grammarTipPurchased ? 'text-b-reading' : 'text-b-math'
              }`}
            />
            {grammarTipPurchased && (
              <Check
                size={14}
                weight="bold"
                className="absolute -top-1 -right-1 text-b-reading b-bg-card rounded-full"
              />
            )}
          </div>
          <span className="text-sm font-medium b-text-primary">
            {grammarTipPurchased ? 'View Grammar' : 'Grammar'}
          </span>
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              grammarTipPurchased ? 'text-b-reading' : 'text-b-math'
            }`}
          >
            {grammarTipPurchased ? (
              <>
                <Check size={10} weight="bold" />
                FREE
              </>
            ) : (
              <>
                <Lock size={10} weight="bold" />5 XP
              </>
            )}
          </span>
        </button>

        {/* Hint Button */}
        <button
          onClick={handleHint}
          disabled={loadingHint}
          className={`flex flex-col items-center gap-2 p-4 b-bg-card border rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group ${
            hintPurchased
              ? 'b-border-reading b-bg-reading-light hover:b-bg-reading-light'
              : 'b-border hover:b-border-writing hover:b-bg-writing-light'
          }`}
        >
          <div className="relative">
            <Lightbulb
              size={28}
              weight={hintPurchased ? 'fill' : 'duotone'}
              className={`group-hover:scale-110 transition-transform ${
                hintPurchased ? 'text-b-reading' : 'text-b-writing'
              }`}
            />
            {hintPurchased && (
              <Check
                size={14}
                weight="bold"
                className="absolute -top-1 -right-1 text-b-reading b-bg-card rounded-full"
              />
            )}
          </div>
          <span className="text-sm font-medium b-text-primary">
            {hintPurchased ? 'View Hint' : 'Hint'}
          </span>
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              hintPurchased ? 'text-b-reading' : 'b-text-writing'
            }`}
          >
            {loadingHint ? (
              <span className="animate-pulse">Loading...</span>
            ) : hintPurchased ? (
              <>
                <Check size={10} weight="bold" />
                FREE
              </>
            ) : (
              <>
                <Lock size={10} weight="bold" />8 XP
              </>
            )}
          </span>
        </button>

        {/* AI Tutor Button */}
        <button
          onClick={onShowAIExplanation}
          className={`flex flex-col items-center gap-2 p-4 b-bg-card border rounded-lg transition-all group ${
            aiTutorUsed
              ? 'b-border-reading b-bg-reading-light hover:b-bg-reading-light'
              : 'b-border hover:b-border-logic hover:b-bg-logic-light'
          }`}
        >
          <div className="relative">
            <Sparkle
              size={28}
              weight={aiTutorUsed ? 'fill' : 'duotone'}
              className={`group-hover:scale-110 transition-transform ${
                aiTutorUsed ? 'text-b-reading' : 'text-b-logic'
              }`}
            />
            {aiTutorUsed && (
              <Check
                size={14}
                weight="bold"
                className="absolute -top-1 -right-1 text-b-reading b-bg-card rounded-full"
              />
            )}
          </div>
          <span className="text-sm font-medium b-text-primary">
            {aiTutorUsed ? 'View AI' : 'AI Tutor'}
          </span>
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              aiTutorUsed ? 'text-b-reading' : 'text-b-logic'
            }`}
          >
            {aiTutorUsed ? (
              <>
                <Check size={10} weight="bold" />
                FREE
              </>
            ) : (
              <>
                <Lock size={10} weight="bold" />1 Credit
              </>
            )}
          </span>
        </button>
      </div>

      {/* Grammar Tip Display */}
      {grammarTip && (
        <div className="mt-3 p-3 b-bg-math-light border b-border-math rounded-lg">
          <div className="flex items-start gap-2">
            <BookBookmark
              size={18}
              weight="fill"
              className="text-b-math mt-0.5 flex-shrink-0"
            />
            <p className="text-sm b-text-math">{grammarTip}</p>
          </div>
        </div>
      )}

      {/* Purchased Hint Display */}
      {purchasedHint && (
        <div className="mt-3 p-3 b-bg-writing-light border b-border-writing rounded-lg">
          <div className="flex items-start gap-2">
            <Lightbulb
              size={18}
              weight="fill"
              className="text-b-writing mt-0.5 flex-shrink-0"
            />
            <p className="text-sm b-text-writing">{purchasedHint}</p>
          </div>
        </div>
      )}

      {/* Topic indicator */}
      <p className="text-xs b-text-muted text-center mt-3">
        Topic:{' '}
        <span className="font-medium">
          {exercise.grammarTopic || `${languageName} Translation`}
        </span>
      </p>
    </div>
  )
}
