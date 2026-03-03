import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
// Import KaTeX CSS globally for proper math rendering
import 'katex/dist/katex.min.css'
import { ClientProvider } from '@/components/auth/ClientProvider'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { SectionSwitcherStrip } from '@/components/shared/SectionSwitcherStrip'

const inter = Inter({ subsets: ['latin'] })

/**
 * Comprehensive SEO Metadata for Ludwitt
 *
 * Ludwitt is an AI-powered adaptive learning platform addressing the
 * global literacy and numeracy crisis documented by PIAAC 2023:
 * - US adult literacy dropped 12 points (271→258) from 2017-2023
 * - 28% of US adults struggle with basic literacy (up from 19%)
 * - 34% of US adults struggle with basic numeracy (up from 29%)
 */
export const metadata: Metadata = {
  // =========================================================================
  // CORE METADATA
  // =========================================================================
  title: {
    default: 'Ludwitt | AI-Powered Adaptive Learning for All Ages',
    template: '%s | Ludwitt',
  },
  description:
    'Ludwitt is an AI-powered learning platform with two tracks: (1) Basics — adaptive K-12 + adult literacy/numeracy (Math, Reading, Logic, Latin, Greek, Writing) addressing the PIAAC crisis, and (2) Developer Training — learn to build with AI tools (Cursor, Claude Code, OpenClaw) through guided projects, deployment, and open-source contributions. Features adaptive difficulty, AI tutoring, and gamification.',

  // =========================================================================
  // APPLICATION METADATA
  // =========================================================================
  applicationName: 'Ludwitt',
  authors: [{ name: 'Ludwitt Team', url: 'https://your-domain.com' }],
  generator: 'Next.js',
  keywords: [
    // Primary Keywords
    'adaptive learning platform',
    'adult literacy',
    'adult numeracy',
    'AI tutoring',
    'personalized learning',

    // Problem-focused Keywords (PIAAC)
    'literacy crisis',
    'numeracy decline',
    'adult education technology',
    'adult basic education',
    'GED preparation',
    'workforce literacy',
    'foundational skills',
    'skill remediation',

    // Solution Keywords
    'AI-powered education',
    'adaptive difficulty',
    'personalized tutoring',
    'learning science',
    'spaced repetition',
    'mastery learning',

    // Subject Keywords
    'math practice',
    'reading comprehension',
    'vocabulary building',
    'logic puzzles',
    'critical thinking',
    'Latin learning',
    'Greek vocabulary',
    'writing skills',

    // Audience Keywords
    'K-12 learning',
    'adult learners',
    'family learning',
    'workforce development',
    'employee training',

    // Comparison Keywords
    'alternative to tutoring',
    'online learning platform',
    'educational technology',
    'EdTech',
    'learning app',

    // Developer Training Keywords
    'learn to code with AI',
    'Cursor tutorial',
    'Claude Code tutorial',
    'AI coding tools',
    'developer training',
    'learn web development',
    'build with AI',
    'open source contribution',
    'beginner coding course',

    // Research Keywords
    'PIAAC',
    'evidence-based learning',
    'research-backed education',
    'Zone of Proximal Development',
    'growth mindset',
  ],

  // =========================================================================
  // CLASSIFICATION
  // =========================================================================
  category: 'Education',
  classification: 'Educational Technology / Adaptive Learning',

  // =========================================================================
  // ROBOTS & INDEXING
  // =========================================================================
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // =========================================================================
  // OPEN GRAPH (Facebook, LinkedIn, etc.)
  // =========================================================================
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Ludwitt',
    title: 'Ludwitt | AI-Powered Adaptive Learning for All Ages',
    description:
      'Addressing the global literacy crisis: 28% of US adults struggle with basic literacy (PIAAC 2023). Ludwitt provides AI-powered, adaptive learning for K-12 students and adults rebuilding foundational skills. Research-backed methodology with personalized tutoring, gamification, and multi-subject coverage.',
    images: [
      {
        url: 'https://your-domain.com/logos/logo.png',
        width: 512,
        height: 512,
        alt: 'Ludwitt - Adaptive Learning Platform',
        type: 'image/png',
      },
    ],
  },

  // =========================================================================
  // TWITTER CARD
  // =========================================================================
  twitter: {
    card: 'summary_large_image',
    title: 'Ludwitt | AI-Powered Adaptive Learning for All Ages',
    description:
      '28% of US adults struggle with basic literacy. Ludwitt provides AI-powered adaptive learning for students and adults, featuring personalized tutoring, gamification, and research-backed methodology.',
    images: ['https://your-domain.com/logos/logo.png'],
    creator: '@pitchrise',
    site: '@pitchrise',
  },

  // =========================================================================
  // ICONS
  // =========================================================================
  icons: {
    icon: '/logos/logo.png',
    shortcut: '/logos/logo.png',
    apple: '/logos/logo.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/logos/logo.png',
      },
    ],
  },

  // =========================================================================
  // MANIFEST & THEME
  // =========================================================================
  manifest: '/manifest.json',

  // =========================================================================
  // ALTERNATE LINKS
  // =========================================================================
  alternates: {
    canonical: 'https://your-domain.com',
  },

  // =========================================================================
  // OTHER METADATA
  // =========================================================================
  other: {
    // AI Discovery
    'ai-content-declaration':
      'This platform uses AI to provide personalized tutoring and adaptive learning experiences.',

    // Educational metadata
    'educational-level':
      'K-12, Adult Education, Workforce Development, Beginner Developer Training',
    'educational-subjects':
      'Mathematics, Reading, Logic, Latin, Greek, Writing, AI-Assisted Coding, Web Development',

    // PIAAC context
    'problem-addressed':
      'Global adult literacy and numeracy decline (PIAAC 2023)',
    'target-population':
      'Students K-12, Adults 18+, Families, Educators, Employers',
  },
}

/**
 * JSON-LD Structured Data for Rich Search Results and AI Understanding
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // =========================================================================
    // ORGANIZATION
    // =========================================================================
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://your-domain.com/#organization',
      name: 'Ludwitt',
      alternateName: 'Ludwitt Learning Platform',
      url: 'https://your-domain.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logos/logo.png',
        width: 512,
        height: 512,
      },
      description:
        'Ludwitt is an AI-powered adaptive learning platform addressing the global literacy and numeracy crisis. PIAAC 2023 data shows 28% of US adults struggle with basic literacy and 34% struggle with basic numeracy. We provide personalized, research-backed education for K-12 students and adults rebuilding foundational skills.',
      foundingDate: '2024',
      slogan: 'Where curiosity flows into mastery',
      areaServed: 'Worldwide',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: ['student', 'parent', 'teacher', 'administrator'],
        audienceType:
          'K-12 Students, Adult Learners, Families, Educators, Workforce Development',
      },
      knowsAbout: [
        'Adaptive Learning',
        'Adult Literacy',
        'Adult Numeracy',
        'Educational Technology',
        'AI Tutoring',
        'Spaced Repetition',
        'Mastery Learning',
        'Zone of Proximal Development',
        'PIAAC Research',
        'Learning Science',
      ],
      sameAs: ['https://your-domain.com', 'https://github.com/ludwitt'],
    },

    // =========================================================================
    // SOFTWARE APPLICATION
    // =========================================================================
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://your-domain.com/#application',
      name: 'Ludwitt',
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Adaptive Learning Platform',
      operatingSystem: 'Web Browser, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier available with premium subscription options',
      },
      description:
        'AI-powered adaptive learning platform for K-12 students and adults. Features include real-time difficulty adjustment, AI tutoring, gamification with XP and achievements, and coverage of Math, Reading, Logic, Latin, Greek, and Writing. Designed to address the PIAAC-documented decline in adult literacy and numeracy.',
      featureList: [
        'Adaptive difficulty based on Zone of Proximal Development',
        'AI-powered tutoring and explanations (powered by Anthropic Claude)',
        'Spaced repetition for long-term retention',
        'Mastery-based progression',
        'Immediate feedback on every problem',
        'Gamification: XP, streaks, achievements, leaderboards',
        'Multi-subject: Math, Reading, Logic, Latin, Greek, Writing',
        'Privacy-first design for stigma-free adult learning',
        'Mobile-responsive for learning anywhere',
        'Progress tracking and analytics',
        'Study rooms for collaborative learning',
        'Cohort system with mentors',
      ],
      audience: {
        '@type': 'EducationalAudience',
        audienceType: 'K-12 Students, Adult Learners, Families, Educators',
      },
      educationalLevel: ['K-12', 'Adult Education', 'Continuing Education'],
      learningResourceType: ['Interactive', 'Adaptive', 'AI-Powered'],
    },

    // =========================================================================
    // WEBSITE
    // =========================================================================
    {
      '@type': 'WebSite',
      '@id': 'https://your-domain.com/#website',
      url: 'https://your-domain.com',
      name: 'Ludwitt',
      description:
        'AI-powered adaptive learning platform for literacy and numeracy improvement',
      publisher: {
        '@id': 'https://your-domain.com/#organization',
      },
    },

    // =========================================================================
    // LEARNING RESOURCES (Course-like offerings)
    // =========================================================================
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#math-course',
      name: 'Adaptive Mathematics',
      description:
        'AI-powered math practice from arithmetic through algebra. Adaptive difficulty ensures optimal challenge for learners of all levels, from K-12 students to adults rebuilding numeracy skills. Addresses the PIAAC-documented decline where 34% of US adults struggle with basic numeracy.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      educationalLevel: [
        'Elementary',
        'Middle School',
        'High School',
        'Adult Education',
      ],
      teaches: [
        'Arithmetic',
        'Fractions and Decimals',
        'Percentages',
        'Pre-Algebra',
        'Algebra',
        'Geometry',
        'Data Interpretation',
        'Financial Literacy',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'Self-paced, 15-30 minutes daily recommended',
      },
    },
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#reading-course',
      name: 'Adaptive Reading & Language Arts',
      description:
        "AI-powered reading comprehension and vocabulary building. Adaptive difficulty adjusts to each learner's level, from early readers to adults improving literacy skills. Addresses the PIAAC-documented decline where 28% of US adults struggle with basic literacy.",
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      educationalLevel: [
        'Elementary',
        'Middle School',
        'High School',
        'Adult Education',
      ],
      teaches: [
        'Reading Comprehension',
        'Vocabulary Development',
        'Phonics and Word Recognition',
        'Inference and Analysis',
        'Text Structure',
        'Critical Reading',
        'Grammar',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#logic-course',
      name: 'Logic & Critical Thinking',
      description:
        'Pattern recognition, logical deduction, and problem-solving exercises. Develops cognitive flexibility and analytical skills essential for academic and professional success.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      teaches: [
        'Pattern Recognition',
        'Logical Deduction',
        'Sequence Reasoning',
        'Analogies',
        'Problem-Solving Strategies',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#classical-languages',
      name: 'Classical Languages (Latin & Greek)',
      description:
        'Learn vocabulary and translation skills in Latin and Greek. Understand etymology connections to English vocabulary and gain historical and cultural context.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      teaches: [
        'Latin Vocabulary',
        'Greek Vocabulary',
        'Translation Skills',
        'Etymology',
        'Classical Culture',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
    },

    // =========================================================================
    // DEVELOPER TRAINING COURSES (ALC)
    // =========================================================================
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#cursor-course',
      name: 'Learn to Code with Cursor',
      description:
        'Build a personal website using the Cursor AI-powered code editor. Guided path from installation through deployment to Vercel. No prior coding experience required. Includes Git/GitHub setup, AI-assisted development, and open-source contribution.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      url: 'https://your-domain.com/alc',
      educationalLevel: ['Beginner', 'Adult Education', 'Continuing Education'],
      teaches: [
        'AI-Assisted Coding with Cursor',
        'HTML, CSS, JavaScript',
        'Git and GitHub',
        'Vercel Deployment',
        'Open Source Contribution',
        'Portfolio Development',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'Self-paced, approximately 20-40 hours total',
      },
    },
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#claude-code-course',
      name: 'Learn to Code with Claude Code',
      description:
        'Build a tweet automation agent using the Claude Code CLI tool. Guided path from installation through deployment to Firebase. No prior coding experience required. Includes Git/GitHub setup, CLI-based AI development, and open-source contribution.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      url: 'https://your-domain.com/alc',
      educationalLevel: ['Beginner', 'Adult Education', 'Continuing Education'],
      teaches: [
        'AI-Assisted Coding with Claude Code CLI',
        'JavaScript/TypeScript',
        'Git and GitHub',
        'Firebase Deployment',
        'Agent Development',
        'Open Source Contribution',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'Self-paced, approximately 20-40 hours total',
      },
    },
    {
      '@type': 'Course',
      '@id': 'https://your-domain.com/#openclaw-course',
      name: 'Learn to Code with OpenClaw',
      description:
        'Build a website with integrated email using the OpenClaw AI agent platform. Guided path from installation through deployment. No prior coding experience required. Includes Git/GitHub setup, AI agent orchestration, and open-source contribution.',
      provider: {
        '@id': 'https://your-domain.com/#organization',
      },
      url: 'https://your-domain.com/alc',
      educationalLevel: ['Beginner', 'Adult Education', 'Continuing Education'],
      teaches: [
        'AI Agent Development with OpenClaw',
        'Web Development',
        'Git and GitHub',
        'Production Deployment',
        'Email Integration',
        'Open Source Contribution',
      ],
      courseMode: 'online',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'Self-paced, approximately 20-40 hours total',
      },
    },

    // =========================================================================
    // FAQ SCHEMA (for AI agents to understand common questions)
    // =========================================================================
    {
      '@type': 'FAQPage',
      '@id': 'https://your-domain.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Ludwitt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ludwitt is an AI-powered adaptive learning platform designed for learners of all ages, from K-12 students to adults seeking to rebuild foundational literacy and numeracy skills. It uses research-backed learning science including spaced repetition, mastery-based progression, and Zone of Proximal Development optimization to provide personalized education.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who should use Ludwitt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ludwitt serves: (1) K-12 students who want personalized practice, (2) Adults rebuilding literacy and numeracy skills—PIAAC 2023 shows 28% of US adults struggle with basic literacy, (3) Families who want to learn together, (4) Educators seeking differentiation tools, (5) Workforce development programs improving employee skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'What subjects does Ludwitt cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ludwitt covers Mathematics (arithmetic through algebra), Reading Comprehension, Vocabulary Development, Logic and Critical Thinking, Latin, Greek, and Writing Skills. All subjects feature adaptive difficulty that adjusts in real-time to each learner's performance.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does adaptive learning work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ludwitt uses an adaptive algorithm that continuously calibrates to each learner. After every answer, the system updates the learner's skill model and selects problems that maintain optimal challenge (approximately 70-85% success rate). This keeps learners in their Zone of Proximal Development—challenged enough to grow but not frustrated.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is Ludwitt free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ludwitt offers a free tier with basic access to math and reading practice. Premium subscriptions unlock unlimited AI tutoring, all subjects including Logic and Classical Languages, advanced analytics, and additional features. There's also a pay-as-you-go credits system for occasional users.",
          },
        },
        {
          '@type': 'Question',
          name: 'How is Ludwitt different from other learning apps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ludwitt uniquely: (1) Explicitly serves adult learners, not just K-12, (2) Uses research-backed adaptive algorithms, not just random problems, (3) Provides AI tutoring 24/7 powered by Anthropic Claude, (4) Offers privacy-first design removing stigma for adults, (5) Includes unique classical languages (Latin, Greek), (6) Enables families to learn together.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the adult literacy crisis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PIAAC 2023 (Programme for the International Assessment of Adult Competencies) reveals alarming declines: US adult literacy scores dropped 12 points (271→258) from 2017-2023. Now 28% of US adults perform at the lowest literacy level (up from 19%) and 34% struggle with basic numeracy (up from 29%). This means approximately 54 million Americans struggle with basic reading and 66 million with basic math.',
          },
        },
        {
          '@type': 'Question',
          name: 'What learning science is Ludwitt based on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ludwitt is built on proven learning science: (1) Zone of Proximal Development (Vygotsky) for optimal challenge, (2) Spaced Repetition (Ebbinghaus) for long-term retention, (3) Mastery Learning (Bloom) requiring competence before advancement, (4) Immediate Feedback (Hattie) on every problem, (5) Growth Mindset (Dweck) emphasizing effort over innate ability.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Developer Training (ALC) program?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The ALC Developer Training program teaches complete beginners to build real projects using AI coding tools. Choose from three paths: (1) Cursor path — build a personal website with the Cursor AI editor and deploy to Vercel, (2) Claude Code path — build a tweet automation agent with the Claude Code CLI and deploy to Firebase, (3) OpenClaw path — build a website with email using the OpenClaw AI agent platform. All paths include Git/GitHub setup, deployment, open-source contribution, and portfolio building.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need coding experience for the developer training?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No prior coding experience is required. The ALC Developer Training program is designed for complete beginners. Each path starts with environment setup and Git basics, then guides you step-by-step through building and deploying a real project using AI-assisted coding tools. The AI tools help you write code while you learn the fundamentals.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Twitter conversion tracking base code */}
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','q6prc');
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProvider>
          {/* Global Logo Background */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: 'url(/logos/logo.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: '50%',
              opacity: 0.03,
              filter: 'grayscale(0%)',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col min-h-screen relative z-10">
            <SectionSwitcherStrip />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </ClientProvider>
      </body>
    </html>
  )
}
