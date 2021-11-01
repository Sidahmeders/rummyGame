const inMemoryActiveGames = require('../data/inMemoryGames')
let ioRef

module.exports = function dropCards({ io, roomName, username, selectedCard }) {
    ioRef = io
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
        ioRef.emit(
            'room-error',
            'this room is empty, something unexpected happens. please try again'
        )
    } else {
        dropCard(username, targetRoom, selectedCard)
    }
}

function dropCard(username, targetRoom, selectedCard) {
    const { playersCards } = targetRoom
    let playerHand = playersCards[username]

    if (playerHand.length <= 8) {
        ioRef.emit('room-error', 'please make sure you have picked a card before you can drop')
    } else {
        playerHand = playerHand.filter((card) => card !== selectedCard)
        targetRoom.playersCards[username] = playerHand
        ioRef.emit('card-dropped', targetRoom)
    }
}
