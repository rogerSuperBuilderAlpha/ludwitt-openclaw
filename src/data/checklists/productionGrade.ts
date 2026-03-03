export interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  importance: 'critical' | 'important' | 'recommended'
  resources?: string[]
}

export const productionGradeChecklist: ChecklistItem[] = [
  // Security
  {
    id: 'security-env-vars',
    category: 'Security',
    title: 'Environment Variables Protected',
    description: 'All API keys, secrets, and sensitive data are in .env files, not committed to Git',
    importance: 'critical',
    resources: ['https://nextjs.org/docs/app/building-your-application/configuring/environment-variables']
  },
  {
    id: 'security-https',
    category: 'Security',
    title: 'HTTPS Enabled',
    description: 'Application is served over HTTPS with valid SSL certificate',
    importance: 'critical',
  },
  {
    id: 'security-cors',
    category: 'Security',
    title: 'CORS Configured Properly',
    description: 'Cross-Origin Resource Sharing is configured to only allow trusted domains',
    importance: 'critical',
  },
  {
    id: 'security-input-validation',
    category: 'Security',
    title: 'Input Validation',
    description: 'All user inputs are validated and sanitized to prevent injection attacks',
    importance: 'critical',
  },
  
  // Authentication & Authorization
  {
    id: 'auth-implemented',
    category: 'Authentication',
    title: 'Authentication System',
    description: 'Proper user authentication is implemented (Firebase Auth, Auth0, etc.)',
    importance: 'critical',
  },
  {
    id: 'auth-protected-routes',
    category: 'Authentication',
    title: 'Protected Routes',
    description: 'Sensitive routes and API endpoints require authentication',
    importance: 'critical',
  },
  {
    id: 'auth-session-management',
    category: 'Authentication',
    title: 'Session Management',
    description: 'User sessions are securely managed with proper timeout and refresh',
    importance: 'important',
  },

  // Error Handling
  {
    id: 'error-handling-global',
    category: 'Error Handling',
    title: 'Global Error Handling',
    description: 'Application has error boundaries and catches errors gracefully',
    importance: 'critical',
  },
  {
    id: 'error-handling-user-friendly',
    category: 'Error Handling',
    title: 'User-Friendly Error Messages',
    description: 'Error messages are helpful and never expose sensitive system information',
    importance: 'important',
  },
  {
    id: 'error-handling-logging',
    category: 'Error Handling',
    title: 'Error Logging',
    description: 'Errors are logged for debugging (Sentry, LogRocket, etc.)',
    importance: 'important',
  },

  // Performance
  {
    id: 'performance-optimization',
    category: 'Performance',
    title: 'Image Optimization',
    description: 'Images are optimized and lazy-loaded (Next.js Image component)',
    importance: 'important',
  },
  {
    id: 'performance-code-splitting',
    category: 'Performance',
    title: 'Code Splitting',
    description: 'Large dependencies are code-split and loaded on demand',
    importance: 'important',
  },
  {
    id: 'performance-caching',
    category: 'Performance',
    title: 'Caching Strategy',
    description: 'Static assets are cached, API responses use appropriate cache headers',
    importance: 'important',
  },
  {
    id: 'performance-lighthouse',
    category: 'Performance',
    title: 'Lighthouse Score > 80',
    description: 'Google Lighthouse performance score is above 80',
    importance: 'recommended',
    resources: ['https://pagespeed.web.dev/']
  },

  // User Experience
  {
    id: 'ux-loading-states',
    category: 'User Experience',
    title: 'Loading States',
    description: 'All async operations show loading indicators',
    importance: 'important',
  },
  {
    id: 'ux-responsive',
    category: 'User Experience',
    title: 'Responsive Design',
    description: 'Application works perfectly on mobile, tablet, and desktop',
    importance: 'critical',
  },
  {
    id: 'ux-accessibility',
    category: 'User Experience',
    title: 'Accessibility Basics',
    description: 'Proper semantic HTML, ARIA labels, keyboard navigation',
    importance: 'important',
  },
  {
    id: 'ux-offline',
    category: 'User Experience',
    title: 'Offline Handling',
    description: 'App shows appropriate message when offline',
    importance: 'recommended',
  },

  // SEO & Meta
  {
    id: 'seo-meta-tags',
    category: 'SEO',
    title: 'Meta Tags',
    description: 'Proper title, description, and Open Graph tags on all pages',
    importance: 'important',
  },
  {
    id: 'seo-sitemap',
    category: 'SEO',
    title: 'Sitemap',
    description: 'XML sitemap is generated and submitted to search engines',
    importance: 'recommended',
  },
  {
    id: 'seo-robots',
    category: 'SEO',
    title: 'Robots.txt',
    description: 'robots.txt file properly configured',
    importance: 'recommended',
  },

  // Documentation
  {
    id: 'docs-readme',
    category: 'Documentation',
    title: 'Professional README',
    description: 'README includes: project description, setup instructions, features, tech stack',
    importance: 'important',
  },
  {
    id: 'docs-code-comments',
    category: 'Documentation',
    title: 'Code Comments',
    description: 'Complex logic is documented with clear comments',
    importance: 'recommended',
  },
  {
    id: 'docs-api',
    category: 'Documentation',
    title: 'API Documentation',
    description: 'If applicable, API endpoints are documented',
    importance: 'recommended',
  },

  // Deployment
  {
    id: 'deploy-custom-domain',
    category: 'Deployment',
    title: 'Custom Domain',
    description: 'Application is deployed on a custom domain (not subdomain.vercel.app)',
    importance: 'recommended',
  },
  {
    id: 'deploy-monitoring',
    category: 'Deployment',
    title: 'Uptime Monitoring',
    description: 'Service to monitor application uptime (UptimeRobot, etc.)',
    importance: 'recommended',
  },
  {
    id: 'deploy-analytics',
    category: 'Deployment',
    title: 'Analytics Tracking',
    description: 'Google Analytics, Plausible, or similar tracking implemented',
    importance: 'recommended',
  },

  // Code Quality
  {
    id: 'code-linting',
    category: 'Code Quality',
    title: 'Linting Configured',
    description: 'ESLint is configured and all files pass without errors',
    importance: 'important',
  },
  {
    id: 'code-typescript',
    category: 'Code Quality',
    title: 'TypeScript Strict Mode',
    description: 'TypeScript is used with strict mode enabled',
    importance: 'important',
  },
  {
    id: 'code-structure',
    category: 'Code Quality',
    title: 'Clean Code Structure',
    description: 'Files are organized logically, components are properly separated',
    importance: 'important',
  },
  {
    id: 'code-git-history',
    category: 'Code Quality',
    title: 'Clean Git History',
    description: 'Commit messages are descriptive, no sensitive data in history',
    importance: 'recommended',
  },
]

export const checklistCategories = [
  'Security',
  'Authentication',
  'Error Handling',
  'Performance',
  'User Experience',
  'SEO',
  'Documentation',
  'Deployment',
  'Code Quality',
]
