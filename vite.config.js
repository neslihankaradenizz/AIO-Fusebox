import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base:'/AIO-Fusebox/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AIO-FuseBox Vision',
        short_name: 'AIOFuseBox',
        description: 'AIO-Fusebox Vision',
        theme_color: '#0d0d0f',
        background_color: '#0d0d0f',
        display: 'standalone', 
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json}'],
        maximumFileSizeToCacheInBytes: 150 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/aoi-fusebox1\.neslihan-krdnz53\.workers\.dev\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'r2-heavy-assets',
              expiration: {
                maxEntries: 15,
                maxAgeSeconds: 60 * 60 * 24 * 90,
              },
            },
          },
        ],
      },
    }),
  ],
})
