const createDeck54 = require('./cards54')
const InMemoryGames = require('../../infrastructure/store/InMemoryGames')
const { roomsDB } = require('../../infrastructure/store')

const makeGetPlayerRoomData = require('./getPlayerRoomData')
const makeSetRoomData = require('./setRoomData')
const makeJoinRoom = require('./joinRoom')
const makeJoinSocketRooms = require('./joinSocketRooms')

module.exports = {
  getPlayerRoomData: makeGetPlayerRoomData({ InMemoryGames }),
  setRoomData: makeSetRoomData({ roomsDB, createDeck54, InMemoryGames }),
  joinRoom: makeJoinRoom({ roomsDB }),
  joinSocketRooms: makeJoinSocketRooms({ InMemoryGames }),
}
