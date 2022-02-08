const inMemoryGames = require('../store/inMemoryGames.js')

module.exports = function getPlayerData(username, roomName) {
  const roomNameData = inMemoryGames[roomName]
  const userData = {
    playerCards: roomNameData?.playersCards[username],
    players: roomNameData?.players,
    cards: roomNameData?.cards,
  }

  return userData
}
