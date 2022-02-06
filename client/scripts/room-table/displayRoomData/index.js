import displayPlayers from './displayPlayers.js'
import displayCards from './displayCards.js'
import deckUIHandler from './deckUIHandler.js'

export default function displayRoomData(userData) {
  const { playerCards, cards } = userData
  displayPlayers()
  displayCards(playerCards)
  deckUIHandler(cards)
}
