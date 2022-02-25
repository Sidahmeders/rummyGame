module.exports = ({ InMemoryGames }) => {
  return (roomName) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    const players = Object(targetRoom.players)
    const playersStatus = JSON.parse(JSON.stringify(players))

    for (let playerName in playersStatus) {
      delete playersStatus[playerName].cards
    }

    return playersStatus
  }
}
