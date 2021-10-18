
export default function handleCardsArrangement(cardElement){
    cardElement.addEventListener('dragstart', dragStart)
    cardElement.addEventListener('dragend', dragEnd)
    cardElement.addEventListener('dragover', dragOver)
    cardElement.addEventListener('dragenter', dragEnter)
    cardElement.addEventListener('dragleave', dragLeave)
    cardElement.addEventListener('drop', dragDrop)
}

function dragStart() {
    this.classList.add('hold')
    setTimeout(() => {
        this.classList.add('invisible')
    }, 0)
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
    // this.append()
    this.classList.remove('hovered')
    console.log(this.classList)
}