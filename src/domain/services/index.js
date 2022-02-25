const { InMemoryGames, roomsDB } = require('../../infrastructure/store')
const { Player } = require('../valueObjects')
const { createDeck, shuffleDeck } = require('../shared')

const makeGetPlayerRoomData = require('./get-player-room-data')
const makeUpdateInMemoryRoom = require('./update-inMemory-room')
const makeJoinRoom = require('./join-room')
const makeDragCard = require('./drag-card')
const makeDropCard = require('./drop-card')
const makeCheckPlayersTurn = require('./check-players-turn')
const makeUpdateOnlinePlayers = require('./update-online-players')
const makeGetPlayersStatus = require('./get-players-status')

const getPlayerRoomData = makeGetPlayerRoomData({ InMemoryGames, Player })
const updateInMemoryRoom = makeUpdateInMemoryRoom({ roomsDB, InMemoryGames, Player, createDeck, shuffleDeck })
const joinRoom = makeJoinRoom({ roomsDB })
const dragCard = makeDragCard({ InMemoryGames })
const dropCard = makeDropCard({ InMemoryGames })
const checkPlayersTurn = makeCheckPlayersTurn({ InMemoryGames })
const { addOnlinePlayer, removeOnlinePlayer } = makeUpdateOnlinePlayers({ InMemoryGames })
const getPlayersStatus = makeGetPlayersStatus({ InMemoryGames })

module.exports = {
  getPlayerRoomData,
  updateInMemoryRoom,
  joinRoom,
  dragCard,
  dropCard,
  checkPlayersTurn,
  addOnlinePlayer,
  removeOnlinePlayer,
  getPlayersStatus,
}
