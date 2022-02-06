import arrangeCards from './arrangeCards.js'
import suiteValidator from './suiteValidator.js'

export default function createHandSet(handSet) {
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
  return handSetElement
}
