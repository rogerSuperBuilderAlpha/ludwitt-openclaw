'use client'

/**
 * BasicsCard - Unified card component for consistent styling
 *
 * This is the foundational card component that all dashboard cards should use.
 * It provides consistent borders, shadows, backgrounds, and hover states.
 */

import { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { colors, shadows, radius, transitions } from '@/lib/design/tokens'

// ============================================================================
// Types
// ============================================================================

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'interactive'
  | 'section'
  | 'feature'
  | 'subject'
export type SubjectAccent =
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'
  | 'neutral'

interface BasicsCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: CardVariant
  accent?: SubjectAccent
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  selected?: boolean
  disabled?: boolean
}

// ============================================================================
// Accent Colors Map
// ============================================================================

const accentConfig = {
  math: {
    borderColor: colors.subject.math.border,
    headerBg: colors.subject.math.light,
    iconBg: colors.subject.math.gradient,
    accentColor: colors.subject.math.primary,
  },
  reading: {
    borderColor: colors.subject.reading.border,
    headerBg: colors.subject.reading.light,
    iconBg: colors.subject.reading.gradient,
    accentColor: colors.subject.reading.primary,
  },
  logic: {
    borderColor: colors.subject.logic.border,
    headerBg: colors.subject.logic.light,
    iconBg: colors.subject.logic.gradient,
    accentColor: colors.subject.logic.primary,
  },
  writing: {
    borderColor: colors.subject.writing.border,
    headerBg: colors.subject.writing.light,
    iconBg: colors.subject.writing.gradient,
    accentColor: colors.subject.writing.primary,
  },
  latin: {
    borderColor: colors.subject.latin.border,
    headerBg: colors.subject.latin.light,
    iconBg: colors.subject.latin.gradient,
    accentColor: colors.subject.latin.primary,
  },
  greek: {
    borderColor: colors.subject.greek.border,
    headerBg: colors.subject.greek.light,
    iconBg: colors.subject.greek.gradient,
    accentColor: colors.subject.greek.primary,
  },
  neutral: {
    borderColor: colors.border.default,
    headerBg: colors.background.muted,
    iconBg: `linear-gradient(135deg, ${colors.text.muted} 0%, ${colors.text.secondary} 100%)`,
    accentColor: colors.text.muted,
  },
} as const

// ============================================================================
// Padding Map
// ============================================================================

const paddingMap = {
  none: '0',
  sm: '12px',
  md: '16px',
  lg: '20px',
} as const

// ============================================================================
// Component
// ============================================================================

export const BasicsCard = forwardRef<HTMLDivElement, BasicsCardProps>(
  (
    {
      children,
      variant = 'default',
      accent = 'neutral',
      padding = 'md',
      interactive = false,
      selected = false,
      disabled = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const accentStyles = accentConfig[accent]

    // Base styles that all variants share
    const baseStyles: React.CSSProperties = {
      background: colors.background.card,
      borderRadius: radius.xl,
      transition: transitions.default,
      ...(disabled && { opacity: 0.6, cursor: 'not-allowed' }),
    }

    // Variant-specific styles
    const variantStyles: Record<CardVariant, React.CSSProperties> = {
      default: {
        ...baseStyles,
        border: `1px solid ${colors.border.default}`,
        boxShadow: shadows.card,
      },
      elevated: {
        ...baseStyles,
        background: colors.background.elevated,
        border: `1px solid ${colors.border.light}`,
        boxShadow: shadows.cardHover,
      },
      interactive: {
        ...baseStyles,
        border: `1px solid ${colors.border.default}`,
        boxShadow: shadows.card,
        cursor: disabled ? 'not-allowed' : 'pointer',
      },
      section: {
        ...baseStyles,
        border: `1.5px solid ${accent !== 'neutral' ? accentStyles.borderColor : colors.border.medium}`,
        boxShadow: shadows.card,
      },
      feature: {
        ...baseStyles,
        background:
          accent !== 'neutral' ? accentStyles.headerBg : colors.background.card,
        border: `1.5px solid ${accent !== 'neutral' ? accentStyles.borderColor : colors.border.default}`,
        borderRadius: radius.lg,
        boxShadow: shadows.sm,
      },
      subject: {
        ...baseStyles,
        background: accentStyles.headerBg,
        border: `1.5px solid ${accentStyles.borderColor}`,
        boxShadow: shadows.card,
      },
    }

    // Selected state
    const selectedStyles: React.CSSProperties = selected
      ? {
          border: `2px solid ${accentStyles.accentColor}`,
          boxShadow: `${shadows.card}, 0 0 0 3px ${accentStyles.borderColor}`,
        }
      : {}

    // Combined styles
    const combinedStyles: React.CSSProperties = {
      ...variantStyles[variant],
      ...selectedStyles,
      padding: paddingMap[padding],
      ...style,
    }

    // Interactive hover class
    const interactiveClass =
      (interactive || variant === 'interactive') && !disabled
        ? 'hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
        : ''

    return (
      <div
        ref={ref}
        className={`${interactiveClass} ${className}`}
        style={combinedStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BasicsCard.displayName = 'BasicsCard'

// ============================================================================
// Card Header Component
// ============================================================================

interface CardHeaderProps {
  children: ReactNode
  accent?: SubjectAccent
  className?: string
}

export function CardHeader({
  children,
  accent = 'neutral',
  className = '',
}: CardHeaderProps) {
  const accentStyles = accentConfig[accent]

  return (
    <div
      className={`flex items-center justify-between ${className}`}
      style={{
        background:
          accent !== 'neutral'
            ? accentStyles.headerBg
            : colors.background.muted,
        margin: '-16px -16px 16px -16px',
        padding: '12px 16px',
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        borderBottom: `1px solid ${colors.border.light}`,
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Card Icon Component
// ============================================================================

interface CardIconProps {
  icon: React.ComponentType<{
    size: number
    weight: string
    className?: string
  }>
  accent?: SubjectAccent
  size?: 'sm' | 'md' | 'lg'
}

export function CardIcon({
  icon: Icon,
  accent = 'neutral',
  size = 'md',
}: CardIconProps) {
  const accentStyles = accentConfig[accent]

  const sizeMap = {
    sm: { container: 32, icon: 16 },
    md: { container: 40, icon: 20 },
    lg: { container: 48, icon: 24 },
  }

  const dims = sizeMap[size]

  return (
    <div
      style={{
        width: dims.container,
        height: dims.container,
        borderRadius: radius.md,
        background: accentStyles.iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: shadows.sm,
      }}
    >
      <Icon size={dims.icon} weight="fill" className="text-white" />
    </div>
  )
}

// ============================================================================
// Section Wrapper Component
// ============================================================================

interface SectionWrapperProps {
  children: ReactNode
  title?: string
  icon?: string
  accent?: SubjectAccent
  className?: string
}

export function SectionWrapper({
  children,
  title,
  icon,
  accent = 'neutral',
  className = '',
}: SectionWrapperProps) {
  const accentStyles = accentConfig[accent]

  return (
    <div
      className={className}
      style={{
        background: colors.background.card,
        border: `1.5px solid ${accent !== 'neutral' ? accentStyles.borderColor : colors.border.medium}`,
        borderRadius: radius.xl,
        boxShadow: shadows.card,
        overflow: 'hidden',
      }}
    >
      {title && (
        <div
          style={{
            background:
              accent !== 'neutral'
                ? accentStyles.headerBg
                : colors.background.muted,
            padding: '14px 20px',
            borderBottom: `1px solid ${colors.border.light}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: colors.text.primary,
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
      )}
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  )
}
