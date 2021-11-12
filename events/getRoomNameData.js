const { createDeck, shuffleTheDeck } = require('../cards54')
const readJsonData = require('../utils/readJsonData')
const inMemoryActiveGames = require('../store/inMemoryGames.js')

module.exports = function getTheInitialRoomData({ socket, roomName }) {
    if (!roomName) {
        socket.emit('room-error', 'no roomName is provided')
    } else {
        setRoomData(roomName, inMemoryActiveGames)
        socket.emit('user-joined-room', inMemoryActiveGames[roomName])
    }
}

function setRoomData(roomName, inMemoryActiveGames) {
    const roomsData = JSON.parse(readJsonData())

    const targetRoom = inMemoryActiveGames[roomName]
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

    inMemoryActiveGames[roomName] = {
        cards: deckOfCards,
        players,
        playersCards,
    }
}
