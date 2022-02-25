export default function updateOnlineStatus(roomPlayers = {}) {
  const peerStatusNodes = document.getElementsByClassName('peername-online-status')
  setTimeout(() => {
    for (let peerNode of peerStatusNodes) {
      const peerName = peerNode.parentElement.textContent
      const isOnline = roomPlayers[peerName]?.isOnline
      peerNode.style.background = isOnline ? '#5f5' : 'gray'
    }
  }, 1000)
}
