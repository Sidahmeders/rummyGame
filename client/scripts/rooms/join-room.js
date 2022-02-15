import { errorNotification } from '../notifications/index.js'
import state from '../state/index.js'
const { socket } = state

export default function joinRoom(event) {
  event.preventDefault()
  const roomId = event.target.id
  const room = document.getElementById(roomId).children
  const payload = {}

  for (let input of room) {
    let { name, value } = input
    payload[name] = value
  }

  socket.emit('rooms:join', payload)
}

socket.on('rooms:error', errorNotification)

socket.on('rooms:joined', (roomName, username) => {
  location.href = `/room/${roomName}?username=${username}`
})
