import { getPlayerCardsList, getTargetCard } from './utils.js'

export default function removeDroppedCard(playerCards) {
  const oldCardsList = getPlayerCardsList()
  const newCardsList = playerCards

  const targetCard = getTargetCard(oldCardsList, newCardsList)
  if (targetCard) {
    document.getElementsByClassName(`${targetCard}`)[0].remove()
  }
}
