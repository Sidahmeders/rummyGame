module.exports = {
  roomsCollection: {
    onlinePlayers: {},
    testRoom: {
      // cards: [],
      // playersCards: { yousef: [], amine: [], yassine: [] },

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
    return targetRoom
  },

  setRoomData(roomName, newRoomData) {
    let oldRoomData = new Object(this.roomsCollection[roomName])
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

  createNewRoom({ roomName, dbPlayers, deckCards }) {},
}
