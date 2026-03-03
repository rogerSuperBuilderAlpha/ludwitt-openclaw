/**
 * SEO Metadata Utilities
 * 
 * Shared utilities for generating consistent, professional SEO metadata
 * across all pages. Based on the comprehensive global metadata in layout.tsx.
 */

import type { Metadata } from 'next'

// =============================================================================
// Constants
// =============================================================================

export const SITE_NAME = 'Ludwitt'
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const SITE_DESCRIPTION = 'AI-powered adaptive learning platform for K-12 students and adults rebuilding foundational literacy and numeracy skills.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/api/og?title=Pitch%20Rise&subtitle=AI-Powered%20Adaptive%20Learning`

/**
 * Generate a dynamic OG image URL
 */
export function generateOGImageUrl(title: string, subtitle?: string, type?: 'default'): string {
  const params = new URLSearchParams()
  params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)
  if (type) params.set('type', type)
  return `${SITE_URL}/api/og?${params.toString()}`
}
export const TWITTER_HANDLE = '@PitchRise'

// =============================================================================
// Core Keywords by Category
// =============================================================================

export const KEYWORDS = {
  core: [
    'adaptive learning',
    'AI tutoring',
    'personalized education',
    'learning platform',
  ],
  adult: [
    'adult literacy',
    'adult numeracy',
    'adult education',
    'GED preparation',
    'workforce development',
  ],
  k12: [
    'K-12 learning',
    'student education',
    'homework help',
    'math practice',
    'reading comprehension',
  ],
  subjects: [
    'math learning',
    'reading skills',
    'vocabulary building',
    'logic puzzles',
    'Latin learning',
    'Greek vocabulary',
    'critical thinking',
  ],
  tech: [
    'EdTech',
    'educational technology',
    'online learning',
    'AI education',
  ],
  science: [
    'learning science',
    'spaced repetition',
    'mastery learning',
    'growth mindset',
  ],
} as const

// =============================================================================
// Page Metadata Generator
// =============================================================================

interface PageMetadataOptions {
  /** Page title (will be appended with " | Ludwitt") */
  title: string
  /** Page description (150-160 chars ideal for SEO) */
  description: string
  /** Path relative to site root (e.g., "/pricing") */
  path?: string
  /** Additional keywords specific to this page */
  keywords?: string[]
  /** Custom OG image URL */
  ogImage?: string
  /** Prevent search engine indexing */
  noIndex?: boolean
  /** Page type for OpenGraph */
  type?: 'website' | 'article'
}

/**
 * Generate consistent metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  ogImage,
  noIndex = false,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`
  // Generate dynamic OG image if no custom one provided
  const image = ogImage || generateOGImageUrl(title, description.slice(0, 60))

  return {
    title,
    description,
    keywords: [...KEYWORDS.core, ...keywords],
    
    // OpenGraph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [image],
    },
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
    
    // Robots
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// =============================================================================
// Pre-configured Metadata for Common Pages
// =============================================================================

/**
 * Metadata for the login page
 */
export function getLoginMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Sign In',
    description: 'Sign in to Ludwitt to continue your personalized learning journey. Access adaptive math, reading, and critical thinking exercises tailored to your level.',
    path: '/login',
    keywords: ['login', 'sign in', 'account access'],
    noIndex: true, // Don't index login pages
  })
}

/**
 * Metadata for basics learning pages
 */
export function getBasicsMetadata(page: 'leaderboard' | 'achievements' | 'cohorts' | 'study-rooms'): Metadata {
  const configs = {
    leaderboard: {
      title: 'Leaderboard',
      description: 'See how you rank among learners! Track your XP, streaks, and achievements. Compete with friends and stay motivated on your learning journey.',
      path: '/basics/leaderboard',
      keywords: ['leaderboard', 'rankings', 'XP', 'achievements', 'competition'],
    },
    achievements: {
      title: 'Achievements & Badges',
      description: 'Earn badges and achievements as you master new skills. Track your learning milestones and celebrate your progress.',
      path: '/basics/achievements',
      keywords: ['achievements', 'badges', 'rewards', 'milestones', 'gamification'],
    },
    cohorts: {
      title: 'Learning Cohorts',
      description: 'Join group learning cohorts for structured, mentor-led education. Collaborate with peers and stay accountable.',
      path: '/basics/cohorts',
      keywords: ['cohorts', 'group learning', 'mentorship', 'collaborative learning'],
    },
    'study-rooms': {
      title: 'Study Rooms',
      description: 'Join virtual study rooms to learn with others. Video-enabled focus sessions for productive group study.',
      path: '/basics/study-rooms',
      keywords: ['study rooms', 'video study', 'group study', 'focus sessions'],
    },
  }

  const config = configs[page]
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: [...KEYWORDS.k12, ...(config.keywords || [])],
  })
}

/**
 * Metadata for legal pages
 */
export function getLegalMetadata(page: 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'data-policy' | 'student-privacy' | 'acceptable-use'): Metadata {
  const configs = {
    'privacy-policy': {
      title: 'Privacy Policy',
      description: 'How Ludwitt collects, uses, and protects your personal information. COPPA, FERPA, GDPR, and CCPA compliant.',
      path: '/legal/privacy-policy',
      keywords: ['privacy policy', 'data protection', 'COPPA', 'FERPA', 'GDPR', 'CCPA'],
    },
    'terms-of-service': {
      title: 'Terms of Service',
      description: 'Terms and conditions for using the Ludwitt adaptive learning platform, including account rules, payments, and AI features.',
      path: '/legal/terms-of-service',
      keywords: ['terms of service', 'terms and conditions', 'user agreement'],
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      description: 'Information about how Ludwitt uses cookies and similar technologies to enhance your learning experience.',
      path: '/legal/cookie-policy',
      keywords: ['cookie policy', 'cookies', 'tracking', 'analytics'],
    },
    'data-policy': {
      title: 'Data Policy',
      description: 'How Ludwitt handles learning data, third-party services, data retention, and your data rights.',
      path: '/legal/data-policy',
      keywords: ['data policy', 'data handling', 'data retention', 'third-party data'],
    },
    'student-privacy': {
      title: 'Student Privacy',
      description: 'How Ludwitt protects student data. COPPA compliance for children under 13, FERPA compliance, and parental rights.',
      path: '/legal/student-privacy',
      keywords: ['student privacy', 'COPPA', 'FERPA', 'children privacy', 'parental consent'],
    },
    'acceptable-use': {
      title: 'Acceptable Use Policy',
      description: 'Guidelines for acceptable use of the Ludwitt platform, including AI features, account security, and prohibited activities.',
      path: '/legal/acceptable-use',
      keywords: ['acceptable use', 'usage policy', 'prohibited activities', 'community guidelines'],
    },
  }

  const config = configs[page]
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: config.keywords,
  })
}

// =============================================================================
// JSON-LD Schema Generators
// =============================================================================

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
