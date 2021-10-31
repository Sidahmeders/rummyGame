const inMemoryActiveGames = require('../data/inMemoryGames')
let ioRef

module.exports = function handleCardPickup({ io, roomName, username }) {
    ioRef = io
    const targetRoom = inMemoryActiveGames[roomName]
    if (!targetRoom) {
        ioRef.emit(
            'room-error',
            'this room is empty, something unexpected happens. please try again'
        )
    } else {
        addNewCardToPlayersDeck(username, targetRoom)
    }
}

function addNewCardToPlayersDeck(username, targetRoom) {
    const { cards, playersCards } = targetRoom
    const pickedCard = cards.pop()
    const playerHand = playersCards[username]

    if (playerHand.length >= 9) {
        ioRef.emit('room-error', 'please drop a card before you can pick again')
    } else {
        playerHand.push(pickedCard)
        ioRef.emit('card-dragged', targetRoom)
    }
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
