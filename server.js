const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const joinPlayers = require('./utils/joinPlayers')
const handleRoomCards = require('./utils/handleRoomCards')

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log(`A user ${socket.id} connected`)

  socket.on('join-room', (roomInfo) => {
    joinPlayers({ socket, roomInfo })
  })

  socket.on('player-drags-card', (roomName, username) => {
    handleRoomCards({ io, roomName, username })
  })

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', () => {
    console.log(`A user ${socket.id} disconnected`)
  })
})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsConfig = require('./middlewares/cors.config')
app.use((req, res, next) => corsConfig(req, res, next))

app.use('/', require('./routes/rooms.routes'))

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))
