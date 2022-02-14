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

// TODO: handle players online status
//////////////////////////////////////////////////////////////
window.socket.on('peers:disconnect', (onlinePlayers) => {
  console.log(onlinePlayers, 'disconnect')
})

window.socket.on('peers:connect', (onlinePlayers) => {
  console.log(onlinePlayers, 'connect')
})

function displayPeersOnlineStatus() {
  const peersNodes = document.getElementById('peers-container').childNodes

  peersNodes.forEach((peerNode) => {
    const statusElement = document.createElement('div')
    const someVar = true
    const onlineStatusColor = someVar ? '#5f5' : '#ddd'

    peerNode.style.position = 'relative'
    statusElement.style = `
      width: 13px;
      height: 13px;
      background: ${onlineStatusColor};
      border-radius: 50%;
      position: absolute;
      top: 34%;
      right: 0%;
    `

    peerNode.appendChild(statusElement)
  })
}

setTimeout(() => displayPeersOnlineStatus(), 500)
//////////////////////////////////////////////////////////////

window.socket.on('rooms:error', (error) => {
  errorNotification(error)
})
