// PWA utilities for installation and updates
import { logger } from '@/lib/logger'
import type { NavigatorWithStandalone } from '@/lib/types/common'

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null

/**
 * Initialize PWA features
 */
export function initializePWA() {
  if (typeof window === 'undefined') return

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // New version available
                  if (confirm('New version available! Reload to update?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          logger.error('PWA', 'Service Worker registration failed', { error })
        })
    })
  }

  // Capture install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent

    // Dispatch custom event so components can listen
    window.dispatchEvent(new Event('pwa-install-available'))
  })

  // App installed
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
  })
}

/**
 * Show install prompt
 */
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    return false
  }

  deferredPrompt.prompt()

  const { outcome } = await deferredPrompt.userChoice
  deferredPrompt = null

  return outcome === 'accepted'
}

/**
 * Check if app is installed
 */
export function isAppInstalled(): boolean {
  if (typeof window === 'undefined') return false

  // Check if running in standalone mode
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true ||
    document.referrer.includes('android-app://')
  )
}

/**
 * Check if install is available
 */
export function isInstallAvailable(): boolean {
  return deferredPrompt !== null
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: {
  title?: string
  text?: string
  url?: string
}): Promise<boolean> {
  if (!navigator.share) {
    return false
  }

  try {
    await navigator.share(data)
    return true
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      logger.error('PWA', 'Share failed', { error })
    }
    return false
  }
}

/**
 * Add to home screen hint
 */
export function getInstallInstructions(): string | null {
  const ua = navigator.userAgent.toLowerCase()
  const isIos = /iphone|ipad|ipod/.test(ua)
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua)

  if (isIos && isSafari) {
    return 'Tap the Share button, then "Add to Home Screen"'
  }

  if (isInstallAvailable()) {
    return 'Click the install button to add to your home screen'
  }

  return null
}
