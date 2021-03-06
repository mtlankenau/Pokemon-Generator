async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //I put the alert element in the handlebars file.
    const alertEl = document.querySelector("#signup-error-alert");

    if (!username) {
        alertEl.innerHTML = ` <div class="alertEl rounded">Please enter a username.</div>`;
        return;
    }
    
    if (password.length < 4) {
        alertEl.innerHTML = ` <div class="alertEl rounded">Password needs at least 4 characters.</div>`;
        return;
    }

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alertEl.innerHTML = `<div class="alertEl rounded">` + response.statusText + `</div>`;
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //I put the alert element in the handlebars file
    const alertEl = document.querySelector('#login-error-alert');

    if (!username) {
        alertEl.innerHTML = ` <div class="alertEl rounded">Please enter a username.</div>`;
        return;
    }

    if (username && password) {
        const response = await fetch(`/api/users/login`, {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            console.log(response);
            alertEl.innerHTML = `<div class="alertEl rounded">` + response.statusText + `</div>`;
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
