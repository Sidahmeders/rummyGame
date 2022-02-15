export default function displayPeersOnlineStatus(onlinePlayers) {
  const peersSet = new Set(Object.keys(onlinePlayers || {}))
  const peersNamesNodes = document.getElementsByClassName('peername-status')
  setTimeout(() => {
    for (let peerNode of peersNamesNodes) {
      const isOnline = peersSet.has(peerNode.parentElement.textContent)
      peerNode.style.background = isOnline ? '#5f5' : 'gray'
    }
  }, 2000)
}
