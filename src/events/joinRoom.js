const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')

module.exports = function joinRoom(io, socket, payload) {
  let { roomName, password, username } = payload

  if (!roomName || !password || !username) {
    socket.emit('rooms:error', 'please fill in the password and username')
  } else {
    username = username.replace(/\s/g, '') // remove spaces from the username
    validateAndJoinRoom({ socket, roomName, password, username })
  }
}

async function validateAndJoinRoom({ socket, roomName, password, username }) {
  const roomsData = JSON.parse(readJsonData())
  const room = roomsData[roomName]

  let roomPlayers = room.players,
    roomPassword = room.password

  const isValidPassword = roomPassword === password
  const isValidUsername = roomPlayers.indexOf(username) == -1
  const isValidRoom = roomPlayers.length < 4

  if (!isValidRoom) {
    socket.emit('rooms:error', 'this room is full, please try another one')
  } else if (!isValidUsername) {
    socket.emit('rooms:error', 'this username already exist')
  } else if (!isValidPassword) {
    socket.emit('rooms:error', 'the given password is wrong')
  } else {
    roomPlayers.push(username)
    await writeJsonData(roomsData, 'new player has been added...')
    socket.emit('rooms:joined', roomName, username)
  }
}
