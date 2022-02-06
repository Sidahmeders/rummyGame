export default function displayPlayers(players) {
  const tableElement = document.getElementById('table')
  const replacmentElement = document.createElement('div')
  replacmentElement.setAttribute('id', 'table')

  players.map((player) => {
    if (player === window.peerName) {
      const playerElement = document.createElement('div')
      playerElement.classList.add('player', player)
      playerElement.innerHTML = `<p class="username"> ${player} </p>`
      replacmentElement.appendChild(playerElement)
    }
  })

  tableElement.replaceWith(replacmentElement)
}
