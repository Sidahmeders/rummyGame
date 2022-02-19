module.exports = function buildMakeRoom({ getUniqueId }) {
  return function makeRoom({ id = getUniqueId(), password, roomName = '', createdAt = Date.now() }) {
    if (!id) throw Error('Room must have an id')
    if (!roomName) throw Error('Room must have a roomName')
    if (!password) throw Error('Room must have a password')

    return Object.freeze({
      get id() {
        return id
      },
      get roomName() {
        return roomName
      },
      get password() {
        return password
      },
      get createdAt() {
        return createdAt
      },
    })
  }
}
