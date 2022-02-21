const createDeck54 = require('./cards54')
const { InMemoryGames } = require('../../infrastructure/store')
const { roomsDB } = require('../../infrastructure/store')

const makeGetPlayerRoomData = require('./getPlayerRoomData')
const makeUpdateRoomData = require('./updateRoomData')
const makeUpdateOnlinePlayers = require('./updateOnlinePlayers')
const makeJoinRoom = require('./joinRoom')

const getPlayerRoomData = makeGetPlayerRoomData({ InMemoryGames })
const updateRoomData = makeUpdateRoomData({ roomsDB, InMemoryGames, createDeck54 })
const updateOnlinePlayers = makeUpdateOnlinePlayers({ InMemoryGames })
const joinRoom = makeJoinRoom({ roomsDB })

module.exports = { getPlayerRoomData, updateRoomData, updateOnlinePlayers, joinRoom }
