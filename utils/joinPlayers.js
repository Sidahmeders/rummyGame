const readJsonData = require('./readJsonData')
const writeJsonData = require('./writeJsonData')

const roomsData = JSON.parse(readJsonData())
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
    let canWrite = false

    const rooms = roomsData.map((room) => {
        const isValidPassword = validRoomAndPassword(room, roomName, password)
        if (isValidPassword && validPlayers(room, username)) {
            joinNewPlayers(room, username)
            canWrite = true
        }
        return room
    })

    if (canWrite) {
        await writeJsonData(rooms, 'new player has been added...')
        ioSocket.emit('user-joined-room', roomName, username)
    }
}

function validRoomAndPassword(room, roomName, password) {
    if (room.roomName === roomName && room.password === password) {
        return true
    }
    ioSocket.emit('join-room-error', 'please make sure the password is correct')
    return false
}

function validPlayers(room, username) {
    roomPlayers = room['players'] || []
    const userExist = doesUserExist(roomPlayers, username)
    if (roomPlayers.length >= 4 || userExist) {
        ioSocket.emit('join-room-error', 'this room is full OR username already exist')
        return false
    }
    return true
}

function doesUserExist(roomPlayers, username) {
    for (let player of roomPlayers) {
        if (player == username) {
            return true
        }
    }
    return false
}

function joinNewPlayers(room, username) {
    if (!room['players']) {
        room['players'] = [username]
    } else {
        room['players'].push(username)
    }
    return room
}

// TODO: REFACTOR THIS FUCKED UP CODE
