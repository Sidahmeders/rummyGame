export function getPlayerCardsList() {
  const cardsList = []
  const playerElement = document.getElementById('player')
  const setsNodes = playerElement.childNodes

  for (let k = 1; k < setsNodes.length; k++) {
    let setNodeList = setsNodes[k].childNodes
    for (let node of setNodeList) {
      const nodeClass = node.classList[1]
      cardsList.push(nodeClass)
    }
  }

  return cardsList
}

export function getTargetCard(oldCardsList, newCardsList) {
  for (let oldCard of oldCardsList) {
    if (newCardsList.indexOf(oldCard) === -1) {
      return oldCard
    }
  }
  return undefined
}
