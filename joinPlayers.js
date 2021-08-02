const fs = require('fs')
const path = require('path')
const io = require('./server')

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`)

    socket.on('join-room', (roomInfo) => {
        const { roomName, password, username } = roomInfo

        if (!roomName || !password || !username) {
            io.emit('join-room-error', "please fill in the password and username")
        } else {
            handlePlayersJoiningRooms(roomName, password, username)
        }
    })

   //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log(`A user ${socket.id} disconnected`)
    })
})

function handlePlayersJoiningRooms(roomName, password, username) {
    let canWrite = false

    let roomsData = fs.readFileSync(
        path.join(`${__dirname}/data`, 'rooms.json'),
        'utf8',
        (err, data) => {
            if(err) throw err
            return data
        }
    )
    roomsData = JSON.parse(roomsData)

    const rooms = roomsData.map(room => {
        if (validRoomAndPassword(room, roomName, password) && validPlayers(room, username)) {
            joinNewPlayers(room, username)
            canWrite = true
        }
        return room
    })
    
    if (canWrite) {
        fs.writeFile(
            path.join(`${__dirname}/data`, 'rooms.json'),
            JSON.stringify(rooms),
            (err) => {
                if(err) {
                    throw Error(err.message)
                }
                console.log('new player has been added...')
            }
        )
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