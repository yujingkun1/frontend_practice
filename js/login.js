// DOM Elements
const emailInput = document.querySelector('.form-input[type="text"]');
const passwordInput = document.querySelector('.form-input[type="password"]');
const togglePassword = document.querySelector('.inputForm svg:nth-child(3)');
const signInButton = document.querySelector('.button-submit');
const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');
const signUpLink = document.querySelector('.p .form-span');
const formContainer = document.querySelector('.login-form');


// 加密/解密函数
function encryptPassword(password, key) {
    let encrypted = '';
    for (let i = 0; i < password.length; i++) {
        encrypted += String.fromCharCode(password.charCodeAt(i) + key);
    }
    return encrypted;
}

function decryptPassword(encryptedPassword, key) {
    let decrypted = '';
    for (let i = 0; i < encryptedPassword.length; i++) {
        decrypted += String.fromCharCode(encryptedPassword.charCodeAt(i) - key);
    }
    return decrypted;
}

function loginAlert() {
    alert('success')
}
// Load saved email on page load
window.onload = () => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
};

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
});


signInButton.addEventListener('click', () => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const encryptionKey = 5; // 密码加密偏移量

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const savedEmail = localStorage.getItem('savedEmail');
    const encryptedPassword = localStorage.getItem('encryptedPassword');

    if (!savedEmail || !encryptedPassword) {
        alert('Please register first.');
    } else if (email === savedEmail) {
        const decryptedPassword = decryptPassword(encryptedPassword, encryptionKey);
        console.log('Decrypted Password:', decryptedPassword);
        if (password === decryptedPassword) {
            
            localStorage.setItem('isLoggedIn', 'true'); // 设置登录状态
            localStorage.setItem('loggedInUser', email); // 保存用户名
            alert('Login successful');
            setTimeout(() => {
                window.location.href = 'index.html';  // 跳转到主页
            }, 1000);
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('Email not found. Please register first.');
    }

    if (rememberMeCheckbox.checked) {
        localStorage.setItem('savedEmail', email);
    } else {
        localStorage.removeItem('savedEmail');
    }
});



// Handle Sign Up link click
signUpLink.addEventListener('click', () => {
    // Clear the form
    emailInput.value = '';
    passwordInput.value = '';
    rememberMeCheckbox.checked = false;

    // Update the form for Sign Up
    formContainer.innerHTML = `
        <div class="login-flex-column">
            <label>Email </label>
        </div>
        <div class="inputForm">
            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_3" data-name="Layer 3">
                    <path d="M30.853 13.87a15 15 0 0 0-29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0-1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1-4.158-.759v-10.856a1 1 0 0 0-2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6z"></path>
                </g>
            </svg>
            <input class="form-input" type="text" placeholder="Enter your Email">
        </div>

        <div class="flex-column">
            <label>Password </label>
        </div>
        <div class="inputForm">
            <input class="form-input" type="password" placeholder="Enter your Password">
            <svg class="toggle-password" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
        </div>

        <div class="flex-column">
            <label>Confirm Password </label>
        </div>
        <div class="inputForm">
            <input class="form-input" type="password" placeholder="Confirm your Password">
            <svg class="toggle-password" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
        </div>

        <button class="button-submit">Sign Up</button>
    `;

    // Update event listeners for Sign Up
    const passwordInputs = document.querySelectorAll('.form-input[type="password"]');
    const eyeIcons = document.querySelectorAll('.toggle-password');

    // Add event listeners to toggle password visibility
    eyeIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            const passwordField = passwordInputs[index];
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
        });
    });

    const signUpButton = document.querySelector('.button-submit');
    signUpButton.addEventListener('click', () => {
        const email = document.querySelector('.form-input[type="text"]').value.trim();
        const password = document.querySelectorAll('.form-input[type="password"]')[0].value.trim();
        const confirmPassword = document.querySelectorAll('.form-input[type="password"]')[1].value.trim();
        const encryptionKey = 5;

        if (!email || !password || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // 检查邮箱是否已经存在于 localStorage 中
        const existingEmail = localStorage.getItem('savedEmail');
        if (existingEmail === email) {
            alert('An account with this email already exists.');
            return;  // 如果邮箱已存在，停止后续操作
        }

        // 加密密码并存储
        const encryptedPassword = encryptPassword(password, encryptionKey);
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('encryptedPassword', encryptedPassword);

        alert('Sign Up successful!');

    });
});


   