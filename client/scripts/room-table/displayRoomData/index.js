import displayPlayers from './displayPlayers.js'
import displayCards from './displayCards.js'
import deckUIHandler from './deckUIHandler.js'

export default function displayRoomData(userData) {
  const { playerCards, players, cards } = userData
  displayPlayers(players)
  displayCards(playerCards)
  deckUIHandler(cards)
}
