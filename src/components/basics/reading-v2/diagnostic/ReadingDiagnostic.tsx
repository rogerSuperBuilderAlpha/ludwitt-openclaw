'use client'

/**
 * Reading Diagnostic Component
 *
 * Initial assessment to identify student's reading level and skill gaps.
 * Places students appropriately in the skill tree.
 */

import { useState, useCallback } from 'react'
import {
  ClipboardText,
  ArrowRight,
  CheckCircle,
  Target,
  Sparkle,
} from '@phosphor-icons/react'
import { ReadingDiagnosticResult } from '@/lib/types/reading-v2'
import { useAuth } from '@/components/auth/ClientProvider'

interface ReadingDiagnosticProps {
  onComplete: (result: ReadingDiagnosticResult) => void
  onSkip?: () => void
}

// Diagnostic sections
const DIAGNOSTIC_SECTIONS = [
  {
    id: 'word-recognition',
    name: 'Word Recognition',
    description: 'Tests decoding and sight word recognition',
    icon: '📖',
    questions: 5,
  },
  {
    id: 'fluency',
    name: 'Fluency',
    description: 'Measures reading speed and accuracy',
    icon: '⏱️',
    questions: 1, // Reading passage
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Assesses word knowledge and context clues',
    icon: '📚',
    questions: 5,
  },
  {
    id: 'comprehension',
    name: 'Comprehension',
    description: 'Tests understanding of text',
    icon: '🧠',
    questions: 5,
  },
]

export function ReadingDiagnostic({
  onComplete,
  onSkip,
}: ReadingDiagnosticProps) {
  const { user } = useAuth()
  const [currentSection, setCurrentSection] = useState(-1) // -1 = intro
  const [isProcessing, setIsProcessing] = useState(false)
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({})

  // Start diagnostic
  const startDiagnostic = () => {
    setCurrentSection(0)
  }

  // Complete a section
  const completeSection = useCallback(
    (sectionId: string, score: number) => {
      setSectionScores((prev) => ({ ...prev, [sectionId]: score }))

      if (currentSection < DIAGNOSTIC_SECTIONS.length - 1) {
        setCurrentSection((prev) => prev + 1)
      } else {
        // All sections complete - calculate results
        finishDiagnostic()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentSection]
  )

  // Calculate final results
  const finishDiagnostic = async () => {
    setIsProcessing(true)

    // In a real implementation, this would send to the API
    // For now, we'll create a mock result
    const mockResult: ReadingDiagnosticResult = {
      userId: user?.uid || '',
      completedAt: new Date(),
      recommendedGradeLevel: 4,
      lexileRange: [600, 800],
      wordRecognition: {
        phonologicalAwareness: sectionScores['word-recognition'] || 0.7,
        phonics: sectionScores['word-recognition'] || 0.75,
        sightWords: 0.8,
        decodingAccuracy: 0.85,
        overallScore: sectionScores['word-recognition'] || 0.75,
      },
      fluency: {
        wcpm: 95,
        accuracy: 0.92,
        prosodyScore: 3,
        overallScore: sectionScores['fluency'] || 0.8,
        percentile: 65,
      },
      vocabulary: {
        tier1: 0.9,
        tier2: sectionScores['vocabulary'] || 0.65,
        tier3: 0.4,
        contextClues: 0.7,
        overallScore: sectionScores['vocabulary'] || 0.65,
      },
      comprehension: {
        literal: 0.85,
        inferential: sectionScores['comprehension'] || 0.6,
        critical: 0.45,
        overallScore: sectionScores['comprehension'] || 0.6,
      },
      morphology: {
        inflections: 0.85,
        prefixes: 0.6,
        suffixes: 0.55,
        roots: 0.3,
        overallScore: 0.55,
      },
      strengths: [
        'fluency-accuracy',
        'literal-comprehension',
        'vocabulary-tier1',
      ],
      gaps: ['morphology', 'vocabulary-tier3', 'critical-evaluation'],
      recommendedPath: {
        primaryFocus: ['morphology', 'vocabulary-tier2'],
        secondaryFocus: ['comprehension-inferential'],
        readyForIndependent: ['literal-comprehension', 'fluency-practice'],
      },
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    onComplete(mockResult)
  }

  // Intro screen
  if (currentSection === -1) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--b-reading-light)' }}
          >
            <ClipboardText size={32} style={{ color: 'var(--b-reading)' }} />
          </div>
          <h2 className="text-2xl font-bold b-text-primary mb-2">
            Reading Skills Assessment
          </h2>
          <p className="b-text-secondary">
            This quick diagnostic will help us understand your reading skills
            and create a personalized learning path.
          </p>
        </div>

        {/* What we'll assess */}
        <div className="bg-white rounded-lg border b-border p-6 mb-8">
          <h3 className="font-semibold b-text-primary mb-4">
            What we&apos;ll assess:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {DIAGNOSTIC_SECTIONS.map((section) => (
              <div
                key={section.id}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: 'var(--b-reading-light)' }}
              >
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <span className="font-medium b-text-primary block">
                    {section.name}
                  </span>
                  <span className="text-xs b-text-muted">
                    {section.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <Target size={16} className="b-text-muted" />
            <span className="text-sm b-text-secondary">
              About 10-15 minutes
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={startDiagnostic}
            className="b-btn b-btn-lg b-btn-primary flex items-center gap-2"
          >
            Start Assessment
            <ArrowRight size={18} weight="bold" />
          </button>
          {onSkip && (
            <button onClick={onSkip} className="b-btn b-btn-lg b-btn-secondary">
              Skip for Now
            </button>
          )}
        </div>

        <p className="text-center text-xs b-text-muted mt-6">
          You can retake this assessment anytime from your profile settings.
        </p>
      </div>
    )
  }

  // Processing results
  if (isProcessing) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-pulse"
            style={{ backgroundColor: 'var(--b-reading-light)' }}
          >
            <Sparkle
              size={32}
              style={{ color: 'var(--b-reading)' }}
              weight="fill"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold b-text-primary mb-2">
          Analyzing Your Results
        </h3>
        <p className="b-text-secondary mb-6">
          We&apos;re creating your personalized learning path...
        </p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-pulse"
            style={{
              width: '75%',
              backgroundColor: 'var(--b-reading)',
            }}
          />
        </div>
      </div>
    )
  }

  // Active section
  const activeSection = DIAGNOSTIC_SECTIONS[currentSection]
  const progress = ((currentSection + 1) / DIAGNOSTIC_SECTIONS.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium b-text-secondary">
            Section {currentSection + 1} of {DIAGNOSTIC_SECTIONS.length}
          </span>
          <span className="text-sm b-text-muted">{activeSection.name}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: 'var(--b-reading)',
            }}
          />
        </div>
      </div>

      {/* Section content */}
      <div className="bg-white rounded-lg border b-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{activeSection.icon}</span>
          <div>
            <h3 className="text-xl font-bold b-text-primary">
              {activeSection.name}
            </h3>
            <p className="text-sm b-text-muted">{activeSection.description}</p>
          </div>
        </div>

        {/* Placeholder for actual diagnostic questions */}
        <div className="p-8 bg-gray-50 rounded-lg text-center mb-6">
          <p className="b-text-muted">
            [Diagnostic questions for {activeSection.name} would appear here]
          </p>
          <p className="text-xs b-text-muted mt-2">
            {activeSection.questions} questions
          </p>
        </div>

        {/* Simulate completing section */}
        <button
          onClick={() =>
            completeSection(activeSection.id, 0.7 + Math.random() * 0.2)
          }
          className="b-btn b-btn-primary w-full flex items-center justify-center gap-2"
        >
          Complete {activeSection.name}
          <CheckCircle size={18} weight="fill" />
        </button>
      </div>
    </div>
  )
}
