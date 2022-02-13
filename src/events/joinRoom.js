const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')

module.exports = ({ socket, payload, events }) => {
  let { roomName, password, username } = payload

  if (!roomName || !password || !username) {
    socket.emit(events.roomsError, 'please fill in the password and username')
  } else {
    username = username.replace(/\s/g, '') // remove spaces from the username
    validateAndJoinRoom({ socket, payload, events })
  }
}

async function validateAndJoinRoom({ socket, payload, events }) {
  const { roomName, password, username } = payload
  const roomsData = JSON.parse(readJsonData())
  const room = roomsData[roomName]

  let roomPlayers = room.players,
    roomPassword = room.password

  const isValidPassword = roomPassword === password
  const isValidUsername = roomPlayers.indexOf(username) == -1
  const isValidRoom = roomPlayers.length < 4

  if (!isValidRoom) {
    socket.emit(events.roomsError, 'this room is full, please try another one')
  } else if (!isValidUsername) {
    socket.emit(events.roomsError, 'this username already exist')
  } else if (!isValidPassword) {
    socket.emit(events.roomsError, 'the given password is wrong')
  } else {
    roomPlayers.push(username)
    await writeJsonData(roomsData, 'new player has been added...')
    socket.emit(events.roomsJoined, roomName, username)
  }
}
