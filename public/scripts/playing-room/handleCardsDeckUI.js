import dragNewCard from './dragNewCard.js'

export default function handleCardsDeckUI(cards) {
    cards.push('hidden') // push the hidden card on top of the deck
    const cardsContainer = document.getElementById('cards')

    cards.forEach((card) => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card', card)
        if (card === 'hidden') {
            cardElement.onclick = dragNewCard
        }
        cardsContainer.appendChild(cardElement)
    })
}
