const store = require('../store')

module.exports = (io, socket) => {
  console.log(`user:: ${socket.id} ::disconnected`)
  const playersIds = store.getPlayersIds()

  for (let username in playersIds) {
    let id = playersIds[username]
    if (id === socket.id) {
      console.log(username + ':' + id, 'is gonna be deleted')
      delete playersIds[username]
    }
  }

  io.emit('peers:disconnect', playersIds)
}
