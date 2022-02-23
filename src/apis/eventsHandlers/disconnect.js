const { removeOnlinePlayers } = require('../../domain/services')

module.exports = ({ wsEventEmitter, events }) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)

  const onlinePlayers = removeOnlinePlayers(wsEventEmitter.socket)

  /** FIXME: send to target rooms only
   * we can map the users socket-id to the room that they joined
   * and then extract that from the socket-id and notify that room only
   */
  wsEventEmitter.broadcastAll(events.peersDisconnect, onlinePlayers)
}
