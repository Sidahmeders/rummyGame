const { roomsDB } = require('../../infrastructure/store')

const makeCreateRooms = require('./createRooms')
const makeGetAllRooms = require('./getAllRooms')

module.exports = {
  createRooms: makeCreateRooms({ roomsDB }),
  getAllRooms: makeGetAllRooms({ roomsDB }),
}
