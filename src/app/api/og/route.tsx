/**
 * Dynamic OG Image Generator
 * 
 * Generates dynamic Open Graph images for social sharing.
 * Uses Next.js ImageResponse API for server-side image generation.
 * 
 * Usage: /api/og?title=Your+Title&subtitle=Your+Subtitle
 * 
 * Query Parameters:
 * - title: Main title text (required)
 * - subtitle: Subtitle text (optional)
 * - type: 'default' | 'about' | 'research' | 'pricing' (optional)
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { apiLogger } from '@/lib/logger'

const BRAND_COLORS = {
  primary: '#d64933', // Ludwitt red/coral
  dark: '#0a0a0a',
  light: '#faf8f5',
  accent: '#4a7c59', // Green accent
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || 'Ludwitt'
    const subtitle = searchParams.get('subtitle') || 'AI-Powered Adaptive Learning'
    const type = searchParams.get('type') || 'default'
    
    // Type-specific configurations
    const typeConfigs = {
      default: {
        gradient: `linear-gradient(135deg, ${BRAND_COLORS.light} 0%, #f5f0eb 100%)`,
        accentColor: BRAND_COLORS.primary,
      },
      about: {
        gradient: `linear-gradient(135deg, #fef2f0 0%, ${BRAND_COLORS.light} 100%)`,
        accentColor: BRAND_COLORS.primary,
      },
      research: {
        gradient: `linear-gradient(135deg, #f0f7f2 0%, ${BRAND_COLORS.light} 100%)`,
        accentColor: BRAND_COLORS.accent,
      },
      pricing: {
        gradient: `linear-gradient(135deg, ${BRAND_COLORS.light} 0%, #fff5f3 100%)`,
        accentColor: BRAND_COLORS.primary,
      },
    }
    
    const config = typeConfigs[type as keyof typeof typeConfigs] || typeConfigs.default

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            background: config.gradient,
            padding: '60px 80px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `${config.accentColor}10`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `${BRAND_COLORS.dark}05`,
            }}
          />
          
          {/* Logo and brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 'auto',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: config.accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: 'white',
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: BRAND_COLORS.dark,
              }}
            >
              Ludwitt
            </span>
          </div>
          
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: '85%',
            }}
          >
            <h1
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: BRAND_COLORS.dark,
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: -2,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: 32,
                  color: '#6b6b6b',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Bottom accent bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              background: config.accentColor,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    apiLogger.apiError('api/og', 'OG Image generation error', error)
    
    // Return a simple fallback
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: BRAND_COLORS.light,
            fontSize: 64,
            fontWeight: 700,
            color: BRAND_COLORS.dark,
          }}
        >
          Ludwitt
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
