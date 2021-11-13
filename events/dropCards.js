const inMemoryActiveGames = require('../store/inMemoryGames')

module.exports = function dropCards({ socket, roomName, username, selectedCard }) {
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
        socket.emit(
            'room-error',
            'this room is empty, something unexpected happens. please try again'
        )
    } else {
        dropCard({ socket, username, targetRoom, selectedCard })
    }
}

function dropCard({ socket, username, targetRoom, selectedCard }) {
    const { playersCards } = targetRoom
    let playerHand = playersCards[username]

    if (playerHand.length <= 8) {
        socket.emit('room-error', 'please make sure you have picked a card before you can drop')
    } else {
        playerHand = playerHand.filter((card) => card !== selectedCard)
        targetRoom.playersCards[username] = playerHand
        socket.emit('card-dropped', targetRoom)
    }
}
