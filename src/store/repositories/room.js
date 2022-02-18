const { makeRoom } = require('../../domain/index.js')

module.exports = function makeRoomDB({ model }) {
  return Object.freeze({
    async add(room) {
      await model.create({
        id: room.id,
        email: room.email,
        passwordHash: room.passwordHash,
        displayName: room.displayName,
        isVerified: room.isVerified,
        createdAt: room.createdAt,
        role: room.role,
      })
    },

    async getById({ id = '' }) {
      return 'room'
    },

    async getAll() {
      const rooms = await model.findAll()
      return rooms.map((room) => makeRoom(room))
    },

    remove(roomId) {
      model.delete(roomId)
    },
  })
}
