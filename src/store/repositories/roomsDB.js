const { makeRoom } = require('../../domain/index.js')

module.exports = function makeRoomsDB({ model }) {
  return Object.freeze({
    async add(room) {
      model.create({
        id: room.id,
        roomName: room.roomName,
        password: room.password,
        createdAt: room.createdAt,
      })
    },

    async getAll() {
      const rooms = model.findAll()
      return rooms.map((room) => makeRoom(room))
    },

    async getById(id = '') {
      return 'room'
    },

    remove(id = '') {
      model.delete(id)
    },
  })
}
