module.exports = ({ InMemoryGames }) => {
  return (roomName) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    const roomPlayers = Object(targetRoom.players)
    const onlinePlayers = JSON.parse(JSON.stringify(roomPlayers))

    for (let playerName in onlinePlayers) {
      delete onlinePlayers[playerName].cards
    }

    return onlinePlayers
  }
}
