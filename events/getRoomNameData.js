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
  let deckOfCards = targetRoom ? targetRoom.cards : shuffleTheDeck(createDeck())
  let playersCards = targetRoom ? targetRoom.playersCards : new Object()

  const { players } = roomsData[roomName]
  players.forEach((username) => {
    if (!playersCards[username]) {
      playersCards[username] = deckOfCards.splice(0, 14)
    }
  })

  inMemoryGames[roomName] = {
    cards: deckOfCards,
    playersCards,
    players,
  }
}
