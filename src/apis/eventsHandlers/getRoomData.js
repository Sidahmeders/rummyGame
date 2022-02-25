const { updateInMemoryRoom, addOnlinePlayer, getPlayerRoomData, getPlayersStatus } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  return async (payload) => {
    try {
      const { roomName, username } = payload
      if (!roomName || !username) throw Error('roomName or username is null or undefined')

      wsEventEmitter.joinSocketRooms(username, roomName)
      await updateInMemoryRoom(roomName)

      addOnlinePlayer(roomName, username)
      const onlinePlayers = getPlayersStatus(roomName)
      wsEventEmitter.broadcastToRoom(roomName, events.peersConnect, onlinePlayers)

      const userData = getPlayerRoomData(roomName, username)
      wsEventEmitter.emit(events.roomsJoined, userData)
    } catch (err) {
      wsEventEmitter.emit(events.roomsError, err.message)
      console.error(err)
    }
  }
}
