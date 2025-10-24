// login.js

// Customer Login
document.getElementById('customerLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const mobileNumber = document.getElementById('customerMobile').value;
    const password = document.getElementById('customerPassword').value;

    try {
        const response = await fetch('https://mshssm-canteen.onrender.com/api/customers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store JWT token
            localStorage.setItem('token', data.token);

            // Try registering service worker and push subscription
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                console.log('Service Worker installing...');
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered with scope:', registration.scope);

                // Explicitly request notification permission
                let permission = Notification.permission;
                if (permission === 'default') {
                    permission = await Notification.requestPermission();
                }

                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            'BGym_JA2SQCChHM3O2d8h9R0pRc7esVgRUCKMqn5a3z6-4wEIAZjW8OE3myYAEBSe71beL86awdFBI5BktH8U5c'
                        )
                    });

                    // Send subscription to backend
                    await fetch('https://mshssm-canteen.onrender.com/api/customers/subscribe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${data.token}`
                        },
                        body: JSON.stringify(subscription)
                    });

                    console.log('Push subscription registered successfully.');
                } else {
                    console.warn('Notifications not granted by user.');
                }
            }

            // Redirect to order page
            window.location.href = 'order.html';
        } else {
            alert(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Helper: convert VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

