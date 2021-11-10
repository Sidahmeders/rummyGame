const readJsonData = require('../utils/readJsonData')
const writeJsonData = require('../utils/writeJsonData')
let socketRef

module.exports = function joinRoom({ socket, roomInfo }) {
    socketRef = socket
    let { roomName, password, username } = roomInfo
    username = username.replace(/\s/g, '') // remove spaces from the username

    // socket.join(roomName) // join this user socket.id to a room
    if (!roomName || !password || !username) {
        socket.emit('join-room-error', 'please fill in the password and username')
    } else {
        validateAndJoinRoom({ roomName, password, username })
    }
}

async function validateAndJoinRoom({ roomName, password, username }) {
    const roomsData = JSON.parse(readJsonData())
    const room = roomsData[roomName]

    let roomPlayers = room.players,
        roomPassword = room.password

    const isValidPassword = roomPassword === password
    const isValidUsername = roomPlayers.indexOf(username) == -1
    const isValidRoom = roomPlayers.length < 4

    if (!isValidRoom) {
        socketRef.emit('join-room-error', 'this room is full, please try another one')
    } else if (!isValidUsername) {
        socketRef.emit('join-room-error', 'this username already exist')
    } else if (!isValidPassword) {
        socketRef.emit('join-room-error', 'the given password is wrong')
    } else {
        roomPlayers.push(username)
        await writeJsonData(roomsData, 'new player has been added...')
        socketRef.emit('user-joined-room', roomName, username)
    }
}
