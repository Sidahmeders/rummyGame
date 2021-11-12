import './_state.js'
import './dropBoxHandler.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

const socket = io()

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
    const roomName = location.href.split('/')[4]
    socket.emit('get-roomName-data', roomName)
}

socket.on('user-joined-room', (updatedDeck) => {
    displayRoomData(updatedDeck)
})

socket.on('card-dragged', (updatedDeck) => {
    const { playersCards } = updatedDeck
    addDraggedCard(playersCards)
})

socket.on('card-dropped', (updatedDeck) => {
    const { playersCards } = updatedDeck
    removeDroppedCard(playersCards)
})

socket.on('room-error', (error) => console.log(error))
