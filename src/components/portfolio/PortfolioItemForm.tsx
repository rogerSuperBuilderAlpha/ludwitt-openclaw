/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import {
  productionGradeChecklist,
  checklistCategories,
} from '@/data/checklists/productionGrade'
import { auth as firebaseAuth } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

interface PortfolioItemFormProps {
  user: {
    uid: string
    displayName?: string | null
    email?: string | null
  }
  projectId: string
  projectTitle: string
  onComplete: () => void
}

export function PortfolioItemForm({
  user,
  projectId,
  projectTitle,
  onComplete,
}: PortfolioItemFormProps) {
  const [step, setStep] = useState<
    'intro' | 'brainlift' | 'video' | 'production' | 'submit'
  >('intro')

  // Form state
  const [brainliftUrl, setBrainliftUrl] = useState('')
  const [loomUrl, setLoomUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChecklistToggle = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const criticalItemsComplete = productionGradeChecklist
    .filter((item) => item.importance === 'critical')
    .every((item) => checkedItems[item.id])

  const totalChecked = Object.values(checkedItems).filter(Boolean).length
  const totalItems = productionGradeChecklist.length
  const completionPercentage = Math.round((totalChecked / totalItems) * 100)

  const handleSubmit = async () => {
    if (!brainliftUrl || !loomUrl || !liveUrl || !description) {
      setError('Please fill in all required fields')
      return
    }

    if (!brainliftUrl.includes('workflowy.com')) {
      setError('Brainlift URL must be a WorkFlowy link')
      return
    }

    if (!loomUrl.includes('loom.com')) {
      setError('Video URL must be a Loom link')
      return
    }

    if (!criticalItemsComplete) {
      setError('Please complete all critical production-grade checklist items')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Not authenticated')

      const response = await fetch('/api/portfolio/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          projectTitle,
          brainliftUrl,
          loomUrl,
          githubUrl,
          liveUrl,
          description,
          technologies: technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          checklistCompletion: checkedItems,
          completionPercentage,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create portfolio item')
      }

      onComplete()
    } catch (error) {
      logger.error('PortfolioItemForm', 'Failed to create portfolio item', {
        error,
      })
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to create portfolio item'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'intro') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Add {projectTitle} to Your Portfolio
          </h2>
          <p className="text-lg text-gray-700">
            Transform your project into a professional portfolio piece that
            showcases your skills to clients and employers
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Three Requirements:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <div className="font-semibold text-blue-900">
                    1. Create a Brainlift
                  </div>
                  <p className="text-blue-800 text-sm">
                    Document your thinking process, challenges, and solutions in
                    a WorkFlowy Brainlift
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎥</span>
                <div>
                  <div className="font-semibold text-blue-900">
                    2. Record a Loom Video
                  </div>
                  <p className="text-blue-800 text-sm">
                    Present your project professionally with an AI-generated
                    script and cadence
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="font-semibold text-blue-900">
                    3. Ensure Production-Grade Build
                  </div>
                  <p className="text-blue-800 text-sm">
                    Complete our checklist to verify security, performance, and
                    professional quality
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-900 mb-2">
              Why Create Portfolio Items?
            </h3>
            <ul className="space-y-2 text-green-800 text-sm">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Stand out to potential clients and employers</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>
                  Demonstrate your problem-solving process with Brainlifts
                </span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>
                  Build credibility with production-ready applications
                </span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Share a professional link showcasing all your work</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep('brainlift')}
            className="flex-1 bg-gray-900 text-white font-bold text-lg px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Creating Portfolio Item
          </button>
          <button
            onClick={onComplete}
            className="px-6 py-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Skip for Now
          </button>
        </div>
      </div>
    )
  }

  if (step === 'brainlift') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Step 1: Create Your Brainlift
          </h2>
          <p className="text-gray-700">
            A Brainlift documents your thought process, challenges faced, and
            solutions found during development
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            What is a Brainlift?
          </h3>
          <p className="text-blue-800 mb-4">
            A Brainlift is a structured WorkFlowy document that captures your
            development journey. It shows potential clients HOW you think and
            solve problems.
          </p>
          <a
            href="https://workflowy.com/s/brainlift-curriculum/8xnYAymjoO9SrNsT#/c79197d665a3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Learn how to create a Brainlift →
          </a>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WorkFlowy Brainlift URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={brainliftUrl}
              onChange={(e) => setBrainliftUrl(e.target.value)}
              placeholder="https://workflowy.com/s/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Make sure your WorkFlowy document is set to public sharing
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep('intro')}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setStep('video')}
            disabled={!brainliftUrl}
            className="flex-1 bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Video
          </button>
        </div>
      </div>
    )
  }

  if (step === 'video') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Step 2: Record Your Loom Presentation
          </h2>
          <p className="text-gray-700">
            Create a professional video demonstrating your project and
            explaining key features
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3">
            Video Script Tips:
          </h3>
          <ul className="space-y-2 text-purple-800 text-sm">
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Use AI (ChatGPT, Claude) to help you create a script and cadence
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Start with the problem your project solves</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Demonstrate 2-3 key features</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Explain interesting technical challenges you overcame</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Keep it under 5 minutes</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loom Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={loomUrl}
              onChange={(e) => setLoomUrl(e.target.value)}
              placeholder="https://www.loom.com/share/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep('brainlift')}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setStep('production')}
            disabled={!loomUrl}
            className="flex-1 bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Production Checklist
          </button>
        </div>
      </div>
    )
  }

  if (step === 'production') {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Step 3: Production-Grade Checklist
          </h2>
          <p className="text-gray-700">
            Ensure your application meets professional standards before adding
            it to your portfolio
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-gray-700">
                Completion: {totalChecked} / {totalItems} items
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-600">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gray-900 h-3 rounded-full transition-colors duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          {!criticalItemsComplete && (
            <p className="text-red-600 text-sm mt-2">
              ⚠️ You must complete all CRITICAL items to continue
            </p>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto mb-6 space-y-6">
          {checklistCategories.map((category) => {
            const items = productionGradeChecklist.filter(
              (item) => item.category === category
            )
            return (
              <div key={category} className="space-y-2">
                <h3 className="font-bold text-gray-900 sticky top-0 bg-white py-2">
                  {category}
                </h3>
                {items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => handleChecklistToggle(item.id)}
                      className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {item.title}
                        </span>
                        {item.importance === 'critical' && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                            CRITICAL
                          </span>
                        )}
                        {item.importance === 'important' && (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                            IMPORTANT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                      {item.resources && item.resources.length > 0 && (
                        <div className="mt-1">
                          {item.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Learn more →
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )
          })}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep('video')}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setStep('submit')}
            disabled={!criticalItemsComplete}
            className="flex-1 bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Final Details
          </button>
        </div>
      </div>
    )
  }

  if (step === 'submit') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Final Details
          </h2>
          <p className="text-gray-700">
            Add project links and description to complete your portfolio item
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-900">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live Application URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://your-app.vercel.app"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Repository URL (optional)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this project does and the problem it solves..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies Used
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., Next.js, TypeScript, Firebase, Tailwind CSS"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated list</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep('production')}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-gray-900 text-white font-bold text-lg px-6 py-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Creating Portfolio Item...' : 'Add to Portfolio'}
          </button>
        </div>
      </div>
    )
  }

  return null
}
