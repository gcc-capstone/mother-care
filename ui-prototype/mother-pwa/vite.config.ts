import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Cache only the built frontend shell and local assets, never application data.
function offlineShell(): Plugin {
  return {
    name: 'mothercare-offline-shell',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const files = ['/index.html', '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png', ...Object.keys(bundle).filter(name => name !== 'index.html').map(name => `/${name}`)]
      const version = Object.keys(bundle).filter(name => name.endsWith('.js')).join('-')
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: `
const CACHE = ${JSON.stringify(`mothercare-shell-${version}`)};
const FILES = ${JSON.stringify(files)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('mothercare-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')));
  } else if (FILES.includes(url.pathname)) {
    // Preview servers may vary static responses by Origin; these files are same-origin.
    event.respondWith(caches.open(CACHE).then(cache => cache.match(url.pathname, { ignoreVary: true })).then(cached => cached || fetch(event.request)));
  }
});
` })
    },
  }
}
export default defineConfig({
  plugins: [react(), tailwindcss(), offlineShell()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
})
