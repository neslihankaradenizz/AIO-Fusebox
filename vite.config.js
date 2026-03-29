workbox: {
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB

  globIgnores: [
    '**/*.wasm',  // büyük WASM dosyalarını precache'den çıkar
  ],

  runtimeCaching: [
    // WASM dosyalarını runtime'da cache'le
    {
      urlPattern: /.*\.wasm/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'wasm-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
    {
      urlPattern: ({ request }) =>
        request.destination === 'document' ||
        request.destination === 'script' ||
        request.destination === 'style',
      handler: 'NetworkFirst',
      options: { cacheName: 'app-shell' },
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
      options: { cacheName: 'data' },
    },
  ],
},