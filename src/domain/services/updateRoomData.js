module.exports = ({ roomsDB, InMemoryGames, Player, createDeck54 }) => {
  return async (roomName) => {
    const rooms = await roomsDB.listRooms()
    const dbPlayers = rooms[roomName]?.players

    const targetRoom = InMemoryGames.getRoomData(roomName)

    let cardsDeck = targetRoom?.cardsDeck ? targetRoom.cardsDeck : createDeck54(2)
    let roomPlayers = targetRoom?.players ? targetRoom.players : new Object()

    dbPlayers.forEach((username) => {
      if (!roomPlayers[username]) {
        const cards = cardsDeck.splice(0, 14)
        const newPlayer = new Player({ cards })
        roomPlayers[username] = newPlayer
      }
    })

    const newRoomData = { cardsDeck, players: roomPlayers }
    InMemoryGames.setRoomData(roomName, newRoomData)
  }
}
