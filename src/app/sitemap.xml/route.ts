import { NextResponse } from 'next/server'

/**
 * Dynamic Sitemap Generator for Ludwitt
 *
 * This sitemap helps AI agents and search engines discover
 * all public pages on the Ludwitt adaptive learning platform.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const staticPages: SitemapEntry[] = [
  // Core Pages
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/login',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/alc',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },

  // Basics Learning Features
  {
    url: '/basics',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    url: '/basics/leaderboard',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.6,
  },
  {
    url: '/basics/achievements',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    url: '/basics/cohorts',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    url: '/basics/study-rooms',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6,
  },

  // Legal Pages
  {
    url: '/legal/privacy-policy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3,
  },
  {
    url: '/legal/terms-of-service',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3,
  },
  {
    url: '/legal/cookie-policy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.2,
  },
  {
    url: '/legal/data-policy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.2,
  },
  {
    url: '/legal/student-privacy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.2,
  },
  {
    url: '/legal/acceptable-use',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.2,
  },

  // AI Discovery Files
  {
    url: '/llms.txt',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    url: '/llms-full.txt',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    url: '/context.md',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.65,
  },
  {
    url: '/.well-known/security.txt',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3,
  },
]

export async function GET() {
  const sitemap = generateSitemap(staticPages)

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function generateSitemap(pages: SitemapEntry[]): string {
  const urlEntries = pages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urlEntries}
</urlset>`
}
