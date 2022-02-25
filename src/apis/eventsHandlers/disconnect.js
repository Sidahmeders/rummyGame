const { removeOnlinePlayer, getPlayersStatus } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  return () => {
    console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)

    removeOnlinePlayer(wsEventEmitter.socket)
    const playersStatus = getPlayersStatus(wsEventEmitter.socket.roomName)
    wsEventEmitter.broadcastToRoom(wsEventEmitter.socket.roomName, events.peersDisconnect, playersStatus)
  }
}
