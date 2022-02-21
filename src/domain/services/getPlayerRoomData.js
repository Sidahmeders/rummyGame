module.exports = ({ InMemoryGames }) => {
  return (roomName, username) => {
    const roomData = InMemoryGames[roomName]

    const userData = {
      playerCards: roomData?.playersCards[username],
      players: roomData?.players,
      cards: roomData?.cards,
    }

    return userData
  }
}
