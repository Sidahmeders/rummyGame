const { createDeck, shuffleTheDeck } = require('../cards54')
const getJsonData = require('../utils/getJsonData')

module.exports = function getTheInitialRoomData(res, roomName, inMemoryActiveGames) {
    if (!roomName) {
        const errorMsg = 'no roomName is provided'
        res.status(400).json({error: errorMsg})
    } else {
        getRoomData(roomName, inMemoryActiveGames)
        res.status(200).json({ data: inMemoryActiveGames[roomName] })
    }
}

function getRoomData(roomName, inMemoryActiveGames) {
    let roomsData = getJsonData()

    if (!inMemoryActiveGames[roomName]) { // this will prevent the recreation of playingCards on page referesh
        roomsData = JSON.parse(roomsData)
        const targetRoom = roomsData.filter(room => room.roomName === roomName)[0] 
        const players = targetRoom ? targetRoom.players : []

        const playingCards = shuffleTheDeck(createDeck())
        handlePlayingGame(roomName, playingCards, players, inMemoryActiveGames)
    }
}

function handlePlayingGame(roomName, deckOfCards, players, inMemoryActiveGames) {
    const playersCards = {}
    players.forEach(player => {
        playersCards[player] = deckOfCards.splice(0, 8)
    })
    
    inMemoryActiveGames[roomName] = {
        cards: deckOfCards,
        players,
        playersCards
    }
}
