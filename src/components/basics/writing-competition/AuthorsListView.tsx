'use client'

import {
  CaretRight,
  Lock,
  LockOpen,
  ChatCircle,
  Coins,
} from '@phosphor-icons/react'
import type { FamousAuthor, AuthorCategory } from './types'
import { AUTHOR_CATEGORIES, getAuthorsByCategory } from './types'

interface AuthorsListViewProps {
  authorCategory: AuthorCategory
  setAuthorCategory: (category: AuthorCategory) => void
  isAuthorUnlocked: (author: FamousAuthor) => boolean
  getAuthorProgress: (author: FamousAuthor) => {
    completed: number
    total: number
  }
  onSelectAuthor: (author: FamousAuthor) => void
  onGetAuthorTips: (author: FamousAuthor) => void
}

export function AuthorsListView({
  authorCategory,
  setAuthorCategory,
  isAuthorUnlocked,
  getAuthorProgress,
  onSelectAuthor,
  onGetAuthorTips,
}: AuthorsListViewProps) {
  const authors = getAuthorsByCategory(authorCategory, isAuthorUnlocked)

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Category Tabs - Fixed */}
      <div className="flex-shrink-0 b-mb-sm">
        <div className="grid grid-cols-4 gap-1">
          {AUTHOR_CATEGORIES.map((cat) => {
            const catAuthors = getAuthorsByCategory(cat.id, isAuthorUnlocked)
            const count = catAuthors.length
            return (
              <button
                key={cat.id}
                onClick={() => setAuthorCategory(cat.id)}
                className={`flex items-center justify-center gap-1 px-2 py-2 b-rounded-lg text-[11px] b-font-medium transition-all cursor-pointer ${
                  authorCategory === cat.id
                    ? cat.id === 'unlocked'
                      ? 'b-bg-reading b-text-inverse shadow-sm'
                      : 'b-bg-logic b-text-inverse shadow-sm'
                    : 'b-bg-muted b-text-secondary hover:b-bg-logic-light hover:b-text-logic-dark'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="whitespace-nowrap">{cat.name}</span>
                <span className="text-[9px] opacity-75">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Category description - Fixed */}
      <p className="flex-shrink-0 b-text-xs b-text-muted b-mb-2">
        {AUTHOR_CATEGORIES.find((c) => c.id === authorCategory)?.description}
      </p>

      {/* Authors - Scrollable List */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <div className="space-y-1">
          {authorCategory === 'unlocked' && authors.length === 0 ? (
            <div className="text-center py-8">
              <Lock size={32} className="b-text-muted mx-auto b-mb-sm" />
              <p className="b-text-sm b-text-secondary b-mb-xs">
                No authors unlocked yet
              </p>
              <p className="b-text-xs b-text-muted">
                Complete all books by an author to unlock their writing tips
              </p>
            </div>
          ) : (
            authors.map((author) => {
              const progress = getAuthorProgress(author)
              const unlocked = isAuthorUnlocked(author)
              const isUnlockedTab = authorCategory === 'unlocked'

              return (
                <button
                  key={author.id}
                  onClick={() => {
                    if (isUnlockedTab) {
                      onGetAuthorTips(author)
                    } else {
                      onSelectAuthor(author)
                    }
                  }}
                  className={`w-full text-left px-2 py-1.5 b-border b-rounded transition-colors cursor-pointer group flex items-center justify-between ${
                    unlocked
                      ? 'b-bg-reading-light b-border-reading hover:b-bg-reading'
                      : 'b-bg-card hover:b-border-logic hover:b-bg-logic-light'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {isUnlockedTab ? (
                      <ChatCircle
                        size={14}
                        weight="fill"
                        className="b-text-reading flex-shrink-0"
                      />
                    ) : unlocked ? (
                      <LockOpen
                        size={14}
                        weight="fill"
                        className="b-text-reading flex-shrink-0"
                      />
                    ) : (
                      <Lock size={14} className="b-text-muted flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h5
                          className={`b-text-sm b-font-medium truncate ${
                            unlocked
                              ? 'b-text-reading-dark group-hover:b-text-inverse'
                              : 'b-text-primary group-hover:b-text-logic-dark'
                          }`}
                        >
                          {author.name}
                        </h5>
                        {author.nobelYear && (
                          <span
                            className="flex-shrink-0 text-[10px] px-1 py-0.5 b-rounded b-bg-writing-light b-text-writing-dark"
                            title={`Nobel Prize ${author.nobelYear}`}
                          >
                            🏆 {author.nobelYear}
                          </span>
                        )}
                        {author.laureateYear && (
                          <span
                            className="flex-shrink-0 text-[10px] px-1 py-0.5 b-rounded bg-blue-100 text-blue-800"
                            title={`US Poet Laureate ${author.laureateYear}`}
                          >
                            🇺🇸 {author.laureateYear}
                          </span>
                        )}
                      </div>
                      <p
                        className={`b-text-xs truncate ${
                          unlocked
                            ? 'b-text-reading-text group-hover:b-text-inverse/80'
                            : 'b-text-muted'
                        }`}
                      >
                        {author.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isUnlockedTab ? (
                      <>
                        <span className="b-text-xs b-text-reading-dark group-hover:b-text-inverse">
                          Chat
                        </span>
                        <Coins size={10} className="b-text-writing" />
                      </>
                    ) : (
                      <>
                        <span
                          className={`b-text-xs b-font-medium ${
                            unlocked
                              ? 'b-text-reading-dark group-hover:b-text-inverse'
                              : 'b-text-secondary'
                          }`}
                        >
                          {progress.completed}/{progress.total}
                        </span>
                        <CaretRight
                          size={12}
                          className={
                            unlocked
                              ? 'b-text-reading-dark group-hover:b-text-inverse'
                              : 'b-text-muted group-hover:b-text-logic'
                          }
                        />
                      </>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
