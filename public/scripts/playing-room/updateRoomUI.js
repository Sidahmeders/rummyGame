import handleCardsDeckUI from './handleCardsDeckUI.js'
import displayPlayerCards from './displayPlayerCards.js'
import displayPlayers from './displayPlayers.js'

export default function updateRoomUI(updatedDeck) {
    const { players, cards, playersCards } = updatedDeck

    displayPlayers(players)
    handleCardsDeckUI(cards)
    displayPlayerCards(playersCards)
}
