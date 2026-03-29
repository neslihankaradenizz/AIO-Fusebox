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
    rollupOptions: {
      external: ['onnxruntime-web'],
    },
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
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
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,

        globPatterns: [
          '**/*.{js,css,html,json,wasm}'
        ],

        globIgnores: [],

        runtimeCaching: [
          {
            urlPattern: /pub-ab85a7c2842c4b06ad93b8956e41e3ba\.r2\.dev\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'r2-assets',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*\.onnx$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'models',
              expiration: {
                maxEntries: 2,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
})