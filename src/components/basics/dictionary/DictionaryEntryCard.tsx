/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * DictionaryEntryCard Component
 *
 * Displays a dictionary entry with expandable details and AI enrichment.
 */

import { useState } from 'react'
import { DictionaryEntry } from '@/lib/data/latin-dictionary'
import {
  Check,
  Plus,
  X,
  Sparkle,
  CaretUp,
  Scroll,
  Clock,
  Lightbulb,
  TreeStructure,
} from '@phosphor-icons/react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useCredits } from '@/lib/hooks/useCredits'

const AI_ENRICH_COST_CENTS = 15

interface MorphologyTable {
  title: string
  headers: string[]
  rows: { label: string; forms: string[] }[]
}

interface HistoricalUse {
  source: string
  author: string
  date: string
  originalText: string
  translation: string
  significance: string
}

interface EnrichmentData {
  word: string
  language: 'latin' | 'greek'
  etymology: {
    origin: string
    rootMeaning: string
    cognates: string[]
    derivatives: { word: string; meaning: string }[]
  }
  morphology: {
    summary: string
    tables: MorphologyTable[]
  }
  historicalUses: HistoricalUse[]
  culturalContext: string
  memoryTip: string
}

interface DictionaryEntryCardProps {
  entry: DictionaryEntry
  isSelected: boolean
  isInPersonal: boolean
  showPersonal: boolean
  language?: 'latin' | 'greek'
  onSelect: () => void
  onAddToPersonal: () => void
  onRemoveFromPersonal: () => void
}

export function DictionaryEntryCard({
  entry,
  isSelected,
  isInPersonal,
  showPersonal,
  language = 'latin',
  onSelect,
  onAddToPersonal,
  onRemoveFromPersonal,
}: DictionaryEntryCardProps) {
  const fetchApi = useApiFetch()
  const { balance, refresh: refreshCredits } = useCredits()

  const [showEnrichment, setShowEnrichment] = useState(false)
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentData | null>(
    null
  )
  const [enrichmentLoading, setEnrichmentLoading] = useState(false)
  const [enrichmentError, setEnrichmentError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'forms' | 'history' | 'etymology'>(
    'forms'
  )

  const hasEnoughCredits = (balance?.balance ?? 0) >= AI_ENRICH_COST_CENTS

  const handleEnrich = async () => {
    if (enrichmentData) {
      setShowEnrichment(!showEnrichment)
      return
    }

    if (!hasEnoughCredits) {
      setEnrichmentError('Not enough credits. Add funds to use this feature.')
      return
    }

    setEnrichmentLoading(true)
    setEnrichmentError(null)

    try {
      const response = await fetchApi('/api/basics/dictionary/ai-enrich', {
        method: 'POST',
        body: JSON.stringify({
          word: entry.word,
          lemma: entry.word,
          language,
          partOfSpeech: entry.partOfSpeech,
          definition: entry.definition,
        }),
      })

      if (response.success && response.data?.enrichment) {
        setEnrichmentData(response.data.enrichment)
        setShowEnrichment(true)
        refreshCredits()
      } else {
        setEnrichmentError(response.error || 'Failed to load word details')
      }
    } catch (err) {
      setEnrichmentError('Failed to connect to AI service')
    } finally {
      setEnrichmentLoading(false)
    }
  }

  const getPartOfSpeechColor = (pos: string) => {
    switch (pos) {
      case 'noun':
        return 'b-bg-logic-light b-text-logic'
      case 'verb':
        return 'b-bg-math-light b-text-math'
      case 'adjective':
        return 'b-bg-reading-light b-text-reading'
      case 'adverb':
        return 'b-bg-writing-light b-text-writing'
      default:
        return 'b-bg-muted b-text-secondary'
    }
  }

  // Theme classes based on language
  const themeClasses =
    language === 'latin'
      ? {
          bg: 'b-bg-latin-light',
          border: 'b-border-latin',
          text: 'text-b-latin',
        }
      : {
          bg: 'b-bg-greek-light',
          border: 'b-border-greek',
          text: 'text-b-greek',
        }

  return (
    <div
      className={`p-3 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? `${themeClasses.bg} ${themeClasses.border}`
          : 'b-bg-card b-border hover:b-border-greek hover:b-bg-greek-light-30'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold b-text-primary">{entry.word}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded ${getPartOfSpeechColor(entry.partOfSpeech)}`}
            >
              {entry.partOfSpeech}
            </span>
            {entry.declension && (
              <span className="text-xs b-bg-logic-light text-b-logic px-1.5 py-0.5 rounded">
                {entry.declension}
                {entry.declension === 1
                  ? 'st'
                  : entry.declension === 2
                    ? 'nd'
                    : entry.declension === 3
                      ? 'rd'
                      : 'th'}{' '}
                decl.
              </span>
            )}
            {entry.conjugation && (
              <span className="text-xs b-bg-math-light text-b-math px-1.5 py-0.5 rounded">
                {entry.conjugation}
                {entry.conjugation === 1
                  ? 'st'
                  : entry.conjugation === 2
                    ? 'nd'
                    : entry.conjugation === 3
                      ? 'rd'
                      : 'th'}{' '}
                conj.
              </span>
            )}
            {entry.gender && (
              <span className="text-xs b-bg-latin-light text-b-latin px-1.5 py-0.5 rounded">
                {entry.gender === 'm'
                  ? 'masc.'
                  : entry.gender === 'f'
                    ? 'fem.'
                    : 'neut.'}
              </span>
            )}
            {entry.frequency === 'very-common' && (
              <span className="text-xs b-bg-writing-light text-b-writing px-1 py-0.5 rounded">
                ★
              </span>
            )}
          </div>
          <p className="text-sm b-text-secondary mt-1">{entry.definition}</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* AI Enrich button - only show icon, subtle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEnrich()
            }}
            disabled={enrichmentLoading}
            className={`p-1.5 rounded-lg transition-colors ${
              enrichmentData
                ? `${themeClasses.bg} ${themeClasses.text}`
                : 'hover:b-bg-muted b-text-muted hover:b-text-secondary'
            } ${enrichmentLoading ? 'opacity-50 cursor-wait' : ''}`}
            title={
              enrichmentData ? 'View details' : 'Learn more about this word'
            }
          >
            {enrichmentLoading ? (
              <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
              <Sparkle size={18} weight={enrichmentData ? 'fill' : 'regular'} />
            )}
          </button>

          {/* Add/Remove from Personal Dictionary button */}
          {!showPersonal && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (isInPersonal) {
                  onRemoveFromPersonal()
                } else {
                  onAddToPersonal()
                }
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isInPersonal
                  ? 'b-bg-greek-light text-b-greek'
                  : 'hover:b-bg-muted b-text-muted hover:b-text-secondary'
              }`}
              title={isInPersonal ? 'Remove from My Words' : 'Add to My Words'}
            >
              {isInPersonal ? (
                <Check size={18} weight="bold" />
              ) : (
                <Plus size={18} />
              )}
            </button>
          )}

          {showPersonal && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemoveFromPersonal()
              }}
              className="p-1.5 rounded-lg hover:b-bg-latin-light b-text-muted hover:text-b-latin transition-colors"
              title="Remove from My Words"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isSelected && !showEnrichment && (
        <div className="mt-3 pt-3 border-t b-border space-y-2">
          {entry.forms && (
            <div className="text-sm">
              <span className="font-medium b-text-secondary">Forms: </span>
              <span className="b-text-secondary">{entry.forms}</span>
            </div>
          )}
          {entry.principalParts && (
            <div className="text-sm">
              <span className="font-medium b-text-secondary">
                Principal Parts:{' '}
              </span>
              <span className="b-text-secondary">{entry.principalParts}</span>
            </div>
          )}
          {entry.examples && entry.examples.length > 0 && (
            <div className="text-sm">
              <span className="font-medium b-text-secondary">Examples: </span>
              <ul className="list-disc list-inside b-text-secondary mt-1">
                {entry.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Learn more button */}
          {!enrichmentData && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEnrich()
              }}
              disabled={enrichmentLoading}
              className={`mt-2 w-full py-2 px-3 rounded-lg b-border b-bg-muted hover:b-bg-card b-text-secondary hover:b-text-primary text-sm font-medium flex items-center justify-center gap-2 transition-colors ${enrichmentLoading ? 'opacity-50 cursor-wait' : ''}`}
            >
              {enrichmentLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkle size={16} />
                  Learn more about this word
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {enrichmentError && (
        <div className="mt-3 p-2 b-bg-latin-light b-border-latin border rounded-lg text-sm text-b-latin">
          {enrichmentError}
        </div>
      )}

      {/* AI Enrichment Panel */}
      {showEnrichment && enrichmentData && (
        <div className="mt-3 pt-3 border-t b-border">
          {/* Header with collapse button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkle size={16} weight="fill" className={themeClasses.text} />
              <span className="font-semibold b-text-primary text-sm">
                Word Details
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowEnrichment(false)
              }}
              className="p-1 hover:b-bg-muted rounded transition-colors"
            >
              <CaretUp size={16} className="b-text-muted" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-3">
            {[
              { id: 'forms' as const, label: 'Forms', icon: Scroll },
              { id: 'history' as const, label: 'History', icon: Clock },
              {
                id: 'etymology' as const,
                label: 'Etymology',
                icon: TreeStructure,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveTab(tab.id)
                }}
                className={`px-2 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                  activeTab === tab.id
                    ? `${themeClasses.bg} ${themeClasses.text}`
                    : 'b-text-muted hover:b-text-secondary hover:b-bg-muted'
                }`}
              >
                <tab.icon
                  size={14}
                  weight={activeTab === tab.id ? 'fill' : 'regular'}
                />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {/* Forms Tab */}
            {activeTab === 'forms' && (
              <>
                <p className="text-xs b-text-secondary">
                  {enrichmentData.morphology.summary}
                </p>

                {enrichmentData.morphology.tables.map((table, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden b-border border"
                  >
                    <div
                      className={`px-3 py-1.5 ${themeClasses.bg} ${themeClasses.text} font-medium text-xs`}
                    >
                      {table.title}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="b-bg-muted">
                            {table.headers.map((h, i) => (
                              <th
                                key={i}
                                className="px-2 py-1.5 text-left font-medium b-text-secondary whitespace-nowrap"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-t b-border">
                              <td className="px-2 py-1.5 font-medium b-text-secondary">
                                {row.label}
                              </td>
                              {row.forms.map((form, formIdx) => (
                                <td
                                  key={formIdx}
                                  className={`px-2 py-1.5 font-mono ${themeClasses.text}`}
                                >
                                  {form}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <>
                {enrichmentData.historicalUses.map((use, idx) => (
                  <div
                    key={idx}
                    className="p-3 b-bg-card rounded-lg b-border border space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs">
                        <span className="font-semibold b-text-primary">
                          {use.source}
                        </span>
                        <span className="b-text-muted mx-1">•</span>
                        <span className="b-text-secondary">{use.author}</span>
                      </div>
                      <span className="text-[10px] b-bg-muted b-text-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                        {use.date}
                      </span>
                    </div>
                    <blockquote
                      className={`font-serif text-sm italic ${themeClasses.text} border-l-2 ${themeClasses.border} pl-3`}
                    >
                      &ldquo;{use.originalText}&rdquo;
                    </blockquote>
                    <p className="b-text-secondary text-xs">
                      &ldquo;{use.translation}&rdquo;
                    </p>
                    <p className="text-xs b-text-muted b-bg-muted p-2 rounded">
                      <strong>Why it matters:</strong> {use.significance}
                    </p>
                  </div>
                ))}

                {/* Cultural Context */}
                <div
                  className={`p-3 ${themeClasses.bg} rounded-lg border ${themeClasses.border}`}
                >
                  <h4
                    className={`font-medium ${themeClasses.text} mb-1 flex items-center gap-1.5 text-xs`}
                  >
                    <Scroll size={14} weight="fill" />
                    Cultural Context
                  </h4>
                  <p className="text-xs b-text-primary">
                    {enrichmentData.culturalContext}
                  </p>
                </div>
              </>
            )}

            {/* Etymology Tab */}
            {activeTab === 'etymology' && (
              <>
                <div className="p-3 b-bg-card rounded-lg b-border border">
                  <h4 className="font-medium b-text-primary mb-1 text-xs">
                    Origin
                  </h4>
                  <p className="text-xs b-text-secondary">
                    {enrichmentData.etymology.origin}
                  </p>
                  <p className="text-xs b-text-muted mt-1">
                    <strong>Root meaning:</strong>{' '}
                    {enrichmentData.etymology.rootMeaning}
                  </p>
                </div>

                {enrichmentData.etymology.cognates.length > 0 && (
                  <div className="p-3 b-bg-card rounded-lg b-border border">
                    <h4 className="font-medium b-text-primary mb-1 text-xs">
                      Related Words (Cognates)
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {enrichmentData.etymology.cognates.map((cognate, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 b-bg-muted b-text-secondary rounded text-xs"
                        >
                          {cognate}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {enrichmentData.etymology.derivatives.length > 0 && (
                  <div className="p-3 b-bg-card rounded-lg b-border border">
                    <h4 className="font-medium b-text-primary mb-1 text-xs">
                      English Derivatives
                    </h4>
                    <div className="space-y-1">
                      {enrichmentData.etymology.derivatives.map(
                        (deriv, idx) => (
                          <div
                            key={idx}
                            className="flex items-baseline gap-1 text-xs"
                          >
                            <span
                              className={`font-medium ${themeClasses.text}`}
                            >
                              {deriv.word}
                            </span>
                            <span className="b-text-muted">—</span>
                            <span className="b-text-secondary">
                              {deriv.meaning}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Memory Tip */}
                <div className="p-3 b-bg-reading-light rounded-lg border b-border-reading">
                  <h4 className="font-medium text-b-reading mb-1 flex items-center gap-1.5 text-xs">
                    <Lightbulb size={14} weight="fill" />
                    Memory Tip
                  </h4>
                  <p className="text-xs b-text-primary">
                    {enrichmentData.memoryTip}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
