export function getTargetCard(updatedPlayerCards = []) {
  const domPlayerCards = getPlayerCards()

  const domLength = domPlayerCards.length
  const paramLength = updatedPlayerCards.length

  if (paramLength > domLength) return updatedPlayerCards.pop()
  if (domLength > paramLength) {
    const encounteredCards = []
    for (let card of domPlayerCards) {
      if (!updatedPlayerCards.includes(card) || encounteredCards.includes(card)) return card
      encounteredCards.push(card)
    }
  }

  console.warn('Target card not Found')
  return undefined
}

export function getPlayerCards() {
  const cardsClassList = []
  const cardsNodes = document.getElementById('player').childNodes

  for (let node of cardsNodes) {
    const nodeClass = node.classList[node.classList.length - 1]
    cardsClassList.push(nodeClass)
  }
  return cardsClassList
}
