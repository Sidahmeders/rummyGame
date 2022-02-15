export default function displayPeersNames(players) {
  const peersContainer = document.getElementById('peers-container')
  peersContainer.innerHTML = ''

  for (let peerName of players) {
    if (peerName !== window.localUserName) {
      const peerElement = document.createElement('div')
      peerElement.className = 'peername'
      peerElement.innerText = peerName

      const statusElement = document.createElement('div')
      statusElement.className = 'peername-status'

      peerElement.appendChild(statusElement)
      peersContainer.appendChild(peerElement)
    }
  }
}
