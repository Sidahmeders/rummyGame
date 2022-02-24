export default function displayPeersNames(players) {
  const peersContainer = document.getElementById('peers-container')
  peersContainer.innerHTML = ''

  for (let peerName of players) {
    if (peerName !== localUserName) {
      const peerElement = document.createElement('div')
      peerElement.className = 'peername'
      peerElement.innerText = peerName

      const onlineStatusEl = peerStatusElement('peername-online-status')
      const turnStatusEl = peerStatusElement('peername-turn-status')

      peerElement.appendChild(onlineStatusEl)
      peerElement.appendChild(turnStatusEl)
      peersContainer.appendChild(peerElement)
    }
  }
}

function peerStatusElement(className) {
  const onlineStatusElement = document.createElement('div')
  onlineStatusElement.className = className
  return onlineStatusElement
}
