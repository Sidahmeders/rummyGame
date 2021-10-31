const socket = io()

export default function dragCardsFromTheDeck() {
    const roomName = location.href.split('/')[4]
    const username = localStorage.getItem('username')
    socket.emit('drag-card', roomName, username)
}
