import state from '../../state/index.js'
const { localUserName } = state

export default function displayPeersNames(players) {
  const peersContainer = document.getElementById('peers-container')
  peersContainer.innerHTML = ''

  for (let peerName of players) {
    if (peerName !== localUserName) {
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
window
