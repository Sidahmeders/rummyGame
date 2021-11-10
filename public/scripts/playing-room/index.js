import '../_globals.js'
import './dropBoxHandler.js'
import displayRoomData from './displayRoomData/index.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchPlayingData)

async function fetchPlayingData() {
    const roomName = location.href.split('/')[4]
    let response = await fetch(`http://localhost:5000/room-data?roomName=${roomName}`)
    response = await response.json()

    const { data, error } = response
    if (data) {
        handleSuccessfullFetch(data)
    } else {
        console.log(error)
    }
}

function handleSuccessfullFetch(updatedDeck) {
    displayRoomData(updatedDeck)
}

const socket = io()
socket.on('card-dropped', (updatedDeck) => {
    const { playersCards } = updatedDeck
    removeDroppedCard(playersCards)
})

socket.on('card-dragged', (updatedDeck) => {
    const { playersCards } = updatedDeck
    addDraggedCard(playersCards)
})

socket.on('room-error', (error) => console.log(error))
