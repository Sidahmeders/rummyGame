const path = require('path')
const { Router } = require('express')
const roomsRoutes = require('./rooms')

const router = Router()
////
const readFile = (fileName) => path.join(`${__dirname}/../../../client/${fileName}`)
router.get('/', (_, res) => res.sendFile(readFile('index.html')))
router.get('/rooms', (_, res) => res.sendFile(readFile('rooms.html')))
router.get('/room/:roomId', (_, res) => res.sendFile(readFile('room.html')))
////

router.use('/apis/rooms', roomsRoutes)

module.exports = router
