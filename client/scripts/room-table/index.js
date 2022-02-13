import './dropBoxHandler.js'
import '../peers-call/index.js'
import { errorNotification } from '../notifications/index.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const { roomName, username } = window.getRoomInfo()
  window.socket.emit('rooms:data', { username, roomName })
}

window.socket.on('rooms:joined', (userData) => {
  displayRoomData(userData)
})

window.socket.on('cards:dragged', (userData) => {
  const { playerCards } = userData
  addDraggedCard(playerCards)
})

window.socket.on('cards:dropped', (userData) => {
  const { playerCards } = userData
  removeDroppedCard(playerCards)
})

window.socket.on('rooms:error', (error) => {
  errorNotification(error)
})
