export default function deckUIHandler(cards) {
  const cardsContainer = document.getElementById('cards')

  while (cards.length) {
    const card = cards.pop()
    const cardElement = document.createElement('div')
    cardElement.classList.add('card', card)
    cardsContainer.appendChild(cardElement)
  }

  cardsContainer.appendChild(hiddenCard())
}

function hiddenCard() {
  const hiddenCardElement = document.createElement('div')
  hiddenCardElement.className = 'card hidden'
  const { roomName, username } = window.getRoomInfo()
  hiddenCardElement.onclick = () => window.socket.emit('drag-card', roomName, username)
  return hiddenCardElement
}
