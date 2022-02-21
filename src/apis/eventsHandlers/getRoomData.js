const { setRoomData, getPlayerRoomData } = require('../../domain/services')

module.exports = async ({ payload, wsEventEmitter, events }) => {
  try {
    const { roomName, username } = payload
    if (!roomName || !username) throw Error('roomName or username is null or undefined')

    wsEventEmitter.joinSocketRooms(username, roomName)

    await setRoomData(roomName)

    const userData = getPlayerRoomData(roomName, username)

    wsEventEmitter.broadcastToRoom(roomName, events.roomsJoined, userData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
  }
}
