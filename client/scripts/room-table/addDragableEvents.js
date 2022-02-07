import updateSetStatus from './updateSetStatus.js'

export default function addDragableEvents(cardElement) {
  cardElement.addEventListener('dragstart', dragStart)
  cardElement.addEventListener('dragend', dragEnd)
  cardElement.addEventListener('dragover', dragOver)
  cardElement.addEventListener('dragenter', dragEnter)
  cardElement.addEventListener('dragleave', dragLeave)
  cardElement.addEventListener('drop', dragDrop)
}

const roomState = window.roomState

function dragStart() {
  this.classList.add('hold')
  setTimeout(() => {
    this.classList.add('invisible')
  }, 0)

  roomState.pickedCardElement = this
  roomState.pickedCardClass = this.classList[1]
}

function dragEnd() {
  this.classList.remove('invisible')
  this.classList.remove('hold')
}

function dragOver(event) {
  event.preventDefault()
}

function dragEnter(event) {
  event.preventDefault()
  this.classList.add('hovered')
}

function dragLeave() {
  this.classList.remove('hovered')
}

function dragDrop() {
  this.classList.remove('hovered')
  roomState.droppedCardClass = this.classList[1]

  this.classList.add(roomState.pickedCardClass)
  this.classList.remove(roomState.droppedCardClass)

  roomState.pickedCardElement.classList.remove(roomState.pickedCardClass)
  roomState.pickedCardElement.classList.add(roomState.droppedCardClass)
  updateSwappedSetsStatus(this)
}

function updateSwappedSetsStatus(targetCard) {
  let sourceNode = roomState.pickedCardElement.parentNode
  let targetNode = targetCard.parentNode
  updateSetStatus(sourceNode)
  updateSetStatus(targetNode)
}
