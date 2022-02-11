import { getPlayerCardsList, getTargetCard } from './utils.js'

import suiteValidator from './suiteValidator/index.js'

export default function removeDroppedCard(playerCards) {
  const oldCardsList = getPlayerCardsList()
  const newCardsList = playerCards

  const results = suiteValidator(playerCards)
  console.log(results) // FIXME:

  const targetCard = getTargetCard(oldCardsList, newCardsList)
  if (targetCard) {
    document.getElementsByClassName(`${targetCard}`)[0].remove()
  }
}
