// Service Worker for Ludwitt PWA

const CACHE_VERSION = '4.6.0'
const CACHE_NAME = `ludwitt-v${CACHE_VERSION}`
const STATIC_CACHE = `static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`
const IMAGE_CACHE = `images-${CACHE_VERSION}`
const OFFLINE_URL = '/offline'

// Cache size limits
const CACHE_LIMITS = {
  [DYNAMIC_CACHE]: 50,
  [IMAGE_CACHE]: 60,
}

// Assets to cache immediately
const PRECACHE_ASSETS = ['/', '/dashboard', '/offline', '/manifest.json']

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
}

// Route strategies
const ROUTE_CACHE_STRATEGY = {
  '/api/': CACHE_STRATEGIES.NETWORK_FIRST,
  '/_next/static/': CACHE_STRATEGIES.CACHE_FIRST,
  '/_next/image': CACHE_STRATEGIES.CACHE_FIRST,
  '/images/': CACHE_STRATEGIES.CACHE_FIRST,
  '/icons/': CACHE_STRATEGIES.CACHE_FIRST,
}

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE]

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => {
            console.log('Deleting old cache:', name)
            return caches.delete(name)
          })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache with strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip chrome extension requests
  if (event.request.url.startsWith('chrome-extension://')) return

  // Skip Firebase requests (need fresh data)
  if (
    event.request.url.includes('firebaseio.com') ||
    event.request.url.includes('googleapis.com') ||
    event.request.url.includes('firestore.googleapis.com')
  ) {
    return
  }

  // Determine caching strategy
  const strategy = getStrategyForRequest(event.request)
  const cacheName = getCacheNameForRequest(event.request)

  event.respondWith(handleRequest(event.request, strategy, cacheName))
})

// Get caching strategy for request
function getStrategyForRequest(request) {
  const url = new URL(request.url)

  for (const [route, strategy] of Object.entries(ROUTE_CACHE_STRATEGY)) {
    if (url.pathname.startsWith(route)) {
      return strategy
    }
  }

  // Default to stale-while-revalidate
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE
}

// Get cache name for request
function getCacheNameForRequest(request) {
  const url = new URL(request.url)

  if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    return IMAGE_CACHE
  }

  if (url.pathname.startsWith('/_next/static/')) {
    return STATIC_CACHE
  }

  return DYNAMIC_CACHE
}

// Handle request with strategy
async function handleRequest(request, strategy, cacheName) {
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName)

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName)

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
    default:
      return staleWhileRevalidate(request, cacheName)
  }
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response && response.status === 200) {
      await cacheResponse(request, response.clone(), cacheName)
    }
    return response
  } catch (error) {
    return caches.match(OFFLINE_URL)
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response && response.status === 200) {
      await cacheResponse(request, response.clone(), cacheName)
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    return cached || caches.match(OFFLINE_URL)
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request)

  // Start fetching fresh data
  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response && response.status === 200) {
        await cacheResponse(request, response.clone(), cacheName)
      }
      return response
    })
    .catch(() => null)

  // Return cached response immediately, or wait for network
  return cached || fetchPromise || caches.match(OFFLINE_URL)
}

// Cache response with size limit
async function cacheResponse(request, response, cacheName) {
  const cache = await caches.open(cacheName)
  await cache.put(request, response)

  // Enforce cache size limits
  if (CACHE_LIMITS[cacheName]) {
    await trimCache(cacheName, CACHE_LIMITS[cacheName])
  }
}

// Trim cache to size limit
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()

  if (keys.length > maxItems) {
    // Remove oldest entries
    const toDelete = keys.slice(0, keys.length - maxItems)
    await Promise.all(toDelete.map((key) => cache.delete(key)))
  }
}

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  // Sync any pending data when back online
  console.log('Syncing data...')
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}

  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Close' },
    ],
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Ludwitt', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data))
  }
})
