// sw.js

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Activate immediately after install
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
  event.waitUntil(clients.claim()); // Take control of open pages
});

// Handle push notifications
self.addEventListener('push', event => {
  console.log('Push received:', event.data ? event.data.text() : '(no data)');

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    console.error('Error parsing push data:', err);
  }

  const title = data.title || 'New Order Update';
  const options = {
    body: data.body || 'Your order status has been updated.',
    icon: './icon.png',   // use relative path for Netlify
    badge: './badge.png', // same reason
    data: {
      url: data.url || 'https://sitiomabuhaycanteen.netlify.app/order.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle click on notification
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || 'https://sitiomabuhaycanteen.netlify.app';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Focus if already open
      for (const client of windowClients) {
        if (client.url.includes('sitiomabuhaycanteen.netlify.app') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
