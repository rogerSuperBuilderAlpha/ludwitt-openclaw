'use client'

import { useState } from 'react'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  FileText,
  Zap,
  Users,
  X,
} from 'lucide-react'

interface OnboardingWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onAddDocument: () => void
  onCreateProject: () => void
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to your project portal!',
    description: 'Let&apos;s get you set up in just 3 simple steps',
    icon: <Users className="w-8 h-8" />,
    content: (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          You&apos;re all set!
        </h3>
        <p className="text-gray-600 mb-6">
          Your portal is ready to help you turn your ideas into reality.
          Here&apos;s how it works:
        </p>

        <div className="bg-blue-50 rounded-lg p-4 text-left">
          <h4 className="font-semibold text-blue-900 mb-2">
            What happens next?
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Share your project ideas through Google Docs</li>
            <li>• Approve documents when you&apos;re ready</li>
            <li>• Your dedicated developer gets notified instantly</li>
            <li>• Track progress and communicate in real-time</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'project',
    title: 'Create your first project',
    description: 'Projects help organize your ideas and track progress',
    icon: <FileText className="w-8 h-8" />,
    content: (
      <div className="py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-green-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Let&apos;s create your first project
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              💡 Project ideas to get you started:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="bg-white rounded p-2 border">
                <strong>Website Redesign</strong>
                <p className="text-gray-600">Modernize your existing site</p>
              </div>
              <div className="bg-white rounded p-2 border">
                <strong>Mobile App</strong>
                <p className="text-gray-600">Bring your idea to mobile</p>
              </div>
              <div className="bg-white rounded p-2 border">
                <strong>E-commerce Store</strong>
                <p className="text-gray-600">Start selling online</p>
              </div>
              <div className="bg-white rounded p-2 border">
                <strong>Custom Tool</strong>
                <p className="text-gray-600">Automate your workflow</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Don&apos;t worry about getting it perfect!</strong> You
              can always update project details later. Your developer will help
              refine the scope and requirements.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'document',
    title: 'Add your first document',
    description: 'Share your ideas through Google Docs',
    icon: <Zap className="w-8 h-8" />,
    content: (
      <div className="py-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-purple-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Share your vision
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              📝 What to include in your document:
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• What you want to build and why</li>
              <li>• Who will use it (your target audience)</li>
              <li>• Key features you have in mind</li>
              <li>• Examples of things you like</li>
              <li>• Any specific requirements or constraints</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">✨ Pro tips:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Write in your own words - no technical jargon needed</li>
              <li>• Include screenshots, sketches, or links to inspiration</li>
              <li>• Ask questions if you&apos;re unsure about anything</li>
              <li>• Start simple - you can always add more details later</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'complete',
    title: 'You&apos;re ready to go!',
    description: 'Your developer will be in touch within 24 hours',
    icon: <CheckCircle className="w-8 h-8" />,
    content: (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Perfect! You&apos;re all set up
        </h3>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">
            What happens next?
          </h4>
          <div className="text-left text-sm text-green-700 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xs">
                1
              </div>
              <span>Your developer receives an instant notification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xs">
                2
              </div>
              <span>They&apos;ll review your documents within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-xs">
                3
              </div>
              <span>
                You&apos;ll get an update with next steps and timeline
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Use the &quot;Message Developer&quot;
            button anytime, or schedule a call to discuss your project in
            detail.
          </p>
        </div>
      </div>
    ),
  },
]

export function OnboardingWizard({
  isOpen,
  onClose,
  onComplete,
  onAddDocument,
  onCreateProject,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen) return null

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (currentStep === 1) {
      // Create project step
      onCreateProject()
    } else if (currentStep === 2) {
      // Add document step
      onAddDocument()
    }

    if (isLastStep) {
      onComplete()
      onClose()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (isFirstStep) return
    setCurrentStep((prev) => prev - 1)
  }

  const handleSkip = () => {
    onComplete()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-blue-600">{step.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h2>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>
              {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">{step.content}</div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip setup
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isLastStep
                ? 'Get Started'
                : currentStep === 1
                  ? 'Create Project'
                  : currentStep === 2
                    ? 'Add Document'
                    : 'Next'}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
