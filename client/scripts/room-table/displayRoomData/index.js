import displayPlayerCards from './displayPlayerCards.js'
import deckUIHandler from './deckUIHandler.js'
import displayPeersNames from './displayPeersNames.js'

export default function displayRoomData(userData) {
  const { playerCards, players, cards } = userData
  displayPlayerCards(playerCards)
  deckUIHandler(cards)
  displayPeersNames(players)
}
