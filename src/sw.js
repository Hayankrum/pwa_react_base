/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler } from 'workbox-routing'
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate
} from 'workbox-strategies'

clientsClaim()

// ===============================
// 🔥 PRECACHE (arquivos do build)
// ===============================
precacheAndRoute(self.__WB_MANIFEST)


// ===============================
// ⚡ ATIVA IMEDIATAMENTE
// ===============================
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await clients.claim()

      const cacheWhitelist = [
        'pages-cache',
        'images-cache',
        'static-resources',
        'api-cache'
      ]

      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key)
          }
        })
      )

      console.log('[SW] Ativo e caches válidos mantidos')
    })()
  )
})


// ===============================
// 🌐 PÁGINAS (APP SHELL)
// ===============================
const networkFirst = new NetworkFirst({
  cacheName: 'pages-cache',
  networkTimeoutSeconds: 3
})

registerRoute(
  ({ request }) => request.mode === 'navigate',
  (args) => networkFirst.handle(args)
)


// ===============================
// 📦 JS, CSS, MANIFEST
// ===============================
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'manifest',

  new CacheFirst({
    cacheName: 'static-resources'
  })
)


// ===============================
// 🖼️ IMAGENS
// ===============================
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache'
  })
)


// ===============================
// 🌐 API (pra quando usar depois)
// ===============================
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache'
  })
)


// ===============================
// 🚨 FALLBACK GLOBAL (CRÍTICO)
// ===============================
setCatchHandler(async ({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/pwa_react_base/index.html')
  }

  // Para recursos estáticos (JS, CSS), tentar buscar da rede primeiro
  if (event.request.destination === 'script' || event.request.destination === 'style') {
    try {
      return await fetch(event.request)
    } catch (error) {
      console.warn('[SW] Failed to fetch resource, trying cache:', event.request.url)
      return caches.match(event.request)
    }
  }

  return Response.error()
})