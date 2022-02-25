module.exports = ({ InMemoryGames }) => {
  return (roomName, username, cardToDrop) => {
    const targetRoom = InMemoryGames.getRoomData(roomName)
    const { players } = targetRoom

    let playerCards = players[username]?.cards
    if (playerCards.length <= 14) throw Error('make sure you have picked a card before you can drop')

    const newPlayerHand = removeTargetCard(playerCards, cardToDrop)
    players[username].cards = newPlayerHand
  }
}

function removeTargetCard(cardsList, targetCard) {
  const newCardsList = []
  let isFound = false

  for (let card of cardsList) {
    if (!isFound && card === targetCard) isFound = true
    else newCardsList.push(card)
  }

  return newCardsList
}
