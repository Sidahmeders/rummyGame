import './dropBoxHandler.js'
import '../peers-call/index.js'

import { errorNotification } from '../notifications/index.js'
import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'
import updateOnlineStatus from './updateOnlineStatus.js'
import updateTurnToPickStatus from './updateTurnToPickStatus.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const { roomName, username } = getRoomInfo()
  socket.emit('rooms:data', { username, roomName })
}

socket.on('rooms:joined', displayRoomData)

socket.on('cards:dragged', addDraggedCard)
socket.on('cards:dropped', removeDroppedCard)

socket.on('peers:disconnect', updateOnlineStatus)
socket.on('peers:connect', updateOnlineStatus)
socket.on('peers:trunToPick', updateTurnToPickStatus)

socket.on('rooms:error', errorNotification)
