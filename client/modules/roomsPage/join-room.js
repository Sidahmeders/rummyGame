import { errorNotification } from '../notifications/index.js'
import { roomEvents } from '../constant/events.js'
import { roomListeners } from '../constant/listeners.js'

export default function joinRoom(event) {
  event.preventDefault()
  const roomId = event.target.id
  const room = document.getElementById(roomId).children
  const payload = {}

  for (let input of room) {
    let { name, value } = input
    payload[name] = value
  }

  socket.emit(roomEvents.rooms_join, payload)
}

socket.on(roomListeners.rooms_error, errorNotification)

socket.on(roomListeners.rooms_joined, (payload) => {
  const { roomName, username } = payload
  location.href = `/room/${roomName}?username=${username}`
})
