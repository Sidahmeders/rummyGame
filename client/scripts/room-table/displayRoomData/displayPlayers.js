export default function displayPlayers() {
  const tableElement = document.getElementById('table')
  const replacmentElement = document.createElement('div')
  replacmentElement.id = 'table'

  const playerElement = document.createElement('div')
  playerElement.id = 'player'
  playerElement.innerHTML = `<p class="username"> ${window.localUserName} </p>`
  replacmentElement.appendChild(playerElement)

  tableElement.replaceWith(replacmentElement)
}
