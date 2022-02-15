import './dropBoxHandler.js'
import '../peers-call/index.js'
import { errorNotification } from '../notifications/index.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'
import displayPeersOnlineStatus from './displayPeersOnlineStatus.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const { roomName, username } = window.getRoomInfo()
  window.socket.emit('rooms:data', { username, roomName })
}

window.socket.on('rooms:joined', displayRoomData)

window.socket.on('cards:dragged', addDraggedCard)
window.socket.on('cards:dropped', removeDroppedCard)

window.socket.on('peers:disconnect', displayPeersOnlineStatus)
window.socket.on('peers:connect', displayPeersOnlineStatus)

window.socket.on('rooms:error', errorNotification)
