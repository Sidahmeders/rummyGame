const { InMemoryGames, roomsDB } = require('../../infrastructure/store')
const { Player } = require('../valueObjects')

const createDeck54 = require('../shared/createDeck54')

const makeGetPlayerRoomData = require('./get-player-room-data')
const makeUpdateRoomData = require('./update-RoomData')
const makeJoinRoom = require('./join-room')
const makeDragCard = require('./drag-card')
const makeDropCard = require('./drop-card')
const makeUpdateOnlinePlayers = require('./update-online-players')

const getPlayerRoomData = makeGetPlayerRoomData({ InMemoryGames, Player })
const updateRoomData = makeUpdateRoomData({ roomsDB, InMemoryGames, Player, createDeck54 })
const joinRoom = makeJoinRoom({ roomsDB })
const dragCard = makeDragCard({ InMemoryGames })
const dropCard = makeDropCard({ InMemoryGames })
const { addOnlinePlayers, removeOnlinePlayers } = makeUpdateOnlinePlayers({ InMemoryGames })

module.exports = { getPlayerRoomData, updateRoomData, joinRoom, dragCard, dropCard, addOnlinePlayers, removeOnlinePlayers }
