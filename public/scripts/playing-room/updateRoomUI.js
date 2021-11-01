import displayPlayers from './displayPlayers.js'
import displayCards from './displayCards.js'
import handleCardsDeckUI from './handleCardsDeckUI.js'

export default function updateRoomUI(updatedDeck) {
    const { players, cards, playersCards } = updatedDeck

    displayPlayers(players)
    displayCards(playersCards)
    handleCardsDeckUI(cards)
}
