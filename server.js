const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.set('socketio', io)

const joinPlayers = require('./utils/joinPlayers')

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`)

    socket.on('join-room', (roomInfo) => {
        let { roomName, password, username } = roomInfo
        username = username.replace(/\s/g, '') // remove spaces from the username

        if (!roomName || !password || !username) {
            io.emit('join-room-error', "please fill in the password and username")
        } else {
            const handlePlayersJoiningRooms = joinPlayers(io)
            handlePlayersJoiningRooms(roomName, password, username)
        }
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log(`A user ${socket.id} disconnected`)
    })
})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const corsConfig = require('./middlewares/cors.config')
app.use((req, res, next) => corsConfig(req, res, next))

app.use('/', require('./routes/rooms.routes'))

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))