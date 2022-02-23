export default function displayPeersOnlineStatus(onlinePlayers = {}) {
  console.log(onlinePlayers, 'ONLINE PLAYER OBJECT')
  const peerStatusNodes = document.getElementsByClassName('peername-status')

  setTimeout(() => {
    for (let peerNode of peerStatusNodes) {
      const peerName = peerNode.parentElement.textContent
      const isOnline = onlinePlayers[peerName]
      peerNode.style.background = isOnline ? '#5f5' : 'gray'
    }
  }, 1000)
}
