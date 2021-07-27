const express = require('express')
const app = express()
const server = require('http').createServer(app)


app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/', require('./rooms'))


const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))


const io = require('socket.io')(server)

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`)

    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg)
    })

   //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log(`A user ${socket.id} disconnected`)
    })
})
