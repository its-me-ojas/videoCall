const loginForm = document.getElementById("loginForm")

function handleLogin(event) {
    event.preventDefault()
    // get user input
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const user = {
        email: email,
        password: password
    }

    fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (!res.ok) {
            alert("Invalid email or password")
        }
        return res.json();
    }).then(res => {
        localStorage.setItem('connectedUser', JSON.stringify(res))
        window.location.href = 'index.html'
    }).catch(err => {
        console.error('POST request error: ', err)
    })
}

loginForm.addEventListener("submit", handleLogin)