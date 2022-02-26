module.exports = ({ InMemoryGames }) => {
  return (roomName, username, cardToDrop) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    const { players } = targetRoom

    let playerCards = players[username]?.cards
    if (playerCards.length <= 14) throw Error('make sure you have picked a card before you can drop')

    const newPlayerHand = playerCards.filter((card) => card !== cardToDrop)
    players[username].cards = newPlayerHand
  }
}
