const { updateRoomData, addOnlinePlayers, getPlayerRoomData } = require('../../domain/services')

module.exports = async ({ payload, wsEventEmitter, events }) => {
  try {
    const { roomName, username } = payload
    if (!roomName || !username) throw Error('roomName or username is null or undefined')

    wsEventEmitter.joinSocketRooms(roomName)
    await updateRoomData(roomName)

    const onlinePlayers = addOnlinePlayers(roomName, username, wsEventEmitter.socket)
    wsEventEmitter.broadcastToRoom(roomName, events.peersConnect, onlinePlayers)

    const userData = getPlayerRoomData(roomName, username)
    wsEventEmitter.emit(events.roomsJoined, userData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
    console.error(err)
  }
}
