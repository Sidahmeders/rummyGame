import { getTargetCard } from './utils.js'
import addDragableEvents from './addDragableEvents.js'
import updateSuitesStatus from './updateSuiteStatus.js'

export default function addDraggedCard(userData) {
  const { playerCards } = userData
  const targetCard = getTargetCard(playerCards)

  if (targetCard) {
    const playerElement = document.getElementById('player')
    const cardElement = document.createElement('div')
    cardElement.className = `player-card ${targetCard}`
    cardElement.setAttribute('draggable', true)
    addDragableEvents(cardElement)

    playerElement.appendChild(cardElement)
  }

  updateSuitesStatus()
}
