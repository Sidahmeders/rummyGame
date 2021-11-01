const socket = io()

function joinRoom(roomName) {
    const room = document.getElementById(`roomId-${roomName}`).children
    const roomInfo = {}

    for (let input of room) {
        let { name, value } = input
        roomInfo[name] = value
    }

    socket.emit('join-room', roomInfo)
}

socket.on('join-room-error', (error) => {
    console.log(error)
})

socket.on('user-joined-room', (roomName, username) => {
    localStorage.setItem('username', username)
    location.href = `/room/${roomName}`
})
