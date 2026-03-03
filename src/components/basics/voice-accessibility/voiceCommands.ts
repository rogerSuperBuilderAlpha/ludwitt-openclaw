/**
 * Voice command definitions and registry
 */

import { VoiceCommand } from './types'
import { SubjectProgressDisplay } from '@/lib/types/basics'

export interface VoiceCommandsConfig {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP: number
  greekXP: number
  logicXP: number
  setCurrentFocus: (focus: 'math' | 'reading' | null) => void
  speakText: (text: string) => void
}

/**
 * Creates the voice commands registry with the given configuration
 */
export function createVoiceCommands(config: VoiceCommandsConfig): VoiceCommand[] {
  const { mathProgress, readingProgress, latinXP, greekXP, logicXP, setCurrentFocus, speakText } = config

  return [
    // Navigation commands
    {
      command: 'focus math',
      action: () => {
        const mathSection = document.querySelector('[data-section="math"]')
        mathSection?.scrollIntoView({ behavior: 'smooth' })
        setCurrentFocus('math')
        speakText('Focused on math section')
      },
      description: 'Focus on math problems',
      category: 'navigation'
    },
    {
      command: 'focus reading',
      action: () => {
        const readingSection = document.querySelector('[data-section="reading"]')
        readingSection?.scrollIntoView({ behavior: 'smooth' })
        setCurrentFocus('reading')
        speakText('Focused on reading section')
      },
      description: 'Focus on reading exercises',
      category: 'navigation'
    },
    {
      command: 'open sidebar',
      action: () => {
        const sidebarToggle = document.querySelector('[aria-label="Open progress panel"]') as HTMLElement
        sidebarToggle?.click()
        speakText('Progress panel opened')
      },
      description: 'Open progress sidebar',
      category: 'navigation'
    },
    {
      command: 'show leaderboard',
      action: () => {
        window.location.href = '/b-leaderboard'
        speakText('Opening leaderboard')
      },
      description: 'Go to leaderboard',
      category: 'navigation'
    },

    // Input commands
    {
      command: 'submit answer',
      action: () => {
        const activeElement = document.activeElement
        if (activeElement?.closest('[data-section="math"]')) {
          const submitBtn = document.querySelector('[data-section="math"] button[type="submit"]') as HTMLButtonElement
          submitBtn?.click()
          speakText('Math answer submitted')
        } else if (activeElement?.closest('[data-section="reading"]')) {
          const submitBtn = document.querySelector('[data-section="reading"] button[type="submit"]') as HTMLButtonElement
          submitBtn?.click()
          speakText('Reading answer submitted')
        }
      },
      description: 'Submit current answer',
      category: 'input'
    },
    {
      command: 'skip problem',
      action: () => {
        const skipBtn = document.querySelector('button:has-text("Skip")') as HTMLButtonElement
        skipBtn?.click()
        speakText('Problem skipped')
      },
      description: 'Skip current problem',
      category: 'input'
    },
    {
      command: 'show hint',
      action: () => {
        const hintBtn = document.querySelector('details summary') as HTMLElement
        hintBtn?.click()
        speakText('Hint revealed')
      },
      description: 'Show hint for current problem',
      category: 'input'
    },

    // System commands
    {
      command: 'activate power-ups',
      action: () => {
        const powerUpBtn = document.querySelector('[title="Power-ups (P)"]') as HTMLElement
        powerUpBtn?.click()
        speakText('Power-ups panel opened')
      },
      description: 'Open power-ups menu',
      category: 'system'
    },
    {
      command: 'start review',
      action: () => {
        const reviewBtn = document.querySelector('[title*="Review"]') as HTMLElement
        reviewBtn?.click()
        speakText('Starting review session')
      },
      description: 'Start spaced repetition review',
      category: 'system'
    },

    // Learning commands
    {
      command: 'what is my progress',
      action: () => {
        const mathXP = mathProgress?.totalXP || 0
        const readingXP = readingProgress?.totalXP || 0
        const totalXP = mathXP + readingXP + latinXP + greekXP + logicXP
        speakText(`You have ${totalXP} total experience points. Math: ${mathXP}, Reading: ${readingXP}, Latin: ${latinXP}, Greek: ${greekXP}, Logic: ${logicXP}`)
      },
      description: 'Check current progress',
      category: 'learning'
    },
    {
      command: 'how am I doing',
      action: () => {
        const mathAccuracy = mathProgress?.accuracyRate || 0
        const readingAccuracy = readingProgress?.accuracyRate || 0
        const avgAccuracy = (mathAccuracy + readingAccuracy) / 2
        const streak = (mathProgress?.currentStreak || 0) + (readingProgress?.currentStreak || 0)
        const classicalXP = latinXP + greekXP

        let feedback = `Your average accuracy is ${Math.round(avgAccuracy * 100)} percent. `
        if (streak > 0) {
          feedback += `You have ${streak} correct answers in a row. `
        }
        if (classicalXP > 0) {
          feedback += `You've earned ${classicalXP} experience in classical languages. `
        }
        if (logicXP > 0) {
          feedback += `You've earned ${logicXP} experience in logic. `
        }
        if (avgAccuracy > 0.8) {
          feedback += 'Great work!'
        } else if (avgAccuracy > 0.6) {
          feedback += 'Keep practicing!'
        } else {
          feedback += 'You\'re improving!'
        }

        speakText(feedback)
      },
      description: 'Get performance feedback',
      category: 'learning'
    }
  ]
}
