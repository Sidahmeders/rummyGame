export default function displayPeersOnlineStatus(onlinePlayers = {}) {
  handleOnlineStatus(onlinePlayers)
  handleTurnToPick(onlinePlayers)
}

function handleOnlineStatus(onlinePlayers) {
  const peerStatusNodes = document.getElementsByClassName('peername-online-status')
  setTimeout(() => {
    for (let peerNode of peerStatusNodes) {
      const peerName = peerNode.parentElement.textContent
      const isOnline = onlinePlayers[peerName]?.isOnline
      peerNode.style.background = isOnline ? '#5f5' : 'gray'
    }
  }, 1000)
}

function handleTurnToPick(onlinePlayers) {
  const peerStatusNodes = document.getElementsByClassName('peername-turn-status')
  for (let peerNode of peerStatusNodes) {
    const peerName = peerNode.parentElement.textContent
    const isTurnToPick = onlinePlayers[peerName]?.turnToPick
    peerNode.style.background = isTurnToPick ? '#dd3' : '#ddd'
  }
}
