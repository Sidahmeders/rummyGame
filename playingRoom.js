const path = require('path')
const fs = require('fs')
const { createDeck, shuffleTheDeck } = require('./cards54')

function getRoomData(roomName, inMemoryActiveGames) {
    let roomsData = fs.readFileSync(path.join(`${__dirname}/data`, 'rooms.json'), 'utf8', (err, data) => {
        if(err) throw err
        return data
    })
    roomsData = JSON.parse(roomsData)
    const { players } = roomsData.filter(room => room.roomName === roomName)[0]

    const playingCards = shuffleTheDeck(createDeck())
    handlePlayingGame(roomName, playingCards, players, inMemoryActiveGames)
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

module.exports = {
    getRoomData
}