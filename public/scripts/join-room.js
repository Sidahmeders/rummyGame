const getRooms = async() => {
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
                <form method="POST" action="/join-room">
                    <input name="roomName" value="${roomName}" readonly />
                    <input type="text" name="password" placeholder="please enter the room password.." />
                    <input type="text" name="username" placeholder="choose your username" />
                    <button type="submit">enter the room</button>
                </form>
            `
            roomElement.innerHTML = roomText
            roomsContainer.appendChild(roomElement)
        })
    }
}

appendRooms()
