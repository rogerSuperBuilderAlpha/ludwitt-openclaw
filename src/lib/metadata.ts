import type { Metadata } from 'next'

const SITE_NAME = 'Ludwitt'
const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://localhost:3000'
const TWITTER_HANDLE = '@PitchRise'

const CORE_KEYWORDS = [
  'adaptive learning',
  'AI tutoring',
  'personalized education',
  'learning platform',
]

function generateOGImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams()
  params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)
  return `${SITE_URL}/api/og?${params.toString()}`
}

interface PageMetadataOptions {
  title: string
  description: string
  path?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

function generatePageMetadata({
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
  const image = ogImage || generateOGImageUrl(title, description.slice(0, 60))

  return {
    title,
    description,
    keywords: [...CORE_KEYWORDS, ...keywords],
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
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [image],
    },
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },
  }
}

export function getLoginMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Sign In',
    description:
      'Sign in to Ludwitt to continue your personalized learning journey.',
    path: '/login',
    keywords: ['login', 'sign in', 'account access'],
    noIndex: true,
  })
}

export function getLegalMetadata(
  page:
    | 'privacy-policy'
    | 'terms-of-service'
    | 'cookie-policy'
    | 'data-policy'
    | 'student-privacy'
    | 'acceptable-use'
): Metadata {
  const configs: Record<
    string,
    { title: string; description: string; path: string; keywords: string[] }
  > = {
    'privacy-policy': {
      title: 'Privacy Policy',
      description:
        'How Ludwitt collects, uses, and protects your personal information. COPPA, FERPA, GDPR, and CCPA compliant.',
      path: '/legal/privacy-policy',
      keywords: [
        'privacy policy',
        'data protection',
        'COPPA',
        'FERPA',
        'GDPR',
        'CCPA',
      ],
    },
    'terms-of-service': {
      title: 'Terms of Service',
      description:
        'Terms and conditions for using the Ludwitt adaptive learning platform.',
      path: '/legal/terms-of-service',
      keywords: ['terms of service', 'terms and conditions', 'user agreement'],
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      description:
        'Information about how Ludwitt uses cookies and similar technologies.',
      path: '/legal/cookie-policy',
      keywords: ['cookie policy', 'cookies', 'tracking', 'analytics'],
    },
    'data-policy': {
      title: 'Data Policy',
      description:
        'How Ludwitt handles learning data, third-party services, data retention, and your data rights.',
      path: '/legal/data-policy',
      keywords: [
        'data policy',
        'data handling',
        'data retention',
        'third-party data',
      ],
    },
    'student-privacy': {
      title: 'Student Privacy',
      description:
        'How Ludwitt protects student data. COPPA compliance for children under 13, FERPA compliance, and parental rights.',
      path: '/legal/student-privacy',
      keywords: [
        'student privacy',
        'COPPA',
        'FERPA',
        'children privacy',
        'parental consent',
      ],
    },
    'acceptable-use': {
      title: 'Acceptable Use Policy',
      description: 'Guidelines for acceptable use of the Ludwitt platform.',
      path: '/legal/acceptable-use',
      keywords: [
        'acceptable use',
        'usage policy',
        'prohibited activities',
        'community guidelines',
      ],
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
