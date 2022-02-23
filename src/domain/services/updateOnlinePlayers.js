module.exports = ({ InMemoryGames }) => {
  return Object.freeze({
    addOnlinePlayers: (roomName, username, socket) => {
      socket.roomName = roomName
      socket.username = username

      const roomData = InMemoryGames.getRoomData(roomName)
      const players = roomData.players || new Object()

      const onlinePlayers = {}
      for (let playerName in players) {
        if (playerName === username) players[playerName].isOnline = true
        if (players[playerName].isOnline) onlinePlayers[playerName] = true
      }

      return onlinePlayers
    },

    removeOnlinePlayers: (socket) => {
      const { roomName, username } = socket
      const roomData = InMemoryGames.getRoomData(roomName)

      const players = roomData.players || new Object()
      if (players[username]) players[username].isOnline = false

      const onlinePlayers = {}
      for (let playerName in players) {
        if (players[playerName].isOnline) onlinePlayers[playerName] = true
      }

      return onlinePlayers
    },
  })
}
