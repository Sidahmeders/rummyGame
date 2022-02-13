const createDeck54 = require('../utils/cards54')
const readJsonData = require('../utils/readJsonData')
const getPlayerData = require('../utils/getPlayerData')
const inMemoryGames = require('../store/inMemoryGames.js')

module.exports = ({ io, socket, payload, events }) => {
  const { roomName, username } = payload

  if (!roomName) {
    socket.emit(events.roomsError, 'roomName is null or undefined')
  } else {
    setRoomData(roomName, inMemoryGames)
    const userData = getPlayerData(username, roomName)
    io.in(roomName).emit(events.roomsJoined, userData)
  }
}

function setRoomData(roomName, inMemoryGames) {
  const roomsData = JSON.parse(readJsonData())

  const targetRoom = inMemoryGames[roomName]
  let deckOfCards = targetRoom ? targetRoom.cards : createDeck54(2)
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