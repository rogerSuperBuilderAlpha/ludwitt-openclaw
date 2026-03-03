/**
 * Voice Command Handler
 * Processes voice input and executes commands or answers
 */

import { VoiceCommand } from './types'

export interface VoiceCommandHandlerConfig {
  voiceCommands: VoiceCommand[]
  currentFocus: 'math' | 'reading' | null
  onVoiceAnswer: (answer: string, type: 'math' | 'reading' | 'latin' | 'greek' | 'logic') => void
  onVoiceCommand: (command: string) => void
  speakText: (text: string) => void
  voiceCommandsEnabled: boolean
}

/**
 * Handles voice input and routes to appropriate action
 */
export class VoiceCommandHandler {
  private config: VoiceCommandHandlerConfig

  constructor(config: VoiceCommandHandlerConfig) {
    this.config = config
  }

  /**
   * Update the handler configuration
   */
  updateConfig(config: Partial<VoiceCommandHandlerConfig>) {
    this.config = { ...this.config, ...config }
  }

  /**
   * Process voice input and execute matching command or record answer
   */
  handleVoiceInput(input: string): void {
    const lowerInput = input.toLowerCase()

    // Check for exact command matches
    const command = this.config.voiceCommands.find(cmd =>
      lowerInput.includes(cmd.command.toLowerCase())
    )

    if (command) {
      command.action()
      this.config.onVoiceCommand(command.command)
      return
    }

    // Check if this might be an answer (numbers, simple words)
    if (this.config.currentFocus && (lowerInput.match(/^\d+$/) || lowerInput.length < 20)) {
      this.config.onVoiceAnswer(input, this.config.currentFocus)
      if (this.config.voiceCommandsEnabled) {
        this.config.speakText(`Voice answer recorded: ${input}`)
      }
    } else {
      if (this.config.voiceCommandsEnabled) {
        this.config.speakText('Command not recognized. Try saying "help" for available commands.')
      }
    }
  }

  /**
   * Get all available commands
   */
  getCommands(): VoiceCommand[] {
    return this.config.voiceCommands
  }

  /**
   * Get commands by category
   */
  getCommandsByCategory(category: VoiceCommand['category']): VoiceCommand[] {
    return this.config.voiceCommands.filter(cmd => cmd.category === category)
  }
}
