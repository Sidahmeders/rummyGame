import { getPlayerCardsList, getTargetCard } from './utils.js'
import addDragableEvents from './addDragableEvents.js'
// import updateSetStatus from './updateSetStatus.js'

export default function addDraggedCard(playerCards) {
  const newCardsList = playerCards
  const oldCardsList = getPlayerCardsList()
  const targetCard = getTargetCard(newCardsList, oldCardsList)

  if (targetCard) {
    const playerElement = document.getElementById('player')
    const cardElement = document.createElement('div')
    cardElement.className = `player-card ${targetCard}`
    cardElement.setAttribute('draggable', true)
    addDragableEvents(cardElement)

    playerElement.appendChild(cardElement)
  }
}
