self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
  return self.clients.claim();
});

// Push Notification Event
self.addEventListener('push', event => {
  if (event.data) {
      const notificationData = event.data.json();
      self.registration.showNotification(notificationData.title, {
          body: notificationData.body,
          icon: 'bg-image.jpg',  // Update with actual icon path
          badge: '/icons/badge-icon.png',       // Update with actual badge path
          vibrate: [200, 100, 200],             // Vibration pattern
          data: { url: notificationData.url }   // Handle click actions
      });
  }
});

// Notification Click Event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.notification.data && event.notification.data.url) {
      event.waitUntil(
          clients.openWindow(event.notification.data.url)
      );
  }
});