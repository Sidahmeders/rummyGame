module.exports = ({ InMemoryGames, checkPlayersTurn }) => {
  return (roomName, username) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    if (!targetRoom) throw Error('something unexpected happens. please refresh the page')

    const isPlayerTurn = checkPlayersTurn(roomName, username)
    if (!isPlayerTurn) throw Error('please wait for your Turn To Pick')

    const { cardsDeck, players } = targetRoom
    const playerHand = players[username]?.cards

    const pickedCard = cardsDeck.pop()

    if (playerHand.length >= 15) throw Error('please drop a card before you can pick again')
    if (!pickedCard) throw Error('the cards deck is empty')

    playerHand.push(pickedCard)
  }
}
