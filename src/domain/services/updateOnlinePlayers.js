module.exports = ({ InMemoryGames }) => {
  let onlinePlayers = InMemoryGames.onlinePlayers

  return Object.freeze({
    add: (username, socketID) => {
      if (!onlinePlayers) InMemoryGames.onlinePlayers = {}
      else onlinePlayers[username] = socketID
      return onlinePlayers
    },
    remove: (socketID) => {
      for (let key in onlinePlayers) {
        const playerId = onlinePlayers[key]
        if (playerId === socketID) delete onlinePlayers[key]
        return onlinePlayers
      }
    },
  })
}
