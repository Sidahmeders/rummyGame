const { removeOnlinePlayers } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)

  const onlinePlayers = removeOnlinePlayers(wsEventEmitter.socket.id)

  wsEventEmitter.broadcastAll(events.peersDisconnect, onlinePlayers) // FIXME: send to target rooms only
}
