const { removeOnlinePlayers } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)

  const onlinePlayers = removeOnlinePlayers(wsEventEmitter.socket)
  wsEventEmitter.broadcastToRoom(wsEventEmitter.socket.roomName, events.peersDisconnect, onlinePlayers)
}
