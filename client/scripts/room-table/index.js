import './dropBoxHandler.js'
import '../peers-call/index.js'
import { errorNotification } from '../notifications/index.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const { roomName, username } = window.getRoomInfo()
  window.socket.emit('get-room-data', { username, roomName })
}

window.socket.on('user-joined-room', (userData) => {
  console.log(userData) // FIXME: REMOVE
  displayRoomData(userData)
})

window.socket.on('card-dragged', (updatedDeck) => {
  addDraggedCard(updatedDeck)
})

window.socket.on('card-dropped', (updatedDeck) => {
  removeDroppedCard(updatedDeck)
})

window.socket.on('room-error', (error) => {
  errorNotification(error)
})
