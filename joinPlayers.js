const io = require('./server')
const fs = require('fs')
const path = require('path')

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
    let roomsData = fs.readFileSync(path.join(`${__dirname}/data`, 'rooms.json'), 'utf8', (err, data) => {
        if(err) throw err
        return data
    })
    roomsData = JSON.parse(roomsData)

    const rooms = roomsData.map(room => {
        if (room.roomName === roomName) {
            if (!room["players"]) {
                room["players"] = [username]
                canWrite = true
            } else if (room["players"].length < 4) {
                const userExist = doesUserExist(room["players"], username)
                if (userExist) {
                    console.log('this username does exists, please try another name')
                    return room
                } else {
                    room["players"].push(username)
                    canWrite = true
                }
            } else {
                console.log('this room is full, please try another one, or create your own')
            }
        } else {
            console.log('there seems to be a problem with the room you are trying to join')
        }
        return room
    })
    
    if (canWrite) {
        fs.writeFile(path.join(`${__dirname}/data`, 'rooms.json'), JSON.stringify(rooms), err => {
            if(err) {
                throw Error(err.message)
            }
            console.log('new player has been added...')
        })
        console.log(rooms)
    }
}

function doesUserExist(roomPlayers, username) {
    for (let player of roomPlayers) {
        if (player == username) {
            return true
        }
    }
    return false
}