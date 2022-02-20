const { setRoomData, joinSocketRooms, getPlayerRoomData } = require('../../domain/services')

module.exports = async ({ io, socket, payload, events }) => {
  try {
    const { roomName, username } = payload
    if (!roomName || !username) throw Error('roomName or username is null or undefined')

    joinSocketRooms(io, socket, roomName, username)
    await setRoomData(roomName)
    const userData = getPlayerRoomData(roomName, username)

    io.in(roomName).emit(events.roomsJoined, userData)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}
