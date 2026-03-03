/**
 * Digital Certificate Component
 * Generates and displays certificates for grade completions and achievements
 */

'use client'

import { useRef } from 'react'
import { Portal } from './Portal'

export interface CertificateData {
  studentName: string
  achievement: string
  subject: 'Math' | 'Reading' | 'Combined'
  gradeLevel: string
  completionDate: string
  totalProblems: number
  accuracy: number
  streak: number
  xpEarned: number
  certificateId: string
}

interface DigitalCertificateProps {
  data: CertificateData
  onClose: () => void
  onShare: (imageData: string) => void
  onDownload: () => void
}

export function DigitalCertificate({
  data,
  onClose,
  onShare,
  onDownload,
}: DigitalCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    if (certificateRef.current) {
      // In a real implementation, you'd use html2canvas or similar
      // For now, we'll simulate sharing
      const shareText = `🎉 I just earned a ${data.achievement} certificate in ${data.subject}! ${data.accuracy}% accuracy with a ${data.streak}-day streak! #Learning #Achievement #PitchRise`

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${data.studentName}'s Achievement`,
            text: shareText,
            url: window.location.href,
          })
        } catch (error) {
          // Fallback to clipboard
          await navigator.clipboard.writeText(shareText)
          alert('Achievement copied to clipboard!')
        }
      } else {
        await navigator.clipboard.writeText(shareText)
        alert('Achievement copied to clipboard!')
      }
    }
  }

  const handleDownload = () => {
    // In a real implementation, you'd generate a PDF or high-res image
    alert('Certificate download would start here (PDF generation)')
    onDownload()
  }

  const getSubjectColor = () => {
    switch (data.subject) {
      case 'Math':
        return 'from-b-math-dark to-b-greek-dark'
      case 'Reading':
        return 'from-b-reading-dark to-b-success-dark'
      case 'Combined':
        return 'from-b-logic-dark to-b-greek-dark'
      default:
        return 'from-b-text-secondary to-b-text-primary'
    }
  }

  const getSubjectIcon = () => {
    switch (data.subject) {
      case 'Math':
        return '📊'
      case 'Reading':
        return '📚'
      case 'Combined':
        return '🎓'
      default:
        return '⭐'
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-b-bg-card border b-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b b-border">
            <h2 className="text-xl font-bold b-text-primary oxford-heading">
              Achievement Unlocked
            </h2>
            <button
              onClick={onClose}
              className="p-2 b-text-muted hover:b-text-secondary rounded-lg hover:b-bg-muted transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Certificate */}
          <div ref={certificateRef} className="p-6">
            <div
              className={`relative bg-gradient-to-br ${getSubjectColor()} p-8 rounded-lg text-white overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">
                  {getSubjectIcon()}
                </div>
                <div className="absolute bottom-4 right-4 text-6xl">
                  {getSubjectIcon()}
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5">
                  🏆
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center space-y-4">
                <div className="text-4xl mb-2">🎉</div>

                <h1 className="text-3xl font-bold mb-2">
                  Certificate of Achievement
                </h1>

                <div className="text-lg opacity-90">This certifies that</div>

                <div className="text-4xl font-bold py-4 border-t border-b border-white/30">
                  {data.studentName}
                </div>

                <div className="text-lg opacity-90">
                  has successfully completed
                </div>

                <div className="text-2xl font-bold text-b-bg-writing-light">
                  {data.achievement}
                </div>

                <div className="text-lg">
                  {data.subject} • {data.gradeLevel}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {data.totalProblems}
                    </div>
                    <div className="text-sm opacity-75">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{data.accuracy}%</div>
                    <div className="text-sm opacity-75">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{data.streak}</div>
                    <div className="text-sm opacity-75">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{data.xpEarned}</div>
                    <div className="text-sm opacity-75">XP Earned</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 pt-4 border-t border-white/30">
                  <div className="text-sm opacity-75">
                    Completed on {data.completionDate}
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    Certificate ID: {data.certificateId}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 p-6 pt-0">
            <button
              onClick={handleShare}
              className="flex-1 b-btn b-btn-writing py-3 px-6 font-medium flex items-center justify-center gap-2"
            >
              Share Achievement
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-b-reading-dark text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Download Certificate
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border b-border rounded-lg hover:bg-b-bg-card-hover transition-colors b-text-primary font-medium b-bg-card"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

// Helper function to check if user should get a certificate
export function checkForCertificate(
  progress: any,
  subject: 'math' | 'reading'
): CertificateData | null {
  const subjectProgress = progress[subject]
  const currentGrade = Math.floor(subjectProgress.currentDifficulty)
  const previousGrade = currentGrade - 1

  // Check if user just completed a grade level
  if (
    subjectProgress.totalCompleted >= 20 && // Minimum problems for grade
    subjectProgress.accuracyRate >= 0.8 && // 80% accuracy required
    subjectProgress.currentStreak >= 5
  ) {
    // 5-day streak required

    return {
      studentName: 'Student', // Would get from user profile
      achievement: `${subject === 'math' ? 'Math' : 'Reading'} Mastery`,
      subject: subject === 'math' ? 'Math' : 'Reading',
      gradeLevel: `Grade ${currentGrade}`,
      completionDate: new Date().toLocaleDateString(),
      totalProblems: subjectProgress.totalCompleted,
      accuracy: Math.round(subjectProgress.accuracyRate * 100),
      streak: subjectProgress.currentStreak,
      xpEarned: subjectProgress.totalXP,
      certificateId: `CERT_${subject.toUpperCase()}_${currentGrade}_${Date.now()}`,
    }
  }

  return null
}
