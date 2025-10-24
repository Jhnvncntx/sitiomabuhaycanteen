document.addEventListener('DOMContentLoaded', () => {

    //##### PTOGGLE #####
    const customerPassword = document.getElementById('customerPassword');
    const ptoggle = document.getElementById('ptoggle');
    const submitButton = document.getElementById('submitButton');

    if (ptoggle && customerPassword) {
        ptoggle.onclick = function () {
            if (customerPassword.type === "password") {
                customerPassword.type = "text";
            } else {
                customerPassword.type = "password";
            }
        };
    }

    //##### SERVICE WORKER REGISTRATION #####
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    } else {
        console.warn('Service Worker not supported in this browser.');
    }

    //##### CUSTOMER LOGIN #####
    const customerForm = document.getElementById('customerLoginForm');
    if (customerForm) {
        customerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const loadingDisplay = document.getElementById("loading");
            loadingDisplay?.classList.remove("hidden");

            const lrn = document.getElementById('customerLRN').value.trim();
            const password = document.getElementById('customerPassword').value.trim();
            const messageDiv = document.getElementById('customerMessage');

            messageDiv.textContent = '';

            if (!lrn || !password) {
                messageDiv.textContent = 'Please fill in all fields.';
                loadingDisplay?.classList.add("hidden");
                return;
            }

            try {
                let subscription = null;

                // Request notification permission and create push subscription
                if ('serviceWorker' in navigator && 'PushManager' in window) {
                    const permission = await Notification.requestPermission();

                    if (permission === 'granted') {
                        console.log('Notification permission granted.');
                        const registration = await navigator.serviceWorker.ready;
