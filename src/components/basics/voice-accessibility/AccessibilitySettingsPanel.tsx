'use client'

/**
 * Accessibility Settings Panel
 * UI component for configuring accessibility features
 */

import { AccessibilityGear, VoiceCommand } from './types'

interface ToggleSwitchProps {
  enabled: boolean
  onToggle: () => void
  label: string
  colorClass: string
}

function ToggleSwitch({
  enabled,
  onToggle,
  label,
  colorClass,
}: ToggleSwitchProps) {
  return (
    <label className="flex items-center justify-between">
      <span className="b-text-sm b-text-secondary">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? colorClass : 'b-bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full b-bg-card transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  )
}

interface AccessibilitySettingsPanelProps {
  accessibilityGear: AccessibilityGear
  voiceCommands: VoiceCommand[]
  onUpdateSetting: (key: keyof AccessibilityGear, value: boolean) => void
}

export function AccessibilitySettingsPanel({
  accessibilityGear,
  voiceCommands,
  onUpdateSetting,
}: AccessibilitySettingsPanelProps) {
  return (
    <div className="space-y-4">
      {/* Voice Features */}
      <div className="b-border-b b-pb-lg">
        <h4 className="b-font-medium b-text-primary b-mb-md">Voice Features</h4>
        <div className="space-y-3">
          <ToggleSwitch
            enabled={accessibilityGear.voiceInput}
            onToggle={() =>
              onUpdateSetting('voiceInput', !accessibilityGear.voiceInput)
            }
            label="Voice Input"
            colorClass="b-bg-math"
          />

          <ToggleSwitch
            enabled={accessibilityGear.voiceCommands}
            onToggle={() =>
              onUpdateSetting('voiceCommands', !accessibilityGear.voiceCommands)
            }
            label="Voice Commands"
            colorClass="b-bg-reading"
          />
        </div>
      </div>

      {/* Visual Accessibility */}
      <div className="b-border-b b-pb-lg">
        <h4 className="b-font-medium b-text-primary b-mb-md">
          Visual Accessibility
        </h4>
        <div className="space-y-3">
          <ToggleSwitch
            enabled={accessibilityGear.highContrast}
            onToggle={() =>
              onUpdateSetting('highContrast', !accessibilityGear.highContrast)
            }
            label="High Contrast"
            colorClass="b-bg-logic"
          />

          <ToggleSwitch
            enabled={accessibilityGear.largeText}
            onToggle={() =>
              onUpdateSetting('largeText', !accessibilityGear.largeText)
            }
            label="Large Text"
            colorClass="b-bg-writing"
          />

          <ToggleSwitch
            enabled={accessibilityGear.reducedMotion}
            onToggle={() =>
              onUpdateSetting('reducedMotion', !accessibilityGear.reducedMotion)
            }
            label="Reduced Motion"
            colorClass="b-bg-math"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="b-border-b b-pb-lg">
        <h4 className="b-font-medium b-text-primary b-mb-md">Navigation</h4>
        <div className="space-y-3">
          <ToggleSwitch
            enabled={accessibilityGear.keyboardNavigation}
            onToggle={() =>
              onUpdateSetting(
                'keyboardNavigation',
                !accessibilityGear.keyboardNavigation
              )
            }
            label="Enhanced Keyboard Nav"
            colorClass="b-bg-reading"
          />

          <ToggleSwitch
            enabled={accessibilityGear.screenReader}
            onToggle={() =>
              onUpdateSetting('screenReader', !accessibilityGear.screenReader)
            }
            label="Screen Reader Support"
            colorClass="b-bg-latin"
          />
        </div>
      </div>

      {/* Voice Commands Help */}
      <div>
        <h4 className="b-font-medium b-text-primary b-mb-md">Voice Commands</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {voiceCommands.slice(0, 8).map((cmd, index) => (
            <div
              key={index}
              className="b-text-xs b-text-secondary flex justify-between"
            >
              <span>&quot;{cmd.command}&quot;</span>
              <span className="b-text-muted">{cmd.category}</span>
            </div>
          ))}
        </div>
        <p className="b-text-xs b-text-muted b-mt-sm">
          Say &quot;help&quot; for all commands
        </p>
      </div>
    </div>
  )
}
