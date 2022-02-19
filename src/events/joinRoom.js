const store = require('../store')

module.exports = ({ socket, payload, events }) => {
  try {
    let { roomName, password, username } = payload
    if (!roomName || !password || !username) throw Error('please fill in the password and username')
    username = username.replace(/\s/g, '') // remove spaces from the username

    store.joinRoom(roomName, password, username)
    socket.emit(events.roomsJoined, roomName, username)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}
