import addDragableEvents from '../addDragableEvents.js'

export default function displayPlayerCards(playerCards) {
  const tableElement = document.getElementById('table')
  const playerElement = document.createElement('div')
  playerElement.id = 'player'
  tableElement.appendChild(playerElement)

  createHandCards(playerCards, playerElement)
}

function createHandCards(playerCards, playerElement) {
  for (let card of playerCards) {
    const cardElement = document.createElement('div')
    cardElement.className = `player-card ${card.split('+')[0]}`
    cardElement.setAttribute('card-id', card)
    cardElement.setAttribute('draggable', true)
    addDragableEvents(cardElement)

    playerElement.appendChild(cardElement)
  }
}
