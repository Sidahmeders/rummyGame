const readJsonData = require('./readJsonData')
const writeJsonData = require('./writeJsonData')

let ioSocket

module.exports = function joinPlayers({ socket, roomInfo }) {
    ioSocket = socket
    let { roomName, password, username } = roomInfo
    username = username.replace(/\s/g, '') // remove spaces from the username

    if (!roomName || !password || !username) {
        socket.emit('join-room-error', 'please fill in the password and username')
    } else {
        handlePlayersJoiningRooms({ roomName, password, username })
    }
}

async function handlePlayersJoiningRooms({ roomName, password, username }) {
    const roomsData = JSON.parse(readJsonData())
    const room = roomsData[roomName]

    let roomPlayers = room.players,
        roomPassword = room.password

    const isValidPassword = roomPassword === password
    const isValidUsername = roomPlayers.indexOf(username) == -1
    const isValidRoom = roomPlayers.length < 4

    if (!isValidRoom) {
        ioSocket.emit('join-room-error', 'this room is full, please try another one')
    } else if (!isValidUsername) {
        ioSocket.emit('join-room-error', 'this username already exist')
    } else if (!isValidPassword) {
        ioSocket.emit('join-room-error', 'the given password is wrong')
    } else {
        roomPlayers.push(username)
        await writeJsonData(roomsData, 'new player has been added...')
        ioSocket.emit('user-joined-room', roomName, username)
    }
}
