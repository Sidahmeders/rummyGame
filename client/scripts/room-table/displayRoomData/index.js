import displayPlayers from './displayPlayers.js'
import displayCards from './displayCards.js'
import deckUIHandler from './deckUIHandler.js'

export default function displayRoomData(updatedDeck) {
  const { players, cards, playersCards } = updatedDeck
  displayPlayers(players)
  displayCards(playersCards)
  deckUIHandler(cards)
}
