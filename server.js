const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const corsConfig = require('./middlewares/cors.config')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('socketio', io)
app.use((req, res, next) => corsConfig(req, res, next))

app.use('/', require('./rooms'))

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))

module.exports = io
require('./joinPlayers')