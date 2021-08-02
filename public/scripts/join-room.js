const getRooms = async () => {
    try {
        let response = await fetch('http://localhost:5000/get-rooms')
        response = await response.json()

        return response
    } catch (err) {
        console.log(err.message)
    }
}

async function appendRooms() {
    const { rooms } = await getRooms()
    const roomsContainer = document.getElementById('rooms-container')

    if (rooms.length) {
        rooms.forEach(room => {
            const { roomName } = room
            const roomElement = document.createElement('div')

            const roomText = `
                join the ${roomName} room
                <form id="roomId-${roomName}" onsubmit="return false">
                    <input name="roomName" value="${roomName}" readonly />
                    <input type="text" name="password" placeholder="please enter the room password.." />
                    <input type="text" name="username" placeholder="choose your username" />
                    <button value="${roomName}" onclick="joinExistingRoom(this.value)">enter this room</button>
                </form>
            `
            roomElement.innerHTML = roomText
            roomsContainer.appendChild(roomElement)
        })
    }
}

const socket = io()

function joinExistingRoom(roomName) {
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
    console.log(`${username} joined ${roomName}`)
    location.href = `/room/${roomName}`
})

appendRooms()