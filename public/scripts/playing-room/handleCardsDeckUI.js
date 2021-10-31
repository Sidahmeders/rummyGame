import dragPlayerCard from './dragPlayerCard.js'

export default function handleCardsDeckUI(cards) {
    cards.push('hidden') // push the hidden card on top of the deck
    const cardsElement = document.getElementById('cards')

    cards.forEach((card) => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card', card)
        if (card === 'hidden') {
            cardElement.onclick = dragPlayerCard
        }
        cardsElement.appendChild(cardElement)
    })
}
