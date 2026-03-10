/** @type {import('next').NextConfig} */

// =============================================================================
// Content Security Policy
// =============================================================================
// CSP configuration for XSS prevention
// Note: 'unsafe-inline' and 'unsafe-eval' needed for Next.js hydration
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://js.stripe.com https://static.ads-twitter.com https://*.firebaseapp.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://*.googleusercontent.com https://avatars.githubusercontent.com https://firebasestorage.googleapis.com https://*.stripe.com https://t.co https://analytics.twitter.com;
  connect-src 'self' https://*.firebase.io https://*.firebaseio.com https://*.googleapis.com https://api.anthropic.com https://api.stripe.com https://*.upstash.io wss://*.firebaseio.com wss://*.daily.co https://*.daily.co https://relay.walletconnect.com wss://relay.walletconnect.com;
  frame-src 'self' https://js.stripe.com https://*.firebaseapp.com https://*.daily.co;
  worker-src 'self' blob:;
  media-src 'self' blob: https://firebasestorage.googleapis.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim()

// =============================================================================
// Security Headers
// =============================================================================
const securityHeaders = [
  // Content Security Policy - Primary XSS defense
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // DNS Prefetching - improves performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // HSTS - force HTTPS for 2 years
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking (redundant with CSP frame-ancestors but good for older browsers)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable unnecessary browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // XSS Protection (legacy but still useful for older browsers)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Cross-Origin policies for enhanced isolation
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
]

const nextConfig = {
  reactStrictMode: true,

  // Transpile ESM-only packages so Jest (via next/jest) can process them
  transpilePackages: ['jose', 'jwks-rsa'],

  // Standalone output for Docker deployments (Vercel ignores this)
  output: 'standalone',

  // Skip TypeScript checking during build (handled by CI)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Turbopack is default in Next.js 16 — empty config silences webpack-only warning
  turbopack: {},

  // Memory optimization for large codebases
  experimental: {
    webpackMemoryOptimizations: true,
  },

  // Exclude Firebase Functions from Next.js compilation
  // Also handle optional Web3 dependencies that may not be installed
  webpack: (config, { isServer }) => {
    // Ignore the functions folder - it's compiled separately by Firebase
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /functions\/.*/,
    }

    // Handle optional Web3/Wagmi connector dependencies
    // These are peer dependencies that wagmi/web3modal try to import
    // but are not required for basic wallet functionality
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@base-org/account': false,
      '@gemini-wallet/core': false,
      '@metamask/sdk': false,
      porto: false,
      'porto/internal': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
      'pino-pretty': false,
    }

    return config
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },

  // Apply security headers to all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // Recommended: disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig
