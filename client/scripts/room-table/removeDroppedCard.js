import { getPlayerCardsList, getTargetCard } from './utils.js'

const { username } = window.getRoomInfo()

export default function removeDroppedCard({ playersCards }) {
  const oldCardsList = getPlayerCardsList()
  const newCardsList = playersCards[username]

  const targetCard = getTargetCard(oldCardsList, newCardsList)
  if (targetCard) {
    document.getElementsByClassName(`${targetCard}`)[0].remove()
  }
}
