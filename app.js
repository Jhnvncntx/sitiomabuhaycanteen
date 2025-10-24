// app.js
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      return Notification.requestPermission();
    })
    .then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Subscribe to push notifications
        return navigator.serviceWorker.ready;
      } else {
        console.log('Notification permission denied.');
      }
    })
    .then(async (registration) => {
      if (!registration) return;

      const existingSubscription = await registration.pushManager.getSubscription();
      if (!existingSubscription) {
        const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: '<YOUR_VAPID_PUBLIC_KEY>'
        });

        // Send subscription to backend
        await fetch('https://mshssm-canteen.onrender.com/api/subscribe', {
          method: 'POST',
          body: JSON.stringify(newSubscription),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Push subscription sent to server.');
      } else {
        console.log('Already subscribed to push notifications.');
      }
    })
    .catch(error => console.error('Service Worker registration failed:', error));
}
