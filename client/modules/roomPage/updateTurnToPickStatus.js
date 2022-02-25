export default function updateTurnToPickStatus(roomPlayers = {}) {
  const peerStatusNodes = document.getElementsByClassName('peername-turn-status')
  for (let peerNode of peerStatusNodes) {
    const peerName = peerNode.parentElement.textContent
    const isTurnToPick = roomPlayers[peerName]?.turnToPick
    peerNode.style.background = isTurnToPick ? '#dd3' : '#ddd'
  }
}
