const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const { joinRoom, dragCards, dropCards, getRoomNameData } = require('./events/index')

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`)

    socket.on('join-room', (roomInfo) => {
        // TODO: JOIN USERS TO ROOMS SOCKETS
        joinRoom({ socket, roomInfo })
    })

    socket.on('get-roomName-data', (roomName) => {
        getRoomNameData({ io, socket, roomName })
    })

    socket.on('drag-card', (roomName, username) => {
        dragCards({ io, roomName, username })
    })

    socket.on('drop-card', (roomName, username, selectedCard) => {
        dropCards({ io, roomName, username, selectedCard })
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log(`A user ${socket.id} disconnected`)
    })
})

/**
 * @emits socket.emit('message',__"this_is_a_test") //sending to sender-client only
 * @emits socket.broadcast.emit('message',__"this_is_a_test") //sending to all clients except sender
 * @emits socket.broadcast.to('game').emit('message',__"nice_game") //sending to all clients in 'game' room(channel) except sender
 * @emits socket.to('game').emit('message',__"enjoy_the_game") //sending to sender client, only if they are in 'game' room(channel)
 * @emits socket.broadcast.to(socketid).emit('message',__"for_your_eyes_only') //sending to individual socketid
 * @emits io.emit('message',__"this_is_a_test") //sending to all clients, include sender
 * @emits io.in('game').emit('message',__"cool_game"); //sending to all clients in 'game' room(channel), include sender
 * @emits io.of('myNamespace').emit('message',__"gg") //sending to all clients in namespace 'myNamespace', include sender
 * @emits socket.emit() //send to all connected clients
 * @emits socket.broadcast.emit() //send to all connected clients except the one that sent the message
 * @emits socket.on() //event listener, can be called on client to execute on server
 * @emits io.sockets.socket() //for emiting to specific clients
 * @emits io.sockets.emit() //send to all connected clients (same as socket.emit)
 * @emits io.sockets.on() //initial connection from a client.
 */

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsConfig = require('./middlewares/cors.config')
app.use((req, res, next) => corsConfig(req, res, next))

app.use('/', require('./routes/rooms.routes'))

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))
