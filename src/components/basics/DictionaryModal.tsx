'use client'

/**
 * DictionaryModal Component
 *
 * Modal for browsing Latin/Greek dictionaries with search, filtering,
 * personal word lists, and AI-powered word lookup.
 */

import {
  X,
  MagnifyingGlass,
  Book,
  BookBookmark,
  Sparkle,
  Keyboard,
} from '@phosphor-icons/react'
import { Portal } from './Portal'
import { useDictionary, SearchMode } from '@/lib/hooks/useDictionary'
import { GreekKeyboard, AILookupPanel, DictionaryEntryCard } from './dictionary'

interface DictionaryModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'latin' | 'greek'
  onXpChange: (delta: number) => void
  userXp: number
}

export function DictionaryModal({
  isOpen,
  onClose,
  language,
  onXpChange,
  userXp,
}: DictionaryModalProps) {
  const dict = useDictionary({ language, isOpen })

  if (!isOpen) return null

  const languageName = language === 'latin' ? 'Latin' : 'Greek'
  const languageIcon = language === 'latin' ? '🏛️' : '🏺'

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={onClose}
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onClose()
          }}
        />

        {/* Modal */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dictionary"
          className="relative rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
          style={{ backgroundColor: '#ffffff', color: 'var(--b-text-primary)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b b-border bg-gradient-to-r from-b-bg-greek-light to-b-bg-logic-light">
            <div className="flex items-center gap-3">
              <Book size={28} weight="fill" className="text-b-greek" />
              <div>
                <h2 className="text-xl font-bold b-text-primary">
                  {languageIcon} {languageName} Dictionary
                </h2>
                <p className="text-sm b-text-secondary">
                  {dict.showPersonal
                    ? `${dict.personalDictionary.length} words in your personal dictionary`
                    : `${dict.dictionary.length} words available`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:b-bg-muted rounded-lg transition-colors"
            >
              <X size={24} className="b-text-muted" />
            </button>
          </div>

          {/* Tabs: Stock vs Personal */}
          <div className="flex border-b b-border">
            <button
              onClick={() => dict.setShowPersonal(false)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                !dict.showPersonal
                  ? 'text-b-greek border-b-2 border-b-greek b-bg-greek-light-50'
                  : 'b-text-secondary hover:b-text-primary hover:b-bg-muted'
              }`}
            >
              <Book size={16} className="inline mr-2" />
              Full Dictionary
            </button>
            <button
              onClick={() => dict.setShowPersonal(true)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                dict.showPersonal
                  ? 'text-b-greek border-b-2 border-b-greek b-bg-greek-light-50'
                  : 'b-text-secondary hover:b-text-primary hover:b-bg-muted'
              }`}
            >
              <BookBookmark size={16} className="inline mr-2" />
              My Words ({dict.personalDictionary.length})
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-4 border-b b-border space-y-3">
            {/* Search Input */}
            <div className="relative">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 b-text-muted"
              />
              <input
                type="text"
                value={dict.searchQuery}
                onChange={(e) => dict.setSearchQuery(e.target.value)}
                placeholder={`Search ${languageName} words or definitions...`}
                className="w-full pl-10 pr-4 py-2.5 border b-border rounded-lg focus:ring-2 focus:ring-b-greek focus:border-transparent b-bg-card"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Search Mode */}
              <div className="flex b-bg-muted rounded-lg p-1">
                {(['all', 'declension', 'conjugation'] as SearchMode[]).map(
                  (mode) => (
                    <button
                      key={mode}
                      onClick={() => dict.handleSearchModeChange(mode)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        dict.searchMode === mode
                          ? 'b-bg-card b-text-primary shadow-sm'
                          : 'b-text-secondary hover:b-text-primary'
                      }`}
                    >
                      {mode === 'all'
                        ? 'All'
                        : mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  )
                )}
              </div>

              {/* Declension Filter */}
              {dict.searchMode === 'declension' && (
                <div className="flex b-bg-logic-light rounded-lg p-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        dict.setDeclensionFilter(
                          dict.declensionFilter === num ? null : num
                        )
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        dict.declensionFilter === num
                          ? 'b-bg-logic text-white shadow-sm'
                          : 'b-text-logic hover:bg-b-logic-border-50'
                      }`}
                    >
                      {num}
                      {num === 1
                        ? 'st'
                        : num === 2
                          ? 'nd'
                          : num === 3
                            ? 'rd'
                            : 'th'}
                    </button>
                  ))}
                </div>
              )}

              {/* Conjugation Filter */}
              {dict.searchMode === 'conjugation' && (
                <div className="flex b-bg-math-light rounded-lg p-1">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        dict.setConjugationFilter(
                          dict.conjugationFilter === num ? null : num
                        )
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        dict.conjugationFilter === num
                          ? 'b-bg-math text-white shadow-sm'
                          : 'b-text-math hover:bg-b-math-border-50'
                      }`}
                    >
                      {num}
                      {num === 1
                        ? 'st'
                        : num === 2
                          ? 'nd'
                          : num === 3
                            ? 'rd'
                            : 'th'}
                    </button>
                  ))}
                </div>
              )}

              {/* Part of Speech Filter */}
              <select
                value={dict.partOfSpeechFilter}
                onChange={(e) =>
                  dict.setPartOfSpeechFilter(
                    e.target.value as typeof dict.partOfSpeechFilter
                  )
                }
                className="px-3 py-1.5 text-xs font-medium border b-border rounded-lg focus:ring-2 focus:ring-b-greek b-bg-card"
              >
                <option value="all">All Types</option>
                <option value="noun">Nouns</option>
                <option value="verb">Verbs</option>
                <option value="adjective">Adjectives</option>
                <option value="adverb">Adverbs</option>
                <option value="preposition">Prepositions</option>
                <option value="conjunction">Conjunctions</option>
                <option value="pronoun">Pronouns</option>
              </select>

              {/* Greek Keyboard Toggle (only for Greek) */}
              {language === 'greek' && (
                <button
                  onClick={() =>
                    dict.setShowGreekKeyboard(!dict.showGreekKeyboard)
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    dict.showGreekKeyboard
                      ? 'b-bg-logic text-white'
                      : 'b-bg-logic-light b-text-logic hover:bg-b-logic-border-50'
                  }`}
                >
                  <Keyboard size={14} weight="fill" />
                  Greek Letters
                </button>
              )}

              {/* AI Lookup Button */}
              <button
                onClick={() => dict.setShowAILookup(!dict.showAILookup)}
                className={`ml-auto px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  dict.showAILookup
                    ? 'b-bg-logic text-white'
                    : 'b-bg-writing-light b-text-writing hover:bg-b-writing-border'
                }`}
              >
                <Sparkle size={14} weight="fill" />
                AI Lookup
              </button>
            </div>

            {/* Greek Keyboard */}
            {language === 'greek' && dict.showGreekKeyboard && (
              <GreekKeyboard
                keyboardCase={dict.greekKeyboardCase}
                onCaseChange={dict.setGreekKeyboardCase}
                onLetterClick={dict.insertGreekLetter}
                onBackspace={dict.handleBackspace}
                onClear={dict.clearSearch}
              />
            )}
          </div>

          {/* AI Lookup Panel */}
          {dict.showAILookup && (
            <AILookupPanel
              language={language}
              aiWord={dict.aiWord}
              onAiWordChange={dict.setAiWord}
              aiSentence={dict.aiSentence}
              onAiSentenceChange={dict.setAiSentence}
              aiLookupLoading={dict.aiLookupLoading}
              aiResult={dict.aiResult}
              aiError={dict.aiError}
              hasEnoughCredits={dict.hasEnoughCredits ?? false}
              balanceFormatted={dict.balance?.balanceFormatted || '$0.00'}
              onLookup={dict.handleAILookup}
              onAddToPersonal={dict.addToPersonalDictionary}
            />
          )}

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {dict.filteredEntries.length === 0 ? (
              <div className="text-center py-12 b-text-muted">
                <Book size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium">No words found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-2">
                {dict.filteredEntries.map((entry, index) => (
                  <DictionaryEntryCard
                    key={`${entry.word}-${index}`}
                    entry={entry}
                    language={language}
                    isSelected={dict.selectedEntry?.word === entry.word}
                    isInPersonal={dict.isInPersonalDictionary(entry.word)}
                    showPersonal={dict.showPersonal}
                    onSelect={() => dict.toggleEntrySelection(entry)}
                    onAddToPersonal={() => dict.addToPersonalDictionary(entry)}
                    onRemoveFromPersonal={() =>
                      dict.removeFromPersonalDictionary(entry.word)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t b-border b-bg-muted flex items-center justify-between">
            <div className="text-sm b-text-secondary">
              Showing {dict.filteredEntries.length} of{' '}
              {dict.displayDictionary.length} entries
            </div>
            {dict.addedToPersonal && (
              <div className="flex items-center gap-2 text-sm text-b-reading font-medium animate-pulse">
                <span>✓</span>
                Added to My Words!
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}
