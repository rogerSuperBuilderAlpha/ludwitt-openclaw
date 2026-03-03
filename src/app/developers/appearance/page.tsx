'use client'

import { useState } from 'react'
import { 
  Palette, 
  Sun,
  Moon,
  Desktop,
  Check,
  TextAa,
  Gauge,
} from '@phosphor-icons/react'
import { DevCard, DevButton } from '@/components/developers/v2/ui'

type Theme = 'dark' | 'light' | 'system'
type Density = 'comfortable' | 'compact'

interface AccentColor {
  name: string
  value: string
  preview: string
}

const accentColors: AccentColor[] = [
  { name: 'Indigo', value: '#6366f1', preview: 'linear-gradient(135deg, #6366f1, #818cf8)' },
  { name: 'Purple', value: '#8b5cf6', preview: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { name: 'Blue', value: '#3b82f6', preview: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  { name: 'Cyan', value: '#06b6d4', preview: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
  { name: 'Teal', value: '#14b8a6', preview: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
  { name: 'Green', value: '#22c55e', preview: 'linear-gradient(135deg, #22c55e, #4ade80)' },
  { name: 'Orange', value: '#f97316', preview: 'linear-gradient(135deg, #f97316, #fb923c)' },
  { name: 'Pink', value: '#ec4899', preview: 'linear-gradient(135deg, #ec4899, #f472b6)' },
]

const fontSizes = [
  { label: 'Small', value: '14px' },
  { label: 'Default', value: '16px' },
  { label: 'Large', value: '18px' },
]

/**
 * Appearance Page - Visual customization
 */
export default function AppearancePage() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [accentColor, setAccentColor] = useState(accentColors[0])
  const [density, setDensity] = useState<Density>('comfortable')
  const [fontSize, setFontSize] = useState('16px')
  const [animations, setAnimations] = useState(true)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
      }}>
        <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
          Appearance
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Customize the look and feel of your dashboard
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        <div style={{ maxWidth: 600 }}>
          {/* Theme */}
          <div style={{ marginBottom: 'var(--dev-space-6)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--dev-space-2)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              <Palette size={20} />
              <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>Theme</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--dev-space-3)' }}>
              {[
                { value: 'light' as Theme, icon: <Sun size={24} />, label: 'Light' },
                { value: 'dark' as Theme, icon: <Moon size={24} />, label: 'Dark' },
                { value: 'system' as Theme, icon: <Desktop size={24} />, label: 'System' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  style={{
                    padding: 'var(--dev-space-4)',
                    background: theme === option.value ? 'var(--dev-accent-primary)' : 'var(--dev-bg-muted)',
                    border: `2px solid ${theme === option.value ? 'var(--dev-accent-primary)' : 'var(--dev-border-default)'}`,
                    borderRadius: 'var(--dev-radius-lg)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--dev-space-2)',
                    color: theme === option.value ? 'white' : 'var(--dev-text-primary)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {option.icon}
                  <span style={{ fontSize: 'var(--dev-text-sm)', fontWeight: 'var(--dev-font-medium)' }}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div style={{ marginBottom: 'var(--dev-space-6)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--dev-space-2)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              <Palette size={20} />
              <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>Accent Color</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dev-space-3)' }}>
              {accentColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color)}
                  title={color.name}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--dev-radius-lg)',
                    background: color.preview,
                    border: `3px solid ${accentColor.name === color.name ? 'white' : 'transparent'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                    boxShadow: accentColor.name === color.name ? '0 0 0 2px var(--dev-bg-primary), 0 0 0 4px ' + color.value : 'none',
                  }}
                >
                  {accentColor.name === color.name && (
                    <Check size={20} color="white" weight="bold" />
                  )}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', marginTop: 'var(--dev-space-2)' }}>
              Selected: {accentColor.name}
            </p>
          </div>

          {/* Density */}
          <div style={{ marginBottom: 'var(--dev-space-6)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--dev-space-2)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              <Gauge size={20} />
              <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>Density</span>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--dev-space-3)' }}>
              {[
                { value: 'comfortable' as Density, label: 'Comfortable', desc: 'More spacing' },
                { value: 'compact' as Density, label: 'Compact', desc: 'Denser layout' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setDensity(option.value)}
                  style={{
                    flex: 1,
                    padding: 'var(--dev-space-3)',
                    background: density === option.value ? 'var(--dev-bg-hover)' : 'transparent',
                    border: `2px solid ${density === option.value ? 'var(--dev-accent-primary)' : 'var(--dev-border-default)'}`,
                    borderRadius: 'var(--dev-radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ 
                    fontWeight: 'var(--dev-font-medium)',
                    color: density === option.value ? 'var(--dev-accent-primary)' : 'var(--dev-text-primary)',
                  }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                    {option.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div style={{ marginBottom: 'var(--dev-space-6)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--dev-space-2)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              <TextAa size={20} />
              <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>Font Size</span>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => setFontSize(size.value)}
                  style={{
                    padding: 'var(--dev-space-2) var(--dev-space-4)',
                    background: fontSize === size.value ? 'var(--dev-accent-primary)' : 'var(--dev-bg-muted)',
                    border: 'none',
                    borderRadius: 'var(--dev-radius-md)',
                    cursor: 'pointer',
                    color: fontSize === size.value ? 'white' : 'var(--dev-text-primary)',
                    fontSize: size.value,
                    fontWeight: 'var(--dev-font-medium)',
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Animations */}
          <div style={{ marginBottom: 'var(--dev-space-6)' }}>
            <DevCard padding="md">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 'var(--dev-font-medium)' }}>Animations</div>
                  <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>
                    Enable smooth transitions and animations
                  </div>
                </div>
                <Toggle active={animations} onClick={() => setAnimations(!animations)} />
              </div>
            </DevCard>
          </div>

          {/* Preview */}
          <DevCard padding="md" style={{ background: 'var(--dev-bg-muted)' }}>
            <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)', marginBottom: 'var(--dev-space-3)' }}>
              Preview
            </div>
            <div style={{
              padding: 'var(--dev-space-4)',
              background: 'var(--dev-bg-elevated)',
              borderRadius: 'var(--dev-radius-lg)',
              border: '1px solid var(--dev-border-default)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)', marginBottom: 'var(--dev-space-3)' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: accentColor.preview,
                }} />
                <div>
                  <div style={{ fontWeight: 'var(--dev-font-semibold)' }}>Sample Document</div>
                  <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>Customer Name</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
                <button style={{
                  padding: 'var(--dev-space-2) var(--dev-space-3)',
                  background: accentColor.value,
                  border: 'none',
                  borderRadius: 'var(--dev-radius-md)',
                  color: 'white',
                  fontSize: 'var(--dev-text-sm)',
                  fontWeight: 'var(--dev-font-medium)',
                  cursor: 'pointer',
                }}>
                  Primary
                </button>
                <button style={{
                  padding: 'var(--dev-space-2) var(--dev-space-3)',
                  background: 'transparent',
                  border: '1px solid var(--dev-border-default)',
                  borderRadius: 'var(--dev-radius-md)',
                  color: 'var(--dev-text-primary)',
                  fontSize: 'var(--dev-text-sm)',
                  cursor: 'pointer',
                }}>
                  Secondary
                </button>
              </div>
            </div>
          </DevCard>

          {/* Save Note */}
          <div style={{ 
            marginTop: 'var(--dev-space-4)',
            padding: 'var(--dev-space-3)',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: 'var(--dev-radius-lg)',
            color: 'var(--dev-accent-success)',
            fontSize: 'var(--dev-text-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-2)',
          }}>
            <Check size={16} />
            Changes are saved automatically
          </div>
        </div>
      </div>
    </div>
  )
}

interface ToggleProps {
  active: boolean
  onClick: () => void
}

function Toggle({ active, onClick }: ToggleProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        border: 'none',
        background: active ? 'var(--dev-accent-primary)' : 'var(--dev-bg-muted)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: 3,
        left: active ? 23 : 3,
        transition: 'left 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
}
