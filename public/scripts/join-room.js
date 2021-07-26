const getRooms = async() => {
    try {
        let response = await fetch('http://localhost:5000/join')
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
            const { roomName, password } = room
            const roomElement = document.createElement('div')
            const roomText = `
                ${roomName}
                <br/>
                <input type="text" placeholder="please enter the room password.." />
            `
            roomElement.innerHTML = roomText
            roomsContainer.appendChild(roomElement)
        })
    }
}

appendRooms()