export function getPlayerCardsList() {
  const cardsClassList = []
  const playerElement = document.getElementById('player')
  const cardsNodes = playerElement.childNodes

  for (let k = 1; k < cardsNodes.length; k++) {
    let node = cardsNodes[k]
    const nodeClass = node.classList[1]
    cardsClassList.push(nodeClass)
  }

  return cardsClassList
}

export function getTargetCard(oldCardsList, newCardsList) {
  for (let oldCard of oldCardsList) {
    if (newCardsList.indexOf(oldCard) === -1) {
      return oldCard
    }
  }
  return undefined
}
