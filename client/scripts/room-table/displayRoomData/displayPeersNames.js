export default function displayPeersNames(players) {
  const tableContainer = document.getElementById('table')
  const peersContainer = document.createElement('div')
  peersContainer.id = 'peers-container'

  for (let peerName of players) {
    if (peerName !== window.localUserName) {
      const peerElement = document.createElement('div')
      peerElement.className = 'peername'
      peerElement.innerText = peerName

      peersContainer.appendChild(peerElement)
    }
  }
  tableContainer.appendChild(peersContainer)
}
