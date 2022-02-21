const createDeck54 = require('./cards54')
const InMemoryGames = require('../../infrastructure/store/InMemoryGames')
const { roomsDB } = require('../../infrastructure/store')

const makeGetPlayerRoomData = require('./getPlayerRoomData')
const makeSetRoomData = require('./setRoomData')
const makeJoinRoom = require('./joinRoom')

const getPlayerRoomData = makeGetPlayerRoomData({ InMemoryGames })
const setRoomData = makeSetRoomData({ roomsDB, InMemoryGames, createDeck54 })
const joinRoom = makeJoinRoom({ roomsDB })

module.exports = { getPlayerRoomData, setRoomData, joinRoom }
