/**
 * Basics Dashboard Design Tokens
 * 
 * A unified design system for consistent styling across all dashboard components.
 * This file defines colors, spacing, shadows, borders, and other design primitives.
 */

// ============================================================================
// Color Palette
// ============================================================================

export const colors = {
  // Base colors - warm parchment theme
  background: {
    page: '#faf7ef',           // Warm off-white page background
    card: '#fffcf5',           // Slightly warmer card background
    cardHover: '#fff9ed',      // Card hover state
    elevated: '#ffffff',       // Pure white for elevated elements
    muted: '#f5f0e5',          // Muted background for nested elements
  },
  
  // Border colors
  border: {
    light: 'rgba(11, 29, 57, 0.06)',   // Very subtle border
    default: 'rgba(11, 29, 57, 0.10)', // Default border
    medium: 'rgba(11, 29, 57, 0.15)',  // Medium emphasis border
    strong: 'rgba(11, 29, 57, 0.20)',  // Strong border
  },
  
  // Text colors
  text: {
    primary: '#0b1d39',        // Deep navy - primary text
    secondary: '#4a5568',      // Gray - secondary text
    muted: '#718096',          // Light gray - muted text
    inverse: '#ffffff',        // White - on dark backgrounds
  },
  
  // Accent colors - subject-specific
  subject: {
    math: {
      primary: '#3b82f6',      // Blue
      light: '#eff6ff',        // Blue tint
      border: '#bfdbfe',       // Blue border
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    reading: {
      primary: '#10b981',      // Green
      light: '#ecfdf5',        // Green tint
      border: '#a7f3d0',       // Green border
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    logic: {
      primary: '#8b5cf6',      // Purple
      light: '#f5f3ff',        // Purple tint
      border: '#ddd6fe',       // Purple border
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
    writing: {
      primary: '#f59e0b',      // Amber
      light: '#fffbeb',        // Amber tint
      border: '#fde68a',       // Amber border
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    latin: {
      primary: '#ef4444',      // Red
      light: '#fef2f2',        // Red tint
      border: '#fecaca',       // Red border
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    },
    greek: {
      primary: '#6366f1',      // Indigo
      light: '#eef2ff',        // Indigo tint
      border: '#c7d2fe',       // Indigo border
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    },
  },
  
  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Gold accent (for premium/achievements)
  gold: {
    primary: '#d4af37',
    light: '#fef7e0',
    dark: '#b8960c',
  },
} as const

// ============================================================================
// Spacing Scale (in pixels, use with Tailwind or inline)
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const

// ============================================================================
// Border Radius
// ============================================================================

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
} as const

// ============================================================================
// Shadows - Consistent depth system
// ============================================================================

export const shadows = {
  // Subtle shadow for cards at rest
  sm: '0 1px 2px rgba(11, 29, 57, 0.04)',
  
  // Default card shadow
  card: '0 2px 8px rgba(11, 29, 57, 0.06), 0 1px 2px rgba(11, 29, 57, 0.04)',
  
  // Elevated card shadow (hover state)
  cardHover: '0 8px 24px rgba(11, 29, 57, 0.10), 0 2px 6px rgba(11, 29, 57, 0.06)',
  
  // Modal/overlay shadow
  modal: '0 20px 40px rgba(11, 29, 57, 0.20), 0 8px 16px rgba(11, 29, 57, 0.10)',
  
  // Inner shadow for recessed elements
  inner: 'inset 0 1px 2px rgba(11, 29, 57, 0.06)',
  
  // Focus ring
  focus: '0 0 0 3px rgba(59, 130, 246, 0.3)',
} as const

// ============================================================================
// Typography
// ============================================================================

export const typography = {
  fontFamily: {
    heading: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    body: '"Inter", "SF Pro Text", -apple-system, sans-serif',
    mono: '"SF Mono", "Fira Code", monospace',
  },
  
  fontSize: {
    xs: '11px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const

// ============================================================================
// Animation & Transitions
// ============================================================================

export const transitions = {
  fast: '150ms ease',
  default: '200ms ease',
  slow: '300ms ease',
  spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// ============================================================================
// Card Variants
// ============================================================================

export const cardVariants = {
  default: {
    background: colors.background.card,
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.xl,
    boxShadow: shadows.card,
  },
  
  elevated: {
    background: colors.background.elevated,
    border: `1px solid ${colors.border.light}`,
    borderRadius: radius.xl,
    boxShadow: shadows.cardHover,
  },
  
  interactive: {
    background: colors.background.card,
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.xl,
    boxShadow: shadows.card,
    transition: transitions.default,
    cursor: 'pointer',
  },
  
  // Section cards (like Core Topics, Classical Education)
  section: {
    background: colors.background.card,
    border: `1px solid ${colors.border.medium}`,
    borderRadius: radius.xl,
    boxShadow: shadows.card,
  },
  
  // Feature cards in the grid
  feature: {
    background: colors.background.card,
    border: `1.5px solid ${colors.border.default}`,
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
  },
} as const

// ============================================================================
// Icon Sizes
// ============================================================================

export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
} as const

// ============================================================================
// Z-Index Scale
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 50,
  modal: 100,
  toast: 150,
} as const

