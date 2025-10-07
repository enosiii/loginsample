// Import the configuration (the password) from the generated file
import { CONFIG } from './config.js'; 

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the password from the imported config
    const CORRECT_PASSWORD = CONFIG.PASSWORD; 
    
    const EXPIRATION_HOURS = 24; // 24 hours
    const AUTH_KEY = 'isAuthenticatedUntil';
    
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Initial check: If already logged in, redirect to index.html
    checkAndRedirectToIndex();

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (passwordInput.value === CORRECT_PASSWORD) {
            // Success: Set the expiration time (current time + 24 hours)
            const expirationTime = new Date().getTime() + (EXPIRATION_HOURS * 60 * 60 * 1000);
            //const expirationTime = new Date().getTime() + (EXPIRATION_HOURS * 1000); // testing 10 seconds: 10 * 1000
            localStorage.setItem(AUTH_KEY, expirationTime);
            
            // Redirect to the main page
            window.location.href = 'index.html';
        } else {
            // Failure: Show error message
            errorMessage.textContent = 'Invalid Password. Please try again.';
            errorMessage.style.display = 'block';
            passwordInput.value = '';
        }
    });

    function checkAndRedirectToIndex() {
        const storedTimestamp = localStorage.getItem(AUTH_KEY);
        const currentTime = new Date().getTime();

        if (storedTimestamp && currentTime < parseInt(storedTimestamp)) {
            // If timestamp exists and hasn't expired, redirect
            window.location.href = 'index.html';
        }
    }
});