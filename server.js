const express = require('express')
const initListener = require('./src/infrastructure/wss')
const apis = require('./src/apis/routes')
const corsConfig = require('./src/config/cors')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/client'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => corsConfig(req, res, next))

initListener(io)
app.use('/', apis)

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port ${PORT}..`))

/**
 * valid suite (10-S, J-S, Q-S), (2-C, 2-H, 2-S), (4-S, 5-S, 6-S, ...)
 * valid suite (A-H, 2-H, 3-H, 4-H, 5-H, 6-H....)
 * 1 2 3 4.... J Q K A
 * A = 11 OR 1
 * 91++ point can drop
 * n_i++ can beat n_i
 * a complete set can beat em all
 * 200 point for the winning team
 * the losing team can only take 10 point for each card left in his hand
 */
