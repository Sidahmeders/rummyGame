module.exports = function buildMakeRoom({ getUniqueId }) {
  return function makeRoom({ id = getUniqueId(), password, roomName = '', createdAt = Date.now() }) {
    if (!id) throw new Error('Room must have an id')
    if (!password) throw new Error('Room must have a password')

    return Object.freeze({
      get id() {
        return id
      },
      get createdAt() {
        return createdAt
      },
      get roomName() {
        return roomName
      },
    })
  }
}
