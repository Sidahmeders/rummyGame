const { makeRoom } = require('../../domain/index.js')

module.exports = function makeRoomDB({ model }) {
  return Object.freeze({
    async add(room) {
      await model.create({
        id: room.id,
        roomName: room.roomName,
        password: room.password,
        createdAt: room.createdAt,
      })
    },

    async getAll() {
      const rooms = await model.findAll()
      return rooms.map((room) => makeRoom(room))
    },

    async getById(id = '') {
      return 'room'
    },

    remove(id = '') {
      model.delete(roomId)
    },
  })
}
