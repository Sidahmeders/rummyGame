const { updateRoomData, addOnlinePlayers, getPlayerRoomData } = require('../../domain/services')

module.exports = async ({ payload, wsEventEmitter, events }) => {
  try {
    const { roomName, username } = payload
    if (!roomName || !username) throw Error('roomName or username is null or undefined')
    wsEventEmitter.joinSocketRooms(roomName)

    const onlinePlayers = addOnlinePlayers(username, wsEventEmitter.socket.id)
    wsEventEmitter.broadcastToRoom(roomName, events.peersConnect, onlinePlayers)

    await updateRoomData(roomName)
    const userData = getPlayerRoomData(roomName, username)
    wsEventEmitter.broadcastToRoom(roomName, events.roomsJoined, userData)
  } catch (err) {
    wsEventEmitter.emit(events.roomsError, err.message)
  }
}
