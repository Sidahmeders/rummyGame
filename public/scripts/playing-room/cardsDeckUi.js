const socket3 = io()
const roomName = location.href.split('/')[4]

export default function handleCardsDeckUI(cards) {
    cards.push('hidden') // push the hidden card on top of the deck
    const cardsElement = document.getElementById('cards')

    cards.forEach(card => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card', card)
        if (card === 'hidden') {
            cardElement.onclick = dragCardsFromTheDeck.bind(cards)
        }
        cardsElement.appendChild(cardElement)
    })
}

function dragCardsFromTheDeck() {
    const cards = this.filter(card => card !== 'hidden')
    socket3.emit('player-drags-card', roomName, 'username', cards[0])
    console.log(cards)
}
