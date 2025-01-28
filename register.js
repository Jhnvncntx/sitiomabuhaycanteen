//##### PTOGGLE #####
const password = document.getElementById('password');
const ptoggle = document.getElementById('ptoggle');
const submitButton = document.getElementById('submitButton');

ptoggle.onclick = function(){
    if(password.type == "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}

//##### PROMPTS #####
const loadingDisplay = document.getElementById("loading");
const promptDisplay = document.getElementById("prompt");
const promptText = document.getElementById('promptText');
const orderID = document.getElementById('orderID');

//##### FUNCTION TO CLOSE PROMPT #####
document.getElementById('promptButton').addEventListener('click', () => {
    promptDisplay.classList.add("hidePrompt");
    window.location.href = 'register.html'
});

//FUNCTION TO REGISTER USER
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loading indicator
    loadingDisplay.classList.remove("hidden");

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const lrn = document.getElementById('lrn').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://mshssm-canteen.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, lrn, password })
        });

        const result = await response.text();
        document.getElementById('loading').style.display = 'none';

        if (response.ok) {
            document.getElementById('registerForm').reset();
            loadingDisplay.classList.add("hidden");
            promptDisplay.classList.remove("hidePrompt");
            promptText.innerText = `Registration successful! You may now proceed to the login page.`
        } else {        
            loadingDisplay.classList.add("hidden");
            promptDisplay.classList.remove("hidePrompt");
            promptText.innerText = result;
        }
    } catch (error) {
        loadingDisplay.classList.add("hidden");
        promptDisplay.classList.remove("hidePrompt");
        promptText.innerText = error.message;
    }
});
