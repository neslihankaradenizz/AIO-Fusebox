import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa' //sw.js dosyasini yazmaya gerek yok  otomatik guncelliyor

export default defineConfig({
  base:'/AIO-Fusebox/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AIO-FuseBox Vision',
        short_name: 'AIO-FuseBox Vision',
        description: 'AIO-Fusebox Vision',
        theme_color: '#0d0d0f',
        background_color: '#0d0d0f',
        display: 'standalone', 
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
        
          },
          {
            src: 'icons/icon-512.png',   
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }

        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json}'],
        maximumFileSizeToCacheInBytes: 150 * 1024 * 1024,
        
        // ✅ Bu pattern'e uyan URL'leri SW hiç işleme almaz
        ignoreURLParametersMatching: [],
        
        runtimeCaching: [
          {
            // .onnx ve model dosyaları — normal cache
            urlPattern: /^https:\/\/aoi-fusebox1\.neslihan-krdnz53\.workers\.dev\/(?!ort).*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'r2-heavy-assets',
              fetchOptions: { mode: 'cors' },
              expiration: {
                maxEntries: 15,
                maxAgeSeconds: 60 * 60 * 24 * 90,
              },
            },
          },
          {
            urlPattern: /^https:\/\/aoi-fusebox1\.neslihan-krdnz53\.workers\.dev\/ort.*$/i,
            handler: 'NetworkOnly',  // cache'e almaz, direkt geçer
            options: {
              fetchOptions: { mode: 'cors' },
            },
          },
        ],
      },
    }),
  ],
})
