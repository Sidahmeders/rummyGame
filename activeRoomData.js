
module.exports = function handleActiveRoomDataChange(req, inMemoryActiveGames) {
    const io = req.app.get('socketio')

    io.on('connection', (socket) => {
        socket.on('player-drags-card', (roomName, username) => {
            console.log(username, inMemoryActiveGames[roomName]) // LOGGING DATA
            addNewCardToPlayersDeck(username, inMemoryActiveGames[roomName])
            io.emit('deck-changed', inMemoryActiveGames[roomName])
        })
    })
}

function addNewCardToPlayersDeck(username, targetRoom) {
    const { cards, playersCards } = targetRoom
    const pickedCard = cards.pop()
    playersCards[username].push(pickedCard)
}

function dropCardFromPlayersDeck(username, selectedCard, targetRoom) {
  const { playersCards } = targetRoom
  let playerHand = playersCards[username]
  playerHand = playerHand.filter(card => card !== selectedCard)
  targetRoom[username] = playerHand
}

/*
{
  cards: [
    'H9', 'D9',      'D3', 'H2',
    'S5', 'S2',      'C8', 'H4',
    'SJ', 'CK',      'S7', 'SK',
    'H8', 'CQ',      'HJ', 'HQ',
    'DJ', 'S9',      'S3', 'C5',
    'D7', 'ST',      'H6', 'C6',
    'DK', 'D4',      'D2', 'CA',
    'D6', 'HT',      'S4', 'SQ',
    'C3', 'Joker-2', 'SA', 'HA',
    'C7', 'Joker-1'
  ],
  players: [ 'kaiba', 'kaboto' ],
  playersCards: {
    kaiba: [
      'H7', 'HK', 'C9',
      'CT', 'D8', 'CJ',
      'S6', 'H3'
    ],
    kaboto: [
      'H5', 'C2', 'DT',
      'C4', 'DA', 'S8',
      'DQ', 'D5'
    ]
  }
}
*/
