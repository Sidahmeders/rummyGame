module.exports = ({ InMemoryGames }) => {
  return Object.freeze({
    addOnlinePlayer: (roomName, username) => {
      const targetRoom = InMemoryGames.getRoomData(roomName)
      const players = targetRoom.players || new Object()

      for (let playerName in players) {
        if (playerName === username) players[playerName].isOnline = true
      }
    },

    removeOnlinePlayer: (socket) => {
      const { roomName, username } = socket
      const targetRoom = InMemoryGames.getRoomData(roomName)

      const players = targetRoom.players || new Object()
      if (players[username]) players[username].isOnline = false
    },
  })
}
