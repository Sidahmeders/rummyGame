export default function handleCardsDeckUI(cards) {
    cards.push('hidden') // push the hidden card on top of the deck
    const cardsElement = document.getElementById('cards')

    cards.forEach(card => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card', card)
        if (card === 'hidden') {
            cardElement.onclick = dragCardsFromTheDeck
        }
        cardsElement.appendChild(cardElement)
    })
}

const socket3 = io()

function dragCardsFromTheDeck() {
    const roomName = location.href.split('/')[4]
    const username = localStorage.getItem('username')
    socket3.emit('player-drags-card', roomName, username)
}
