import handleCardsDeckUI from './handleCardsDeckUI.js'
import displayPlayerCards from './displayPlayerCards.js'

export default function updateRoomUI(updatedDeck) {
    const { cards, playersCards } = updatedDeck
    handleCardsDeckUI(cards)
    displayPlayerCards(playersCards)
}
