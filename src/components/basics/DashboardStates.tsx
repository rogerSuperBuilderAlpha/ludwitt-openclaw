'use client'

import { useState, useEffect } from 'react'

// Curated quotes from philosophers, mathematicians, and scientists
const LOADING_QUOTES = [
  // Ancient Philosophy
  { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { quote: "Education is the kindling of a flame, not the filling of a vessel.", author: "Socrates" },
  { quote: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { quote: "No man ever steps in the same river twice, for it is not the same river and he is not the same man.", author: "Heraclitus" },
  { quote: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
  
  // Mathematics & Science
  { quote: "Mathematics is the language with which God wrote the universe.", author: "Galileo Galilei" },
  { quote: "Pure mathematics is, in its way, the poetry of logical ideas.", author: "Albert Einstein" },
  { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "The important thing is not to stop questioning.", author: "Albert Einstein" },
  { quote: "If I have seen further, it is by standing on the shoulders of giants.", author: "Isaac Newton" },
  { quote: "Mathematics is the queen of sciences and arithmetic the queen of mathematics.", author: "Carl Friedrich Gauss" },
  { quote: "The essence of mathematics is not to make simple things complicated, but to make complicated things simple.", author: "Stan Gudder" },
  
  // Modern Philosophy & Wisdom
  { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { quote: "The more I read, the more I acquire, the more certain I am that I know nothing.", author: "Voltaire" },
  { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { quote: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { quote: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
  
  // Eastern Philosophy
  { quote: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { quote: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { quote: "Real knowledge is to know the extent of one's ignorance.", author: "Confucius" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  
  // Learning & Growth
  { quote: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
  { quote: "Anyone who stops learning is old. Anyone who keeps learning stays young.", author: "Henry Ford" },
  { quote: "I am still learning.", author: "Michelangelo (at age 87)" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Mistakes are the portals of discovery.", author: "James Joyce" },
]

// Learning tips that appear below quotes
const LEARNING_TIPS = [
  "💡 Take a 5-minute break every 25 minutes for better retention",
  "🎯 Focus on understanding concepts, not just memorizing answers",
  "📝 Writing things down helps your brain process information",
  "🔄 Spaced repetition strengthens long-term memory",
  "🧠 Sleep helps consolidate what you've learned today",
  "⚡ Your brain forms new connections every time you practice",
  "🌟 Making mistakes is actually part of the learning process",
  "📖 Reading out loud activates more areas of your brain",
]

// Get a random item from array (only call after mount to avoid hydration mismatch)
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Default items to use during SSR (fixed to prevent hydration mismatch)
const DEFAULT_QUOTE = LOADING_QUOTES[0] // "The only true wisdom is in knowing you know nothing." - Socrates
const DEFAULT_TIP = LEARNING_TIPS[0] // "💡 Take a 5-minute break every 25 minutes for better retention"

export function LoadingState() {
  // Use fixed default values during SSR to prevent hydration mismatch
  // Then randomize after mount
  const [quote, setQuote] = useState<{ quote: string; author: string }>(DEFAULT_QUOTE)
  const [tip, setTip] = useState<string>(DEFAULT_TIP)
  const [progress, setProgress] = useState(5) // Start at 5% not 0
  const [isClient, setIsClient] = useState(false)
  
  // Mark as client-side and randomize initial values after hydration
  useEffect(() => {
    setIsClient(true)
    // Randomize quote and tip after mount to avoid hydration mismatch
    setQuote(getRandomItem(LOADING_QUOTES))
    setTip(getRandomItem(LEARNING_TIPS))
  }, [])

  // Simulate loading progress - SLOWER and more realistic
  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) return prev // Cap at 85%, actual load completes it
        // Slower increments: 1-4% every 600ms
        const increment = 1 + Math.random() * 3
        return Math.min(prev + increment, 85)
      })
    }, 600)
    return () => clearInterval(interval)
  }, [isClient])

  // Rotate quotes every 10 seconds if still loading
  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      setQuote(getRandomItem(LOADING_QUOTES))
    }, 10000)
    return () => clearInterval(interval)
  }, [isClient])

  return (
    <div className="min-h-screen bg-b-bg-page flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="text-4xl mb-2">📚</div>
          <h1 className="text-xl font-semibold b-text-primary">Ludwitt</h1>
          <p className="text-sm b-text-muted">Adaptive Learning Platform</p>
        </div>

        {/* Quote Card */}
        <div 
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-5 mb-5 shadow-sm"
          style={{ minHeight: 120 }}
        >
          <blockquote className="text-base leading-relaxed text-gray-700 italic mb-2">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <cite className="text-sm font-medium text-amber-700 not-italic">
            — {quote.author}
          </cite>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.6s ease-out',
              }}
            />
          </div>
          <p className="text-xs b-text-muted mt-2">
            Loading your dashboard...
          </p>
        </div>

        {/* Tip */}
        {tip && (
          <div className="text-sm b-text-muted bg-gray-50 rounded-lg p-3 border border-gray-100">
            {tip}
          </div>
        )}

        {/* Simple loading spinner */}
        <div className="mt-4 flex justify-center">
          <div className="w-5 h-5 border-2 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}

interface ErrorStateProps {
  error: string
  retryIn: number | null
  onRetry: () => void
}

export function ErrorState({ error, retryIn, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-b-bg-page flex items-center justify-center">
      <div className="max-w-md w-full b-bg-card border b-border-latin rounded-lg shadow-b-card p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold b-text-primary mb-2">Error Loading Dashboard</h2>
        <p className="b-text-secondary mb-2">{error}</p>
        {retryIn !== null && retryIn > 0 && (
          <p className="b-text-muted text-sm mb-6">Retrying automatically in {retryIn}s…</p>
        )}
        <button
          onClick={onRetry}
          className="b-btn b-btn-logic py-3 px-6 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
