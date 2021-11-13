const { createDeck, shuffleTheDeck } = require('../cards54')
const readJsonData = require('../utils/readJsonData')
const inMemoryGames = require('../store/inMemoryGames.js')

module.exports = function getRoomNameData({ io, socket, roomName }) {
    socket.join(roomName)

    if (!roomName) {
        socket.emit('room-error', 'roomName is null or undefined')
    } else {
        setRoomData(roomName, inMemoryGames)
        io.in(roomName).emit('user-joined-room', inMemoryGames[roomName])
    }
}

function setRoomData(roomName, inMemoryGames) {
    const roomsData = JSON.parse(readJsonData())

    const targetRoom = inMemoryGames[roomName]
    const { players } = roomsData[roomName]
    let deckOfCards,
        playersCards = {}

    if (!targetRoom) {
        deckOfCards = shuffleTheDeck(createDeck())
    } else {
        deckOfCards = targetRoom.cards
        playersCards = targetRoom.playersCards
    }

    players.forEach((username) => {
        if (!playersCards[username]) {
            playersCards[username] = deckOfCards.splice(0, 8)
        }
    })

    inMemoryGames[roomName] = {
        cards: deckOfCards,
        players,
        playersCards,
    }
}
