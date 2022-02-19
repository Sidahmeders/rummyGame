const createDeck54 = require('../utils/cards54')
const writeJsonData = require('../utils/writeJsonData')
const readJsonData = require('../utils/readJsonData')

const indexXX = require('./index-xx.js')
const { roomsDB } = indexXX

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
    const roomsData = this.queryDB('rooms')
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

  joinRoom(roomName, password, username) {
    const roomsData = this.queryDB('rooms')
    const room = roomsData[roomName]
    const roomPlayers = room.players
    const roomPassword = room.password

    const isValidPassword = roomPassword === password
    const isValidUsername = roomPlayers.indexOf(username) == -1
    const isValidRoom = roomPlayers.length < 4

    if (!isValidRoom) throw Error('this room is full, please try another one')
    if (!isValidUsername) throw Error('this username already exist')
    if (!isValidPassword) throw Error('the given password is wrong')

    roomPlayers.push(username)
    this.persistData('rooms', roomsData, 'new player has been added...')
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

  persistData(fileName, data, message) {
    writeJsonData(fileName, data, message)
  }

  queryDB(fileName) {
    return JSON.parse(readJsonData(fileName))
  }
}

module.exports = FakeStore
