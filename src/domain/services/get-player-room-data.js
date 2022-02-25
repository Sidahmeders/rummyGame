module.exports = ({ InMemoryGames, Player }) => {
  return (roomName, username) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)

    const players = Object.keys(targetRoom?.players)
    const player = new Player(targetRoom?.players[username])
    const cards = targetRoom?.cardsDeck

    const userData = { playerCards: player.cards, players, cards }
    return userData
  }
}
