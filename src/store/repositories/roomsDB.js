const { makeRoom } = require('../../domain/index.js')

module.exports = function makeRoomsDB({ model }) {
  return Object.freeze({
    async addRoom(room) {
      model.create({
        id: room.id,
        roomName: room.roomName,
        password: room.password,
        createdAt: room.createdAt,
      })
    },

    async findRoom({ id = '', roomName = '' }) {
      return 'room'
    },

    async listRooms() {
      const rooms = await model.findAll()
      return rooms
    },

    // updateRoom(id) {
    //   model.update(id)
    // },

    // removeRoom(id = '') {
    //   model.delete(id)
    // },
  })
}
