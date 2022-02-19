const createDeck54 = require('../utils/cards54')
const { roomsDB } = require('./index-xx.js')

const inMemoryGames = {
  playersIds: {},
  testRoom: {
    password: '1234',
    cards: [],
    playersCards: { yousef: [], amine: [], yassine: [] },
    players: ['yousef', 'amine', 'yassine'],
  },
}

class FakeStore {
  async createRoom(roomName, password) {
    await roomsDB.addRoom({ roomName, password })
  }

  async getAllRooms() {
    const rooms = await roomsDB.listRooms()
    return rooms
  }

  setRoomData(roomName) {
    const roomsData = this.getAllRooms()
    const targetRoom = inMemoryGames[roomName]
    let deckOfCards = targetRoom ? targetRoom.cards : createDeck54(2)
    let playersCards = targetRoom ? targetRoom.playersCards : new Object()

    const { players } = roomsData[roomName]
    players.forEach((username) => {
      if (!playersCards[username]) {
        playersCards[username] = deckOfCards.splice(0, 14)
      }
    })

    inMemoryGames[roomName] = {
      cards: deckOfCards,
      playersCards,
      players,
    }
  }

  joinSocketRooms(io, socket, roomName, username) {
    socket.join(roomName)

    let playersIds = inMemoryGames.playersIds
    if (!playersIds) inMemoryGames.playersIds = {}
    else playersIds[username] = socket.id

    io.in(roomName).emit('peers:connect', playersIds)
  }

  async joinRoom(roomName, password, username) {
    const rooms = await this.getAllRooms()
    const room = rooms[roomName]
    const roomPlayers = room.players
    const roomPassword = room.password

    const isValidPassword = roomPassword === password
    const isValidUsername = roomPlayers.indexOf(username) == -1
    const isValidRoom = roomPlayers.length < 4

    if (!isValidRoom) throw Error('this room is full, please try another one')
    if (!isValidUsername) throw Error('this username already exist')
    if (!isValidPassword) throw Error('the given password is wrong')

    roomPlayers.push(username)

    await roomsDB.updateRoom(roomName, room)
  }

  getRoomByName(roomName) {
    return inMemoryGames[roomName]
  }

  getPlayersIds() {
    return inMemoryGames.playersIds
  }

  getPlayerRoomData(roomName, username) {
    const roomData = inMemoryGames[roomName]
    const userData = {
      playerCards: roomData?.playersCards[username],
      players: roomData?.players,
      cards: roomData?.cards,
    }

    return userData
  }
}

module.exports = FakeStore
