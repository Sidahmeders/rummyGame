export default function deckUIHandler(cards) {
  const cardsContainer = document.getElementById('cards')

  for (let card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card', card)
    cardsContainer.appendChild(cardElement)
  }

  cardsContainer.appendChild(hiddenCard())
}

function hiddenCard() {
  const hiddenCardElement = document.createElement('div')
  hiddenCardElement.className = 'card hidden'
  const payload = getRoomInfo()
  hiddenCardElement.onclick = () => socket.emit('cards:drag', payload)
  return hiddenCardElement
}
