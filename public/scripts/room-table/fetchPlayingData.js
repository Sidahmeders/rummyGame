import displayRoomData from './displayRoomData/index.js'
const socket = io()

export default function fetchPlayingData() {
    const roomName = location.href.split('/')[4]
    socket.emit('get-roomName-data', roomName)
}

socket.on('user-joined-room', (updatedDeck) => {
    console.log(updatedDeck, 'HELLO MY FRIEND...')
    displayRoomData(updatedDeck)
})
