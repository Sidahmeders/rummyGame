export function getPlayerCardsList(playersCards, username) {
  const cardsList = []
  for (let playerName in playersCards) {
    if (playerName === username) {
      const playerElement = document.getElementsByClassName(`player ${playerName}`)
      const setsNodes = playerElement[0].childNodes

      for (let k = 1; k < setsNodes.length; k++) {
        let setNodeList = setsNodes[k].childNodes
        for (let node of setNodeList) {
          const nodeClass = node.classList[1]
          cardsList.push(nodeClass)
        }
      }
    }
  }
  return cardsList
}

export function getRoomInfo() {
  const roomName = location.href.split('/')[4]
  const username = localStorage.getItem('username')
  return { roomName, username }
}

export function getTargetCard(oldCardsList, newCardsList) {
  for (let oldCard of oldCardsList) {
    if (newCardsList.indexOf(oldCard) === -1) {
      return oldCard
    }
  }
  return undefined
}
