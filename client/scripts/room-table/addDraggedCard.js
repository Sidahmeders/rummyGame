import { getPlayerCardsList, getTargetCard } from './utils.js'
import arrangeCards from './arrangeCards.js'
import updateSetStatus from './updateSetStatus.js'

export default function addDraggedCard({ playersCards }) {
  const { username } = window.getRoomInfo()
  const newCardsList = getPlayerCardsList()
  const oldCardsList = playersCards[username]
  const targetCard = getTargetCard(oldCardsList, newCardsList)

  if (targetCard) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('player-card', targetCard)
    cardElement.setAttribute('draggable', true)
    arrangeCards(cardElement)

    const playerElement = document.getElementById('player').childNodes
    const minSetIndex = getMinSetIndex(playerElement)
    const nodeSetContainer = playerElement[minSetIndex]
    updateSetStatus(nodeSetContainer)
    nodeSetContainer.appendChild(cardElement)
  }
}

function getMinSetIndex(playerElement) {
  let minSetIndex = 0,
    minLength = 4
  playerElement.forEach((node, nodeIndex) => {
    let nodeLength = node.childNodes.length
    if (nodeIndex > 0 && minLength > nodeLength) {
      minSetIndex = nodeIndex
      minLength = nodeLength
    }
  })
  return minSetIndex
}
