module.exports = ({ roomsDB, createDeck54, InMemoryGames }) => {
  return async (roomName) => {
    const rooms = await roomsDB.listRooms()
    const targetRoom = InMemoryGames[roomName]
    let deckOfCards = targetRoom ? targetRoom.cards : createDeck54(2)
    let playersCards = targetRoom ? targetRoom.playersCards : new Object()

    const { players } = rooms[roomName]
    players.forEach((username) => {
      if (!playersCards[username]) {
        playersCards[username] = deckOfCards.splice(0, 14)
      }
    })

    InMemoryGames[roomName] = {
      cards: deckOfCards,
      playersCards,
      players,
    }
  }
}
