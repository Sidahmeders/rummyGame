const { makeRoom } = require('../../../domain/entities/index.js')

module.exports = function makeRoomsDB({ model }) {
  return Object.freeze({
    async addRoom(room) {
      const newRoom = makeRoom({
        id: room.id,
        roomName: room.roomName,
        password: room.password,
        players: room.players,
        createdAt: room.createdAt,
      })
      await model.create(newRoom)
    },

    async findRoom(id) {
      return 'room'
    },

    async listRooms() {
      const rooms = await model.findAll()
      return rooms
    },

    async updateRoom(roomName, newRoom) {
      await model.update(roomName, newRoom)
    },

    // removeRoom(id = '') {
    //   model.delete(id)
    // },
  })
}
