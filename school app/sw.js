self.addEventListener('install', event => {
    console.log('SW installed');
});

self.addEventListener('fetch', event => {
    // Basic offline fallback (optional)
});
