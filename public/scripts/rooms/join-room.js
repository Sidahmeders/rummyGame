import { errorNotification } from '../notifications/index.js'

const socket = window.socket

export default function joinRoom(event) {
    event.preventDefault()
    const roomId = event.target.id
    const room = document.getElementById(roomId).children
    const roomInfo = {}

    for (let input of room) {
        let { name, value } = input
        roomInfo[name] = value
    }

    console.log(roomInfo)

    socket.emit('join-room', roomInfo)
}

socket.on('join-room-error', (error) => {
    errorNotification(error)
})

socket.on('user-joined-room', (roomName, username) => {
    localStorage.setItem('username', username)
    location.href = `/room/${roomName}`
})
