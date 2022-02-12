export function getTargetCard(updatedPlayerCards) {
  const domPlayerCards = getPlayerCards()

  const domLength = domPlayerCards.length
  const paramLength = updatedPlayerCards.length

  const newCards = domLength < paramLength ? updatedPlayerCards : domPlayerCards
  const oldCards = domLength > paramLength ? updatedPlayerCards : domPlayerCards

  for (let card of newCards) {
    if (oldCards.indexOf(card) === -1) return card
  }

  console.warn('Target card not Found')
  return undefined
}

export function getPlayerCards() {
  const cardsClassList = []
  const cardsNodes = document.getElementById('player').childNodes

  for (let node of cardsNodes) {
    const nodeClass = node.classList[1]
    cardsClassList.push(nodeClass)
  }
  return cardsClassList
}
