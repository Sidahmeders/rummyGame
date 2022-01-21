import './dropBoxHandler.js'
import { errorNotification } from '../notifications/index.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const roomName = location.href.split('/')[4]
  socket.emit('get-room-data', roomName)
}

socket.on('user-joined-room', (updatedDeck) => {
  displayRoomData(updatedDeck)
})

socket.on('card-dragged', (updatedDeck) => {
  addDraggedCard(updatedDeck)
})

socket.on('card-dropped', (updatedDeck) => {
  removeDroppedCard(updatedDeck)
})

socket.on('room-error', (error) => {
  errorNotification(error)
})
