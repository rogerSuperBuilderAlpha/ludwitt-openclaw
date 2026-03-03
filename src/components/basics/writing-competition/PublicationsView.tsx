'use client'

import { useState } from 'react'
import {
  CaretLeft,
  CaretDown,
  CaretUp,
  CheckCircle,
  Lock,
  LockOpen,
  ArrowSquareOut,
  Play,
  Coins,
} from '@phosphor-icons/react'
import type { FamousAuthor, AuthorPublication } from './types'

interface PublicationsViewProps {
  selectedAuthor: FamousAuthor
  isAuthorUnlocked: (author: FamousAuthor) => boolean
  getAuthorProgress: (author: FamousAuthor) => {
    completed: number
    total: number
  }
  getBookProgress: (authorId: string, bookId: string) => any
  isOnCooldown: (authorId: string, bookId: string) => boolean
  getDaysUntilRetry: (authorId: string, bookId: string) => number
  onSelectBook: (book: AuthorPublication) => void
  onGetAuthorTips: (author: FamousAuthor) => void
  onBackToAuthors: () => void
}

export function PublicationsView({
  selectedAuthor,
  isAuthorUnlocked,
  getAuthorProgress,
  getBookProgress,
  isOnCooldown,
  getDaysUntilRetry,
  onSelectBook,
  onGetAuthorTips,
  onBackToAuthors,
}: PublicationsViewProps) {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)

  const getPurchaseLink = (book: AuthorPublication, authorName: string) => {
    if (book.purchaseLink) return book.purchaseLink
    const searchQuery = encodeURIComponent(`${book.title} ${authorName}`)
    return `https://www.amazon.com/s?k=${searchQuery}&i=stripbooks`
  }

  const getBookDescription = (book: AuthorPublication, authorName: string) => {
    if (book.description) return book.description
    return `Published in ${book.year}, this work by ${authorName} showcases their distinctive literary style and themes.`
  }

  const progress = getAuthorProgress(selectedAuthor)
  const unlocked = isAuthorUnlocked(selectedAuthor)
  const remaining = progress.total - progress.completed

  return (
    <div className="space-y-3">
      <button
        onClick={onBackToAuthors}
        className="flex items-center gap-1 b-text-logic hover:b-text-logic-dark transition-colors cursor-pointer b-text-xs"
      >
        <CaretLeft size={14} />
        <span>Back</span>
      </button>

      <div className="b-p-md b-bg-logic-light b-rounded-lg">
        <h4 className="b-font-bold b-text-logic-dark b-text-sm">
          {selectedAuthor.name}
        </h4>
        <p className="b-text-xs b-text-logic-text">
          {selectedAuthor.specialty}
        </p>
      </div>

      {/* Reading List */}
      <div>
        <h5 className="b-text-xs b-font-semibold b-text-primary b-mb-2">
          Reading List
        </h5>
        <p className="b-text-xs b-text-muted b-mb-2">
          Complete the quiz to unlock writing tips
        </p>
        <div className="space-y-2">
          {selectedAuthor.publications.map((book) => {
            const bookProgress = getBookProgress(selectedAuthor.id, book.id)
            const onCooldown = isOnCooldown(selectedAuthor.id, book.id)
            const daysLeft = getDaysUntilRetry(selectedAuthor.id, book.id)
            const isExpanded = expandedBookId === book.id

            return (
              <div
                key={book.id}
                className={`b-rounded-lg b-border transition-all ${
                  bookProgress?.quizPassed
                    ? 'b-bg-reading-light b-border-reading'
                    : isExpanded
                      ? 'b-bg-logic-light b-border-logic'
                      : 'b-bg-card hover:b-border-logic'
                }`}
              >
                {/* Book Header - Clickable to expand */}
                <button
                  onClick={() => setExpandedBookId(isExpanded ? null : book.id)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {bookProgress?.quizPassed && (
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className="b-text-reading flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <h6
                        className={`b-text-sm b-font-medium ${
                          bookProgress?.quizPassed
                            ? 'b-text-reading-dark'
                            : 'b-text-primary'
                        } ${isExpanded ? '' : 'truncate'}`}
                      >
                        {book.title}
                      </h6>
                      <p className="b-text-xs b-text-muted">{book.year}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {isExpanded ? (
                      <CaretUp size={14} className="b-text-logic" />
                    ) : (
                      <CaretDown size={14} className="b-text-muted" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    <p className="b-text-xs b-text-secondary leading-relaxed">
                      {getBookDescription(book, selectedAuthor.name)}
                    </p>

                    <div className="flex gap-2">
                      <a
                        href={getPurchaseLink(book, selectedAuthor.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 b-rounded-lg b-bg-card b-border b-text-xs b-font-medium b-text-secondary hover:b-text-primary hover:b-border-logic transition-colors"
                      >
                        <ArrowSquareOut size={14} />
                        Get Book
                      </a>

                      {bookProgress?.quizPassed ? (
                        <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 b-rounded-lg b-bg-reading b-text-inverse b-text-xs b-font-medium">
                          <CheckCircle size={14} weight="fill" />
                          Completed
                        </div>
                      ) : onCooldown ? (
                        <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 b-rounded-lg b-bg-muted b-text-xs b-font-medium b-text-muted">
                          <Lock size={14} />
                          Retry in {daysLeft}d
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectBook(book)
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 b-rounded-lg b-bg-logic b-text-inverse b-text-xs b-font-medium cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <Play size={14} weight="fill" />
                          Start Quiz
                          <Coins size={10} className="b-text-writing" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Get Tips Button */}
      {unlocked ? (
        <button
          onClick={() => onGetAuthorTips(selectedAuthor)}
          className="w-full b-btn b-btn-logic cursor-pointer b-text-sm py-2"
        >
          <LockOpen size={16} weight="fill" />
          Chat with {selectedAuthor.name}
          <Coins size={12} className="b-text-writing ml-1" />
        </button>
      ) : (
        <div className="b-p-md b-bg-muted b-rounded-lg b-border">
          <div className="flex items-center gap-2 b-mb-xs">
            <Lock size={16} className="b-text-secondary" />
            <span className="b-text-sm b-font-medium b-text-secondary">
              Tips Locked
            </span>
          </div>
          <p className="b-text-xs b-text-muted">
            Complete{' '}
            {remaining === 1
              ? 'the remaining book'
              : `all ${remaining} remaining books`}{' '}
            to unlock writing tips from {selectedAuthor.name}.
          </p>
          <div className="b-mt-sm flex items-center gap-2">
            <div className="flex-1 h-1.5 b-bg-card b-rounded-full overflow-hidden">
              <div
                className="h-full b-bg-reading b-rounded-full transition-all"
                style={{
                  width: `${(progress.completed / progress.total) * 100}%`,
                }}
              />
            </div>
            <span className="b-text-xs b-font-medium b-text-secondary">
              {progress.completed}/{progress.total}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
