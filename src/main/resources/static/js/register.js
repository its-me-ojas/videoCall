function handleRegistration(event) {
    event.preventDefault()

    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const status = "online"

    const user = {
        username: username,
        email: email,
        password: password,
        status: status
    }

    fetch('http://videocall.crestfallen.tech/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok')
        }
        return res;
    }).then(() => {
        localStorage.setItem('connectedUser', JSON.stringify(user))
        window.location.href = 'index.html'
    }).catch(err => {
        console.error('POST request error: ', err)
    })
}

const registrationForm = document.getElementById("registrationForm")
registrationForm.addEventListener('submit', handleRegistration)