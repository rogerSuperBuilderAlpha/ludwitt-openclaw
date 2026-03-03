import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'API Documentation | Integration Guide | Ludwitt',
  description: 'Integrate Ludwitt adaptive learning into your application. API documentation for educational technology developers, workforce development platforms, and adult education programs seeking to address literacy and numeracy challenges.',
  keywords: [
    'Ludwitt API',
    'adaptive learning API',
    'educational technology API',
    'EdTech integration',
    'literacy API',
    'numeracy API',
    'learning management system integration',
    'LMS integration',
    'workforce development API',
    'adult education API',
  ],
  openGraph: {
    title: 'API Documentation | Ludwitt',
    description: 'Integrate adaptive learning for literacy and numeracy into your platform.',
    type: 'website',
    url: 'https://your-domain.com/developers/api',
  },
}

// API capabilities
const apiCapabilities = [
  {
    category: 'Learning Content',
    description: 'Access adaptive problems across all subjects',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/problems',
        description: 'Retrieve adaptive problems matched to learner skill level',
      },
      {
        method: 'POST',
        path: '/api/v1/check-answer',
        description: 'Submit answers and receive immediate feedback with AI explanations',
      },
      {
        method: 'GET',
        path: '/api/v1/skills',
        description: 'Get skill taxonomy for math, reading, logic, and classical languages',
      },
    ],
  },
  {
    category: 'Learner Progress',
    description: 'Track and analyze learner performance',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/progress/{userId}',
        description: 'Retrieve comprehensive progress data including skill mastery levels',
      },
      {
        method: 'GET',
        path: '/api/v1/analytics/{userId}',
        description: 'Get detailed learning analytics and performance trends',
      },
      {
        method: 'POST',
        path: '/api/v1/session',
        description: 'Record learning sessions with time-on-task data',
      },
    ],
  },
  {
    category: 'AI Tutoring',
    description: 'Access AI-powered tutoring and explanations',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/explain',
        description: 'Get AI-generated explanations for any concept or problem',
      },
      {
        method: 'POST',
        path: '/api/v1/tutor/chat',
        description: 'Interactive tutoring conversation with Claude AI',
      },
      {
        method: 'POST',
        path: '/api/v1/generate-practice',
        description: 'Generate custom practice problems for specific skills',
      },
    ],
  },
  {
    category: 'Organization Management',
    description: 'Manage learners and groups for institutions',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/org/learners',
        description: 'List all learners in your organization',
      },
      {
        method: 'POST',
        path: '/api/v1/org/groups',
        description: 'Create learning groups or cohorts',
      },
      {
        method: 'GET',
        path: '/api/v1/org/reports',
        description: 'Generate aggregate reports for your organization',
      },
    ],
  },
]

// Use cases for API integration
const integrationUseCases = [
  {
    title: 'Learning Management Systems (LMS)',
    description: 'Integrate Ludwitt content into your existing LMS. Provide adaptive math and reading practice alongside your curriculum.',
    examples: ['Canvas', 'Blackboard', 'Moodle', 'Schoology'],
    icon: '🎓',
  },
  {
    title: 'Workforce Development Platforms',
    description: 'Assess and improve employee foundational skills. PIAAC 2023 shows 28% of adults struggle with literacy—your workforce may need support.',
    examples: ['Corporate training platforms', 'HR systems', 'Onboarding tools'],
    icon: '💼',
  },
  {
    title: 'Adult Education Programs',
    description: 'Supplement traditional adult education with AI-powered adaptive practice. Scale your impact without scaling instructor time.',
    examples: ['Community colleges', 'Adult learning centers', 'Libraries'],
    icon: '📚',
  },
  {
    title: 'Healthcare & Social Services',
    description: 'Address health literacy challenges. Help clients understand medical information, navigate systems, and manage finances.',
    examples: ['Patient portals', 'Social service platforms', 'Financial counseling'],
    icon: '🏥',
  },
  {
    title: 'Correctional Education',
    description: 'Provide educational opportunities that reduce recidivism. Inmates with improved literacy have better outcomes upon release.',
    examples: ['Prison education programs', 'Reentry services'],
    icon: '⚖️',
  },
  {
    title: 'EdTech Startups',
    description: 'Build on top of our adaptive engine rather than building from scratch. Focus on your unique value-add.',
    examples: ['Tutoring platforms', 'Homework helpers', 'Study apps'],
    icon: '🚀',
  },
]

export default function APIDocumentationPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0a0a0a]">
      {/* ================================================================== */}
      {/* Header */}
      {/* ================================================================== */}
      <header className="border-b border-[#0a0a0a]/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 relative">
                <Image
                  src="/logos/logo.png"
                  alt="Ludwitt"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">Ludwitt</span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                About
              </Link>
              <Link href="/for-adults" className="text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                For Adults
              </Link>
              <Link href="/pricing" className="text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                Pricing
              </Link>
              <Link 
                href="/login" 
                className="text-sm font-medium px-5 py-2.5 bg-[#0a0a0a] text-[#faf8f5] rounded-full hover:bg-[#0a0a0a]/80 transition-all"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* Hero Section */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-[#d64933] mb-6 tracking-wide uppercase">
            Developer Resources
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Ludwitt API
          </h1>
          <p className="text-xl text-[#6b6b6b] leading-relaxed max-w-3xl mx-auto mb-10">
            Integrate research-backed adaptive learning into your platform. Access our AI-powered 
            tutoring, adaptive content engine, and progress tracking to help your users master 
            literacy and numeracy skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:api@ludiwtt.com?subject=API%20Access%20Request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d64933] text-white font-medium rounded-full hover:bg-[#c43d28] transition-all shadow-lg shadow-[#d64933]/20"
            >
              Request API Access
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 text-[#0a0a0a] font-medium rounded-full border border-[#0a0a0a]/20 hover:border-[#0a0a0a]/40 transition-all"
            >
              Learn about our mission
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Why Integrate */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8 bg-[#0a0a0a] text-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Build on Ludwitt?
            </h2>
            <p className="text-lg text-[#faf8f5]/70 max-w-3xl mx-auto">
              Don&apos;t reinvent the wheel. Our adaptive learning engine is built on decades of 
              learning science research and powered by advanced AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Research-Backed',
                description: 'Built on Vygotsky\'s ZPD, Ebbinghaus spaced repetition, Bloom\'s mastery learning, and more. Not just random problems—intelligent adaptation.',
                icon: '📊',
              },
              {
                title: 'AI-Powered',
                description: 'Anthropic Claude provides personalized tutoring, explanations, and answer validation. State-of-the-art AI at your fingertips.',
                icon: '🤖',
              },
              {
                title: 'Comprehensive Content',
                description: 'Math, reading, logic, Latin, Greek, and writing. K-12 through adult remediation. Thousands of problems with more added continuously.',
                icon: '📚',
              },
              {
                title: 'Real Problem',
                description: 'PIAAC 2023: 28% of US adults struggle with basic literacy, 34% with numeracy. Your users likely include many who need this help.',
                icon: '🎯',
              },
              {
                title: 'Save Development Time',
                description: 'Building adaptive learning from scratch takes years. Integrate ours in weeks. Focus your resources on your unique value proposition.',
                icon: '⚡',
              },
              {
                title: 'Scalable Infrastructure',
                description: 'Built on Next.js, Firebase, and Vercel. Handles thousands of concurrent learners. You focus on users, we handle the infrastructure.',
                icon: '📈',
              },
            ].map((item, index) => (
              <div key={index} className="bg-[#faf8f5]/5 border border-[#faf8f5]/10 rounded-2xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-[#faf8f5]/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* API Capabilities */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              API Capabilities
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
              RESTful API with comprehensive endpoints for adaptive learning, progress tracking, 
              and AI tutoring.
            </p>
          </div>

          <div className="space-y-8">
            {apiCapabilities.map((category, index) => (
              <div key={index} className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
                <div className="bg-[#0a0a0a] text-[#faf8f5] px-6 py-4">
                  <h3 className="text-xl font-bold">{category.category}</h3>
                  <p className="text-[#faf8f5]/70 text-sm">{category.description}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {category.endpoints.map((endpoint, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-[#faf8f5] rounded-lg">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          endpoint.method === 'GET' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {endpoint.method}
                        </span>
                        <div>
                          <code className="text-sm font-mono text-[#0a0a0a]">{endpoint.path}</code>
                          <p className="text-sm text-[#6b6b6b] mt-1">{endpoint.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-800">
              <strong>Note:</strong> Full API documentation with authentication, rate limits, and 
              code examples is available to approved partners. Contact us to discuss your use case.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Integration Use Cases */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8 bg-[#e8e4de]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Integration Use Cases
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
              Organizations across sectors are using Ludwitt to address the literacy and 
              numeracy crisis. Here&apos;s how you might integrate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationUseCases.map((useCase, index) => (
              <div key={index} className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-[#6b6b6b] text-sm mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, i) => (
                    <span key={i} className="px-2 py-1 bg-[#0a0a0a]/5 rounded text-xs text-[#6b6b6b]">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Technical Details */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technical Details
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Authentication</h3>
              <ul className="space-y-2 text-[#6b6b6b] text-sm">
                <li>• API key authentication</li>
                <li>• OAuth 2.0 for user-level access</li>
                <li>• JWT tokens for session management</li>
                <li>• Webhook support for real-time events</li>
              </ul>
            </div>
            <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Response Format</h3>
              <ul className="space-y-2 text-[#6b6b6b] text-sm">
                <li>• JSON responses</li>
                <li>• Consistent error handling</li>
                <li>• Pagination for list endpoints</li>
                <li>• Filtering and sorting options</li>
              </ul>
            </div>
            <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
              <ul className="space-y-2 text-[#6b6b6b] text-sm">
                <li>• Tiered limits based on plan</li>
                <li>• Burst handling for spikes</li>
                <li>• Clear rate limit headers</li>
                <li>• Enterprise options available</li>
              </ul>
            </div>
            <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#6b6b6b] text-sm">
                <li>• Dedicated integration support</li>
                <li>• Sandbox environment for testing</li>
                <li>• SDKs for common languages</li>
                <li>• Technical documentation portal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA */}
      {/* ================================================================== */}
      <section className="py-20 px-6 lg:px-8 bg-[#d64933] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Integrate?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Contact us to discuss your use case, get API access, and start building. 
            We&apos;re excited to help you address the literacy and numeracy crisis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:api@ludiwtt.com?subject=API%20Access%20Request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#d64933] font-medium rounded-full hover:bg-white/90 transition-all"
            >
              Request API Access
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded-full border-2 border-white/40 hover:border-white/60 transition-all"
            >
              View our research
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Footer */}
      {/* ================================================================== */}
      <footer className="border-t border-[#0a0a0a]/10 py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/logo.png"
                alt="Ludwitt"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-medium">Ludwitt</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b6b6b]">
              <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
              <Link href="/alc" className="hover:text-[#0a0a0a] transition-colors">Developer Training</Link>
              <Link href="/legal/privacy-policy" className="hover:text-[#0a0a0a] transition-colors">Privacy</Link>
              <Link href="/legal/terms-of-service" className="hover:text-[#0a0a0a] transition-colors">Terms</Link>
            </div>

            <div className="text-sm text-[#6b6b6b]">
              © {new Date().getFullYear()} Ludwitt
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
