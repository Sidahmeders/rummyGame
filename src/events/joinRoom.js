const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')
const joinRooms = require('../utils/joinRooms')

module.exports = async ({ socket, payload, events }) => {
  try {
    let { roomName, password, username } = payload
    if (!roomName || !password || !username) throw Error('please fill in the password and username')
    username = username.replace(/\s/g, '') // remove spaces from the username
    joinRooms(socket, roomName, username)

    const roomsData = JSON.parse(readJsonData())
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
    await writeJsonData(roomsData, 'new player has been added...')
    socket.emit(events.roomsJoined, roomName, username)
  } catch (err) {
    socket.emit(events.roomsError, err.message)
  }
}
