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
  const { roomName, username } = window.getRoomInfo()
  const { pickedCardClass } = window.roomState

  window.socket.emit('drop-card', roomName, username, pickedCardClass)
}

dropBoxHandler()
