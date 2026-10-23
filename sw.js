/* bdfsun service worker
 * Bump VERSION on every deploy that changes cached files; old caches are
 * deleted on activate.
 *
 * Strategies:
 *  - Page navigations: network first, cached per path; offline, fall back to that path's
 *    copy or the '/bdfsun-preview/' shell (nav.js then shows the screen for location.pathname).
 *  - Same-origin CSS/JS: stale-while-revalidate (fast, refreshes in the background).
 *  - Same-origin images: cache first, capped at MAX_IMAGES entries.
 *  - Google Fonts: stale-while-revalidate.
 *  - /api/*, non-GET, and everything else cross-origin (YouTube, reCAPTCHA): not touched.
 */
const VERSION = 'v8-2026-10-22';
const PREFIX = 'bdfsun-';
const SHELL_CACHE = `${PREFIX}shell-${VERSION}`;
const IMAGE_CACHE = `${PREFIX}img-${VERSION}`;
const FONT_CACHE = `${PREFIX}fonts-${VERSION}`;
const MAX_IMAGES = 150;

const SHELL = [
  '/bdfsun-preview/',
  '/bdfsun-preview/manifest.webmanifest',
  '/bdfsun-preview/static/css/style.css',
  '/bdfsun-preview/static/css/medias.css',
  '/bdfsun-preview/static/css/mobile.css',
  '/bdfsun-preview/static/css/desktop.css',
  '/bdfsun-preview/static/js/main.js',
  '/bdfsun-preview/static/js/welcome_script.js',
  '/bdfsun-preview/static/js/cycle.js',
  '/bdfsun-preview/static/js/welcomeEventListeners.js',
  '/bdfsun-preview/static/js/globalEventListeners.js',
  '/bdfsun-preview/static/js/updates_to_javascript.js',
  '/bdfsun-preview/static/js/on_scroll.js',
  '/bdfsun-preview/static/js/our_story_slider.js',
  '/bdfsun-preview/static/js/vs_gallery_script.js',
  '/bdfsun-preview/static/js/upload_photo.js',
  '/bdfsun-preview/static/js/map_cycle.js',
  '/bdfsun-preview/static/js/os_lightbox.js',
  '/bdfsun-preview/static/js/blurAll.js',
  '/bdfsun-preview/static/js/keyboard.js',
  '/bdfsun-preview/static/js/youtube.js',
  '/bdfsun-preview/static/js/shell.js',
  '/bdfsun-preview/static/js/nav.js',
  '/bdfsun-preview/static/js/panel.js',
  '/bdfsun-preview/static/css/panel.css',
  '/bdfsun-preview/static/img/apple-touch-icon.png',
  '/bdfsun-preview/static/img/icons/icon-192.png',
  '/bdfsun-preview/static/img/main_imgs/Header-Identity2x.jpg',
  '/bdfsun-preview/static/img/main_imgs/ScrollHeaderIdentity2x.jpg',
  '/bdfsun-preview/static/img/main_imgs/Background_Image2x.jpg',
  '/bdfsun-preview/static/img/main_imgs/Sunflower Icon2x.png',
  '/bdfsun-preview/static/img/main_imgs/Tractor Icon2x.png',
  '/bdfsun-preview/static/img/main_imgs/Insects2x.png',
  '/bdfsun-preview/static/img/main_imgs/Education Icon2x.png',
  '/bdfsun-preview/static/img/main_imgs/Sunflower CTA2x.png',
  '/bdfsun-preview/static/img/main_imgs/Back Button2x.png',
  '/bdfsun-preview/static/img/main_imgs/BDFSFestival Logo2x.jpg',
  '/bdfsun-preview/static/img/New Map/Full-Map-22.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      // cache:'reload' bypasses the HTTP cache so a new VERSION gets fresh files
      .then((cache) => cache.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const keep = new Set([SHELL_CACHE, IMAGE_CACHE, FONT_CACHE]);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Never store a response whose type doesn't match what was asked for
// (error pages, HTML answered for a missing asset, ...).
function isGood(response, kind) {
  if (kind === 'font' && response && response.type === 'opaque') return true; // Google Fonts CSS (no-cors)
  if (!response || !response.ok || response.type === 'opaque') return false;
  const ct = response.headers.get('content-type') || '';
  if (kind === 'image') return ct.startsWith('image/');
  if (kind === 'style') return ct.includes('css');
  if (kind === 'script') return ct.includes('javascript');
  return true;
}

async function trimCache(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function networkFirstPage(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    // only real app pages (2xx HTML, not redirects or 404s) are kept, each under its own path
    if (isGood(response) && !response.redirected && (response.headers.get('content-type') || '').includes('text/html')) {
      cache.put(new URL(request.url).pathname, response.clone());
    }
    return response;
  } catch (err) {
    return (await cache.match(new URL(request.url).pathname)) || (await cache.match('/bdfsun-preview/')) ||
      new Response('<!doctype html><meta charset="utf-8"><title>Offline</title><p style="font-family:sans-serif;text-align:center;margin-top:30vh">You are offline. Please reconnect and try again.</p>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}

async function staleWhileRevalidate(request, cacheName, kind) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => { if (isGood(response, kind)) cache.put(request, response.clone()); return response; })
    .catch(() => undefined);
  return cached || (await network) || Response.error();
}

async function cacheFirstImage(request) {
  const shell = await caches.match(request);
  if (shell) return shell;
  const cache = await caches.open(IMAGE_CACHE);
  try {
    const response = await fetch(request);
    if (isGood(response, 'image')) {
      cache.put(request, response.clone()).then(() => trimCache(IMAGE_CACHE, MAX_IMAGES));
    }
    return response;
  } catch (err) {
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (/^\/(api|admin|accounts|login|logout|gallery|uploadFlower)(\/|$)/.test(url.pathname)) return;
    if (request.mode === 'navigate') return event.respondWith(networkFirstPage(request));
    if (request.destination === 'style' || request.destination === 'script' || url.pathname === '/bdfsun-preview/manifest.webmanifest') {
      return event.respondWith(staleWhileRevalidate(request, SHELL_CACHE, request.destination));
    }
    if (request.destination === 'image') return event.respondWith(cacheFirstImage(request));
    return; // video ranges etc.: let the browser handle them
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE, 'font'));
  }
});
