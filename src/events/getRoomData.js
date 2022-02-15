const store = require('../store')

module.exports = ({ io, socket, payload, events }) => {
  try {
    const { roomName, username } = payload
    if (!roomName || !username) throw Error('roomName or username is null or undefined')

    store.joinSocketRooms(io, socket, roomName, username)
    store.setRoomData(roomName)
    const userData = store.getPlayerRoomData(roomName, username)

    io.in(roomName).emit(events.roomsJoined, userData)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}
