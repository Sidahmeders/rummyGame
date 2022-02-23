const { InMemoryGames, roomsDB } = require('../../infrastructure/store')
const { Player } = require('../valueObjects')

const createDeck54 = require('../shared/createDeck54')

const makeGetPlayerRoomData = require('./getPlayerRoomData')
const makeUpdateRoomData = require('./updateRoomData')
const makeJoinRoom = require('./joinRoom')
const makeDragCard = require('./dragCard')
const makeDropCard = require('./dropCard')
const makeUpdateOnlinePlayers = require('./updateOnlinePlayers')

const getPlayerRoomData = makeGetPlayerRoomData({ InMemoryGames, Player })
const updateRoomData = makeUpdateRoomData({ roomsDB, InMemoryGames, Player, createDeck54 })
const joinRoom = makeJoinRoom({ roomsDB })
const dragCard = makeDragCard({ InMemoryGames })
const dropCard = makeDropCard({ InMemoryGames })
const { addOnlinePlayers, removeOnlinePlayers } = makeUpdateOnlinePlayers({ InMemoryGames })

module.exports = { getPlayerRoomData, updateRoomData, joinRoom, dragCard, dropCard, addOnlinePlayers, removeOnlinePlayers }
