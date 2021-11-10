import './_state.js'
import './dropBoxHandler.js'
import fetchPlayingData from './fetchPlayingData.js'
import addDraggedCard from './addDraggedCard.js'
import removeDroppedCard from './removeDroppedCard.js'

document.addEventListener('DOMContentLoaded', fetchPlayingData)

const socket = io()

socket.on('card-dragged', (updatedDeck) => {
    const { playersCards } = updatedDeck
    addDraggedCard(playersCards)
})

socket.on('card-dropped', (updatedDeck) => {
    const { playersCards } = updatedDeck
    removeDroppedCard(playersCards)
})

socket.on('room-error', (error) => console.log(error))
