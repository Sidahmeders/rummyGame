const readJsonData = require('./readJsonData')
const writeJsonData = require('./writeJsonData')

module.exports = function joinPlayers(io) {
    return async function handlePlayersJoiningRooms(roomName, password, username) {
        let canWrite = false
        let roomsData = JSON.parse(readJsonData())

        const rooms = roomsData.map(room => {
            if (validRoomAndPassword(room, roomName, password) && validPlayers(room, username)) {
                joinNewPlayers(room, username)
                canWrite = true
            }
            return room
        })
        
        if (canWrite) {
            await writeJsonData(rooms, 'new player has been added...')
            io.emit('user-joined-room', roomName, username)
        }
    }

    function validRoomAndPassword(room, roomName, password) {
        if (room.roomName === roomName && room.password === password) {
            return true
        }
        io.emit('join-room-error', 'please make sure the password is correct')
        return false
    }

    function validPlayers(room, username) {
        roomPlayers = room["players"] || []
        const userExist = doesUserExist(roomPlayers, username)
        if (roomPlayers.length >= 4 || userExist) {
            io.emit('join-room-error', 'this room is full OR username already exist')
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
        if (!room["players"]) {
            room["players"] = [username]
        } else {
            room["players"].push(username)
        }
        return room
    }
}