export function getTargetCard(newPlayerCards = []) {
  const oldPlayerCards = getPlayerCards()

  const newCardsLen = newPlayerCards.length
  const oldCardsLen = oldPlayerCards.length
  let targetCard = false

  if (newCardsLen > oldCardsLen) targetCard = newPlayerCards.filter((x) => !oldPlayerCards.includes(x))
  if (oldCardsLen > newCardsLen) targetCard = oldPlayerCards.filter((x) => !newPlayerCards.includes(x))
  if (targetCard) return String(targetCard)

  console.warn('Target card not Found')
  return undefined
}

export function getPlayerCards() {
  const cardsIdList = []
  const cardsNodes = document.getElementById('player').childNodes

  for (let node of cardsNodes) {
    const cardId = node.getAttribute('card-id')
    cardsIdList.push(cardId)
  }

  return cardsIdList
}
