const createNewDeck = require('../cards54')
const readJsonData = require('../utils/readJsonData')
const getPlayerData = require('../utils/getPlayerData')
const inMemoryGames = require('../store/inMemoryGames.js')

module.exports = function getRoomData(io, socket, payload) {
  const { roomName, username } = payload

  if (!roomName) {
    socket.emit('room-error', 'roomName is null or undefined')
  } else {
    setRoomData(roomName, inMemoryGames)
    const userData = getPlayerData(username, roomName)
    io.in(roomName).emit('user-joined-room', userData)
  }
}

function setRoomData(roomName, inMemoryGames) {
  const roomsData = JSON.parse(readJsonData())

  const targetRoom = inMemoryGames[roomName]
  let deckOfCards = targetRoom ? targetRoom.cards : createNewDeck(2)
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
