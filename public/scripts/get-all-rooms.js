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

    for (let roomName in rooms) {
        const roomElement = document.createElement('div')

        const roomText = `
        join the ${roomName} room
        <form id="roomId-${roomName}" onsubmit="return false">
            <input name="roomName" value="${roomName}" readonly />
            <input type="text" name="password" placeholder="please enter the room password.." />
            <input type="text" name="username" placeholder="choose your username" />
            <button value="${roomName}" onclick="joinRoom(this.value)">enter this room</button>
        </form>
    `
        roomElement.innerHTML = roomText
        roomsContainer.appendChild(roomElement)
    }
}

appendRooms()