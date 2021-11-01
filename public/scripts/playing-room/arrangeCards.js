import { playerCardsState } from '../_state.js'

export default function arrangeCards(cardElement) {
    cardElement.addEventListener('dragstart', dragStart)
    cardElement.addEventListener('dragend', dragEnd)
    cardElement.addEventListener('dragover', dragOver)
    cardElement.addEventListener('dragenter', dragEnter)
    cardElement.addEventListener('dragleave', dragLeave)
    cardElement.addEventListener('drop', dragDrop)
}

let { pickedCardClass, pickedCardElement, droppedCardClass } = playerCardsState

function dragStart() {
    this.classList.add('hold')
    setTimeout(() => {
        this.classList.add('invisible')
    }, 0)

    pickedCardElement = this
    pickedCardClass = this.classList[1]
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
    droppedCardClass = this.classList[1]

    this.classList.add(pickedCardClass)
    this.classList.remove(droppedCardClass)

    pickedCardElement.classList.remove(pickedCardClass)
    pickedCardElement.classList.add(droppedCardClass)
}
