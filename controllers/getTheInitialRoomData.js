const { createDeck, shuffleTheDeck } = require('../cards54')
const readJsonData = require('../utils/readJsonData')

// TODO: Make getting the Initial room data as a Triggerd Event.

module.exports = function getTheInitialRoomData(res, roomName, inMemoryActiveGames) {
    if (!roomName) {
        res.status(400).json({ errorMsg: 'no roomName is provided' })
    } else {
        setRoomData(roomName, inMemoryActiveGames)
        res.status(200).json({ data: inMemoryActiveGames[roomName] })
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
