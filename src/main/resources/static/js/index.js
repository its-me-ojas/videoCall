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