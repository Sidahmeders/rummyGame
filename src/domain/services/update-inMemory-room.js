module.exports = ({ roomsDB, InMemoryGames, Player, createDeck, shuffleDeck }) => {
  return async (roomName) => {
    const rooms = await roomsDB.listRooms()
    const dbPlayers = rooms[roomName]?.players
    const targetRoom = InMemoryGames.getRoomData(roomName)

    const cardsDeck = targetRoom?.cardsDeck ? targetRoom.cardsDeck : shuffleDeck(createDeck(2))
    const roomPlayers = Object(targetRoom.players)
    const roomSize = Object.keys(roomPlayers).length
    const isReady = targetRoom.isReady

    dbPlayers.forEach((username, index) => {
      if (!roomPlayers[username]) {
        const newPlayer = new Player({ cards: cardsDeck.splice(0, 14) })
        roomPlayers[username] = newPlayer
      }

      // check if the room is full and give permission to one player to start
      if (roomSize == 3 && index === 0 && !isReady) {
        roomPlayers[username].turnToPick = true
        targetRoom.isReady = true
      }
    })

    const newRoomData = { cardsDeck, players: roomPlayers }
    InMemoryGames.setRoomData(roomName, newRoomData)
  }
}
