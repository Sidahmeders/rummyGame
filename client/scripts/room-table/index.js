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
  displayRoomData(userData)
})

window.socket.on('card-dragged', (updatedDeck) => {
  const { playerCards } = updatedDeck
  addDraggedCard(playerCards)
})

window.socket.on('card-dropped', (updatedDeck) => {
  removeDroppedCard(updatedDeck)
})

window.socket.on('room-error', (error) => {
  errorNotification(error)
})
