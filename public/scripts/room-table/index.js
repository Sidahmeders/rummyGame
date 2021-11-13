import './_state.js'
import './dropBoxHandler.js'

import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchRoomNameData)

function fetchRoomNameData() {
    const roomName = location.href.split('/')[4]
    socket.emit('get-roomName-data', roomName)
}

socket.on('user-joined-room', (updatedDeck) => {
    displayRoomData(updatedDeck)
})

socket.on('card-dragged', (updatedDeck) => {
    console.log('Card has been dragged')
    addDraggedCard(updatedDeck)
})

socket.on('card-dropped', (updatedDeck) => {
    console.log('Card has been dropped')
    removeDroppedCard(updatedDeck)
})

socket.on('room-error', (error) => console.log(error))
