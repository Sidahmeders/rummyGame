import displayPlayers from './displayPlayers.js'
import displayCards from './displayCards.js'
import deckUIHandler from './deckUIHandler.js'
import displayPeersNames from './displayPeersNames.js'

export default function displayRoomData(userData) {
  const { playerCards, players, cards } = userData
  displayPlayers()
  displayCards(playerCards)
  deckUIHandler(cards)
  displayPeersNames(players)
}
