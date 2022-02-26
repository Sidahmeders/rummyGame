import './dropBoxHandler.js'
import '../peers-call/index.js'

import { roomListeners } from '../constant/listeners.js'
import { errorNotification } from '../notifications/index.js'
import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'
import updateOnlineStatus from './updateOnlineStatus.js'
import updateTurnToPickStatus from './updateTurnToPickStatus.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
  const { roomName, username } = getRoomInfo()
  socket.emit(roomListeners.rooms_data, { username, roomName })
}

socket.on(roomListeners.rooms_joined, displayRoomData)
socket.on(roomListeners.rooms_error, errorNotification)

socket.on(roomListeners.cards_dragged, addDraggedCard)
socket.on(roomListeners.cards_dropped, removeDroppedCard)

socket.on(roomListeners.peers_disconnect, updateOnlineStatus)
socket.on(roomListeners.peers_connect, updateOnlineStatus)
socket.on(roomListeners.peers_trunToPick, updateTurnToPickStatus)
