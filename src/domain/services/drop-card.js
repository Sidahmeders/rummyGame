module.exports = ({ InMemoryGames }) => {
  return (roomName, username, cardToDrop) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const { players } = targetRoom
    let playerHand = players[username]?.cards
    if (playerHand.length <= 14) throw Error('make sure you have picked a card before you can drop')

    playerHand = playerHand.filter((card) => card !== cardToDrop)
    players[username].cards = playerHand
  }
}
