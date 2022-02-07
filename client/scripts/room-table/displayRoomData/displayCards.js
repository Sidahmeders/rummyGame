import arrangeCards from '../arrangeCards.js'
import suiteValidator from '../suiteValidator.js'

export default function displayCards(playerCards) {
  const playerElement = document.getElementById('player')

  createHandSet(playerCards, playerElement)
}

function createHandSet(playerCards, playerElement) {
  const handSets = splitCards(playerCards)

  for (let handSet of handSets) {
    const handSetElement = document.createElement('div')
    const handSetClass = suiteValidator(handSet)
    handSetElement.classList.add('hand-set', handSetClass)

    handSet.forEach((card) => {
      const cardElement = document.createElement('div')
      cardElement.classList.add('player-card', card)
      cardElement.setAttribute('draggable', true)
      arrangeCards(cardElement)
      handSetElement.append(cardElement)
    })

    playerElement.appendChild(handSetElement)
  }
}

// FIXME: ADD or REMOVE
function splitCards(cards) {
  let subArrays = []
  let k = 0
  while (cards.length) {
    subArrays[k] = []
    let j = 0
    while (j < 3 && cards.length) {
      subArrays[k][j] = cards.pop()
      j++
    }
    k++
  }
  return subArrays
}
