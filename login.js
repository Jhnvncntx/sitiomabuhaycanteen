//##### PTOGGLE #####
const customerPassword = document.getElementById('customerPassword');
const ptoggle = document.getElementById('ptoggle');
const submitButton = document.getElementById('submitButton');

ptoggle.onclick = function(){
    if(customerPassword.type === "password"){
        customerPassword.type = "text";
    } else {
        customerPassword.type = "password";
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js') // Ensure correct path
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
} else {
    console.warn('Service Worker not supported in this browser.');
}

// Customer Login
document.getElementById('customerLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show the loading display
    const loadingDisplay = document.getElementById("loading");
    loadingDisplay.classList.remove("hidden");    

    const lrn = document.getElementById('customerLRN').value.trim();
    const password = document.getElementById('customerPassword').value.trim();
    const messageDiv = document.getElementById('customerMessage');

    // Clear previous messages
    messageDiv.textContent = '';

    // Simple validation
    if (!lrn || !password) {
        messageDiv.textContent = 'Please fill in all fields.';
        loadingDisplay.classList.add("hidden");
        return;
    }

    try {
        let subscription = null;

        // Check if push notifications are supported
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.ready;

            // Ask for permission first — ensures Chrome prompts the user
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                try {
                    subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: 'BGym_JA2SQCChHM3O2d8h9R0pRc7esVgRUCKMqn5a3z6-4wEIAZjW8OE3myYAEBSe71beL86awdFBI5BktH8U5c'
                    });
                } catch (subError) {
                    console.warn('Push subscription failed:', subError);
                }
            } else if (permission === 'denied') {
                console.warn('User denied notifications.');
            } else {
                console.log('Notification permission dismissed.');
            }
        }

        const response = await fetch('https://mshssm-canteen.onrender.com/api/login/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lrn, password, subscription })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Customer Login successful:', result);
            
            // Store token and user info
            localStorage.setItem('token', result.token);
            localStorage.setItem('firstName', result.firstName);
            localStorage.setItem('lastName', result.lastName);

            // Redirect to order page
            window.location.href = 'order.html';
        } else {
            messageDiv.textContent = 'Error: ' + result.error;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
    } finally {
        loadingDisplay.classList.add("hidden");
    }
});

// Staff Login
document.getElementById('staffLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show the loading display
    const loadingDisplay = document.getElementById("loading");
    loadingDisplay.classList.remove("hidden");      

    const mobileNumber = document.getElementById('staffMobileNumber').value.trim();
    const password = document.getElementById('staffPassword').value.trim();
    const messageDiv = document.getElementById('staffMessage');

    // Clear previous messages
    messageDiv.textContent = '';

    // Simple validation
    if (!mobileNumber || !password) {
        messageDiv.textContent = 'Please fill in all fields.';
        loadingDisplay.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch('https://mshssm-canteen.onrender.com/api/login/staff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber, password })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Staff Login successful:', result);
            messageDiv.textContent = 'Login successful!';
            
            // Store token and user info
            localStorage.setItem('token', result.token);
            localStorage.setItem('firstName', result.firstName);
            localStorage.setItem('lastName', result.lastName);

            // Redirect to staff page
            window.location.href = 'staff.html';
        } else {
            messageDiv.textContent = 'Error: ' + result.error;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
    } finally {
        loadingDisplay.classList.add("hidden");
    }
});
