function displayUsers(userList, userListElement) {
    userListElement.innerHTML = '';

    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div>
                    <i class="fa fa-user-circle"></i>
                    ${user.username} <i class="user-email">(${user.email})</i>
                </div>
                <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
            `;
        userListElement.appendChild(listItem);
    });
}

function loadAndDisplayUsers() {
    // check if the user is connected or not
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location.href = 'login.html'
        return
    }

    const userListElement = document.getElementById('userList');

    userListElement.innerHTML = 'Loading...';

    fetch('http://localhost:8080/api/users')
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            displayUsers(data, userListElement)
        })
}

window.addEventListener('load', loadAndDisplayUsers)


function handlerLogout() {
    fetch('http://localhost:8080/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('connectedUser')
    })
        .then(res => {
            return res
        })
        .then(data => {
            localStorage.removeItem('connectedUser')
            window.location.href = 'login.html'
        })
}

const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', handlerLogout)

function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
    window.open(`videoCall.html?username=${connectedUser.username}`, '_blank')
}

const newMeetingBtn = document.getElementById('newMeetingBtn')
newMeetingBtn.addEventListener('click', handleNewMeeting)

const joinMeetingBtn = document.getElementById('joinMeetingBtn')

function handleJoinMeeting() {
    const roomId = document.getElementById('meetingName').value
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'))

    const url = 'videoCall.html?username=' + connectedUser.username + '&roomId=' + roomId

    window.open(url, '_blank')
}

joinMeetingBtn.addEventListener('click', handleJoinMeeting)