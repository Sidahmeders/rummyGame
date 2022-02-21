const { joinRoom } = require('../../domain/services')

module.exports = async ({ payload, wsEventEmitter, events }) => {
  try {
    let { roomName, password, username } = payload
    if (!roomName || !password || !username) throw Error('please fill in the password and username')
    username = username.replace(/\s/g, '') // remove spaces from the username

    await joinRoom(roomName, password, username)

    wsEventEmitter.emit(events.roomsJoined, { roomName, username })
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
  }
}
