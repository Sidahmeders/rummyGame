const { InMemoryGames } = require('../../infrastructure/store')

module.exports = ({ wsEventEmitter, events }) => {
  console.log(`user:: ${wsEventEmitter.socket.id} ::disconnected`)
  const playersIds = InMemoryGames.playersIds

  for (let username in playersIds) {
    let id = playersIds[username]
    if (id === wsEventEmitter.socket.id) {
      console.log(username + ':' + id, 'is gonna be deleted')
      delete playersIds[username]
    }
  }

  wsEventEmitter.broadcastAll(events.peersDisconnect, playersIds) // FIXME: send to target rooms only
}
