export default function displayPeersOnlineStatus(onlinePlayers = {}) {
  const peerStatusNodes = document.getElementsByClassName('peername-status')

  setTimeout(() => {
    for (let peerNode of peerStatusNodes) {
      const peerName = peerNode.parentElement.textContent
      const isOnline = onlinePlayers[peerName]?.isOnline
      peerNode.style.background = isOnline ? '#5f5' : 'gray'
    }
  }, 1000)
}
