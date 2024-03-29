import { getTargetCard } from './utils.js'
import updateSuitesStatus from './updateSuiteStatus.js'

export default function removeDroppedCard(userData) {
  const { playerCards } = userData
  const targetCard = getTargetCard(playerCards)
  if (targetCard) document.querySelectorAll(`[card-id="${targetCard}"]`)[0].remove()
  updateSuitesStatus()
}
