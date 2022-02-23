module.exports = ({ InMemoryGames }) => {
  let onlinePlayers = InMemoryGames?.roomsCollection?.onlinePlayers

  return Object.freeze({
    addOnlinePlayers: (username, socketID) => {
      if (!onlinePlayers) onlinePlayers = {}
      else onlinePlayers[username] = socketID
      return onlinePlayers
    },

    removeOnlinePlayers: (socketID) => {
      for (let key in onlinePlayers) {
        const playerId = onlinePlayers[key]
        if (playerId === socketID) delete onlinePlayers[key]
      }
      return onlinePlayers
    },
  })
}
