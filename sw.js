self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'Default push message body',
    icon: 'bg-image.jpg',
    badge: 'path/to/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Default Title', options)
  );
});