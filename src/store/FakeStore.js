const createDeck54 = require('../utils/cards54')
const writeJsonData = require('../utils/writeJsonData')
const readJsonData = require('../utils/readJsonData')

const inMemoryGames = {
  playersIds: {},
  testRoom: {
    password: '1234',
    cards: [],
    playersCards: { yousef: [], amine: [], yassine: [] },
    players: ['yousef', 'amine', 'yassine'],
  },
}

const fakeDB = {
  users: {
    testUser1: {
      id: 1,
      username: 'testUserName',
      socketId: '#44khsXefk!s&kd9',
      owendRoomsIds: ['testRoom', 'coolRoom'],
      hashPassword: 'pass123',
      onlineStatus: false,
    },
  },
  rooms: {
    testRoom1: {
      password: '1234',
      players: ['sodium', 'sidahmed'],
    },
  },
  onlinePlayers: { '89DmrenV23#rm': { userName: 'testUser2', room: 'testRoom99' } },
}

class FakeStore {
  async createRoom(roomName, password) {
    let roomsData = this.queryDB('rooms')
    if (roomsData[roomName]) throw Error('room name already exist..')
    // handle pushing new rooms to database
    roomsData[roomName] = { password, players: [] }
    // write back the new data to our json file
    await this.persistData('rooms', roomsData, 'new room has been added...')
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

  async joinRoom(roomName, password, username) {
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
    await this.persistData('rooms', roomsData, 'new player has been added...')
  }

  getRoomByName(roomName) {
    return inMemoryGames[roomName]
  }

  getPlayersIds() {
    return inMemoryGames.playersIds
  }

  getAllRooms() {
    const rooms = this.queryDB('rooms')
    return rooms
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

  async persistData(fileName, data, message) {
    await writeJsonData(fileName, data, message)
  }

  queryDB(fileName) {
    return JSON.parse(readJsonData(fileName))
  }
}

module.exports = FakeStore
