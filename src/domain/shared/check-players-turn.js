const { InMemoryGames } = require('../../infrastructure/store')

module.exports = (roomName, username) => {
  const targetRoom = InMemoryGames.getRoomData(roomName)
  const players = targetRoom?.players || new Object()
  let isPlayerTurn, nextPlayerName

  for (let playerName in players) {
    if (playerName === username) {
      isPlayerTurn = Boolean(players[playerName].turnToPick)
      players[playerName].turnToPick = false
    } else if (isPlayerTurn && !nextPlayerName) nextPlayerName = playerName
  }

  if (isPlayerTurn) {
    if (nextPlayerName) players[nextPlayerName].turnToPick = true
    else {
      for (let playerName in players) {
        players[playerName].turnToPick = true
        break
      }
    }
  }

  return isPlayerTurn
}
