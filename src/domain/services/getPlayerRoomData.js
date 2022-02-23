module.exports = ({ InMemoryGames, Player }) => {
  return (roomName, username) => {
    const roomData = InMemoryGames.getRoomData(roomName)

    const players = Object.keys(roomData?.players)
    const player = new Player(roomData?.players[username])
    const cards = roomData?.deckCards

    const userData = { playerCards: player.cards, players, cards }
    return userData
  }
}
