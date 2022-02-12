import addDragableEvents from '../addDragableEvents.js'

export default function displayPlayerCards(playerCards) {
  const playerExist = document.getElementById('player')
  if (playerExist) return //FIXME: handle this on the server

  const tableElement = document.getElementById('table')
  const playerElement = document.createElement('div')
  playerElement.id = 'player'
  tableElement.appendChild(playerElement)

  createHandCards(playerCards, playerElement)
}

function createHandCards(playerCards, playerElement) {
  for (let card of playerCards) {
    const cardElement = document.createElement('div')
    cardElement.className = `player-card ${card}`
    cardElement.setAttribute('draggable', true)
    addDragableEvents(cardElement)

    playerElement.appendChild(cardElement)
  }
}
