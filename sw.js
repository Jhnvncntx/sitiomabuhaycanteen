// sw.js
self.addEventListener('install', event => {
  console.log('Service Worker installed.');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
});

self.addEventListener('push', event => {
  console.log('Push received:', event.data ? event.data.text() : '(no data)');
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'New Order Update';
  const options = {
    body: data.body || 'Your order status has been updated.',
    icon: '/icon.png',
    badge: '/badge.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
