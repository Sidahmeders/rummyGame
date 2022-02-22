import { errorNotification } from '../notifications/index.js'

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

socket.on('rooms:joined', (payload) => {
  const { roomName, username } = payload
  location.href = `/room/${roomName}?username=${username}`
})
