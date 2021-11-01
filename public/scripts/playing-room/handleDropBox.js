function handleDropBox() {
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
    console.log('drop..')
    this.classList.remove('hovered')

    const roomName = location.href.split('/')[4]
    const username = localStorage.getItem('username')

    console.log(roomName, username)
    // socket.emit('drop-card', roomName, username)
}

handleDropBox()
