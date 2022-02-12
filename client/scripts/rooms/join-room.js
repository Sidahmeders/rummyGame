import { errorNotification } from '../notifications/index.js'

const socket = window.socket

export default function joinRoom(event) {
  event.preventDefault()
  const roomId = event.target.id
  const room = document.getElementById(roomId).children
  const payload = {}

  for (let input of room) {
    let { name, value } = input
    payload[name] = value
  }

  socket.emit('join-room', payload)
}

socket.on('join-room-error', (error) => {
  errorNotification(error)
})

socket.on('user-joined-room', (roomName, username) => {
  location.href = `/room/${roomName}?username=${username}`
})
