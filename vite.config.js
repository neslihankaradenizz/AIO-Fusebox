import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,json}'],
        maximumFileSizeToCacheInBytes: 150 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fusebox-assets\..*\.workers\.dev\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'r2-heavy-assets',
              expiration: {
                maxEntries: 15,
                maxAgeSeconds: 60 * 60 * 24 * 90, // 90 gün
              },
            },
          },
        ],
      },
    }),
  ],
})