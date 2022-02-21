const { updateOnlinePlayers } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)

  const onlinePlayers = updateOnlinePlayers.remove(wsEventEmitter.socket.id)

  wsEventEmitter.broadcastAll(events.peersDisconnect, onlinePlayers) // FIXME: send to target rooms only
}
