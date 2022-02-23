module.exports = {
  roomsCollection: {
    onlinePlayers: {},
    testRoom: {
      password: '1234',
      deckCards: [],
      players: {
        yousef: {
          cards: [],
          isOnline: false,
          turnToPick: false,
        },
        amine: {
          cards: [],
          isOnline: false,
          turnToPick: false,
        },
        yassine: {
          cards: [],
          isOnline: false,
          turnToPick: false,
        },
      },
    },
  },

  getRoomData(roomName) {
    const targetRoom = this.roomsCollection[roomName]
    return Object(targetRoom)
  },

  setRoomData(roomName, newRoomData) {
    let oldRoomData = Object(this.roomsCollection[roomName])
    this.roomsCollection[roomName] = Object.assign(oldRoomData, newRoomData)
  },

  joinPlayers(roomName, dbPlayers, deckCards) {
    const targetRoom = this.roomsCollection[roomName]

    dbPlayers.forEach((username) => {
      const roomPlayers = targetRoom?.players
      const playerCards = roomPlayers[username]?.cards

      if (!playerCards) playerCards = deckCards.splice(0, 14)
    })
  },
}
