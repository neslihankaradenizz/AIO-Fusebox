import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: '.',

  server: {
    host: true,
    port: 5173,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },

  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },

  build: {
    target: 'esnext',
    outDir: 'dist',
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'model.onnx',
        'valid.json',
        'icons/icon-192.png'
      ],

      manifest: {
        name: 'Fusebox Detector',
        short_name: 'Fusebox',
        description: 'Sigorta kutusu tespit ve doğrulama',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1a2e',
        theme_color: '#1a1a2e',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-shell',
            },
          },
          {
            urlPattern: /.*\.onnx/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'models',
              expiration: {
                maxEntries: 2,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /.*\.json/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'data',
            },
          },
        ],
      },
    }),
  ],
})