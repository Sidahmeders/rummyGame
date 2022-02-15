import state from '../state/index.js'
const { socket, roomState, getRoomInfo } = state

function dropBoxHandler() {
  const dropBoxElement = document.getElementById('drop-box')

  dropBoxElement.addEventListener('dragover', dragOver)
  dropBoxElement.addEventListener('dragleave', dragLeave)
  dropBoxElement.addEventListener('drop', dragDrop)
}

function dragOver(event) {
  event.preventDefault()
  this.classList.add('hovered')
}

function dragLeave() {
  this.classList.remove('hovered')
}

function dragDrop() {
  this.classList.remove('hovered')
  const { roomName, username } = getRoomInfo()
  const { pickedCardClass } = roomState
  const payload = { roomName, username, pickedCardClass }
  socket.emit('cards:drop', payload)
}

dropBoxHandler()
