module.exports = {
  roomsCollection: {
    onlinePlayers: {},
    testRoom: {
      password: '1234',
      cardsDeck: [],
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
    const targetRoom = Object(this.roomsCollection[roomName])
    return targetRoom
  },

  setRoomData(roomName, newRoomData) {
    let oldRoomData = Object(this.roomsCollection[roomName])
    this.roomsCollection[roomName] = Object.assign(oldRoomData, newRoomData)
  },

  getOnlinePlayers(roomName) {
    const targetRoom = this.getRoomData(roomName)
    const roomPlayers = Object(targetRoom.players)
    const onlinePlayers = JSON.parse(JSON.stringify(roomPlayers))

    for (let playerName in onlinePlayers) {
      delete onlinePlayers[playerName].cards
    }

    return onlinePlayers
  },

  joinPlayers(roomName, dbPlayers, cardsDeck) {
    const targetRoom = this.roomsCollection[roomName]

    dbPlayers.forEach((username) => {
      const roomPlayers = targetRoom?.players
      const playerCards = roomPlayers[username]?.cards

      if (!playerCards) playerCards = cardsDeck.splice(0, 14)
    })
  },
}
